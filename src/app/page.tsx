import { About } from "@/components/portfolio/about";
import { Career } from "@/components/portfolio/career";
import { Hero } from "@/components/portfolio/hero";
import { LangRoot } from "@/components/portfolio/lang";
import { Motion } from "@/components/portfolio/motion";
import { SiteFooter } from "@/components/portfolio/site-footer";
import { SiteHeader } from "@/components/portfolio/site-header";
import { Work } from "@/components/portfolio/work";

export default function Home() {
  return (
    <LangRoot
      className="min-h-screen overflow-x-clip bg-[#191919] px-[clamp(18px,3.4vw,44px)]"
      page="home"
    >
      <SiteHeader />
      <Hero />
      <Work />
      <About />
      <Career />
      <SiteFooter />
      <Motion />
    </LangRoot>
  );
}
