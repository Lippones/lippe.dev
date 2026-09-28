import { Clock } from "./clock";
import { T } from "./t";

const label = "text-xs tracking-[0.06em] uppercase text-[#6B6B6B]";

export function Hero() {
  return (
    <>
      <section
        id="top"
        data-grid=""
        className="grid grid-cols-12 items-end gap-x-[clamp(16px,2vw,32px)] gap-y-6 pt-[clamp(56px,11vh,130px)] pb-[clamp(56px,9vh,110px)]"
      >
        <h1
          data-span=""
          data-reveal=""
          className="col-span-12 m-0 text-[clamp(36px,6.6vw,118px)] leading-[0.9] font-medium tracking-[-0.05em] text-balance"
        >
          <T
            pt={
              <>
                Faço aplicativos
                <br />
                que cabem na mão
                <br />
                <span className="font-light text-[#767676]">e no dia</span> de
                quem usa.
              </>
            }
            en={
              <>
                I build apps that fit
                <br />
                in the hand{" "}
                <span className="font-light text-[#767676]">and the day</span>
                <br />
                of the people who use them.
              </>
            }
          />
        </h1>
        <div
          data-span=""
          data-reveal=""
          className="col-span-12 mt-[clamp(14px,2vw,26px)] flex flex-wrap items-start justify-end gap-x-[clamp(28px,4vw,64px)] gap-y-5"
        >
          <div>
            <div className={label}>
              <T pt="Agora" en="Now" />
            </div>
            <div className="mt-1.5 text-sm leading-[1.45] text-[#D6D6D6]">
              <T
                pt={
                  <>
                    Tech Lead Mobile
                    <br />
                    e Backoffice na Inbazz
                  </>
                }
                en={
                  <>
                    Tech Lead, Mobile
                    <br />
                    & Backoffice at Inbazz
                  </>
                }
              />
            </div>
          </div>
          <div>
            <div className={label}>
              <T pt="Base" en="Based" />
            </div>
            <div className="mt-1.5 text-sm leading-[1.45] text-[#D6D6D6]">
              Minas Gerais, BR
              <br />
              <Clock />
            </div>
          </div>
        </div>
      </section>

      <div
        data-grid=""
        className="grid grid-cols-12 gap-x-[clamp(16px,2vw,32px)] gap-y-6 border-t border-[#262626] pt-[30px] pb-[clamp(70px,12vh,150px)]"
      >
        <p
          data-span=""
          data-reveal=""
          className="display col-start-1 col-end-6 m-0 text-[clamp(19px,1.8vw,27px)] leading-[1.32] tracking-[-0.02em] text-[#EDEDED] text-pretty"
        >
          <T
            pt="Sou full-stack em TypeScript, com foco em mobile. É onde o software vira gesto, e onde cada milissegundo de atrito aparece na cara de quem usa."
            en="I'm a full-stack TypeScript developer focused on mobile. That's where software becomes gesture, and where every millisecond of friction shows on someone's face."
          />
        </p>
        <p
          data-span=""
          data-reveal=""
          className="col-start-8 col-end-13 m-0 text-[15px] leading-[1.7] text-[#A3A3A3] text-pretty"
        >
          <T
            pt="Hoje lidero mobile e backoffice na Inbazz. Cheguei para reconstruir o app dos creators e fiz isso sozinho, de FlutterFlow para React Native, com o app antigo no ar até o novo assumir. Antes disso foram três anos de TypeScript, React e Node na bttis, o que me deixa confortável em ir até a API quando o app precisa."
            en="Today I lead mobile and backoffice at Inbazz. I joined to rebuild the creator app and did it alone, from FlutterFlow to React Native, keeping the old app live until the new one took over. Before that, three years of TypeScript, React and Node at bttis, which is why I'm comfortable going into the API when the app needs it."
          />
        </p>
      </div>
    </>
  );
}
