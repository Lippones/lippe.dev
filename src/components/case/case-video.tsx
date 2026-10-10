"use client";

import { useEffect, useRef, useState } from "react";

import { T } from "@/components/portfolio/t";

/**
 * Vídeo mudo em loop, com a mesma moldura do `Shot`. Toca só enquanto está na
 * tela e não começa sozinho com `prefers-reduced-motion`: aí fica o poster, e
 * o botão continua permitindo tocar. Pausa feita pela pessoa não é desfeita
 * pelo scroll.
 */
export function CaseVideo({
  src,
  poster,
  label,
  width,
  height,
  border = "border-[#2C2C2C]",
  controls = true,
}: {
  src: string;
  poster: string;
  /** Descrição do vídeo para leitor de tela. */
  label: string;
  width: number;
  height: number;
  border?: string;
  /** Vídeos curtos e decorativos podem dispensar o botão. */
  controls?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) userPaused.current = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !userPaused.current) {
          video.play().catch(() => {});
        } else if (!entry.isIntersecting) {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  function toggle() {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => {});
    } else {
      userPaused.current = true;
      video.pause();
    }
  }

  return (
    <div
      className={`relative overflow-hidden rounded-lg border ${border} bg-[#101010]`}
    >
      <video
        ref={ref}
        src={src}
        poster={poster}
        width={width}
        height={height}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="block h-auto w-full"
      />
      {controls ? (
        <button
          type="button"
          onClick={toggle}
          className="absolute right-2 bottom-2 rounded-full border border-[#3B3B3B] bg-[#101010]/80 px-2.5 py-1 text-[10px] min-[901px]:right-3 min-[901px]:bottom-3 min-[901px]:px-3 min-[901px]:py-1.5 min-[901px]:text-[11px] tracking-[0.06em] uppercase text-[#D6D6D6] backdrop-blur-sm transition-colors hover:text-[#F5F5F5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EDEDED]"
        >
          {playing ? (
            <T pt="Pausar" en="Pause" />
          ) : (
            <T pt="Reproduzir" en="Play" />
          )}
        </button>
      ) : null}
    </div>
  );
}
