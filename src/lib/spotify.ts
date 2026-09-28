import "server-only";

import {
  RateLimited,
  SPOTIFY_TIMEOUT_MS,
  assertNotLimited,
  getAccessToken,
  invalidateAccessToken,
  readAppCredentials,
} from "./spotify-auth";

/**
 * Leitura do que está tocando na minha conta do Spotify.
 *
 * O Spotify não tem webhook de playback, então não há como ser avisado de uma
 * troca de faixa: o jeito é consultar. Este módulo é o único ponto que lê o
 * player, e é chamado uma vez por janela de cache, não uma vez por visitante.
 * O token vem do Upstash, gravado quando conectei a conta pelo próprio site.
 */

const CURRENTLY_PLAYING_URL =
  "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_URL =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

/**
 * Idade máxima do snapshot em memória. A CDN já segura a resposta, mas cada
 * query string diferente é outra entrada no cache dela: sem este piso, bastaria
 * variar a URL para cada acesso chegar ao Spotify.
 */
const SNAPSHOT_MAX_AGE_MS = 5_000;
/** Pausa depois de uma falha passageira (rede, 5xx) que não disse quanto esperar. */
const FAILURE_BACKOFF_MS = 15_000;

export type NowPlayingState = "playing" | "paused" | "recent" | "unavailable";

export type AlbumArt = { url: string; width: number; height: number };

/**
 * O Spotify devolve a capa em 640, 300 e 64 px. Guardamos duas: a miniatura do
 * hero não precisa baixar a de 640, e a do modal não pode ser a de 64.
 */
export type Artwork = { small: AlbumArt | null; large: AlbumArt | null };

export type NowPlaying = {
  state: NowPlayingState;
  title: string | null;
  artists: string | null;
  album: string | null;
  artwork: Artwork;
  url: string | null;
  durationMs: number;
  progressMs: number;
  /** ISO, só quando `state` é "recent". */
  playedAt: string | null;
};

const UNAVAILABLE: NowPlaying = {
  state: "unavailable",
  title: null,
  artists: null,
  album: null,
  artwork: { small: null, large: null },
  url: null,
  durationMs: 0,
  progressMs: 0,
  playedAt: null,
};

export type NowPlayingSnapshot = {
  value: NowPlaying;
  /** Epoch em ms de quando o player foi lido. O progresso vale para esse instante. */
  capturedAt: number;
};

const unavailable = (): NowPlayingSnapshot => ({
  value: UNAVAILABLE,
  capturedAt: Date.now(),
});

// Último snapshot bom, com a hora da leitura original, para degradar quando o
// Spotify limita ou cai sem fingir que o progresso é de agora.
let lastGood: NowPlayingSnapshot | null = null;
// Até quando não incomodar o Spotify depois de um 429 ou de uma falha.
let coolDownUntil = 0;
// Snapshot servido a todas as requisições desta instância por alguns segundos.
let memo: { snapshot: NowPlayingSnapshot; at: number } | null = null;
let pending: Promise<NowPlayingSnapshot> | null = null;

type SpotifyTrack = {
  name: string;
  duration_ms: number;
  external_urls?: { spotify?: string };
  album?: { name?: string; images?: AlbumArt[] };
  artists?: { name: string }[];
};

function pickArtwork(images: AlbumArt[] | undefined): Artwork {
  if (!images?.length) return { small: null, large: null };
  const ascending = [...images].sort((a, b) => a.width - b.width);
  return {
    small: ascending.find((image) => image.width >= 64) ?? ascending[0],
    large: ascending.find((image) => image.width >= 300) ?? ascending.at(-1)!,
  };
}

function normalize(
  track: SpotifyTrack,
  state: NowPlayingState,
  progressMs: number,
  playedAt: string | null
): NowPlaying {
  return {
    state,
    title: track.name,
    artists: (track.artists ?? []).map((artist) => artist.name).join(", "),
    album: track.album?.name ?? null,
    artwork: pickArtwork(track.album?.images),
    url: track.external_urls?.spotify ?? null,
    durationMs: track.duration_ms,
    progressMs,
    playedAt,
  };
}

async function fetchRecentlyPlayed(token: string): Promise<NowPlaying> {
  const response = await fetch(RECENTLY_PLAYED_URL, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
    signal: AbortSignal.timeout(SPOTIFY_TIMEOUT_MS),
  });
  assertNotLimited(response);
  // Falha é exceção, não "nada tocando": assim a última faixa boa continua.
  if (!response.ok) {
    throw new Error(`Spotify (recently-played) respondeu ${response.status}`);
  }

  const payload = (await response.json()) as {
    items?: { track?: SpotifyTrack; played_at?: string }[];
  };
  const item = payload.items?.[0];
  if (!item?.track) return UNAVAILABLE;

  return normalize(item.track, "recent", 0, item.played_at ?? null);
}

async function fetchCurrent(token: string): Promise<NowPlaying | "unauthorized"> {
  const response = await fetch(CURRENTLY_PLAYING_URL, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
    signal: AbortSignal.timeout(SPOTIFY_TIMEOUT_MS),
  });

  if (response.status === 401) return "unauthorized";
  assertNotLimited(response);

  // 204 é o caso normal de "nada tocando", não um erro.
  if (response.status === 204) return fetchRecentlyPlayed(token);

  if (!response.ok) {
    throw new Error(`Spotify respondeu ${response.status}`);
  }

  const text = await response.text();
  if (!text) return fetchRecentlyPlayed(token);

  const payload = JSON.parse(text) as {
    is_playing?: boolean;
    progress_ms?: number;
    item?: SpotifyTrack | null;
  };

  // Sem `item` quando é podcast ou sessão privada: aí a última faixa ouvida diz
  // mais do que um bloco vazio.
  if (!payload.item) return fetchRecentlyPlayed(token);

  return normalize(
    payload.item,
    payload.is_playing ? "playing" : "paused",
    payload.progress_ms ?? 0,
    null
  );
}

/**
 * O que está tocando. Nunca lança: sem conta conectada, sem Upstash ou com o
 * Spotify fora do ar, devolve o último snapshot bom e, na falta dele,
 * "unavailable". O bloco na página some ou mostra o traço, mas não quebra.
 */
async function readNowPlaying(): Promise<NowPlayingSnapshot> {
  const creds = readAppCredentials();
  if (!creds) return unavailable();
  if (Date.now() < coolDownUntil) return lastGood ?? unavailable();

  try {
    const token = await getAccessToken(creds);
    if (!token) return unavailable();

    let result = await fetchCurrent(token);
    if (result === "unauthorized") {
      // Token recusado: apaga o cache e tenta uma vez com um token renovado.
      await invalidateAccessToken();
      const retryToken = await getAccessToken(creds);
      result = retryToken ? await fetchCurrent(retryToken) : "unauthorized";
    }
    if (result === "unauthorized") return lastGood ?? unavailable();

    const read = { value: result, capturedAt: Date.now() };
    if (result.state !== "unavailable") lastGood = read;
    return read;
  } catch (error) {
    coolDownUntil =
      Date.now() +
      (error instanceof RateLimited
        ? error.retryAfterSeconds * 1000
        : FAILURE_BACKOFF_MS);
    console.error("[now-playing]", error instanceof Error ? error.message : error);
    return lastGood ?? unavailable();
  }
}

/**
 * Snapshot compartilhado pela instância: no máximo uma leitura do Spotify a
 * cada 5 s, e requisições simultâneas esperam a mesma leitura.
 */
export async function getNowPlaying(): Promise<NowPlayingSnapshot> {
  if (memo && Date.now() - memo.at < SNAPSHOT_MAX_AGE_MS) return memo.snapshot;
  pending ??= readNowPlaying()
    .then((snapshot) => {
      memo = { snapshot, at: Date.now() };
      return snapshot;
    })
    .finally(() => {
      pending = null;
    });
  return pending;
}
