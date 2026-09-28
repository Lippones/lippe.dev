"use client";

import { useEffect, useRef } from "react";

/**
 * Barra de leitura no topo. Escreve direto no style do elemento em vez de
 * manter a fracao em estado: o scroll dispara dezenas de vezes por segundo e
 * nao vale um re-render por quadro.
 */
export function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = ref.current;
    if (!bar) return;

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio =
        max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      bar.style.width = `${(ratio * 100).toFixed(2)}%`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      ref={ref}
      data-progress=""
      aria-hidden="true"
      className="fixed top-0 left-0 z-[60] h-px w-0 bg-[#F5F5F5]"
    />
  );
}
