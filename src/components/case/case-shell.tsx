import Link from "next/link";
import type { ReactNode } from "react";

import { EMAIL } from "@/components/portfolio/data";
import { LangRoot } from "@/components/portfolio/lang";
import { LangToggle } from "@/components/portfolio/lang-toggle";
import { Motion } from "@/components/portfolio/motion";
import { T } from "@/components/portfolio/t";

import { ReadingProgress } from "./progress";

const bottomLink = "transition-colors duration-[250ms] hover:text-[#F5F5F5]";

export type CaseFooterLink = { label: string; href: string };

/**
 * Moldura comum das paginas de caso: barra de progresso, header fixo com volta
 * para a home, o conteudo e o rodape com o proximo caso. So o seletor de idioma
 * e os efeitos sao client-side; todo o conteudo continua no servidor.
 */
export function CaseShell({
  title,
  next,
  socials = [],
  children,
}: {
  title: string;
  next: { label: string; href: string };
  socials?: CaseFooterLink[];
  children: ReactNode;
}) {
  return (
    <LangRoot
      className="min-h-screen overflow-x-clip bg-[#191919] px-[clamp(18px,3.4vw,44px)]"
      page="case"
    >
      <ReadingProgress />

      <header className="sticky top-0 z-40 flex items-baseline justify-between gap-6 bg-[linear-gradient(#191919F2_62%,#19191900)] pt-[22px] pb-[18px] backdrop-blur-[8px]">
        <Link
          href="/"
          className="inline-flex items-baseline gap-[9px] text-[13px] text-[#9A9A9A] transition-colors duration-[250ms] hover:text-[#F5F5F5]"
        >
          <span className="fv-glyph">←</span>
          <span>Filipe Vieira</span>
        </Link>
        <div className="flex items-baseline gap-[clamp(16px,2.4vw,34px)] text-[13px] text-[#9A9A9A]">
          <span className="text-[#6B6B6B]">{title}</span>
          <LangToggle />
        </div>
      </header>

      {children}

      <footer className="mt-[clamp(70px,12vh,150px)] border-t border-[#262626] pt-[clamp(40px,6vh,70px)] pb-[34px]">
        <div
          data-reveal=""
          className="flex flex-wrap items-baseline justify-between gap-6"
        >
          <div>
            <div className="text-xs tracking-[0.06em] uppercase text-[#6B6B6B]">
              <T pt="Próximo" en="Next" />
            </div>
            <Link
              href={next.href}
              className="display mt-[14px] inline-block text-[clamp(30px,5.4vw,84px)] leading-[0.92] font-medium tracking-[-0.045em] transition-colors duration-300 hover:text-[#8C8C8C]"
            >
              {next.label} <span className="fv-glyph fv-glyph-flat">→</span>
            </Link>
          </div>
          <a
            href={`mailto:${EMAIL}`}
            className="border-b border-[#3B3B3B] pb-[3px] text-[15px] text-[#A3A3A3] [transition:color_.25s,border-color_.25s] hover:border-[#F5F5F5] hover:text-[#F5F5F5]"
          >
            {EMAIL}
          </a>
        </div>
        <div className="mt-[clamp(40px,6vh,80px)] flex flex-wrap items-baseline gap-x-[22px] gap-y-[10px] border-t border-[#242424] pt-5 text-xs tracking-[0.04em] uppercase text-[#6B6B6B]">
          <Link href="/" className={bottomLink}>
            <T pt="Voltar ao início" en="Back home" />
          </Link>
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className={bottomLink}
            >
              {social.label}
            </a>
          ))}
          <span className="ml-auto text-[#6B6B6B]">© 2026</span>
        </div>
      </footer>

      <Motion />
    </LangRoot>
  );
}
