"use client";

import { useEffect } from "react";

const REVEAL_DISTANCE = 22;
const PEEK_WIDTH = 210;
const PEEK_HEIGHT = 140;
const PEEK_PADDING = 16;

/**
 * Componente sem marcacao: liga o reveal em scroll e o cartao de preview que
 * segue o cursor nas linhas de projeto. Fica fora da arvore de conteudo para
 * que todas as secoes continuem sendo Server Components.
 */
export function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--reveal-distance", `${REVEAL_DISTANCE}px`);

    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    const timers: number[] = [];

    const show = (node: HTMLElement) => {
      if (node.dataset.shown !== undefined) return;
      node.dataset.shown = "";
      timers.push(
        window.setTimeout(() => {
          node.dataset.settled = "";
        }, 1000)
      );
    };

    let observer: IntersectionObserver | undefined;
    if (typeof IntersectionObserver === "function") {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, index) => {
            if (!entry.isIntersecting) return;
            const target = entry.target as HTMLElement;
            observer?.unobserve(target);
            timers.push(
              window.setTimeout(() => show(target), Math.min(index * 60, 240))
            );
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.04 }
      );
      for (const node of nodes) observer.observe(node);
    }

    // Rede de seguranca: nada permanece invisivel se o observer nao disparar.
    timers.push(window.setTimeout(() => nodes.forEach(show), 2600));

    const onPointerMove = (event: PointerEvent) => {
      const target = event.target as Element | null;
      const row = target?.closest?.('[data-row="project"]');
      const peek = row?.querySelector<HTMLElement>(".fv-peek");
      if (!peek) return;

      const x = Math.min(
        event.clientX + 26,
        window.innerWidth - PEEK_WIDTH - PEEK_PADDING
      );
      const y = Math.min(
        Math.max(event.clientY - PEEK_HEIGHT / 2, PEEK_PADDING),
        window.innerHeight - PEEK_HEIGHT - PEEK_PADDING
      );
      const tilt = (event.clientX / Math.max(window.innerWidth, 1) - 0.5) * 5;

      const isFirstMove = !peek.dataset.ready;
      if (isFirstMove) peek.style.transition = "none";
      peek.style.transform = `translate(${Math.round(x)}px,${Math.round(
        y
      )}px) rotate(${tilt.toFixed(2)}deg)`;
      if (isFirstMove) {
        void peek.offsetWidth; // fixa a posicao de entrada antes de existir transicao
        peek.style.transition = "";
        peek.dataset.ready = "1";
      }
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      observer?.disconnect();
      document.removeEventListener("pointermove", onPointerMove);
      for (const timer of timers) clearTimeout(timer);
    };
  }, []);

  return null;
}
