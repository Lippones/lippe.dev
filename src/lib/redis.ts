import "server-only";

import { Redis } from "@upstash/redis";

let client: Redis | null | undefined;

/**
 * Cliente do Upstash, ou `null` quando o banco não está configurado: aí a
 * feature de música simplesmente não aparece, e o resto do site segue igual.
 *
 * Aceita os dois pares de nomes: `UPSTASH_REDIS_REST_*`, que é o padrão do
 * SDK, e `KV_REST_API_*`, que é o que a integração da Vercel injeta. `||` e
 * não `??`: variável declarada e vazia, como no `.env.example`, conta como
 * ausente e deixa o outro par valer.
 */
export function getRedis(): Redis | null {
  if (client !== undefined) return client;

  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

  client = url && token ? new Redis({ url, token }) : null;
  return client;
}
