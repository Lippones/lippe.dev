import Image from "next/image";
import Link from "next/link";

import { PROJECTS } from "./data";
import { T } from "./t";

const label = "text-xs tracking-[0.06em] uppercase text-[#6B6B6B]";
const placeholder =
  "ph-texture grid place-items-center rounded-[6px] text-[11px] tracking-[0.1em] uppercase text-[#6B6B6B]";

export function Work() {
  return (
    <section id="work" className="pb-[clamp(60px,10vh,120px)]">
      <div
        data-reveal=""
        className="flex items-baseline justify-between gap-5 border-b border-[#262626] pb-4"
      >
        <h2 className="m-0 text-xs font-medium tracking-[0.06em] uppercase text-[#9A9A9A]">
          <T pt="Trabalho selecionado" en="Selected work" />
        </h2>
        <span className="text-xs tracking-[0.06em] uppercase text-[#565656]">
          01 / 04
        </span>
      </div>

      <div data-reveal="" className="pt-[clamp(34px,5vw,64px)]">
        <div
          data-grid=""
          className="grid grid-cols-12 items-end gap-x-[clamp(16px,2vw,32px)] gap-y-5"
        >
          <h3
            data-span=""
            className="col-start-1 col-end-9 m-0 text-[clamp(34px,5.6vw,96px)] leading-[0.92] font-medium tracking-[-0.045em]"
          >
            <Link
              href="/case/inbazz-creator"
              className="transition-colors duration-300 hover:text-[#8C8C8C]"
            >
              Inbazz Creator
            </Link>
          </h3>
          <div
            data-span=""
            className="col-start-10 col-end-13 pb-[10px] text-[13px] leading-[1.55] text-[#9A9A9A]"
          >
            <T
              pt={
                <>
                  React Native, Expo, TypeScript
                  <br />
                  2026 — presente
                </>
              }
              en={
                <>
                  React Native, Expo, TypeScript
                  <br />
                  2026 — present
                </>
              }
            />
          </div>
        </div>

        <div
          data-grid=""
          className="mt-[clamp(26px,3.4vw,44px)] grid grid-cols-12 gap-[clamp(14px,1.6vw,22px)]"
        >
          <div
            data-span=""
            className={`${placeholder} col-start-1 col-end-8 aspect-[16/11]`}
          >
            <span className="px-5 text-center">imagem · app em uso</span>
          </div>
          {/* 1fr (e nao minmax(0,1fr)): o minimo automatico deixa os cartoes
              seguirem a altura da linha, como no design. */}
          <div
            data-span=""
            className="col-start-8 col-end-13 grid grid-cols-[1fr_1fr] gap-[clamp(14px,1.6vw,22px)]"
          >
            <div className={`${placeholder} aspect-[9/16]`}>
              <span className="px-3 text-center">tela · campanhas</span>
            </div>
            <div className={`${placeholder} aspect-[9/16]`}>
              <span className="px-3 text-center">tela · ganhos</span>
            </div>
          </div>
        </div>

        <Link
          href="/case/inbazz-creator"
          data-reveal=""
          className="mt-[clamp(30px,4vw,52px)] inline-flex items-baseline gap-[10px] border-b border-[#3B3B3B] pb-[3px] text-[15px] text-[#EDEDED] [transition:gap_.35s_cubic-bezier(.16,.84,.24,1),border-color_.3s] hover:gap-4 hover:border-[#F5F5F5]"
        >
          <T pt="Ler o caso de estudo" en="Read the case study" />
          <span className="fv-glyph">→</span>
        </Link>

        <div
          data-grid=""
          className="mt-[clamp(36px,5vw,72px)] grid grid-cols-12 gap-x-[clamp(16px,2vw,32px)] gap-y-7"
        >
          <div data-span="" className="col-start-1 col-end-5">
            <div className={label}>
              <T pt="O teto" en="The ceiling" />
            </div>
            <p className="mt-3 mb-0 text-[15px] leading-[1.7] text-[#A3A3A3] text-pretty">
              <T
                pt="A primeira versão nasceu em FlutterFlow para validar rápido, e funcionou. Só que cada ajuste de UX, cada integração nova e cada bug em produção passou a custar caro demais."
                en="The first version was built in FlutterFlow to validate fast, and it worked. But every UX tweak, every new integration and every production bug started costing far too much."
              />
            </p>
          </div>
          <div data-span="" className="col-start-5 col-end-9">
            <div className={label}>
              <T pt="A migração" en="The migration" />
            </div>
            <p className="mt-3 mb-0 text-[15px] leading-[1.7] text-[#A3A3A3] text-pretty">
              <T
                pt="Refiz o app do zero em React Native, com Expo e TypeScript, em 14 semanas: navegação nova, design system interno, React Query na API e releases OTA. O app antigo seguiu no ar até o novo assumir."
                en="I rebuilt the app from scratch in React Native, with Expo and TypeScript, in 14 weeks: new navigation, an internal design system, React Query for the API and OTA releases. The old app stayed live until the new one took over."
              />
            </p>
          </div>
          <div data-span="" className="col-start-9 col-end-13">
            <div className={label}>
              <T pt="Depois" en="After" />
            </div>
            <p className="mt-3 mb-0 text-[15px] leading-[1.7] text-[#A3A3A3] text-pretty">
              <T
                pt="Lançado aos poucos a partir de maio, hoje o app atende 33 mil creators ativos por mês. Correção sai por OTA no mesmo dia, e o app deixou de ser protótipo para virar produto."
                en="Rolled out gradually from May, the app now serves 33,000 monthly active creators. Fixes ship over the air the same day, and the app stopped being a prototype to become a product."
              />
            </p>
          </div>
        </div>
      </div>

      <div className="mt-[clamp(70px,11vh,140px)] border-t border-[#262626]">
        {PROJECTS.map((project) => {
          const Row = project.external ? "a" : Link;
          return (
            <Row
              key={project.num}
              href={project.href}
              {...(project.external
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
              data-row="project"
              data-reveal=""
              className="relative grid grid-cols-[56px_minmax(0,1.2fr)_minmax(0,1.1fr)_auto] items-baseline gap-[clamp(14px,2vw,36px)] border-b border-[#242424] px-[clamp(12px,1.4vw,20px)] py-[clamp(22px,2.8vw,38px)]"
            >
            <span className="fv-fill" />
            <span className="fv-c fv-num text-xs tracking-[0.06em] text-[#565656]">
              {project.num}
            </span>
            <span className="fv-c fv-name display text-[clamp(24px,2.8vw,40px)] leading-[1.02] font-medium tracking-[-0.035em]">
              {project.name}
            </span>
            <span className="fv-c fv-blurb text-sm leading-[1.6] text-[#9A9A9A]">
              <T pt={project.blurb.pt} en={project.blurb.en} />
            </span>
            <span
              data-nowrap=""
              className="fv-c flex items-baseline gap-[10px] text-xs tracking-[0.05em] whitespace-nowrap uppercase text-[#6B6B6B]"
            >
              <span>{project.stack}</span>
              <span className="fv-arrow fv-glyph text-[#EDEDED]">↗</span>
            </span>
            <span className="fv-peek">
              {project.peekMedia ? (
                <>
                  <video
                    src={project.peekMedia.video}
                    poster={project.peekMedia.poster}
                    muted
                    loop
                    autoPlay
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                    className="absolute inset-0 size-full rounded-[3px] object-cover motion-reduce:hidden"
                  />
                  <Image
                    src={project.peekMedia.poster}
                    alt=""
                    fill
                    sizes="210px"
                    className="hidden rounded-[3px] object-cover motion-reduce:block"
                  />
                </>
              ) : (
                <span className="text-[10px] tracking-[0.14em] uppercase text-[#6B6B6B]">
                  <T pt={project.peek.pt} en={project.peek.en} />
                </span>
              )}
            </span>
            </Row>
          );
        })}
      </div>
    </section>
  );
}
