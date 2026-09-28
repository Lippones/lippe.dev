import "server-only";

const ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

/** Nome de exibição e id vêm do Spotify: são texto do usuário, não HTML. */
export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ESCAPES[char]);
}

/**
 * Página mínima de resultado das rotas de conexão. Recebe `body` já escapado:
 * quem monta a mensagem passa cada valor externo por `escapeHtml`.
 */
export function resultPage({
  title,
  body,
  status = 200,
}: {
  title: string;
  body: string;
  status?: number;
}): Response {
  const html = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${escapeHtml(title)} · Spotify</title>
<style>
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #191919; color: #f5f5f5; font: 15px/1.7 Inter, Helvetica, Arial, sans-serif; }
  main { max-width: 46ch; padding: 32px 24px; }
  h1 { margin: 0; font-size: 22px; font-weight: 500; letter-spacing: -0.02em; }
  p { margin: 14px 0 0; color: #a3a3a3; }
  code { padding: 1px 6px; border: 1px solid #2c2c2c; border-radius: 4px; background: #202020; color: #f5f5f5; font: 13px ui-monospace, Menlo, monospace; word-break: break-all; }
  a { color: #f5f5f5; }
</style>
</head>
<body>
<main>
<h1>${escapeHtml(title)}</h1>
${body}
</main>
</body>
</html>`;

  return new Response(html, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
