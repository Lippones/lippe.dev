import type { Metadata } from "next";
import Image from "next/image";

import { CaseShell } from "@/components/case/case-shell";
import { CaseVideo } from "@/components/case/case-video";
import {
  IndexList,
  Meta,
  RuleHead,
  Shot,
  SplitSection,
  body,
  lede,
  sectionTitle,
} from "@/components/case/case-ui";
import { SOCIALS } from "@/components/portfolio/data";
import { T } from "@/components/portfolio/t";

const title = "Nouli — Filipe Vieira";
const description =
  "Projeto pessoal: um leitor iOS que converte PDF em texto corrido no próprio aparelho. Caso de estudo sobre a conversão, o design e o estado atual do app.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/case/nouli" },
  openGraph: { type: "article", url: "/case/nouli", title, description },
};

const METRICS = [
  {
    before: "822",
    after: "1",
    text: (
      <T
        pt="páginas com cabeçalho ou rodapé vazando no meio do texto"
        en="pages with a header or footer leaking into the text"
      />
    ),
  },
  {
    before: "+49,1%",
    beforeEn: "+49.1%",
    after: "+2,9%",
    afterEn: "+2.9%",
    text: (
      <T
        pt="palavras a mais na Lei 8.112, por causa do texto revogado tachado"
        en="extra words in Law 8,112, caused by struck-through repealed text"
      />
    ),
  },
  {
    before: "2,77%",
    beforeEn: "2.77%",
    after: "0,08%",
    afterEn: "0.08%",
    text: (
      <T
        pt="palavras partidas por hífen de fim de linha em Dom Casmurro"
        en="words split by end-of-line hyphens in Dom Casmurro"
      />
    ),
  },
  {
    before: "9/20",
    after: "12/20",
    text: (
      <T
        pt="documentos aprovados na rubrica, com o código congelado antes de pontuar"
        en="documents passing the rubric, with the code frozen before scoring"
      />
    ),
  },
];

const DIRECTIONS = [
  {
    mark: "A",
    text: (
      <T
        pt="Rabisco: a margem do livro vira personagem. Bege, verde-limão e traço à mão."
        en="Scribble: the book's margin becomes a character. Beige, lime green and hand-drawn lines."
      />
    ),
  },
  {
    mark: "B",
    text: (
      <T
        pt="Colofão: uma editora de bolso dentro do celular, com a tipografia como capa."
        en="Colophon: a pocket publisher inside the phone, with type as the cover."
      />
    ),
  },
  {
    mark: "C",
    text: (
      <T
        pt="Ficha: cada livro é uma ficha de biblioteca, e ler é carimbar."
        en="Card: every book is a library card, and reading is stamping it."
      />
    ),
  },
  {
    mark: "D",
    text: (
      <T
        pt="Varal: PDFs pendurados como folhetos de cordel numa feira."
        en="Clothesline: PDFs hung like cordel booklets at a street market."
      />
    ),
  },
];

const ILLUSTRATIONS = [
  { file: "livro-aberto", pt: "Livro aberto", en: "Open book" },
  { file: "cafe", pt: "Café", en: "Coffee" },
  { file: "luminaria", pt: "Luminária", en: "Lamp" },
  { file: "lua", pt: "Lua e estrelas", en: "Moon and stars" },
  { file: "oculos", pt: "Óculos", en: "Glasses" },
  { file: "balanca", pt: "Balança", en: "Scales" },
  { file: "planta", pt: "Planta", en: "Plant" },
  { file: "mapa", pt: "Mapa", en: "Map" },
];

const FLOWS = [
  {
    src: "/images/nouli/leitor-paginado.webp",
    alt: "Leitor do Nouli no modo Páginas, com Dom Casmurro refluído",
    width: 600,
    height: 1305,
    span: "col-start-1 col-end-5",
    offset: "",
    heading: <T pt="Ler em páginas" en="Reading in pages" />,
    text: (
      <T
        pt="O livro inteiro é diagramado em colunas CSS dentro de uma WebView: uma coluna é uma página. Mudou a fonte, o tamanho ou girou o celular, tudo repagina numa passada. A posição é guardada como bloco e caractere, e não como número de página."
        en="The whole book is laid out in CSS columns inside a WebView: one column is one page. Change the font, the size or rotate the phone and it all repaginates in one pass. The position is stored as block and character, not as a page number."
      />
    ),
  },
  {
    src: "/images/nouli/capa-ilustracao.webp",
    alt: "Folha para escolher uma ilustração de traço como capa do livro",
    width: 600,
    height: 1305,
    span: "col-start-5 col-end-9",
    offset: "pt-[clamp(0px,4vw,60px)]",
    heading: <T pt="Uma capa para cada PDF" en="A cover for every PDF" />,
    text: (
      <T
        pt="A capa padrão é a primeira página do PDF. Dá para trocar por outra página, uma foto, uma capa tipográfica ou uma das ilustrações de traço. Tudo é renderizado no aparelho."
        en="The default cover is the PDF's first page. You can swap it for another page, a photo, a typographic cover or one of the line illustrations. All of it is rendered on the device."
      />
    ),
  },
  {
    src: "/images/nouli/meta-concluida.webp",
    alt: "Cartão verde-limão de meta do dia concluída sobre a página do livro",
    width: 600,
    height: 1305,
    span: "col-start-9 col-end-13",
    offset: "pt-[clamp(0px,8vw,120px)]",
    heading: <T pt="Meta do dia" en="Daily goal" />,
    text: (
      <T
        pt="O tempo de leitura vem das sessões guardadas no aparelho. Quando a meta fecha, aparece um cartão limão uma vez por dia, sem modal e sem tirar o foco do VoiceOver."
        en="Reading time comes from sessions stored on the device. When the goal is met, a lime card shows up once a day, with no modal and without taking VoiceOver focus."
      />
    ),
  },
];

const DETAILS = [
  {
    heading: <T pt="Recorte quando não converte" en="A crop when it can't convert" />,
    text: (
      <T
        pt="Tabela, fórmula ou figura que o reflow não reconstrói entra como recorte da página, e um toque abre o PDF original. O app prefere mostrar um recorte a mostrar texto embaralhado."
        en="A table, formula or figure the reflow can't rebuild goes in as a crop of the page, and one tap opens the original PDF. The app would rather show a crop than scrambled text."
      />
    ),
  },
  {
    heading: <T pt="WebView sem acesso a arquivos" en="A WebView with no file access" />,
    text: (
      <T
        pt="A WebView que converte não acessa arquivos. O código nativo entrega o PDF em pedaços de 1 MB e valida cada nome de imagem que ela devolve, já que o arquivo processado vem de fora."
        en="The converting WebView has no file access. Native code hands it the PDF in 1 MB chunks and validates every image name it sends back, since the file being processed comes from outside."
      />
    ),
  },
  {
    heading: <T pt="Conversão que não trava" en="Conversion that doesn't hang" />,
    text: (
      <T
        pt="O WebKit suspende os timers de uma WebView invisível, e a conversão parava na página 56. O motor passou a ceder a vez por MessageChannel, e um watchdog de 30 s mostra “Tentar de novo” se nada avançar."
        en="WebKit suspends timers in an invisible WebView, and conversion stopped on page 56. The engine now yields through MessageChannel, and a 30 s watchdog shows “Try again” if nothing moves."
      />
    ),
  },
  {
    heading: <T pt="Contraste medido" en="Measured contrast" />,
    text: (
      <T
        pt="Seis temas de leitura, cada um com variante clara e escura. Nas 12, o texto fica em 7,4:1 ou mais. O limão nunca é usado como texto sobre o bege, porque ali o contraste é baixo."
        en="Six reading themes, each with a light and a dark variant. Across all 12, text stays at 7.4:1 or higher. Lime is never used as text on beige, because the contrast there is low."
      />
    ),
  },
];

const OUTCOMES = [
  {
    figure: "20",
    text: (
      <T pt="PDFs reais no corpus de teste" en="real PDFs in the test corpus" />
    ),
  },
  {
    figure: "12/20",
    text: (
      <T
        pt="documentos aprovados; a meta é 16"
        en="documents passing; the target is 16"
      />
    ),
  },
  {
    figure: "0",
    text: <T pt="usuários, por enquanto" en="users, for now" />,
  },
];

export default function NouliCase() {
  return (
    <CaseShell
      title="Nouli"
      next={{ label: "Inbazz Creator", href: "/case/inbazz-creator" }}
      socials={[SOCIALS[0]]}
    >
      <section
        data-grid=""
        className="grid grid-cols-12 gap-x-[clamp(16px,2vw,32px)] gap-y-[26px] pt-[clamp(48px,9vh,110px)] pb-[clamp(30px,5vh,56px)]"
      >
        <div data-span="" data-reveal="" className="col-start-1 col-end-9">
          <div className="text-xs tracking-[0.06em] uppercase text-[#6B6B6B]">
            <T pt="Projeto pessoal · App iOS" en="Personal project · iOS app" />
          </div>
          <h1 className="mt-5 mb-0 text-[clamp(38px,6.6vw,116px)] leading-[0.9] font-medium tracking-[-0.05em]">
            Nouli
          </h1>
          <p className="display mt-[26px] mb-0 max-w-[30ch] text-[clamp(19px,2vw,30px)] leading-[1.28] tracking-[-0.025em] text-[#EDEDED] text-pretty">
            <T
              pt="Um leitor para iPhone que converte PDF em texto corrido, no próprio aparelho, para ler no celular como um livro."
              en="An iPhone reader that converts PDFs into flowing text, on the device itself, so they can be read on a phone like a book."
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
              pt="Tudo: pesquisa, produto, design e código"
              en="Everything: research, product, design and code"
            />
          </Meta>
          <Meta label={<T pt="Período" en="Period" />}>
            <T pt="2026 — em andamento" en="2026 — ongoing" />
          </Meta>
          <Meta label="Stack" wrap>
            Expo · React Native · TypeScript · pdf.js · SQLite
          </Meta>
          <Meta label={<T pt="Estado" en="Status" />} wrap>
            <T
              pt="Em desenvolvimento, ainda sem usuários"
              en="In development, no users yet"
            />
          </Meta>
        </div>
      </section>

      <div data-reveal="">
        <CaseVideo
          src="/videos/nouli/portfolio.mp4"
          poster="/videos/nouli/portfolio-poster.webp"
          label="Vídeo de 40 segundos do Nouli: um PDF virando página de livro, o leitor, os temas, o destaque e a meta do dia"
          width={1920}
          height={1080}
        />
      </div>

      <SplitSection title={<T pt="01 · O problema" en="01 · The problem" />}>
        <p className={lede}>
          <T
            pt="O PDF tem página de tamanho fixo, pensada para papel. Na tela do celular o texto fica pequeno, e ler costuma exigir zoom e rolagem para os lados."
            en="A PDF has a fixed page size, designed for paper. On a phone screen the text gets small, and reading usually takes zooming and scrolling sideways."
          />
        </p>
        <p className={`mt-[26px] mb-0 max-w-[62ch] ${body}`}>
          <T
            pt="Os leitores mais comuns mostram o PDF como a página original. Isso funciona no computador e no tablet, mas fica difícil no celular. Quem mais lê PDF no celular costuma ser estudante com apostila, quem estuda para concurso, quem lê artigo técnico e quem baixa livro em domínio público. Uma review na Play Store descreve a situação assim: “eu queria ler pdfs como se fosse livro […] você tem que ficar arrastando a tela cada linha”."
            en="The most common readers show a PDF as the original page. That works on a computer or a tablet, but it gets hard on a phone. The people who read PDFs on a phone most are often students with course packs, people studying for civil service exams, readers of technical papers and people who download public domain books. A Play Store review describes it like this: “I wanted to read PDFs like a book […] you have to keep dragging the screen for every line”."
          />
        </p>
        <div className="mt-[26px] max-w-[62ch]">
          <IndexList
            items={[
              {
                mark: "01",
                text: (
                  <T
                    pt="Refluir: extrair o texto e reconstruir parágrafos, títulos e notas numa página contínua, com fonte, tamanho e tema ajustáveis."
                    en="Reflow: extract the text and rebuild paragraphs, headings and notes on a continuous page, with adjustable font, size and theme."
                  />
                ),
              },
              {
                mark: "02",
                text: (
                  <T
                    pt="Tirar do fluxo do texto o cabeçalho, o rodapé, o número de página e o hífen de fim de linha."
                    en="Remove running headers, footers, page numbers and end-of-line hyphens from the flow of the text."
                  />
                ),
              },
              {
                mark: "03",
                text: (
                  <T
                    pt="Guardar onde a pessoa parou em cada livro, um pedido frequente nas reviews das lojas."
                    en="Keep track of where the reader stopped in each book, a frequent request in store reviews."
                  />
                ),
              },
            ]}
          />
        </div>
      </SplitSection>

      <section className="pt-[clamp(60px,10vh,130px)]">
        <RuleHead
          title={<T pt="02 · A pesquisa" en="02 · The research" />}
          aside={
            <T
              pt="13 apps · ~1.390 reviews lidas"
              en="13 apps · ~1,390 reviews read"
            />
          }
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
              <T pt="O que já existe" en="What already exists" />
            </div>
            <div className="display mt-[14px] text-[clamp(22px,2.4vw,34px)] tracking-[-0.03em] text-[#8C8C8C]">
              <T pt="Adobe, Modo Líquido" en="Adobe Liquid Mode" />
            </div>
            <ul className="m-0 mt-5 grid list-none gap-2.5 p-0 text-sm leading-[1.55] text-[#8C8C8C]">
              <li>
                <T
                  pt="Converte nos servidores da Adobe"
                  en="Converts on Adobe's servers"
                />
              </li>
              <li>
                <T
                  pt="Limite de 200 páginas ou 10 MB por arquivo"
                  en="Limited to 200 pages or 10 MB per file"
                />
              </li>
              <li>
                <T pt="Não converte PDF escaneado" en="Doesn't convert scanned PDFs" />
              </li>
              <li>
                <T
                  pt="Pede login e oferece um assistente de IA no leitor"
                  en="Asks for a login and offers an AI assistant in the reader"
                />
              </li>
            </ul>
          </div>
          <div
            data-span=""
            data-reveal=""
            className="col-start-7 col-end-13 rounded-lg border border-[#3B3B3B] bg-[#202020] p-[clamp(22px,2.4vw,34px)]"
          >
            <div className="text-[11px] tracking-[0.1em] uppercase text-[#9A9A9A]">
              <T pt="A proposta do Nouli" en="What Nouli does" />
            </div>
            <div className="display mt-[14px] text-[clamp(22px,2.4vw,34px)] tracking-[-0.03em] text-[#F5F5F5]">
              Nouli
            </div>
            <ul className="m-0 mt-5 grid list-none gap-2.5 p-0 text-sm leading-[1.55] text-[#D6D6D6]">
              <li>
                <T
                  pt="Converte no aparelho, offline"
                  en="Converts on the device, offline"
                />
              </li>
              <li>
                <T pt="Livro inteiro, sem limite de páginas" en="Whole books, no page limit" />
              </li>
              <li>
                <T pt="Guarda a posição de leitura" en="Keeps your reading position" />
              </li>
              <li>
                <T
                  pt="O que não converte vira recorte, com o original a um toque"
                  en="What doesn't convert becomes a crop, with the original one tap away"
                />
              </li>
            </ul>
          </div>
        </div>
        <p
          data-reveal=""
          className={`mt-[clamp(30px,4vw,52px)] mb-0 max-w-[74ch] ${body}`}
        >
          <T
            pt="Antes de desenhar as telas, levantei os apps de leitura só com fontes públicas e classifiquei à mão as reviews de 1 a 4 estrelas que citam PDF. Depois testei a ideia com um painel simulado de 20 compradores. Sincronização não pesou na decisão de compra, a preocupação mais citada foi a conversão estragar tabelas e fórmulas, e 2 de 20 pagariam pelo plano pago, os dois por causa de PDF escaneado. A conclusão foi que existe espaço, mas pequeno, e que ele depende mais da qualidade da conversão do que de uma tecnologia nova."
            en="Before designing the screens, I surveyed reading apps from public sources only and hand-classified the 1 to 4 star reviews that mention PDFs. Then I tested the idea with a simulated panel of 20 buyers. Sync didn't weigh on the decision to buy, the most frequent concern was the conversion breaking tables and formulas, and 2 of 20 would pay for the paid tier, both because of scanned PDFs. The conclusion was that there is room, but not much, and that it depends more on conversion quality than on a new technology."
          />
        </p>
      </section>

      <SplitSection
        title={<T pt="03 · Conversão no aparelho" en="03 · On-device conversion" />}
      >
        <p className={lede}>
          <T
            pt="O PDF é convertido no próprio celular e não é enviado para nenhum servidor."
            en="The PDF is converted on the phone itself and isn't sent to any server."
          />
        </p>
        <p className={`mt-[26px] mb-0 max-w-[62ch] ${body}`}>
          <T
            pt="Converter num servidor seria mais simples e daria um reconhecimento de texto melhor. Em troca, haveria custo por página, necessidade de conta e arquivos de terceiros passando por um servidor meu, com as obrigações de LGPD e o risco jurídico que isso traz. No aparelho, o uso não tem custo, funciona offline e a privacidade vale também no plano pago."
            en="Converting on a server would be simpler and would give better text recognition. In return, there would be a per-page cost, an account requirement and third-party files passing through a server of mine, with the privacy-law obligations and legal risk that brings. On the device, use has no cost, it works offline and privacy holds in the paid tier too."
          />
        </p>
        <p className={`mt-5 mb-0 max-w-[62ch] ${body}`}>
          <T
            pt="A conversão roda com pdf.js e o mesmo pipeline em JavaScript do protótipo, dentro de um DOM component do Expo. O Hermes, motor de JavaScript do React Native, não atende aqui: não tem JIT, não tem ReadableStream, que o pdf.js usa para ler o texto, e não tem canvas, que os recortes e a capa precisam. A WebView do iOS tem as três coisas. Cada livro usa uma WebView, montada no início da conversão e desmontada no fim. Cancelar é desmontar, e a memória é liberada em seguida."
            en="Conversion runs on pdf.js and the same JavaScript pipeline as the prototype, inside an Expo DOM component. Hermes, React Native's JavaScript engine, doesn't fit here: it has no JIT, no ReadableStream, which pdf.js uses to read text, and no canvas, which crops and covers need. The iOS WebView has all three. Each book gets one WebView, mounted when conversion starts and torn down when it ends. Cancelling is unmounting, and the memory is released right after."
          />
        </p>
        <p className="mt-6 mb-0 max-w-[62ch] rounded-md border border-[#262626] px-[18px] py-4 text-[15px] leading-[1.7] text-[#D6D6D6]">
          <T
            pt="No iOS 26.5 toda conversão falhava em 0%: o WebKit só suporta for await em streams a partir do iOS 27, onde eu testava. Desde então, valido no runtime mais antigo que o app suporta, e não só no mais novo disponível."
            en="On iOS 26.5 every conversion failed at 0%: WebKit only supports for await over streams from iOS 27, where I was testing. Since then, I validate on the oldest runtime the app supports, not only on the newest one available."
          />
        </p>
      </SplitSection>

      <section className="pt-[clamp(60px,10vh,130px)]">
        <RuleHead
          title={
            <T pt="04 · Como a conversão é medida" en="04 · How conversion is measured" />
          }
          aside={
            <T
              pt="20 PDFs · rubrica de 8 critérios"
              en="20 PDFs · 8-criteria rubric"
            />
          }
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
              pt="Antes de escrever o app, montei um corpus de 20 PDFs reais e uma rubrica para avaliar a conversão."
              en="Before writing the app, I built a corpus of 20 real PDFs and a rubric to evaluate the conversion."
            />
          </p>
          <p
            data-span=""
            data-reveal=""
            className={`col-start-8 col-end-13 m-0 ${body}`}
          >
            <T
              pt="Romances, livros técnicos, lei, edital, apostila, artigos em duas colunas e xerox escaneado, só com material em domínio público ou licença aberta. Cada página é avaliada em 8 critérios, de ordem de leitura a notas de rodapé. Recorte nunca zera a nota; texto embaralhado sempre zera, porque é a preocupação mais citada por quem usa."
              en="Novels, technical books, a law, an exam notice, a course pack, two-column papers and scanned photocopies, all public domain or openly licensed. Each page is scored on 8 criteria, from reading order to footnotes. A crop never scores zero; scrambled text always does, because it's the concern users mention most."
            />
          </p>
        </div>
        <div
          data-reveal=""
          className="mt-[clamp(28px,4vw,48px)] grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-px overflow-hidden rounded-lg border border-[#262626] bg-[#262626]"
        >
          {METRICS.map((metric, index) => (
            <div key={index} className="bg-[#1D1D1D] p-6">
              <div className="flex items-baseline gap-2.5">
                <span className="text-sm text-[#6B6B6B] line-through decoration-[#3B3B3B]">
                  {metric.beforeEn ? (
                    <T pt={metric.before} en={metric.beforeEn} />
                  ) : (
                    metric.before
                  )}
                </span>
                <span className="fv-glyph text-sm text-[#6B6B6B]">→</span>
                <span className="display text-[clamp(26px,3vw,40px)] tracking-[-0.035em] text-[#F5F5F5]">
                  {metric.afterEn ? (
                    <T pt={metric.after} en={metric.afterEn} />
                  ) : (
                    metric.after
                  )}
                </span>
              </div>
              <p className="mt-2.5 mb-0 text-sm leading-[1.6] text-[#8C8C8C]">
                {metric.text}
              </p>
            </div>
          ))}
        </div>
        <p
          data-reveal=""
          className={`mt-[clamp(30px,4vw,52px)] mb-0 max-w-[74ch] ${body}`}
        >
          <T
            pt="O último número tem uma ressalva. Numa segunda amostra, sorteada antes da rodada com semente fixa, o resultado cai para 10 de 20: parte do ganho veio de corrigir justamente os casos que a primeira amostra expunha. A meta para sair dessa fase é 16 de 20, e não foi atingida. Sem reconhecimento de texto, o teto é 14, porque seis PDFs do corpus não têm texto nenhum."
            en="The last number has a caveat. On a second sample, drawn before the round with a fixed seed, the result drops to 10 out of 20: part of the gain came from fixing exactly the cases the first sample exposed. The target to leave this phase is 16 out of 20, and it wasn't met. Without text recognition the ceiling is 14, because six PDFs in the corpus have no text at all."
          />
        </p>
      </section>

      <section className="pt-[clamp(60px,10vh,130px)]">
        <RuleHead
          title={<T pt="05 · O design" en="05 · The design" />}
          aside={
            <T
              pt={
                <>
                  Moodboard <span className="fv-glyph">→</span> 4 direções{" "}
                  <span className="fv-glyph">→</span> Rabisco
                </>
              }
              en={
                <>
                  Moodboard <span className="fv-glyph">→</span> 4 directions{" "}
                  <span className="fv-glyph">→</span> Scribble
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
            <h3 className="m-0 text-[clamp(20px,2.2vw,30px)] leading-[1.1] font-medium tracking-[-0.03em]">
              <T
                pt="Do moodboard a quatro direções"
                en="From moodboard to four directions"
              />
            </h3>
            <p className={`mt-4 mb-0 max-w-[54ch] ${body}`}>
              <T
                pt="A primeira versão saiu direto do moodboard: estante de acrílico colorido, serifa de alto contraste, botão em pílula preta. Funcionava, mas ficava parecida com outros apps de leitura. Em vez de ajustar essa versão, desenhei quatro direções completas, cada uma com paleta clara e escura, tipografia, as quatro telas principais e um detalhe próprio."
                en="The first version came straight from the moodboard: a colored acrylic shelf, a high-contrast serif, a black pill button. It worked, but it looked similar to other reading apps. Instead of adjusting that version, I designed four complete directions, each with light and dark palettes, type, the four core screens and a detail of its own."
              />
            </p>
            <div className="mt-6 max-w-[54ch]">
              <IndexList padding="py-[13px]" items={DIRECTIONS} />
            </div>
          </div>
          <div data-span="" data-reveal="" className="col-start-6 col-end-13">
            <Shot
              src="/images/nouli/exploracao-rabisco.webp"
              alt="Exploração da direção Rabisco: biblioteca, conversão, leitor e ajustes"
              width={1460}
              height={690}
            />
            <p className={`mt-6 mb-0 max-w-[60ch] ${body}`}>
              <T
                pt="A escolhida foi a A: bege quente como papel de pão, tinta quase preta e um verde-limão usado só onde há progresso (meta, destaque, botão de avançar). O leitor não tem ilustrações, para não disputar atenção com o texto."
                en="Direction A was chosen: warm beige like bakery paper, near-black ink and a lime green used only where there's progress (goal, highlight, the next button). The reader has no illustrations, so nothing competes with the text."
              />
            </p>
          </div>
        </div>
        <div
          data-reveal=""
          className="mt-[clamp(28px,4vw,48px)] grid grid-cols-4 gap-px min-[901px]:grid-cols-8 overflow-hidden rounded-lg border border-[#262626] bg-[#262626]"
        >
          {ILLUSTRATIONS.map((item) => (
            <div
              key={item.file}
              className="grid place-items-center gap-2 bg-[#1D1D1D] px-3 py-5"
            >
              <Image
                src={`/images/nouli/ilustracao-${item.file}.svg`}
                alt=""
                width={56}
                height={56}
              />
              <span className="text-[11px] tracking-[0.06em] uppercase text-[#6B6B6B]">
                <T pt={item.pt} en={item.en} />
              </span>
            </div>
          ))}
        </div>
      </section>

      <SplitSection title={<T pt="06 · O nome" en="06 · The name" />}>
        <div className="max-w-[520px]">
          <CaseVideo
            src="/videos/nouli/logo-loop.mp4"
            poster="/videos/nouli/logo-loop-poster.webp"
            label="Logotipo nouli, em traço gordo e arredondado, com o rabisco verde-limão animado"
            width={1280}
            height={720}
            border="border-[#262626]"
          />
        </div>
        <p className={`mt-[26px] mb-0 max-w-[62ch] ${body}`}>
          <T
            pt="O projeto começou como “Book”, que funciona como nome de pasta mas não como marca: é a palavra genérica do produto, difícil de encontrar na loja, e os domínios estavam ocupados. Nomes de 3 ou 4 letras também. Nouli é curto, ainda não tem significado e combina com o logotipo de traço gordo. Os domínios .app e .com.br estavam livres, e nenhum app nas lojas brasileiras usava o nome."
            en="The project started as “Book”, which works as a folder name but not as a brand: it's the generic word for the product, hard to find in the store, and the domains were taken. So were three and four letter names. Nouli is short, has no meaning yet and fits the chunky line logo. The .app and .com.br domains were free, and no app in the Brazilian stores used the name."
          />
        </p>
      </SplitSection>

      <section className="pt-[clamp(60px,10vh,130px)]">
        <RuleHead title={<T pt="07 · O leitor" en="07 · The reader" />} />
        <div
          data-grid=""
          className="grid grid-cols-12 gap-[clamp(16px,2vw,26px)] pt-[clamp(28px,4vw,48px)]"
        >
          {FLOWS.map((flow) => (
            <div
              key={flow.src}
              data-span=""
              data-reveal=""
              className={`${flow.span} ${flow.offset}`}
            >
              <Shot
                src={flow.src}
                alt={flow.alt}
                width={flow.width}
                height={flow.height}
                border="border-[#262626]"
              />
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

      <section
        data-grid=""
        className="grid grid-cols-12 gap-x-[clamp(16px,2vw,32px)] gap-y-[30px] pt-[clamp(60px,10vh,130px)]"
      >
        <h2
          data-span=""
          data-reveal=""
          className={`col-start-1 col-end-4 ${sectionTitle}`}
        >
          <T pt="08 · Detalhes de implementação" en="08 · Implementation details" />
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

      <SplitSection title={<T pt="09 · Onde está" en="09 · Where it stands" />}>
        <p className="display m-0 text-[clamp(20px,2.4vw,36px)] leading-[1.28] tracking-[-0.028em] text-[#F5F5F5] text-pretty">
          <T
            pt="O app está em desenvolvimento e ainda não tem usuários. A conta por venda fecha, mas ainda não há evidência de que as pessoas vão pagar."
            en="The app is in development and has no users yet. The per-sale math works, but there's no evidence yet that people will pay."
          />
        </p>
        <p className={`mt-[26px] mb-0 max-w-[62ch] ${body}`}>
          <T
            pt="O básico vai ser grátis. O plano pago, de pagamento único, traz o que o painel pediu: ler PDF escaneado com reconhecimento de texto no aparelho, ouvir em voz alta e exportar destaques. Antes de construir, o plano é um teste de porta falsa no TestFlight e, antes disso, corrigir os três defeitos que hoje reprovam documentos: figura que engole a coluna vizinha, foto pequena que some e quadro sem grade que sai embaralhado."
            en="The basics will be free. The paid tier, a one-time purchase, brings what the panel asked for: reading scanned PDFs with on-device text recognition, listening out loud and exporting highlights. Before building it, the plan is a fake-door test on TestFlight and, before that, fixing the three defects that still fail documents today: a figure that swallows the next column, small photos that vanish and borderless tables that come out scrambled."
          />
        </p>
        <p className={`mt-5 mb-0 max-w-[62ch] ${body}`}>
          <T
            pt="O principal aprendizado até aqui: em produto de conversão, a forma de medir vem antes do código. Sem o corpus, não haveria como saber se uma mudança melhorou o resultado."
            en="The main lesson so far: in a conversion product, the way of measuring comes before the code. Without the corpus, there would be no way to tell whether a change improved the result."
          />
        </p>
        <div
          data-row=""
          className="mt-[clamp(30px,4vw,48px)] grid grid-cols-[repeat(3,minmax(0,1fr))] gap-5 border-t border-[#262626] pt-6"
        >
          {OUTCOMES.map((outcome) => (
            <div key={outcome.figure}>
              <div className="display text-[clamp(26px,3vw,44px)] tracking-[-0.035em]">
                {outcome.figure}
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
