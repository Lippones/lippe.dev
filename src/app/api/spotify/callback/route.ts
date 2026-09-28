import { timingSafeEqual } from "node:crypto";

import type { NextRequest } from "next/server";

import {
  STATE_COOKIE,
  SpotifyAuthError,
  exchangeCode,
  fetchProfile,
  readAppCredentials,
  requestOrigin,
  resolveRedirectUri,
  saveTokens,
} from "@/lib/spotify-auth";
import { escapeHtml, resultPage } from "@/lib/spotify-page";

function sameState(received: string, expected: string): boolean {
  const a = Buffer.from(received);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Loga só a mensagem: os erros de token já saem sem o token. */
function logFailure(step: string, error: unknown) {
  console.error(
    `[spotify-callback] ${step}:`,
    error instanceof Error ? error.message : "erro desconhecido"
  );
}

/**
 * Volta do consentimento. Confere o `state`, troca o código pelos tokens,
 * confirma que a conta é a dona do site e só então grava no Upstash.
 */
export async function GET(request: NextRequest) {
  const origin = requestOrigin(request);

  let response: Response;
  try {
    response = await handle(request, origin);
  } catch (error) {
    logFailure("inesperado", error);
    response = resultPage({
      title: "Algo deu errado",
      body: '<p>A conexão falhou no meio do caminho. Veja o log da função.</p><p><a href="/api/spotify/login">Começar de novo</a></p>',
      status: 500,
    });
  }

  // O state é de uso único: sai do navegador seja qual for o resultado. Os
  // atributos repetem os do cookie criado no login.
  const secure = origin.startsWith("https:") ? "; Secure" : "";
  const headers = new Headers(response.headers);
  headers.append(
    "Set-Cookie",
    `${STATE_COOKIE}=; Path=/api/spotify; Max-Age=0; HttpOnly; SameSite=Lax${secure}`
  );
  return new Response(response.body, { status: response.status, headers });
}

async function handle(request: NextRequest, origin: string): Promise<Response> {
  const params = request.nextUrl.searchParams;
  const restart = '<p><a href="/api/spotify/login">Começar de novo</a></p>';

  if (params.get("error")) {
    return resultPage({
      title: "Autorização cancelada",
      body: `<p>O Spotify devolveu <code>${escapeHtml(params.get("error") ?? "")}</code>. Nada foi gravado.</p>${restart}`,
      status: 400,
    });
  }

  const code = params.get("code");
  const state = params.get("state");
  const expected = request.cookies.get(STATE_COOKIE)?.value;

  if (!code || !state || !expected || !sameState(state, expected)) {
    return resultPage({
      title: "Pedido expirado ou inválido",
      body: `<p>O pedido de conexão não confere com este navegador, ou passou dos 10 minutos.</p>${restart}`,
      status: 400,
    });
  }

  const creds = readAppCredentials();
  if (!creds) {
    return resultPage({
      title: "App do Spotify não configurado",
      body: "<p>Faltam <code>SPOTIFY_CLIENT_ID</code> e <code>SPOTIFY_CLIENT_SECRET</code>.</p>",
      status: 500,
    });
  }

  const redirectUri = resolveRedirectUri(origin);

  let tokens: Awaited<ReturnType<typeof exchangeCode>>;
  try {
    tokens = await exchangeCode(creds, code, redirectUri);
  } catch (error) {
    logFailure("troca do código", error);
    return resultPage({
      title: "O Spotify recusou a conexão",
      body: `<p>A troca do código pelos tokens falhou. Confira se o redirect URI cadastrado no app é exatamente <code>${escapeHtml(redirectUri)}</code>.</p>${restart}`,
      status: 502,
    });
  }

  let profile: Awaited<ReturnType<typeof fetchProfile>>;
  try {
    profile = await fetchProfile(tokens.access_token);
  } catch (error) {
    logFailure("perfil", error);
    // Em modo de desenvolvimento o Spotify autoriza qualquer conta, mas a API
    // só responde para as que estão na lista do app.
    const outsideAllowlist =
      error instanceof SpotifyAuthError && error.status === 403;
    return resultPage({
      title: outsideAllowlist
        ? "Conta fora da lista do app"
        : "Não deu para ler o perfil",
      body: outsideAllowlist
        ? `<p>Enquanto o app do Spotify está em modo de desenvolvimento, a API só responde para contas adicionadas em <strong>User Management</strong>, no painel do app. Adicione a sua e conecte de novo.</p>${restart}`
        : `<p>A autorização passou, mas o Spotify não devolveu o perfil da conta. Tente de novo em instantes.</p>${restart}`,
      status: 502,
    });
  }

  const owner = process.env.SPOTIFY_OWNER_ID;
  const accountId = escapeHtml(profile.id);

  // Primeira vez: ainda não sei qual é a minha conta. Mostro o id e não gravo,
  // para ninguém conseguir ser o primeiro a conectar a própria conta.
  if (!owner) {
    return resultPage({
      title: "Falta dizer qual conta é a sua",
      body: `<p>A conta que acabou de autorizar tem o id <code>${accountId}</code>.</p><p>Adicione <code>SPOTIFY_OWNER_ID=${accountId}</code> nas variáveis de ambiente, faça um redeploy (na Vercel a variável só vale num deploy novo; em dev, reinicie o servidor) e conecte de novo. Nada foi gravado.</p>`,
    });
  }

  if (profile.id !== owner) {
    return resultPage({
      title: "Conta não autorizada",
      body: "<p>Só a conta dona do site pode ser conectada aqui. Nada foi gravado.</p>",
      status: 403,
    });
  }

  let saved = false;
  try {
    saved = await saveTokens(tokens);
  } catch (error) {
    logFailure("gravação", error);
  }
  if (!saved) {
    return resultPage({
      title: "Não deu para gravar o token",
      body: "<p>Confira se o Upstash está configurado com o token de escrita, não o só de leitura: <code>UPSTASH_REDIS_REST_URL</code> e <code>UPSTASH_REDIS_REST_TOKEN</code>, ou <code>KV_REST_API_URL</code> e <code>KV_REST_API_TOKEN</code>.</p>",
      status: 500,
    });
  }

  const name = escapeHtml(profile.displayName ?? profile.id);
  return resultPage({
    title: "Spotify conectado",
    body: `<p>Conta <code>${name}</code> conectada. O bloco de música aparece no site em até um minuto.</p><p><a href="/">Voltar ao site</a></p>`,
  });
}
