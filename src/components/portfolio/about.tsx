import type { ReactNode } from "react";

import { T } from "./t";

const STATS: { key: ReactNode; value: ReactNode }[] = [
  { key: <T pt="Experiência" en="Experience" />, value: <T pt="4 anos" en="4 years" /> },
  { key: <T pt="Principal" en="Primary" />, value: "React Native · Expo" },
  { key: <T pt="Também" en="Also" />, value: "TypeScript · NestJS · Next.js" },
  { key: <T pt="Infra" en="Infra" />, value: "Postgres · Docker · CI/CD" },
  {
    key: <T pt="Formação" en="Education" />,
    value: <T pt="Sistemas de Informação · Univale" en="Information Systems · Univale" />,
  },
  {
    key: <T pt="Idiomas" en="Languages" />,
    value: <T pt="Português · Inglês" en="Portuguese · English" />,
  },
];

export function About() {
  return (
    <section
      id="about"
      data-grid=""
      className="grid grid-cols-12 gap-x-[clamp(16px,2vw,32px)] gap-y-10 pt-[clamp(70px,12vh,150px)] pb-[clamp(50px,8vh,90px)]"
    >
      <div data-span="" data-reveal="" className="col-start-1 col-end-8">
        <div className="text-xs tracking-[0.06em] uppercase text-[#9A9A9A]">
          <T pt="Sobre" en="About" />
        </div>
        <p className="display mt-[22px] mb-0 text-[clamp(22px,2.6vw,40px)] leading-[1.22] font-normal tracking-[-0.032em] text-[#F5F5F5] text-pretty">
          <T
            pt="Não acredito em app bonito que trava. Interface é o que a pessoa vê; o resto é o que faz ela voltar amanhã."
            en="I don't believe in a beautiful app that stutters. Interface is what people see; the rest is what makes them come back tomorrow."
          />
        </p>
        <p className="mt-[26px] mb-0 max-w-[58ch] text-[15px] leading-[1.75] text-[#A3A3A3] text-pretty">
          <T
            pt="Comecei em frontend, atravessei backend e parei no mobile porque é onde as duas coisas se encontram sem lugar para esconder erro. Trabalho melhor quando sou dono de algo do começo ao fim: decido a arquitetura, entrego a tela, subo o release e olho o que aconteceu depois."
            en="I started in frontend, went through backend and stopped at mobile because that's where both meet with nowhere to hide a mistake. I work best when I own something end to end: I decide the architecture, ship the screen, cut the release and watch what happens next."
          />
        </p>
        <div className="mt-[34px] border-t border-[#262626] pt-[22px]">
          <div className="text-xs tracking-[0.06em] uppercase text-[#6B6B6B]">
            <T pt="Ultimamente" en="Lately" />
          </div>
          <ul className="m-0 mt-[14px] grid list-none gap-2 p-0 text-sm leading-[1.5] text-[#A3A3A3]">
            <li>
              <T
                pt="Cavando Reanimated e gesture handler até a animação ficar invisível de boa."
                en="Digging into Reanimated and gesture handler until the animation goes invisibly good."
              />
            </li>
            <li>
              <T
                pt="Lendo código de app alheio no lugar de tutorial."
                en="Reading other people's app code instead of tutorials."
              />
            </li>
            <li>
              <T
                pt="Tentando escrever menos e apagar mais."
                en="Trying to write less and delete more."
              />
            </li>
          </ul>
        </div>
      </div>

      <div
        data-span=""
        data-reveal=""
        className="col-start-9 col-end-13 grid content-start gap-0"
      >
        {STATS.map((stat, index) => (
          <div
            key={index}
            data-row=""
            className="grid grid-cols-[1fr_auto] gap-4 border-b border-[#262626] py-[14px] text-sm"
          >
            <span className="text-[#8C8C8C]">{stat.key}</span>
            <span className="text-[#EDEDED]">{stat.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
