import type { ReactNode } from "react";

import { T } from "./t";

const ROLES: {
  period: string;
  current: boolean;
  chip: string;
  name: ReactNode;
  description: ReactNode;
}[] = [
  {
    period: "2026 —",
    current: true,
    chip: "IB",
    name: "Inbazz",
    description: (
      <T
        pt="Tech lead de mobile e backoffice. Reconstruí sozinho o app dos creators e hoje respondo por ele e pelo backoffice, no back e no front."
        en="Tech lead for mobile and backoffice. I rebuilt the creator app alone and now own it and the backoffice, back end and front end."
      />
    ),
  },
  {
    period: "2023 — 2026",
    current: false,
    chip: "BT",
    name: "bttis",
    description: (
      <T
        pt="Desenvolvedor full-stack. React e Next com TypeScript no front, Nest e Express no back, Docker para subir tudo. Onde aprendi a entregar sozinho, do banco ao deploy."
        en="Full-stack developer. React and Next with TypeScript on the front, Nest and Express on the back, Docker to run it all. Where I learned to ship alone, from database to deploy."
      />
    ),
  },
  {
    period: "2021 — 2023",
    current: false,
    chip: "—",
    name: <T pt="Frontend" en="Frontend" />,
    description: (
      <T
        pt="JavaScript, React e muitas horas fora do horário. A obsessão por como as coisas parecem e reagem começou aqui."
        en="JavaScript, React and a lot of after-hours. The obsession with how things look and respond started here."
      />
    ),
  },
];

export function Career() {
  return (
    <section className="pb-[clamp(70px,11vh,140px)]">
      <div
        data-reveal=""
        className="flex items-baseline justify-between gap-5 border-b border-[#262626] pb-4"
      >
        <h2 className="m-0 text-xs font-medium tracking-[0.06em] uppercase text-[#9A9A9A]">
          <T pt="Trajetória" en="Career" />
        </h2>
      </div>
      {ROLES.map((role) => (
        <div
          key={role.period}
          data-row=""
          data-reveal=""
          className="grid grid-cols-[96px_minmax(0,1fr)_minmax(0,1.4fr)] items-baseline gap-[clamp(14px,2vw,36px)] border-b border-[#242424] py-[clamp(20px,2.6vw,32px)]"
        >
          <span
            className={`text-[13px] ${role.current ? "text-[#D6D6D6]" : "text-[#8C8C8C]"}`}
          >
            {role.period}
          </span>
          <span className="display text-[clamp(20px,2.2vw,30px)] font-medium tracking-[-0.03em]">
            <span className="ph-chip mr-[10px] inline-grid h-[22px] w-[22px] place-items-center align-[-4px] text-[8px] text-[#565656]">
              {role.chip}
            </span>
            {role.name}
          </span>
          <span className="text-sm leading-[1.65] text-[#A3A3A3]">
            {role.description}
          </span>
        </div>
      ))}
    </section>
  );
}
