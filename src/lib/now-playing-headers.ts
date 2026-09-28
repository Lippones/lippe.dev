/**
 * Idade do snapshot, em ms, quando a resposta de `/api/now-playing` saiu da
 * função. Somada ao `Age` da CDN, diz ao cliente há quanto tempo o player foi
 * lido, sem depender do relógio de ninguém.
 */
export const SNAPSHOT_AGE_HEADER = "x-snapshot-age-ms";
