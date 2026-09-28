import type { Metadata } from "next";

import { CaseShell } from "@/components/case/case-shell";
import {
  IndexList,
  Meta,
  RuleHead,
  Shot,
  SplitSection,
  body,
  eyebrow,
  lede,
} from "@/components/case/case-ui";
import { SOCIALS } from "@/components/portfolio/data";
import { T } from "@/components/portfolio/t";

const title = "Track Tidy — Filipe Vieira";
const description =
  "Projeto pessoal: descreva a playlist que quer e a IA separa suas músicas do Spotify. Caso de estudo sobre colocar IA em produção, não em demo.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/case/track-tidy" },
  openGraph: { type: "article", url: "/case/track-tidy", title, description },
};

const PRINCIPLES = [
  {
    span: "col-start-1 col-end-5",
    heading: <T pt="Assíncrono por padrão" en="Async by default" />,
    text: (
      <T
        pt="Nenhuma requisição de IA vive dentro de um clique. Vira job, roda atrás e a tela conta o progresso."
        en="No AI request lives inside a click. It becomes a job, runs behind, and the screen reports progress."
      />
    ),
  },
  {
    span: "col-start-5 col-end-9",
    heading: <T pt="Resultado auditável" en="Auditable output" />,
    text: (
      <T
        pt="O prompt fica guardado junto do resultado. Sem isso não existe como melhorar o que o modelo entende."
        en="The prompt is stored next to the result. Without that there's no way to improve what the model understands."
      />
    ),
  },
  {
    span: "col-start-9 col-end-13",
    heading: <T pt="Nada destrutivo" en="Nothing destructive" />,
    text: (
      <T
        pt="A IA só cria playlists novas. Nenhuma faixa é removida da biblioteca de quem usa, porque erro de modelo não pode custar música."
        en="The AI only creates new playlists. Nothing is removed from anyone's library, because a model mistake can't cost you music."
      />
    ),
  },
];

export default function TrackTidyCase() {
  return (
    <CaseShell
      title="Track Tidy"
      next={{ label: "Play Pare", href: "/case/play-pare" }}
      socials={[SOCIALS[0]]}
    >
      <section
        data-grid=""
        className="grid grid-cols-12 gap-x-[clamp(16px,2vw,32px)] gap-y-[26px] pt-[clamp(48px,9vh,110px)] pb-[clamp(30px,5vh,56px)]"
      >
        <div data-span="" data-reveal="" className="col-start-1 col-end-9">
          <div className="text-xs tracking-[0.06em] uppercase text-[#6B6B6B]">
            <T pt="Projeto pessoal · Web" en="Personal project · Web" />
          </div>
          <h1 className="mt-5 mb-0 text-[clamp(38px,6.6vw,116px)] leading-[0.9] font-medium tracking-[-0.05em]">
            Track Tidy
          </h1>
          <p className="display mt-[26px] mb-0 max-w-[32ch] text-[clamp(19px,2vw,30px)] leading-[1.28] tracking-[-0.025em] text-[#EDEDED] text-pretty">
            <T
              pt="Uma dor minha: 1.063 músicas curtidas e nenhuma playlist decente. Descrevi o que queria e deixei a IA separar."
              en="A pain of my own: 1,063 liked songs and no decent playlist. I described what I wanted and let the AI sort it out."
            />
          </p>
        </div>
        <div
          data-span=""
          data-reveal=""
          className="col-start-10 col-end-13 grid content-end gap-[18px]"
        >
          <Meta label={<T pt="Papel" en="Role" />}>
            <T pt="Tudo: ideia, produto, código" en="Everything: idea, product, code" />
          </Meta>
          <Meta label={<T pt="Motivo" en="Why" />} wrap>
            <T
              pt="Entender IA em produção, não em demo"
              en="Understanding AI in production, not in a demo"
            />
          </Meta>
          <Meta label="Stack" wrap>
            Next.js · NestJS · Redis · Spotify API · LLM
          </Meta>
          <div>
            <div className={eyebrow}>
              <T pt="Código" en="Code" />
            </div>
            <a
              href="https://github.com/Lippones/Track-Tidy"
              target="_blank"
              rel="noreferrer"
              className="mt-[5px] inline-flex items-baseline gap-[7px] border-b border-[#3B3B3B] pb-0.5 text-sm text-[#D6D6D6] [transition:color_.25s,border-color_.25s] hover:border-[#F5F5F5] hover:text-[#F5F5F5]"
            >
              github.com/Lippones/Track-Tidy{" "}
              <span className="fv-glyph">↗</span>
            </a>
          </div>
        </div>
      </section>

      <div data-reveal="">
        <Shot
          src="/images/tracktidy-landing.png"
          alt="Track Tidy landing page"
          width={1919}
          height={926}
          priority
        />
      </div>

      <SplitSection title={<T pt="01 · A dor" en="01 · The itch" />}>
        <p className={lede}>
          <T
            pt="Organizar música à mão é trabalho chato de gente que gosta de música. Ninguém termina."
            en="Sorting music by hand is boring work for people who love music. Nobody ever finishes."
          />
        </p>
        <p className={`mt-[26px] mb-0 max-w-[62ch] ${body}`}>
          <T
            pt={`Eu queria "só as músicas do Mac DeMarco e do Vacations", "separa por idioma", "algo pra dormir". Toda vez a mesma coisa: abrir o Spotify, arrastar faixa por faixa, desistir no meio. Era um problema de intenção: eu sabia descrever o resultado, só não queria executar.`}
            en={`I wanted "only Mac DeMarco and Vacations", "split by language", "something to sleep to". Every time the same thing: open Spotify, drag track by track, give up halfway. It was an intent problem: I could describe the result, I just didn't want to do the work.`}
          />
        </p>
        <p className={`mt-5 mb-0 max-w-[62ch] ${body}`}>
          <T
            pt="Descrever resultado é exatamente o que um modelo de linguagem faz bem. Então o projeto virou duas coisas ao mesmo tempo: resolver a minha dor e me obrigar a colocar IA em algo que outras pessoas usariam, com conta de verdade, permissão de verdade e erro de verdade."
            en="Describing a result is exactly what a language model is good at. So the project became two things at once: fixing my own itch and forcing myself to put AI into something other people would use, with real accounts, real permissions and real failures."
          />
        </p>
      </SplitSection>

      <section className="pt-[clamp(60px,10vh,130px)]">
        <RuleHead
          title={<T pt="02 · Três passos, nada mais" en="02 · Three steps, nothing more" />}
          aside={
            <T
              pt={
                <>
                  Conectar <span className="fv-glyph">→</span> escolher{" "}
                  <span className="fv-glyph">→</span> descrever
                </>
              }
              en={
                <>
                  Connect <span className="fv-glyph">→</span> pick{" "}
                  <span className="fv-glyph">→</span> describe
                </>
              }
            />
          }
        />
        <div
          data-grid=""
          className="grid grid-cols-12 items-start gap-[clamp(20px,2.4vw,40px)] pt-[clamp(28px,4vw,48px)]"
        >
          <div data-span="" data-reveal="" className="col-start-1 col-end-6">
            <Shot
              src="/images/tracktidy-select.png"
              alt="Seleção de playlists"
              width={1068}
              height={911}
            />
          </div>
          <div data-span="" data-reveal="" className="col-start-6 col-end-13">
            <h3 className="m-0 text-[clamp(20px,2.2vw,30px)] leading-[1.1] font-medium tracking-[-0.03em]">
              <T
                pt="A escolha vem antes do prompt"
                en="The choice comes before the prompt"
              />
            </h3>
            <p className={`mt-4 mb-0 max-w-[54ch] ${body}`}>
              <T
                pt="A primeira versão jogava a biblioteca inteira no modelo. Ficou caro, lento e impreciso. Deixar a pessoa escolher a fonte (as curtidas, uma playlist específica) cortou o custo e melhorou o resultado, porque restringiu o espaço de decisão antes de a IA entrar."
                en="The first version threw the entire library at the model. Expensive, slow, imprecise. Letting the person pick the source (liked songs, one specific playlist) cut cost and improved output, because it narrowed the decision space before the AI even started."
              />
            </p>
            <div className="mt-6 max-w-[54ch]">
              <IndexList
                padding="py-[13px]"
                items={[
                  {
                    mark: "01",
                    text: (
                      <T
                        pt="Login com Spotify, escopo mínimo de permissão."
                        en="Spotify login, minimum permission scope."
                      />
                    ),
                  },
                  {
                    mark: "02",
                    text: (
                      <T
                        pt="Seleção da fonte: curtidas ou playlists específicas."
                        en="Pick the source: liked songs or specific playlists."
                      />
                    ),
                  },
                  {
                    mark: "03",
                    text: (
                      <T
                        pt={`Prompt em português comum: "separa por idioma", "só rock indie".`}
                        en={`A prompt in plain language: "split by language", "indie rock only".`}
                      />
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="pt-[clamp(60px,10vh,130px)]">
        <RuleHead
          title={<T pt="03 · IA que falha bem" en="03 · AI that fails gracefully" />}
        />
        <div
          data-grid=""
          className="grid grid-cols-12 gap-x-[clamp(16px,2vw,32px)] gap-y-[30px] pt-[clamp(28px,4vw,48px)]"
        >
          <p
            data-span=""
            data-reveal=""
            className="display col-start-1 col-end-7 m-0 text-[clamp(19px,2vw,28px)] leading-[1.32] tracking-[-0.025em] text-[#F5F5F5] text-pretty"
          >
            <T
              pt="A parte interessante não é o modelo acertar. É o que acontece quando ele erra, demora ou devolve zero música."
              en="The interesting part isn't the model getting it right. It's what happens when it's wrong, slow, or returns zero songs."
            />
          </p>
          <p
            data-span=""
            data-reveal=""
            className={`col-start-8 col-end-13 m-0 ${body}`}
          >
            <T
              pt="Por isso cada pedido virou um job com estado visível: rascunho, processando, concluído. A pessoa vê o prompt que escreveu, quantas músicas entraram e quantas playlists saíram, inclusive quando o resultado foi zero. Um job que falha não some, ele fica na tela contando o que aconteceu."
              en="That's why every request became a job with visible state: draft, processing, done. You see the prompt you wrote, how many songs went in and how many playlists came out, including when the answer was zero. A failed job doesn't disappear; it stays on screen and says what happened."
            />
          </p>
        </div>
        <div data-reveal="" className="mt-[clamp(28px,4vw,48px)]">
          <Shot
            src="/images/tracktidy-results.png"
            alt="Playlists criadas pela IA, com prompt e total de músicas"
            width={1907}
            height={931}
          />
        </div>
        <div
          data-grid=""
          className="mt-[clamp(28px,4vw,48px)] grid grid-cols-12 gap-px overflow-hidden rounded-lg border border-[#262626] bg-[#262626]"
        >
          {PRINCIPLES.map((item, index) => (
            <div
              key={index}
              data-span=""
              className={`${item.span} bg-[#1D1D1D] p-6`}
            >
              <div className="text-sm font-medium">{item.heading}</div>
              <p className="mt-2.5 mb-0 text-sm leading-[1.6] text-[#8C8C8C]">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <SplitSection title={<T pt="04 · O que aprendi" en="04 · What I learned" />}>
        <p className="display m-0 text-[clamp(20px,2.4vw,36px)] leading-[1.28] tracking-[-0.028em] text-[#F5F5F5] text-pretty">
          <T
            pt="Colocar IA em produção é menos sobre prompt e mais sobre desenhar o que fazer com uma resposta que você não controla."
            en="Shipping AI is less about the prompt and more about designing what to do with an answer you don't control."
          />
        </p>
        <div className="mt-7 max-w-[66ch]">
          <IndexList
            padding="py-[15px]"
            leading="leading-[1.65]"
            items={[
              {
                mark: "→",
                text: (
                  <T
                    pt="Restringir a entrada é mais eficaz do que refinar o prompt: menos contexto, resposta melhor e mais barata."
                    en="Constraining the input beats refining the prompt: less context, better and cheaper answers."
                  />
                ),
              },
              {
                mark: "→",
                text: (
                  <T
                    pt="Latência é design, não infra: sem estado visível, três segundos parecem quebra."
                    en="Latency is design, not infra: with no visible state, three seconds feel like a crash."
                  />
                ),
              },
              {
                mark: "→",
                text: (
                  <T
                    pt="Ação de IA precisa ser reversível ou, de preferência, não destrutiva desde o começo."
                    en="AI actions need to be reversible, or better, non-destructive from the start."
                  />
                ),
              },
            ]}
          />
        </div>
      </SplitSection>
    </CaseShell>
  );
}
