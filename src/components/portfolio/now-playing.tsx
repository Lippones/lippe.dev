"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { SNAPSHOT_AGE_HEADER } from "@/lib/now-playing-headers";
import type { NowPlaying as Snapshot } from "@/lib/spotify";

import { T } from "./t";

/** Tocando: a faixa anda, então vale confirmar de perto. */
const POLL_PLAYING_MS = 10_000;
/** Pausado ou parado: nada se move, não há o que confirmar. */
const POLL_IDLE_MS = 30_000;
/** Piso entre dois fetches, para foco repetido não virar rajada. */
const MIN_FETCH_GAP_MS = 3_000;
/** Teto para a idade informada, caso um header venha absurdo. */
const MAX_RESPONSE_AGE_MS = 2 * 60_000;

/** `capturedAt` é o instante, no relógio do cliente, em que o player foi lido. */
type Live = { snapshot: Snapshot; capturedAt: number };

/** Quanto tempo a resposta levou para chegar: na função e depois na CDN. */
function responseAge(response: Response) {
  const inFunction = Number(response.headers.get(SNAPSHOT_AGE_HEADER));
  const inCache = Number(response.headers.get("age")) * 1000;
  const total =
    (Number.isFinite(inFunction) ? inFunction : 0) +
    (Number.isFinite(inCache) ? inCache : 0);
  return Math.min(Math.max(total, 0), MAX_RESPONSE_AGE_MS);
}

function formatTime(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function formatSince(playedAt: string | null) {
  if (!playedAt) return null;
  const minutes = Math.round((Date.now() - Date.parse(playedAt)) / 60_000);
  if (!Number.isFinite(minutes) || minutes < 1) return "agora";
  if (minutes < 60) return `há ${minutes} min`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `há ${hours} h`;
  return `há ${Math.round(hours / 24)} d`;
}

/**
 * Busca o snapshot e reagenda sozinha. Guarda a hora da leitura com o relógio
 * do próprio cliente, a chegada menos a idade que a resposta declara: assim o
 * progresso local não depende de o relógio da máquina estar certo nem do fuso.
 */
function useNowPlaying() {
  const [live, setLive] = useState<Live | null>(null);
  const [settled, setSettled] = useState(false);
  // Se já houve faixa alguma vez, uma queda depois disso vira estado offline.
  // Sem isso, um site sem credenciais mostraria "sem dados" para sempre.
  const [hadTrack, setHadTrack] = useState(false);

  const stateRef = useRef<Snapshot["state"]>("unavailable");
  const lastFetchRef = useRef(0);
  const inFlightRef = useRef(false);

  const load = useCallback(async (force = false) => {
    if (inFlightRef.current) return;
    if (!force && Date.now() - lastFetchRef.current < MIN_FETCH_GAP_MS) return;

    inFlightRef.current = true;
    lastFetchRef.current = Date.now();
    try {
      const response = await fetch("/api/now-playing");
      if (!response.ok) return;
      const snapshot = (await response.json()) as Snapshot;
      stateRef.current = snapshot.state;
      setLive({ snapshot, capturedAt: Date.now() - responseAge(response) });
      if (snapshot.state !== "unavailable") setHadTrack(true);
    } catch {
      // Silencioso de propósito: o bloco mantém o último snapshot em tela.
    } finally {
      inFlightRef.current = false;
      setSettled(true);
    }
  }, []);

  useEffect(() => {
    let stopped = false;
    let timer: number | null = null;

    const clear = () => {
      if (timer !== null) window.clearTimeout(timer);
      timer = null;
    };

    const schedule = () => {
      clear();
      // Aba escondida não agenda nada: sem timer, sem fetch.
      if (stopped || document.hidden) return;
      const delay =
        stateRef.current === "playing" ? POLL_PLAYING_MS : POLL_IDLE_MS;
      timer = window.setTimeout(cycle, delay);
    };

    const cycle = async () => {
      await load();
      schedule();
    };

    const onWake = () => {
      if (document.hidden) {
        clear();
        return;
      }
      void cycle();
    };

    // Fora do corpo do efeito: a primeira busca é trabalho assíncrono, não
    // sincronização de estado na montagem.
    timer = window.setTimeout(cycle, 0);
    document.addEventListener("visibilitychange", onWake);
    window.addEventListener("focus", onWake);

    return () => {
      stopped = true;
      clear();
      document.removeEventListener("visibilitychange", onWake);
      window.removeEventListener("focus", onWake);
    };
  }, [load]);

  return { live, settled, hadTrack, refresh: load };
}

/**
 * Cria os alvos da barra e dos tempos e os pinta escrevendo direto no DOM. Um
 * `setState` por quadro re-renderizaria a árvore 60 vezes por segundo para
 * mover 1px de barra.
 */
function useProgressPainter(live: Live | null, onEnded?: () => void) {
  const fill = useRef<HTMLSpanElement>(null);
  const elapsed = useRef<HTMLSpanElement>(null);
  const remaining = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!live) return;
    const { snapshot, capturedAt } = live;
    const { durationMs, progressMs, state } = snapshot;

    const bar = fill.current;
    const left = elapsed.current;
    const right = remaining.current;
    let lastSecond = -1;

    const paint = (progress: number) => {
      const ratio = durationMs > 0 ? Math.min(progress / durationMs, 1) : 0;
      if (bar) bar.style.width = `${(ratio * 100).toFixed(3)}%`;

      const second = Math.floor(progress / 1000);
      if (second === lastSecond) return;
      lastSecond = second;
      if (left) left.textContent = formatTime(progress);
      if (right) right.textContent = `−${formatTime(durationMs - progress)}`;
    };

    if (state !== "playing") {
      paint(progressMs);
      return;
    }

    // Chegou já passada do fim (resposta velha da CDN): não força outra busca,
    // senão cada resposta velha puxaria a próxima. O poll normal resolve.
    let ended = progressMs + (Date.now() - capturedAt) >= durationMs;
    const step = () => {
      const progress = progressMs + (Date.now() - capturedAt);
      if (progress >= durationMs) {
        paint(durationMs);
        if (!ended) {
          ended = true;
          // A faixa provavelmente virou: confirma na hora em vez de esperar o
          // próximo ciclo.
          onEnded?.();
        }
        return false;
      }
      paint(progress);
      return true;
    };

    // Com movimento reduzido a barra ainda anda, porque é informação, mas em
    // passos de um segundo em vez de a cada quadro.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      step();
      const id = window.setInterval(() => {
        if (!step()) window.clearInterval(id);
      }, 1000);
      return () => window.clearInterval(id);
    }

    let raf = requestAnimationFrame(function tick() {
      if (step()) raf = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(raf);
  }, [live, onEnded]);

  return { fill, elapsed, remaining };
}

const LABEL = "text-xs tracking-[0.06em] uppercase text-[#6B6B6B]";
const TIMES =
  "mt-[5px] flex justify-between text-[11px] tracking-[0.04em] tabular-nums text-[#565656]";

function Equalizer({ still }: { still: boolean }) {
  return (
    <span className="np-eq" data-still={still} aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

function ArtworkOffline() {
  return (
    <span className="grid size-10 shrink-0 place-items-center rounded-[3px] border border-dashed border-[#2C2C2C]">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="#4B4B4B"
        strokeWidth="1.2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="M2 6.2 C4.4 4.2 11.6 4.2 14 6.2" />
        <path d="M4.4 9 C6 7.7 10 7.7 11.6 9" />
        <path d="M2.5 2.5 L13.5 13.5" />
      </svg>
    </span>
  );
}

/** Espaço reservado, para o bloco não empurrar a linha quando os dados chegam. */
function Skeleton() {
  return (
    <div className="w-[234px]" aria-hidden="true">
      <div className={LABEL}>
        <T pt="Ouvindo" en="Listening" />
      </div>
      <div className="mt-2 flex items-center gap-3 opacity-40">
        <span className="ph-texture size-10 shrink-0 rounded-[3px]" />
        <span className="block h-[14px] w-[120px] rounded-[2px] bg-[#242424]" />
      </div>
      <div className="mt-2.5 h-px bg-[#262626]" />
      <div className={TIMES}>
        <span>—</span>
        <span>—</span>
      </div>
    </div>
  );
}

export function NowPlaying() {
  const { live, settled, hadTrack, refresh } = useNowPlaying();
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const onEnded = useCallback(() => void refresh(true), [refresh]);
  const { fill, elapsed, remaining } = useProgressPainter(live, onEnded);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Escape é tratado pelo navegador, não por nós, e os eventos do <dialog> não
  // borbulham — então são ligados na mão. `cancel` é cancelável: barrando o
  // fechamento nativo, o React continua sendo a única fonte da verdade e o
  // estado nunca fica preso em aberto. `close` fica como rede de segurança para
  // qualquer caminho que feche o diálogo por fora.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (event: Event) => {
      event.preventDefault();
      setOpen(false);
    };
    const handleClose = () => setOpen(false);

    dialog.addEventListener("cancel", handleCancel);
    dialog.addEventListener("close", handleClose);
    return () => {
      dialog.removeEventListener("cancel", handleCancel);
      dialog.removeEventListener("close", handleClose);
    };
  }, []);

  const snapshot = live?.snapshot;
  const hasTrack = Boolean(snapshot && snapshot.state !== "unavailable");
  const ready = settled && (hasTrack || hadTrack);

  const playing = snapshot?.state === "playing";
  const paused = snapshot?.state === "paused";
  const recent = snapshot?.state === "recent";
  const offline = !hasTrack;

  const label = recent ? (
    <T pt="Última ouvida" en="Last played" />
  ) : paused ? (
    <T pt="Pausado" en="Paused" />
  ) : (
    <T pt="Ouvindo" en="Listening" />
  );

  const since = recent ? formatSince(snapshot?.playedAt ?? null) : null;

  return (
    <>
      {!settled ? <Skeleton /> : null}
      {ready ? (
      <button
        type="button"
        onClick={() => setOpen(true)}
        disabled={offline}
        className="np-trigger -mx-2.5 block w-[calc(100%+20px)] rounded-md border border-[#242424] bg-[#1D1D1D] p-2.5 text-left disabled:cursor-default wide:mx-0 wide:w-[234px] wide:rounded-none wide:border-0 wide:bg-transparent wide:p-0"
      >
        <span className={`flex items-center gap-2 ${LABEL}`}>
          {label}
          {playing || paused ? <Equalizer still={paused} /> : null}
        </span>

        <span
          className="mt-2 flex items-center gap-3"
          style={{ opacity: recent ? 0.55 : paused ? 0.68 : 1 }}
        >
          {offline ? (
            <ArtworkOffline />
          ) : snapshot?.artwork.small ? (
            <Image
              src={snapshot.artwork.small.url}
              alt=""
              width={40}
              height={40}
              sizes="40px"
              className="np-art size-11 shrink-0 rounded-[3px] border border-[#2C2C2C] object-cover wide:size-10"
            />
          ) : (
            <span className="ph-texture np-art size-11 shrink-0 rounded-[3px] wide:size-10" />
          )}
          <span className="min-w-0 flex-1">
            <span
              className={`np-title block truncate text-sm leading-[1.35] transition-colors duration-300 ${
                offline || recent ? "text-[#A3A3A3]" : "text-[#D6D6D6]"
              }`}
            >
              {offline ? (
                <T pt="Sem dados agora" en="No data right now" />
              ) : (
                snapshot?.title
              )}
            </span>
            <span className="mt-0.5 block truncate text-[13px] leading-[1.35] text-[#6B6B6B]">
              {offline ? (
                <T pt="tentando de novo" en="retrying" />
              ) : since ? (
                `${snapshot?.artists} · ${since}`
              ) : (
                snapshot?.artists
              )}
            </span>
          </span>
          {offline ? null : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="#565656"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="ml-auto shrink-0 wide:hidden"
            >
              <path d="M6 3 L11 8 L6 13" />
            </svg>
          )}
        </span>

        <span className="mt-2.5 block h-px bg-[#262626]">
          <span
            ref={fill}
            className="block h-px w-0"
            style={{
              background: playing
                ? "#F5F5F5"
                : paused
                  ? "#6B6B6B"
                  : "transparent",
            }}
          />
        </span>
        <span className={`${TIMES} hidden wide:flex`}>
          <span ref={elapsed}>{recent || offline ? "—" : "0:00"}</span>
          <span ref={remaining}>
            {offline ? "—" : formatTime(snapshot?.durationMs ?? 0)}
          </span>
        </span>
      </button>
      ) : null}

      <dialog
        ref={dialogRef}
        onClick={(event) => {
          // Clique no backdrop fecha; o painel para a propagação.
          if (event.target === dialogRef.current) setOpen(false);
        }}
        className="np-dialog"
        aria-label="Tocando agora"
      >
        {open && snapshot ? (
          <NowPlayingPanel
            live={live}
            snapshot={snapshot}
            onClose={() => setOpen(false)}
          />
        ) : null}
      </dialog>
    </>
  );
}

function NowPlayingPanel({
  live,
  snapshot,
  onClose,
}: {
  live: Live | null;
  snapshot: Snapshot;
  onClose: () => void;
}) {
  const { fill, elapsed, remaining } = useProgressPainter(live);

  const playing = snapshot.state === "playing";
  const recent = snapshot.state === "recent";
  const since = formatSince(snapshot.playedAt);

  return (
    <div
      onClick={(event) => event.stopPropagation()}
      className="w-full rounded-t-[14px] border-t border-[#262626] bg-[#1D1D1D] px-6 pt-3 pb-6 wide:w-[min(860px,calc(100vw-40px))] wide:rounded-lg wide:border wide:p-10"
    >
      <div
        aria-hidden="true"
        className="mx-auto mb-5 h-[3px] w-9 rounded-sm bg-[#3B3B3B] wide:hidden"
      />
      <div className="grid gap-6 wide:grid-cols-[300px_minmax(0,1fr)] wide:gap-10">
        <div className="relative">
          {/* O brilho é a própria capa desfocada: a cor vem da arte, sem
              precisar extrair paleta no servidor. */}
          {snapshot.artwork.small ? (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-7 scale-90 opacity-30 blur-3xl"
              style={{
                backgroundImage: `url(${snapshot.artwork.small.url})`,
                backgroundSize: "cover",
              }}
            />
          ) : null}
          {snapshot.artwork.large ? (
            <Image
              src={snapshot.artwork.large.url}
              alt={snapshot.album ? `Capa de ${snapshot.album}` : "Capa do álbum"}
              width={300}
              height={300}
              sizes="(max-width: 900px) calc(100vw - 48px), 300px"
              className="relative w-full rounded border border-[#2C2C2C] wide:w-[300px]"
            />
          ) : (
            <div className="ph-texture relative grid aspect-square w-full place-items-center rounded border border-[#2C2C2C] wide:size-[300px]">
              <span className="text-[11px] tracking-[0.12em] uppercase text-[#6B6B6B]">
                <T pt="capa indisponível" en="artwork unavailable" />
              </span>
            </div>
          )}
        </div>

        <div className="min-w-0">
          <div className="flex items-start justify-between gap-5">
            <span className="flex items-center gap-2.5 text-[11px] tracking-[0.1em] uppercase text-[#6B6B6B]">
              {playing ? <Equalizer still={false} /> : null}
              {recent ? (
                <T pt="Última ouvida" en="Last played" />
              ) : playing ? (
                <T pt="Tocando agora" en="Playing now" />
              ) : (
                <T pt="Pausado" en="Paused" />
              )}
              {since ? <span className="text-[#4B4B4B]">· {since}</span> : null}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar"
              className="-mt-3 -mr-3 grid size-11 cursor-pointer place-items-center text-[#6B6B6B] transition-colors duration-[250ms] hover:text-[#F5F5F5]"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M2 2 L12 12 M12 2 L2 12" />
              </svg>
            </button>
          </div>

          <h2 className="display mt-5 mb-0 text-[clamp(26px,4vw,42px)] leading-[1.06] font-medium tracking-[-0.034em] text-balance">
            {snapshot.title}
          </h2>
          <p className="mt-3 mb-0 text-[17px] text-[#A3A3A3]">
            {snapshot.artists}
          </p>
          {snapshot.album ? (
            <p className="mt-1.5 mb-0 text-[13px] text-[#6B6B6B]">
              {snapshot.album}
            </p>
          ) : null}

          <div className="mt-8">
            <div className="h-0.5 bg-[#262626]">
              <span
                ref={fill}
                className="block h-0.5 w-0"
                style={{ background: recent ? "transparent" : "#F5F5F5" }}
              />
            </div>
            <div className="mt-2.5 flex justify-between text-xs tracking-[0.04em] tabular-nums text-[#565656]">
              <span ref={elapsed}>{recent ? "—" : "0:00"}</span>
              <span ref={remaining}>{formatTime(snapshot.durationMs)}</span>
            </div>
          </div>

          {snapshot.url ? (
            <div className="mt-7 border-t border-[#262626] pt-5">
              <a
                href={snapshot.url}
                target="_blank"
                rel="noreferrer"
                className="flex h-12 items-center justify-center gap-2 rounded-md border border-[#3B3B3B] text-[15px] text-[#EDEDED] wide:inline-flex wide:h-auto wide:rounded-none wide:border-0 wide:border-b wide:pb-[3px] wide:[transition:gap_.35s_cubic-bezier(.16,.84,.24,1),border-color_.3s] wide:hover:gap-3.5 wide:hover:border-[#F5F5F5]"
              >
                <T pt="Abrir no Spotify" en="Open in Spotify" />
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 9 L9 4 M5 4 H9 V8" />
                </svg>
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
