import { EMAIL, SOCIALS } from "./data";
import { T } from "./t";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#262626] pt-[clamp(60px,9vh,110px)] pb-[34px]">
      <div data-reveal="">
        <p className="m-0 text-xs tracking-[0.06em] uppercase text-[#9A9A9A]">
          <T pt="Contato" en="Contact" />
        </p>
        <a
          href={`mailto:${EMAIL}`}
          className="display mt-[22px] block text-[clamp(34px,7.6vw,132px)] leading-[0.9] font-medium tracking-[-0.05em] text-[#F5F5F5] transition-colors duration-300 hover:text-[#8E8E96]"
        >
          <T pt="Vamos conversar" en="Let's talk" />
        </a>
        <a
          href={`mailto:${EMAIL}`}
          className="mt-[26px] inline-block border-b border-[#3B3B3B] pb-[3px] text-[15px] text-[#A3A3A3] [transition:color_.25s,border-color_.25s] hover:border-[#F5F5F5] hover:text-[#F5F5F5]"
        >
          {EMAIL}
        </a>
      </div>
      <div className="mt-[clamp(50px,8vh,96px)] flex flex-wrap items-baseline gap-x-[22px] gap-y-[10px] border-t border-[#242424] pt-5 text-xs tracking-[0.04em] uppercase text-[#6B6B6B]">
        {SOCIALS.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            className="transition-colors duration-[250ms] hover:text-[#F5F5F5]"
          >
            {social.label}
          </a>
        ))}
        <span className="ml-auto text-[#3B3B3B]">© 2026</span>
      </div>
    </footer>
  );
}
