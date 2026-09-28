// Transforma Portfolio.dc.html (formato Claude Design) em HTML estatico,
// para servir de referencia visual na comparacao pixel a pixel.
import { readFileSync, writeFileSync } from "node:fs";

const src = readFileSync(new URL("./Portfolio.clean.html", import.meta.url), "utf8");

const helmet = src.match(/<helmet>([\s\S]*?)<\/helmet>/)[1];
let body = src.match(/<x-dc>([\s\S]*?)<\/x-dc>/)[1].replace(/<helmet>[\s\S]*?<\/helmet>/, "");

const pt = true;
const projects = [
  { num: "02", name: "Track Tidy", blurb: "Projeto pessoal: descreva a playlist que quer e a IA separa suas músicas do Spotify.", stack: "React · TS · LLM", peek: "caso de estudo", href: "Case Track Tidy.dc.html" },
  { num: "03", name: "Play Pare", blurb: "Plataforma de conteúdo adulto: discrição, pagamento e moderação como requisitos de engenharia.", stack: "Next · Node · 18+", peek: "caso de estudo", href: "Case Play Pare.dc.html" },
  { num: "04", name: "EventFlow", blurb: "Plataforma de eventos em microsserviços: ingressos, check-in e painel do organizador.", stack: "Next · NestJS · GraphQL", peek: "imagem · eventflow", href: "https://www.lippe.dev/project/EventFlow" },
];

// <sc-for list="{{ projects }}" as="p"> ... </sc-for>
body = body.replace(/<sc-for[^>]*as="p"[^>]*>([\s\S]*?)<\/sc-for>/, (_m, tpl) =>
  projects
    .map((p) => tpl.replace(/\{\{\s*p\.(\w+)\s*\}\}/g, (_x, k) => String(p[k] ?? "")))
    .join("\n")
);

// style-hover="a:b;c:d" -> classe dedicada + regra :hover
const hoverRules = [];
body = body.replace(/\s*style-hover="([^"]*)"/g, (_m, decls) => {
  const cls = `h${hoverRules.length}`;
  hoverRules.push(`.${cls}:hover{${decls.replace(/;\s*$/, "")}}`);
  return ` data-hovercls="${cls}"`;
});
body = body.replace(/data-hovercls="(h\d+)"/g, (_m, c) => `class="${c}"`);
// junta com class ja existente no mesmo elemento
body = body.replace(/class="([^"]*)"([^>]*?)class="(h\d+)"/g, (_m, a, mid, b) => `class="${a} ${b}"${mid}`);

// tokens de estado
body = body
  .replace(/\{\{\s*lang\s*\}\}/g, pt ? "pt" : "en")
  .replace(/\{\{\s*ptColor\s*\}\}/g, pt ? "#F5F5F5" : "#9A9A9A")
  .replace(/\{\{\s*enColor\s*\}\}/g, pt ? "#9A9A9A" : "#F5F5F5")
  .replace(/onClick="\{\{\s*toggleLang\s*\}\}"/g, 'onclick="window.__toggleLang()"');

const runtime = `
<script>
window.__toggleLang = () => {
  const r = document.querySelector('[data-lang]');
  r.dataset.lang = r.dataset.lang === 'pt' ? 'en' : 'pt';
};
const nodes = Array.from(document.querySelectorAll('[data-reveal]'));
const dist = 22;
nodes.forEach((n) => {
  n.style.opacity = '0';
  n.style.transform = 'translateY(' + dist + 'px)';
  n.style.transition = 'opacity .9s cubic-bezier(.16,.84,.24,1), transform .9s cubic-bezier(.16,.84,.24,1)';
  n.style.willChange = 'opacity, transform';
});
const show = (n) => {
  n.style.opacity = '1';
  n.style.transform = 'none';
  setTimeout(() => { n.style.willChange = 'auto'; n.style.transform = ''; n.style.transition = ''; }, 1000);
};
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) { setTimeout(() => show(e.target), Math.min(i * 60, 240)); io.unobserve(e.target); }
  });
}, { rootMargin: '0px 0px -10% 0px', threshold: 0.04 });
nodes.forEach((n) => io.observe(n));
setTimeout(() => nodes.forEach(show), 2600);

document.addEventListener('pointermove', (ev) => {
  const row = ev.target.closest && ev.target.closest('[data-row="project"]');
  if (!row) return;
  const peek = row.querySelector('.fv-peek');
  if (!peek) return;
  const w = 210, h = 140, pad = 16;
  const x = Math.min(ev.clientX + 26, window.innerWidth - w - pad);
  const y = Math.min(Math.max(ev.clientY - h / 2, pad), window.innerHeight - h - pad);
  const tilt = ((ev.clientX / Math.max(window.innerWidth, 1)) - 0.5) * 5;
  const first = !peek.dataset.ready;
  if (first) peek.style.transition = 'none';
  peek.style.transform = 'translate(' + Math.round(x) + 'px,' + Math.round(y) + 'px) rotate(' + tilt.toFixed(2) + 'deg)';
  if (first) { void peek.offsetWidth; peek.style.transition = ''; peek.dataset.ready = '1'; }
}, { passive: true });

const clock = document.querySelector('[data-clock]');
if (clock) {
  const tick = () => {
    const t = new Date().toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit' });
    clock.textContent = 'GMT\\u22123 · ' + t;
  };
  tick();
  setInterval(tick, 20000);
}
</script>`;

const out = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
${helmet}
<style>${hoverRules.join("\n")}</style>
</head>
<body>
${body}
${runtime}
</body>
</html>`;

writeFileSync("/Users/inbazz/Documents/projetos/lippe.dev/public/__ref.html", out);
console.log("ok", out.length, "bytes,", hoverRules.length, "hover rules");
