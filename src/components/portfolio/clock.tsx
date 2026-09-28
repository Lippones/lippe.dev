"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "America/Sao_Paulo",
  hour: "2-digit",
  minute: "2-digit",
});

/**
 * Hora local de Minas Gerais. O primeiro render sai igual no servidor e no
 * cliente ("GMT−3"), e o horario entra depois da hidratacao — sem mismatch.
 */
export function Clock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = setInterval(tick, 20_000);
    return () => clearInterval(id);
  }, []);

  return <span data-clock="">GMT−3{time ? ` · ${time}` : ""}</span>;
}
