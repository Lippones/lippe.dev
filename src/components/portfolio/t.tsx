import type { ReactNode } from "react";

/**
 * Emite as duas versoes do texto marcadas por idioma. A que nao esta ativa e
 * escondida por CSS (`display: none`), portanto fica fora do fluxo e tambem
 * fora do alcance de leitores de tela.
 */
export function T({ pt, en }: { pt: ReactNode; en: ReactNode }) {
  return (
    <>
      <span lang="pt">{pt}</span>
      <span lang="en">{en}</span>
    </>
  );
}
