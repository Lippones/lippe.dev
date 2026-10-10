import type { Metadata } from "next";

import { CaseShell } from "@/components/case/case-shell";
import {
  Meta,
  RuleHead,
  Shot,
  SplitSection,
  body,
  lede,
} from "@/components/case/case-ui";
import { T } from "@/components/portfolio/t";

const title = "Play Pare — Filipe Vieira";
const description =
  "Plataforma de conteúdo adulto no Brasil: discrição, pagamento e moderação tratados como requisitos de engenharia.";

export const metadata: Metadata = {
  title,
  description,
  // Sem isto a pagina herdaria o canonical "/" do layout raiz.
  alternates: { canonical: "/case/play-pare" },
  // O design marca esta pagina como noindex; o conteudo e sensivel e o produto
  // esta em descontinuacao.
  robots: { index: false, follow: false },
};

const CONSTRAINTS = [
  {
    num: "01",
    span: "col-start-1 col-end-7",
    size: "text-[clamp(18px,1.8vw,24px)]",
    heading: (
      <T
        pt="Discrição é requisito, não preferência"
        en="Discretion is a requirement, not a preference"
      />
    ),
    text: (
      <T
        pt="Nome que aparece na fatura, e-mail que a plataforma dispara, o que fica no histórico do navegador: coisas que em outro produto ninguém discute, e aqui eram pauta de reunião."
        en="The name on the statement, the emails the platform sends, what stays in browser history: things nobody debates elsewhere were meeting topics here."
      />
    ),
  },
  {
    num: "02",
    span: "col-start-7 col-end-13",
    size: "text-[clamp(18px,1.8vw,24px)]",
    heading: <T pt="Pagamento é o gargalo" en="Payment is the bottleneck" />,
    text: (
      <T
        pt="Boa parte dos provedores simplesmente não aceita a categoria. O produto se molda ao que sobra: menos opções, mais atenção a falha de cobrança e a repasse para o creator."
        en="Most providers simply don't accept the category. The product bends to what's left: fewer options, much more care with failed charges and creator payouts."
      />
    ),
  },
  {
    num: "03",
    span: "col-start-1 col-end-5",
    size: "text-[clamp(17px,1.6vw,21px)]",
    heading: <T pt="Idade e consentimento" en="Age and consent" />,
    text: (
      <T
        pt="Verificação não é tela de cadastro: é fluxo com prova, revisão humana e registro de quem aprovou o quê."
        en="Verification isn't a signup screen: it's a flow with proof, human review, and a record of who approved what."
      />
    ),
  },
  {
    num: "04",
    span: "col-start-5 col-end-9",
    size: "text-[clamp(17px,1.6vw,21px)]",
    heading: <T pt="Mídia pesada, rede ruim" en="Heavy media, bad networks" />,
    text: (
      <T
        pt="Vídeo é o produto. Entrega rápida no celular do Brasil inteiro define se a pessoa paga de novo no mês seguinte."
        en="Video is the product. Fast delivery on phones across Brazil decides whether someone pays again next month."
      />
    ),
  },
  {
    num: "05",
    span: "col-start-9 col-end-13",
    size: "text-[clamp(17px,1.6vw,21px)]",
    heading: <T pt="Moderação sempre" en="Moderation always" />,
    text: (
      <T
        pt="Conteúdo publicado precisa de caminho rápido de remoção. Isso é engenharia, não política de uso."
        en="Published content needs a fast path to removal. That's engineering, not a usage policy."
      />
    ),
  },
];

const WORK = [
  {
    heading: <T pt="Interface de descoberta" en="Discovery interface" />,
    text: (
      <T
        pt="Navegação por perfil, cidade e tipo de conteúdo, com filtro que funciona no celular sem virar formulário."
        en="Browsing by profile, city and content type, with filtering that works on a phone without becoming a form."
      />
    ),
  },
  {
    heading: <T pt="Área do creator" en="Creator area" />,
    text: (
      <T
        pt="Publicação de conteúdo, controle do que é público ou pago e visão do que entrou de dinheiro."
        en="Publishing content, controlling what's public or paid, and seeing what came in."
      />
    ),
  },
  {
    heading: <T pt="Fluxo de assinatura" en="Subscription flow" />,
    text: (
      <T
        pt="Checkout curto, estados de falha explicados sem jargão e recuperação de cobrança sem constranger ninguém."
        en="A short checkout, failure states explained without jargon, and dunning that doesn't embarrass anyone."
      />
    ),
  },
  {
    heading: <T pt="Programa de indicação" en="Referral program" />,
    text: (
      <T
        pt="Canal de crescimento que não depende de anúncio pago, porque anúncio é praticamente inviável nessa categoria."
        en="A growth channel that doesn't rely on paid ads, which are practically impossible in this category."
      />
    ),
  },
];

export default function PlayPareCase() {
  return (
    <CaseShell
      title="Play Pare"
      next={{ label: "Nouli", href: "/case/nouli" }}
    >
      <section
        data-grid=""
        className="grid grid-cols-12 gap-x-[clamp(16px,2vw,32px)] gap-y-[26px] pt-[clamp(48px,9vh,110px)] pb-[clamp(30px,5vh,56px)]"
      >
        <div data-span="" data-reveal="" className="col-start-1 col-end-9">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs tracking-[0.06em] uppercase text-[#6B6B6B]">
              <T pt="Trabalho de empresa · Web" en="Company work · Web" />
            </span>
            <span className="rounded border border-[#3B3B3B] px-2 py-[3px] text-[11px] tracking-[0.08em] uppercase text-[#8C8C8C]">
              18+
            </span>
          </div>
          <h1 className="mt-5 mb-0 text-[clamp(38px,6.6vw,116px)] leading-[0.9] font-medium tracking-[-0.05em]">
            Play Pare
          </h1>
          <p className="display mt-[26px] mb-0 max-w-[34ch] text-[clamp(19px,2vw,30px)] leading-[1.28] tracking-[-0.025em] text-[#EDEDED] text-pretty">
            <T
              pt="Uma plataforma de conteúdo adulto no Brasil: creators vendendo direto, sem intermediário e sem exposição desnecessária."
              en="An adult content platform in Brazil: creators selling directly, with no middleman and no unnecessary exposure."
            />
          </p>
        </div>
        <div
          data-span=""
          data-reveal=""
          className="col-start-10 col-end-13 grid content-end gap-[18px]"
        >
          <Meta label={<T pt="Papel" en="Role" />}>
            <T
              pt="Desenvolvimento web no time de produto"
              en="Web development on the product team"
            />
          </Meta>
          <Meta label={<T pt="Situação" en="Status" />} wrap>
            <T pt="No ar, em descontinuação" en="Live, being sunset" />
          </Meta>
          <Meta label="Stack" wrap>
            Next.js · TypeScript · Node · PostgreSQL
          </Meta>
        </div>
      </section>

      <div data-reveal="">
        <Shot
          src="/images/playpare-landing.png"
          alt="Landing page da Play Pare"
          width={1914}
          height={925}
          border="border-[#262626]"
          priority
        />
        <div className="mt-3 flex flex-wrap justify-between gap-x-5 gap-y-2.5 text-xs text-[#6B6B6B]">
          <span>
            <T
              pt="Landing page, a única tela mostrada aqui. O resto do produto fica de fora por respeito a quem usa."
              en="The landing page is the only screen shown here. The rest of the product isn't shown, out of respect for the people who use it."
            />
          </span>
          <span className="tracking-[0.06em] uppercase">playpare.com</span>
        </div>
      </div>

      <SplitSection title={<T pt="01 · Por que está aqui" en="01 · Why it's here" />}>
        <p className={lede}>
          <T
            pt="Nenhum produto ensina mais sobre confiança do que um em que o usuário tem algo a perder se você errar."
            en="No product teaches more about trust than one where the user has something to lose if you get it wrong."
          />
        </p>
        <p className={`mt-[26px] mb-0 max-w-[62ch] ${body}`}>
          <T
            pt="Aqui os dois lados são sensíveis: quem vende expõe imagem e identidade, quem compra expõe hábito e cartão. Toda decisão de produto passava por uma pergunta simples: isso aumenta ou diminui o risco de alguém?"
            en="Both sides are sensitive here: sellers expose their image and identity, buyers expose habits and a card. Every product decision went through one simple question: does this raise or lower someone's risk?"
          />
        </p>
        <p className={`mt-5 mb-0 max-w-[62ch] ${body}`}>
          <T
            pt="Foi também o projeto onde vi de perto o que é construir para um nicho que a maior parte da infraestrutura da internet prefere não atender. Pagamento, hospedagem, anúncio: tudo é mais difícil."
            en="It's also where I saw up close what it means to build for a niche most of the internet's infrastructure would rather not serve. Payments, hosting, advertising: all of it is harder."
          />
        </p>
      </SplitSection>

      <section className="pt-[clamp(60px,10vh,130px)]">
        <RuleHead
          title={
            <T
              pt="02 · Restrições que definiram o produto"
              en="02 · Constraints that shaped the product"
            />
          }
        />
        <div
          data-grid=""
          className="mt-[clamp(28px,4vw,48px)] grid grid-cols-12 gap-px overflow-hidden rounded-lg border border-[#262626] bg-[#262626]"
        >
          {CONSTRAINTS.map((item) => (
            <div
              key={item.num}
              data-span=""
              data-reveal=""
              className={`${item.span} bg-[#1D1D1D] p-[clamp(22px,2.2vw,32px)]`}
            >
              <div className="text-[11px] tracking-[0.1em] uppercase text-[#6B6B6B]">
                {item.num}
              </div>
              <h3
                className={`mt-3 mb-0 ${item.size} font-medium tracking-[-0.02em]`}
              >
                {item.heading}
              </h3>
              <p className="mt-3 mb-0 text-sm leading-[1.7] text-[#A3A3A3] text-pretty">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <SplitSection
        title={<T pt="03 · O que eu fiz" en="03 · What I did" />}
        contentEnd={12}
      >
        <ul className="m-0 grid list-none gap-0 p-0">
          {WORK.map((item, index) => (
            <li
              key={index}
              data-row=""
              className={`grid grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] items-baseline gap-[clamp(14px,2vw,36px)] border-t border-[#262626] py-[18px] ${
                index === WORK.length - 1 ? "border-b" : ""
              }`}
            >
              <span className="display text-[clamp(17px,1.7vw,22px)] tracking-[-0.02em]">
                {item.heading}
              </span>
              <span className="text-sm leading-[1.7] text-[#A3A3A3]">
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </SplitSection>

      <SplitSection title={<T pt="04 · Como terminou" en="04 · How it ended" />}>
        <p className="display m-0 text-[clamp(20px,2.4vw,36px)] leading-[1.28] tracking-[-0.028em] text-[#F5F5F5] text-pretty">
          <T
            pt="Saí da empresa e o plano era descontinuar a plataforma. Ela continua no ar, e o que aprendi ali continua também."
            en="I left the company and the plan was to sunset the platform. It's still live, and so is what I learned there."
          />
        </p>
        <p className={`mt-[26px] mb-0 max-w-[62ch] ${body}`}>
          <T
            pt="Levo daqui um jeito de pensar produto que uso até hoje no mobile: antes de desenhar a tela, pergunte o que essa tela pode custar para a pessoa do outro lado. Em app de creator, custa reputação e dinheiro. A régua é a mesma."
            en="What I took with me is a way of thinking I still use in mobile: before designing a screen, ask what that screen can cost the person on the other side. In a creator app, it costs reputation and money. The bar is the same."
          />
        </p>
        <p className="mt-6 mb-0 max-w-[62ch] rounded-md border border-[#262626] px-[18px] py-4 text-[13px] leading-[1.65] text-[#8C8C8C]">
          <T
            pt="Nota: mantenho os detalhes deste caso em nível alto por respeito ao produto e às pessoas envolvidas. Posso falar mais sobre as decisões técnicas em conversa."
            en="Note: I keep this case at a high level out of respect for the product and the people involved. Happy to go deeper on the technical decisions in a conversation."
          />
        </p>
      </SplitSection>
    </CaseShell>
  );
}
