"use client";

import { useLang } from "./lang";

export function LangToggle() {
  const { lang, toggle } = useLang();
  const isPt = lang === "pt";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isPt ? "Switch to English" : "Mudar para português"}
      className="cursor-pointer border-0 bg-transparent p-0 font-sans text-[13px]"
    >
      <span className={isPt ? "text-[#F5F5F5]" : "text-[#9A9A9A]"}>PT</span>
      <span className="px-[3px] text-[#4B4B4B]">·</span>
      <span className={isPt ? "text-[#9A9A9A]" : "text-[#F5F5F5]"}>EN</span>
    </button>
  );
}
