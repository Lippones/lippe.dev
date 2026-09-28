export type Project = {
  num: string;
  name: string;
  href: string;
  external: boolean;
  stack: string;
  blurb: { pt: string; en: string };
  peek: { pt: string; en: string };
};

export const PROJECTS: readonly Project[] = [
  {
    num: "02",
    name: "Track Tidy",
    href: "/case/track-tidy",
    external: false,
    stack: "Next · Nest · LLM",
    blurb: {
      pt: "Projeto pessoal: descreva a playlist que quer e a IA separa suas músicas do Spotify.",
      en: "Personal project: describe the playlist you want and AI sorts your Spotify library.",
    },
    peek: { pt: "caso de estudo", en: "case study" },
  },
  {
    num: "03",
    name: "Play Pare",
    href: "/case/play-pare",
    external: false,
    stack: "Next · Node · 18+",
    blurb: {
      pt: "Plataforma de conteúdo adulto: discrição, pagamento e moderação como requisitos de engenharia.",
      en: "Adult content platform: discretion, payments and moderation as engineering requirements.",
    },
    peek: { pt: "caso de estudo", en: "case study" },
  },
] as const;

export const SOCIALS = [
  { label: "GitHub", href: "https://github.com/Lippones" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/filipe-vieira-dev/",
  },
  { label: "X", href: "https://twitter.com/Filipe64285" },
] as const;

export const EMAIL = "filipe68ft@hotmail.com";
