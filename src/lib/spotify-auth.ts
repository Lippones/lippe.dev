import "server-only";

import { getRedis } from "./redis";

/**
 * Autorização da minha conta do Spotify, feita pelo próprio site.
 *
 * Em vez de gerar um refresh token à mão e colar como variável de ambiente, eu
 * entro uma vez em `/api/spotify/login`, autorizo, e o callback guarda o token
 * no Upstash. Se o Spotify rotacionar o token, o novo é salvo sozinho, coisa
 * que uma variável de ambiente nunca faria.
 */

const AUTHORIZE_URL = "https://accounts.spotify.com/authorize";
const TOKEN_URL = "https://accounts.spotify.com/api/token";
const PROFILE_URL = "https://api.spotify.com/v1/me";

/** Só o necessário: o que está tocando e a última faixa ouvida. */
export const SPOTIFY_SCOPES =
  "user-read-currently-playing user-read-recently-played";

export const STATE_COOKIE = "spotify_oauth_state";

const KEYS = {
  refreshToken: "spotify:refresh_token",
  accessToken: "spotify:access_token",
  refreshLock: "spotify:refresh_lock",
} as const;

/** Margem antes de expirar, para nunca usar um token no limite. */
const ACCESS_TOKEN_MARGIN_S = 5 * 60;
/** Tempo máximo que um refresh pode segurar a trava entre instâncias. */
const REFRESH_LOCK_TTL_S = 10;
/**
 * Limite de cada chamada ao Spotify. Fica bem abaixo da trava: quem a segura
 * sempre termina antes de ela expirar e ser pega por outra instância.
 */
export const SPOTIFY_TIMEOUT_MS = 5_000;
/** Sem conta conectada, quanto tempo esperar antes de olhar o banco de novo. */
const DISCONNECTED_RECHECK_MS = 60_000;
/** Pausa padrão quando o Spotify limita sem dizer por quanto tempo. */
const DEFAULT_RETRY_AFTER_S = 30;

export type AppCredentials = { clientId: string; clientSecret: string };

export function readAppCredentials(): AppCredentials | null {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;
  return { clientId, clientSecret };
}

/**
 * Origem que o navegador usou. `request.url` não serve: fora da Vercel o Next
 * reescreve 127.0.0.1 para localhost, e o Spotify só aceita 127.0.0.1. Na
 * Vercel os dois headers vêm da própria plataforma.
 */
export function requestOrigin(request: Request): string {
  const host = (
    request.headers.get("x-forwarded-host") ?? request.headers.get("host")
  )
    ?.split(",")[0]
    .trim();
  const proto =
    request.headers.get("x-forwarded-proto")?.split(",")[0].trim() === "https"
      ? "https"
      : "http";
  if (host) {
    try {
      return new URL(`${proto}://${host}`).origin;
    } catch {
      // Host malformado: cai na URL que o Next montou.
    }
  }
  return new URL(request.url).origin;
}

/**
 * O Spotify exige que o redirect URI seja idêntico ao cadastrado no app. Em
 * produção vale fixar por variável; sem ela, deriva da origem da requisição,
 * o que cobre dev e produção desde que as duas URLs estejam cadastradas.
 */
export function resolveRedirectUri(origin: string): string {
  const fixed = process.env.SPOTIFY_REDIRECT_URI;
  if (fixed) return fixed;
  return new URL("/api/spotify/callback", origin).toString();
}

export function buildAuthorizeUrl({
  clientId,
  redirectUri,
  state,
}: {
  clientId: string;
  redirectUri: string;
  state: string;
}): string {
  const url = new URL(AUTHORIZE_URL);
  url.search = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope: SPOTIFY_SCOPES,
    redirect_uri: redirectUri,
    state,
  }).toString();
  return url.toString();
}

export class RateLimited extends Error {
  constructor(readonly retryAfterSeconds: number) {
    super(`Spotify limitou por ${retryAfterSeconds}s`);
    this.name = "RateLimited";
  }
}

/** Vale para a API e para o endpoint de token: 429 traz `Retry-After`. */
export function assertNotLimited(response: Response) {
  if (response.status !== 429) return;
  const header = Number(response.headers.get("retry-after"));
  throw new RateLimited(
    Number.isFinite(header) && header > 0 ? header : DEFAULT_RETRY_AFTER_S
  );
}

function basicAuth({ clientId, clientSecret }: AppCredentials): string {
  return `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`;
}

type TokenResponse = {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
};

export class SpotifyAuthError extends Error {
  constructor(
    message: string,
    /** `invalid_grant` significa refresh token revogado ou expirado. */
    readonly code?: string,
    readonly status?: number
  ) {
    super(message);
    this.name = "SpotifyAuthError";
  }
}

async function postToken(
  creds: AppCredentials,
  body: Record<string, string>
): Promise<TokenResponse> {
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: basicAuth(creds),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(body),
    cache: "no-store",
    signal: AbortSignal.timeout(SPOTIFY_TIMEOUT_MS),
  });

  assertNotLimited(response);
  if (!response.ok) {
    const payload = (await response.json().catch(() => ({}))) as {
      error?: string;
    };
    throw new SpotifyAuthError(
      `Spotify recusou a troca de token: ${response.status}`,
      payload.error,
      response.status
    );
  }

  return (await response.json()) as TokenResponse;
}

export function exchangeCode(
  creds: AppCredentials,
  code: string,
  redirectUri: string
): Promise<TokenResponse> {
  return postToken(creds, {
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
  });
}

export async function fetchProfile(
  accessToken: string
): Promise<{ id: string; displayName: string | null }> {
  const response = await fetch(PROFILE_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
    signal: AbortSignal.timeout(SPOTIFY_TIMEOUT_MS),
  });
  if (!response.ok) {
    throw new SpotifyAuthError(
      `Não deu para ler o perfil: ${response.status}`,
      undefined,
      response.status
    );
  }
  const payload = (await response.json()) as {
    id: string;
    display_name?: string | null;
  };
  return { id: payload.id, displayName: payload.display_name ?? null };
}

/**
 * O erro do Upstash repete o comando inteiro na mensagem, tokens incluídos.
 * Todo comando que leva token passa por aqui, para nada disso chegar ao log.
 */
async function withoutTokenInErrors<T>(command: Promise<T>): Promise<T> {
  try {
    return await command;
  } catch (error) {
    const kind = error instanceof Error ? error.name : "erro";
    throw new Error(`Upstash recusou um comando com token (${kind})`);
  }
}

/**
 * Grava os tokens de uma autorização nova. Devolve `false` sem Upstash e
 * lança, com mensagem limpa, se o Upstash recusar a gravação.
 */
export async function saveTokens(tokens: TokenResponse): Promise<boolean> {
  const redis = getRedis();
  if (!redis || !tokens.refresh_token) return false;

  await withoutTokenInErrors(
    Promise.all([
      redis.set(KEYS.refreshToken, tokens.refresh_token),
      cacheAccessToken(tokens),
    ])
  );
  forgetMemoryToken();
  disconnectedUntil = 0;
  return true;
}

async function cacheAccessToken(tokens: TokenResponse): Promise<void> {
  const redis = getRedis();
  const ttl = tokens.expires_in - ACCESS_TOKEN_MARGIN_S;
  if (!redis || ttl <= 0) return;
  await redis.set(KEYS.accessToken, tokens.access_token, { ex: ttl });
}

// Apaga só se o guardado ainda for o token que falhou. Se eu reconectei pelo
// callback no meio do refresh, o token novo fica.
const CLEAR_IF_UNCHANGED = `if redis.call("get", KEYS[1]) == ARGV[1] then
  return redis.call("del", KEYS[1], KEYS[2])
end
return 0`;

async function clearTokens(failed: string): Promise<boolean> {
  const redis = getRedis();
  forgetMemoryToken();
  if (!redis) return false;
  const removed = await withoutTokenInErrors(
    redis.eval<[string], number>(
      CLEAR_IF_UNCHANGED,
      [KEYS.refreshToken, KEYS.accessToken],
      [failed]
    )
  );
  return removed > 0;
}

// Cache por instância: com ele, uma instância quente não gasta nenhum comando
// do Upstash por requisição; o banco só entra na partida a frio e a cada hora.
let memoryToken: { value: string; expiresAt: number } | null = null;
let inFlight: Promise<string | null> | null = null;
// Cache negativo: sem conta conectada, olhar o banco a cada requisição gastaria
// a cota do Upstash à toa. Uma olhada por minuto por instância basta.
let disconnectedUntil = 0;

function forgetMemoryToken() {
  memoryToken = null;
}

function rememberToken(value: string, ttlSeconds: number) {
  memoryToken = { value, expiresAt: Date.now() + ttlSeconds * 1000 };
}

function markDisconnected() {
  disconnectedUntil = Date.now() + DISCONNECTED_RECHECK_MS;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function refreshAccessToken(creds: AppCredentials): Promise<string | null> {
  const redis = getRedis();
  if (!redis) return null;

  // Um comando responde as duas perguntas: há token válido e há conta conectada.
  const [cached, stored] = await redis.mget<[string | null, string | null]>(
    KEYS.accessToken,
    KEYS.refreshToken
  );
  if (cached) {
    const ttl = await redis.ttl(KEYS.accessToken);
    rememberToken(cached, Math.max(ttl, 1));
    return cached;
  }
  if (!stored) {
    markDisconnected();
    return null;
  }

  // Trava entre instâncias: na virada da hora, só uma troca o token no
  // Spotify e as outras esperam o resultado aparecer no cache.
  const acquired = await redis.set(KEYS.refreshLock, "1", {
    nx: true,
    ex: REFRESH_LOCK_TTL_S,
  });

  if (!acquired) {
    for (let attempt = 0; attempt < 10; attempt++) {
      await sleep(300);
      const fresh = await redis.get<string>(KEYS.accessToken);
      if (fresh) {
        rememberToken(fresh, 60);
        return fresh;
      }
    }
    // Não é falta de conta: a troca está demorando noutra instância. Lançar
    // mantém o último snapshot bom em vez de sumir com o bloco.
    throw new Error("Refresh do token em andamento noutra instância");
  }

  try {
    // Relê dentro da trava: outra instância pode ter acabado de rotacionar.
    const refreshToken = await redis.get<string>(KEYS.refreshToken);
    if (!refreshToken) {
      markDisconnected();
      return null;
    }

    let tokens: TokenResponse;
    try {
      tokens = await postToken(creds, {
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      });
    } catch (error) {
      // Token revogado: não adianta insistir. O bloco some até eu reconectar.
      if (error instanceof SpotifyAuthError && error.code === "invalid_grant") {
        if (await clearTokens(refreshToken)) {
          markDisconnected();
          return null;
        }
        throw new Error("Refresh token trocado durante a renovação");
      }
      throw error;
    }

    // Memória primeiro: se o banco falhar agora, esta instância segue com o
    // token novo até ele expirar.
    rememberToken(tokens.access_token, tokens.expires_in - ACCESS_TOKEN_MARGIN_S);

    const writes: Promise<unknown>[] = [cacheAccessToken(tokens)];
    if (tokens.refresh_token && tokens.refresh_token !== refreshToken) {
      writes.push(redis.set(KEYS.refreshToken, tokens.refresh_token));
    }
    await withoutTokenInErrors(Promise.all(writes));

    return tokens.access_token;
  } finally {
    await redis.del(KEYS.refreshLock);
  }
}

/**
 * Access token válido, ou `null` quando ainda não conectei a conta, o Upstash
 * não está configurado ou o token foi revogado. Lança nas falhas passageiras
 * (rede, limite, outra instância renovando), para quem chama manter o que tem.
 */
export async function getAccessToken(
  creds: AppCredentials
): Promise<string | null> {
  if (memoryToken && Date.now() < memoryToken.expiresAt) return memoryToken.value;
  if (Date.now() < disconnectedUntil) return null;
  // Requisições concorrentes na mesma instância dividem um único refresh.
  inFlight ??= refreshAccessToken(creds).finally(() => {
    inFlight = null;
  });
  return inFlight;
}

/**
 * Descarta o access token em memória e no banco. Usado quando o Spotify
 * responde 401: sem apagar do banco, a nova tentativa pegaria o mesmo token.
 */
export async function invalidateAccessToken(): Promise<void> {
  forgetMemoryToken();
  const redis = getRedis();
  if (redis) await redis.del(KEYS.accessToken);
}
