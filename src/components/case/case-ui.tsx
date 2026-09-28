import Image from "next/image";
import type { ReactNode } from "react";

/** Rotulo numerado das secoes ("01 · O contexto"). */
export const sectionTitle =
  "m-0 text-xs font-medium tracking-[0.06em] uppercase text-[#9A9A9A]";

/** Rotulo pequeno acima de um valor. */
export const eyebrow =
  "text-[11px] tracking-[0.08em] uppercase text-[#6B6B6B]";

/** Paragrafo de destaque, em Inter Tight. */
export const lede =
  "display m-0 text-[clamp(20px,2.2vw,32px)] leading-[1.3] tracking-[-0.025em] text-[#F5F5F5] text-pretty";

/** Paragrafo corrido. */
export const body = "text-[15px] leading-[1.75] text-[#A3A3A3] text-pretty";

/** Secao com o titulo a esquerda e o conteudo a direita. */
export function SplitSection({
  title,
  children,
  contentEnd = 11,
}: {
  title: ReactNode;
  children: ReactNode;
  contentEnd?: 11 | 12 | 13;
}) {
  const endClass =
    contentEnd === 13
      ? "col-end-13"
      : contentEnd === 12
        ? "col-end-12"
        : "col-end-11";
  return (
    <section
      data-grid=""
      className="grid grid-cols-12 gap-x-[clamp(16px,2vw,32px)] gap-y-[30px] pt-[clamp(60px,10vh,130px)]"
    >
      <h2
        data-span=""
        data-reveal=""
        className={`col-start-1 col-end-4 ${sectionTitle}`}
      >
        {title}
      </h2>
      <div data-span="" data-reveal="" className={`col-start-4 ${endClass}`}>
        {children}
      </div>
    </section>
  );
}

/** Cabecalho de secao em linha, com regra inferior e nota opcional a direita. */
export function RuleHead({
  title,
  aside,
}: {
  title: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div
      data-reveal=""
      className="flex items-baseline justify-between gap-5 border-b border-[#262626] pb-4"
    >
      <h2 className={sectionTitle}>{title}</h2>
      {aside ? (
        <span className="text-xs text-[#6B6B6B]">{aside}</span>
      ) : null}
    </div>
  );
}

/** Item de metadado do topo (Papel, Período, Stack). */
export function Meta({
  label,
  children,
  wrap = false,
}: {
  label: ReactNode;
  children: ReactNode;
  wrap?: boolean;
}) {
  return (
    <div>
      <div className={eyebrow}>{label}</div>
      <div
        className={`mt-[5px] text-sm text-[#D6D6D6] ${wrap ? "leading-[1.5]" : ""}`}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * Lista numerada com a coluna estreita do indice. `mark` aceita tanto o numero
 * quanto a seta usada no Track Tidy.
 */
export function IndexList({
  items,
  padding = "py-[14px]",
  leading = "leading-[1.6]",
}: {
  items: { mark: ReactNode; text: ReactNode }[];
  padding?: string;
  /** O design usa 1.6 nas listas numeradas e 1.65 na lista final do Track Tidy. */
  leading?: string;
}) {
  return (
    <ul className="m-0 grid list-none gap-0 p-0">
      {items.map((item, index) => (
        <li
          key={index}
          data-row=""
          className={`grid grid-cols-[20px_minmax(0,1fr)] gap-[14px] border-t border-[#262626] ${padding} text-[15px] ${leading} text-[#A3A3A3] ${
            index === items.length - 1 ? "border-b" : ""
          }`}
        >
          <span className="text-[12px] text-[#6B6B6B]">{item.mark}</span>
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
  );
}

/** Painel hachurado usado onde a imagem ainda nao existe. */
export function Placeholder({
  label,
  className = "",
  pad = "px-5",
  tracking = "tracking-[0.1em]",
  hatch = "bg-[repeating-linear-gradient(135deg,#282828_0_7px,#202020_7px_14px)]",
}: {
  label: string;
  className?: string;
  pad?: string;
  tracking?: string;
  /** A abertura do caso usa faixas de 8px; as telas usam 7px. */
  hatch?: string;
}) {
  return (
    <div
      className={`grid place-items-center rounded-lg border border-[#2C2C2C] bg-[#202020] ${hatch} ${className}`}
    >
      <span
        className={`text-center text-[11px] ${tracking} uppercase text-[#6B6B6B] ${pad}`}
      >
        {label}
      </span>
    </div>
  );
}

/** Captura de tela emoldurada, como o design apresenta as imagens dos casos. */
export function Shot({
  src,
  alt,
  width,
  height,
  priority = false,
  border = "border-[#2C2C2C]",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  /** O design usa #262626 na Play Pare e #2C2C2C no Track Tidy. */
  border?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-lg border ${border} bg-[#101010]`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes="(max-width: 900px) 100vw, 1352px"
        className="block h-auto w-full"
      />
    </div>
  );
}
