import { EMAIL } from "./data";
import { LangToggle } from "./lang-toggle";
import { T } from "./t";

const navLink = "transition-colors duration-[250ms] hover:text-[#F5F5F5]";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 flex items-baseline justify-between gap-6 bg-[linear-gradient(#191919F2_62%,#19191900)] pt-[22px] pb-[18px] backdrop-blur-[8px]">
      <a href="#top" className="display text-[15px] font-medium tracking-[-0.02em]">
        Filipe Vieira
      </a>
      <nav className="flex items-baseline gap-[clamp(16px,2.4vw,34px)] text-[13px] text-[#9A9A9A]">
        <a href="#work" className={navLink}>
          <T pt="Trabalho" en="Work" />
        </a>
        <a href="#about" className={navLink}>
          <T pt="Sobre" en="About" />
        </a>
        <a href={`mailto:${EMAIL}`} className={navLink}>
          <T pt="Contato" en="Contact" />
        </a>
        <LangToggle />
      </nav>
    </header>
  );
}
