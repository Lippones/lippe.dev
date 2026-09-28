import { SNAPSHOT_AGE_HEADER } from "@/lib/now-playing-headers";
import { getNowPlaying } from "@/lib/spotify";

/**
 * O snapshot é igual para todo mundo, então a resposta é cacheada de forma
 * compartilhada: a CDN segura a resposta por 5 s e o servidor guarda o próprio
 * snapshot pelo mesmo tempo, então o Spotify vê no máximo uma leitura a cada
 * 5 s por instância, seja com um visitante ou com dez mil.
 * `stale-while-revalidate` serve o snapshot antigo enquanto o novo chega, para
 * nunca deixar ninguém esperando a rede. O custo é a resposta chegar velha,
 * por isso ela diz a própria idade: o header abaixo cobre o tempo até sair da
 * função, e o `Age` da CDN cobre o tempo no cache.
 */
export async function GET() {
  const { value, capturedAt } = await getNowPlaying();

  return Response.json(value, {
    headers: {
      "Cache-Control": "public, s-maxage=5, stale-while-revalidate=25",
      [SNAPSHOT_AGE_HEADER]: String(Math.max(0, Date.now() - capturedAt)),
    },
  });
}
