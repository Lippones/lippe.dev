import type { Metadata } from "next";

import { CaseShell } from "@/components/case/case-shell";
import {
  IndexList,
  Meta,
  Placeholder,
  RuleHead,
  SplitSection,
  body,
  lede,
  sectionTitle,
} from "@/components/case/case-ui";
import { SOCIALS } from "@/components/portfolio/data";
import { T } from "@/components/portfolio/t";

const title = "Inbazz Creator — Filipe Vieira";
const description =
  "O app dos creators da Inbazz, refeito do zero em React Native em 14 semanas, por um dev só, com o app antigo no ar até o novo assumir.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/case/inbazz-creator" },
  openGraph: { type: "article", url: "/case/inbazz-creator", title, description },
};

const FLOWS = [
  {
    shot: "tela · publicações",
    span: "col-start-1 col-end-5",
    offset: "",
    heading: <T pt="Acompanhar o que publicou" en="Tracking what was posted" />,
    text: (
      <T
        pt="O creator vê as publicações que a Inbazz capturou nas redes e o status de cada uma. É a prova do trabalho feito, então precisa bater com o que ele postou."
        en="Creators see the posts Inbazz captured from their social accounts and the status of each one. It's the proof of the work, so it has to match what they actually posted."
      />
    ),
  },
  {
    shot: "tela · seeding",
    span: "col-start-5 col-end-9",
    offset: "pt-[clamp(0px,4vw,60px)]",
    heading: <T pt="Receber produto" en="Receiving product" />,
    text: (
      <T
        pt="No seeding a marca envia produto para o creator. O app mostra o que dá para pedir, acompanha cada pedido e deixa cancelar antes do envio."
        en="In seeding, the brand sends product to the creator. The app shows what can be requested, tracks each request and allows cancelling before it ships."
      />
    ),
  },
  {
    shot: "tela · carteira",
    span: "col-start-9 col-end-13",
    offset: "pt-[clamp(0px,8vw,120px)]",
    heading: <T pt="Ver e sacar o que ganhou" en="Seeing and withdrawing earnings" />,
    text: (
      <T
        pt="Saldo, movimentações, saque e envio de nota fiscal no mesmo lugar. Foi a tela mais difícil do projeto inteiro."
        en="Balance, movements, withdrawals and invoice upload in one place. It was the hardest screen in the whole project."
      />
    ),
  },
];

const DETAILS = [
  {
    heading: <T pt="O antigo no ar" en="The old app stayed live" />,
    text: (
      <T
        pt="O app em FlutterFlow seguiu atendendo os creators enquanto o novo era construído. A troca foi gradual, a partir de maio."
        en="The FlutterFlow app kept serving creators while the new one was built. The switch was gradual, starting in May."
      />
    ),
  },
  {
    heading: <T pt="OTA com homologação" en="OTA with staging" />,
    text: (
      <T
        pt="Três canais: desenvolvimento, homologação e produção. Correção sai por OTA no mesmo dia, sem esperar revisão de loja."
        en="Three channels: development, staging and production. Fixes ship over the air the same day, without waiting on store review."
      />
    ),
  },
  {
    heading: <T pt="Teste de verdade" en="Real tests" />,
    text: (
      <T
        pt="Mais de 150 arquivos de teste. Regra de negócio que muda quebra no teste, não no celular do creator."
        en="More than 150 test files. A business rule that changes breaks in a test, not on a creator's phone."
      />
    ),
  },
  {
    heading: <T pt="Erro com nome" en="Errors with a name" />,
    text: (
      <T
        pt="Datadog no app: erro e lentidão aparecem num painel antes de virarem reclamação no suporte."
        en="Datadog in the app: errors and slowness show up on a dashboard before they turn into support tickets."
      />
    ),
  },
];

const OUTCOMES = [
  {
    figure: "14",
    text: (
      <T
        pt="semanas do primeiro commit ao lançamento"
        en="weeks from first commit to launch"
      />
    ),
  },
  {
    figure: "33 mil",
    figureEn: "33k",
    text: (
      <T pt="creators ativos por mês" en="monthly active creators" />
    ),
  },
  {
    figure: "1",
    text: <T pt="dev mobile no projeto inteiro" en="mobile dev on the whole project" />,
  },
];

export default function InbazzCreatorCase() {
  return (
    <CaseShell
      title="Inbazz Creator"
      next={{ label: "Track Tidy", href: "/case/track-tidy" }}
      socials={[SOCIALS[0], SOCIALS[1]]}
    >
      <section
        data-grid=""
        className="grid grid-cols-12 gap-x-[clamp(16px,2vw,32px)] gap-y-[26px] pt-[clamp(48px,9vh,110px)] pb-[clamp(30px,5vh,56px)]"
      >
        <div data-span="" data-reveal="" className="col-start-1 col-end-9">
          <div className="text-xs tracking-[0.06em] uppercase text-[#6B6B6B]">
            <T pt="Caso de estudo · App mobile" en="Case study · Mobile app" />
          </div>
          <h1 className="mt-5 mb-0 text-[clamp(38px,6.6vw,116px)] leading-[0.9] font-medium tracking-[-0.05em]">
            Inbazz Creator
          </h1>
          <p className="display mt-[26px] mb-0 max-w-[30ch] text-[clamp(19px,2vw,30px)] leading-[1.28] tracking-[-0.025em] text-[#EDEDED] text-pretty">
            <T
              pt="O app dos creators, refeito do zero em React Native em 14 semanas, com o antigo no ar até o novo assumir."
              en="The creator app, rebuilt from scratch in React Native in 14 weeks, with the old one live until the new one took over."
            />
          </p>
        </div>
        <div
          data-span=""
          data-reveal=""
          className="col-start-10 col-end-13 grid content-end gap-[18px]"
        >
          <Meta label={<T pt="Papel" en="Role" />} wrap>
            <T
              pt="Único dev mobile, hoje tech lead"
              en="Sole mobile dev, now tech lead"
            />
          </Meta>
          <Meta label={<T pt="Período" en="Period" />}>
            <T pt="2026 — presente" en="2026 — present" />
          </Meta>
          <Meta label="Stack" wrap>
            React Native · Expo · TypeScript · React Query
          </Meta>
        </div>
      </section>

      <Placeholder
        label="imagem de abertura · app em uso"
        tracking="tracking-[0.12em]"
        hatch="bg-[repeating-linear-gradient(135deg,#282828_0_8px,#202020_8px_16px)]"
        className="aspect-[16/9]"
      />

      <SplitSection title={<T pt="01 · O contexto" en="01 · Context" />}>
        <p className={lede}>
          <T
            pt="A Inbazz conecta marcas a creators. O app é o lado do creator: onde ele acompanha o que publicou, recebe produto das marcas e vê o que ganhou."
            en="Inbazz connects brands to creators. The app is the creator's side: where they track what they posted, receive product from brands and see what they earned."
          />
        </p>
        <p className={`mt-[26px] mb-0 max-w-[62ch] ${body}`}>
          <T
            pt="A primeira versão nasceu em FlutterFlow, e essa foi a decisão certa na época: colocou o produto na mão de creators reais em semanas, sem time mobile. O problema apareceu depois, quando o app parou de ser experimento e virou canal principal de trabalho para essas pessoas."
            en="The first version was built in FlutterFlow, and that was the right call at the time: it put the product in real creators' hands in weeks, with no mobile team. The problem showed up later, when the app stopped being an experiment and became these people's main work channel."
          />
        </p>
        <div className="mt-[26px] max-w-[62ch]">
          <IndexList
            items={[
              {
                mark: "01",
                text: (
                  <T
                    pt="Ajuste fino de UX era caro: o que o designer pedia raramente cabia no que a ferramenta permitia."
                    en="UX polish was expensive: what the designer asked for rarely fit what the tool allowed."
                  />
                ),
              },
              {
                mark: "02",
                text: (
                  <T
                    pt="Integrações novas dependiam de contorno, não de código que o time controlava."
                    en="New integrations depended on workarounds, not on code the team controlled."
                  />
                ),
              },
              {
                mark: "03",
                text: (
                  <T
                    pt="Bug em produção significava esperar: sem controle real do build, sem correção no mesmo dia."
                    en="A production bug meant waiting: no real control of the build, no same-day fix."
                  />
                ),
              },
            ]}
          />
        </div>
      </SplitSection>

      <section className="pt-[clamp(60px,10vh,130px)]">
        <RuleHead
          title={<T pt="02 · A decisão" en="02 · The decision" />}
          aside="FlutterFlow → React Native"
        />
        <div
          data-grid=""
          className="grid grid-cols-12 gap-[clamp(16px,2vw,26px)] pt-[clamp(28px,4vw,48px)]"
        >
          <div
            data-span=""
            data-reveal=""
            className="col-start-1 col-end-7 rounded-lg border border-[#262626] bg-[#1D1D1D] p-[clamp(22px,2.4vw,34px)]"
          >
            <div className="text-[11px] tracking-[0.1em] uppercase text-[#6B6B6B]">
              <T pt="Antes" en="Before" />
            </div>
            <div className="display mt-[14px] text-[clamp(22px,2.4vw,34px)] tracking-[-0.03em] text-[#8C8C8C]">
              FlutterFlow
            </div>
            <ul className="m-0 mt-5 grid list-none gap-2.5 p-0 text-sm leading-[1.55] text-[#8C8C8C]">
              <li>
                <T
                  pt="Visual builder, lógica presa na ferramenta"
                  en="Visual builder, logic locked in the tool"
                />
              </li>
              <li>
                <T pt="Release só pela loja" en="Releases only through the stores" />
              </li>
              <li>
                <T
                  pt="Componentes difíceis de reaproveitar"
                  en="Components hard to reuse"
                />
              </li>
              <li>
                <T pt="Sem testes, sem tipos" en="No tests, no types" />
              </li>
            </ul>
          </div>
          <div
            data-span=""
            data-reveal=""
            className="col-start-7 col-end-13 rounded-lg border border-[#3B3B3B] bg-[#202020] p-[clamp(22px,2.4vw,34px)]"
          >
            <div className="text-[11px] tracking-[0.1em] uppercase text-[#9A9A9A]">
              <T pt="Depois" en="After" />
            </div>
            <div className="display mt-[14px] text-[clamp(22px,2.4vw,34px)] tracking-[-0.03em] text-[#F5F5F5]">
              React Native + Expo
            </div>
            <ul className="m-0 mt-5 grid list-none gap-2.5 p-0 text-sm leading-[1.55] text-[#D6D6D6]">
              <li>
                <T pt="TypeScript em todo o app" en="TypeScript across the whole app" />
              </li>
              <li>
                <T
                  pt="OTA com Expo Updates: correção no mesmo dia"
                  en="OTA via Expo Updates: same-day fixes"
                />
              </li>
              <li>
                <T
                  pt="Design system interno reaproveitável"
                  en="Reusable internal design system"
                />
              </li>
              <li>
                <T pt="Mais de 150 arquivos de teste" en="More than 150 test files" />
              </li>
            </ul>
          </div>
        </div>
        <p
          data-reveal=""
          className={`mt-[clamp(30px,4vw,52px)] mb-0 max-w-[74ch] ${body}`}
        >
          <T
            pt="Reescrever um app em produção é uma decisão que se defende com número, não com gosto. O argumento foi tempo de entrega: features que levavam semanas passariam a levar dias, e correção urgente chegaria ao creator sem depender de revisão de loja. Não dava para trocar uma tela de FlutterFlow por uma de React Native dentro do mesmo app, então construí o novo inteiro em paralelo e liberei aos poucos."
            en="Rewriting a live app is a decision you defend with numbers, not taste. The argument was delivery time: features that took weeks would take days, and urgent fixes would reach creators without waiting on store review. You can't swap a FlutterFlow screen for a React Native one inside the same app, so I built the new one in full, in parallel, and rolled it out gradually."
          />
        </p>
      </section>

      <section className="pt-[clamp(60px,10vh,130px)]">
        <RuleHead title={<T pt="03 · Os fluxos" en="03 · The flows" />} />
        <div
          data-grid=""
          className="grid grid-cols-12 gap-[clamp(16px,2vw,26px)] pt-[clamp(28px,4vw,48px)]"
        >
          {FLOWS.map((flow) => (
            <div
              key={flow.shot}
              data-span=""
              data-reveal=""
              className={`${flow.span} ${flow.offset}`}
            >
              <Placeholder label={flow.shot} className="aspect-[9/16]" pad="px-4" />
              <h3 className="mt-[18px] mb-0 text-[clamp(17px,1.5vw,21px)] font-medium tracking-[-0.02em]">
                {flow.heading}
              </h3>
              <p className="mt-2.5 mb-0 text-sm leading-[1.65] text-[#A3A3A3] text-pretty">
                {flow.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <SplitSection
        title={<T pt="04 · A parte difícil" en="04 · The hard part" />}
      >
        <p className={lede}>
          <T
            pt="A carteira foi reescrita mais vezes do que qualquer outra tela."
            en="The wallet was rewritten more times than any other screen."
          />
        </p>
        <p className={`mt-[26px] mb-0 max-w-[62ch] ${body}`}>
          <T
            pt="Dinheiro de creator não admite meio certo. Refiz a carteira algumas vezes: por erro meu de implementação, por escopo que mudou e porque o financeiro da Inbazz foi migrado no meio do projeto. Algumas regras de negócio só apareceram quando eu já estava codando."
            en="A creator's money doesn't allow for mostly right. I redid the wallet several times: because of my own implementation mistakes, because scope changed, and because Inbazz's finance system was migrated mid-project. Some business rules only surfaced after I was already coding."
          />
        </p>
        <p className="mt-6 mb-0 max-w-[62ch] rounded-md border border-[#262626] px-[18px] py-4 text-[15px] leading-[1.7] text-[#D6D6D6]">
          <T
            pt="A regra que ficou: em qualquer coisa financeira, regra de negócio e escopo são validados com produto antes da primeira linha de código."
            en="The rule I kept: for anything financial, business rules and scope get validated with product before the first line of code."
          />
        </p>
      </SplitSection>

      <section
        data-grid=""
        className="grid grid-cols-12 gap-x-[clamp(16px,2vw,32px)] gap-y-[30px] pt-[clamp(60px,10vh,130px)]"
      >
        <h2
          data-span=""
          data-reveal=""
          className={`col-start-1 col-end-4 ${sectionTitle}`}
        >
          <T pt="05 · Detalhes que ninguém vê" en="05 · Details nobody sees" />
        </h2>
        <div
          data-span=""
          data-reveal=""
          className="col-start-4 col-end-13 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-px overflow-hidden rounded-lg border border-[#262626] bg-[#262626]"
        >
          {DETAILS.map((detail, index) => (
            <div key={index} className="bg-[#1D1D1D] p-6">
              <div className="text-sm font-medium text-[#F5F5F5]">
                {detail.heading}
              </div>
              <p className="mt-2.5 mb-0 text-sm leading-[1.6] text-[#8C8C8C]">
                {detail.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <SplitSection title={<T pt="06 · O que ficou" en="06 · What remains" />}>
        <p className="display m-0 text-[clamp(20px,2.4vw,36px)] leading-[1.28] tracking-[-0.028em] text-[#F5F5F5] text-pretty">
          <T
            pt="O app deixou de ser protótipo e virou produto: tem um dono, um ritmo de entrega e espaço para o próximo dev entrar sem medo."
            en="The app stopped being a prototype and became a product: it has an owner, a delivery rhythm, and room for the next dev to step in without fear."
          />
        </p>
        <p className={`mt-[26px] mb-0 max-w-[62ch] ${body}`}>
          <T
            pt="Com o app estável, passei a liderar também o backoffice, no back e no front. O aprendizado que levo: ferramenta no-code não é erro, é etapa. O erro é não perceber a hora de sair dela."
            en="With the app stable, I took on the backoffice too, back end and front end. What I took from it: no-code isn't a mistake, it's a stage. The mistake is missing the moment to leave it."
          />
        </p>
        <div
          data-row=""
          className="mt-[clamp(30px,4vw,48px)] grid grid-cols-[repeat(3,minmax(0,1fr))] gap-5 border-t border-[#262626] pt-6"
        >
          {OUTCOMES.map((outcome) => (
            <div key={outcome.figure}>
              <div className="display text-[clamp(26px,3vw,44px)] tracking-[-0.035em]">
                {outcome.figureEn ? (
                  <T pt={outcome.figure} en={outcome.figureEn} />
                ) : (
                  outcome.figure
                )}
              </div>
              <div className="mt-1.5 text-[13px] leading-[1.5] text-[#8C8C8C]">
                {outcome.text}
              </div>
            </div>
          ))}
        </div>
      </SplitSection>
    </CaseShell>
  );
}
