import { NextResponse, type NextRequest } from "next/server";

import {
  STATE_COOKIE,
  buildAuthorizeUrl,
  readAppCredentials,
  requestOrigin,
  resolveRedirectUri,
} from "@/lib/spotify-auth";
import { escapeHtml, resultPage } from "@/lib/spotify-page";

/** Marca o salto para o domínio do redirect URI, para não virar loop. */
const HOP_PARAM = "hop";

function redirect(to: URL | string): NextResponse {
  const response = NextResponse.redirect(to, 307);
  response.headers.set("Cache-Control", "no-store");
  return response;
}

/**
 * Início da conexão da conta: gera o `state`, guarda num cookie e manda para o
 * consentimento do Spotify. Qualquer um pode abrir esta rota, mas o callback
 * só grava o token da conta dona do site.
 */
export async function GET(request: NextRequest) {
  const origin = new URL(requestOrigin(request));

  // O Spotify proíbe localhost em redirect URI. Troca de host antes de tudo,
  // senão o cookie de state fica gravado num host e o callback chega noutro.
  if (origin.hostname === "localhost") {
    const target = new URL("/api/spotify/login", origin);
    target.hostname = "127.0.0.1";
    return redirect(target);
  }

  const creds = readAppCredentials();
  if (!creds) {
    return resultPage({
      title: "App do Spotify não configurado",
      body: "<p>Faltam <code>SPOTIFY_CLIENT_ID</code> e <code>SPOTIFY_CLIENT_SECRET</code> nas variáveis de ambiente.</p>",
      status: 500,
    });
  }

  const redirectUri = resolveRedirectUri(origin.origin);

  // Com o redirect URI fixado noutro domínio, o fluxo precisa começar lá:
  // é naquele host que o callback vai procurar o cookie.
  const redirectOrigin = new URL(redirectUri).origin;
  if (redirectOrigin !== origin.origin) {
    // Já saltei uma vez e continuo fora: aquele domínio redireciona de volta
    // para este (www e apex, por exemplo). Insistir seria um loop.
    if (request.nextUrl.searchParams.has(HOP_PARAM)) {
      return resultPage({
        title: "Redirect URI noutro domínio",
        body: `<p><code>SPOTIFY_REDIRECT_URI</code> aponta para <code>${escapeHtml(redirectOrigin)}</code>, que redireciona para <code>${escapeHtml(origin.origin)}</code>. Use no redirect URI o domínio que responde sem redirecionar, aqui e no app do Spotify.</p>`,
        status: 500,
      });
    }
    const target = new URL("/api/spotify/login", redirectOrigin);
    target.searchParams.set(HOP_PARAM, "1");
    return redirect(target);
  }

  const state = crypto.randomUUID();
  const response = redirect(
    buildAuthorizeUrl({ clientId: creds.clientId, redirectUri, state })
  );

  response.cookies.set(STATE_COOKIE, state, {
    httpOnly: true,
    secure: origin.protocol === "https:",
    // `lax` basta: a volta do Spotify é uma navegação GET de topo.
    sameSite: "lax",
    path: "/api/spotify",
    maxAge: 10 * 60,
  });
  return response;
}
