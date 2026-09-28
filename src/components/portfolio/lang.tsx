"use client";

import {
  createContext,
  use,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "pt" | "en";

type LangValue = { lang: Lang; toggle: () => void };

const LangContext = createContext<LangValue | null>(null);

export function useLang() {
  const value = use(LangContext);
  if (!value) throw new Error("useLang precisa estar dentro de <LangRoot>");
  return value;
}

/**
 * Envolve a pagina e expoe o idioma ativo via `data-lang`. As duas versoes do
 * texto sao renderizadas no servidor e o CSS mostra apenas uma, entao alternar
 * o idioma nao re-renderiza a arvore nem exige que ela seja client-side.
 */
export function LangRoot({
  children,
  className,
  page = "home",
}: {
  children: ReactNode;
  className?: string;
  page?: "home" | "case";
}) {
  const [lang, setLang] = useState<Lang>("pt");
  const toggle = useCallback(
    () => setLang((current) => (current === "pt" ? "en" : "pt")),
    []
  );
  const value = useMemo(() => ({ lang, toggle }), [lang, toggle]);

  return (
    <LangContext value={value}>
      <div data-lang={lang} data-page={page} className={className}>
        {children}
      </div>
    </LangContext>
  );
}
