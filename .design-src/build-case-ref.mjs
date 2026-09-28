// Converte os Case_*.dc.html em HTML estatico para comparacao pixel a pixel.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const DIR = new URL("./", import.meta.url);
const OUT = "/Users/inbazz/Documents/projetos/lippe.dev/public";

const CASES = [
  ["Case_Inbazz_Creator.dc.html", "__ref-inbazz-creator.html"],
  ["Case_Play_Pare.dc.html", "__ref-play-pare.html"],
  ["Case_Track_Tidy.dc.html", "__ref-track-tidy.html"],
];

const runtime = `
<script>
window.__toggleLang = () => {
  const r = document.querySelector('[data-lang]');
  r.dataset.lang = r.dataset.lang === 'pt' ? 'en' : 'pt';
};
const nodes = Array.from(document.querySelectorAll('[data-reveal]'));
nodes.forEach((n) => {
  n.style.opacity = '0';
  n.style.transform = 'translateY(22px)';
  n.style.transition = 'opacity .9s cubic-bezier(.16,.84,.24,1), transform .9s cubic-bezier(.16,.84,.24,1)';
});
const show = (n) => {
  n.style.opacity = '1';
  n.style.transform = 'none';
  setTimeout(() => { n.style.transform = ''; n.style.transition = ''; }, 1000);
};
const io = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) { setTimeout(() => show(e.target), Math.min(i * 60, 240)); io.unobserve(e.target); }
  });
}, { rootMargin: '0px 0px -10% 0px', threshold: 0.04 });
nodes.forEach((n) => io.observe(n));
setTimeout(() => nodes.forEach(show), 2600);

const bar = document.querySelector('[data-progress]');
if (bar) {
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
    bar.style.width = (p * 100).toFixed(2) + '%';
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
}
</script>`;

for (const [src, dest] of CASES) {
  const raw = readFileSync(new URL(src, DIR), "utf8");
  const helmet = raw.match(/<helmet>([\s\S]*?)<\/helmet>/)[1];
  let body = raw
    .match(/<x-dc>([\s\S]*?)<\/x-dc>/)[1]
    .replace(/<helmet>[\s\S]*?<\/helmet>/, "");

  const hoverRules = [];
  body = body.replace(/\s*style-hover="([^"]*)"/g, (_m, decls) => {
    const cls = `h${hoverRules.length}`;
    hoverRules.push(`.${cls}:hover{${decls.replace(/;\s*$/, "")}}`);
    return ` data-hovercls="${cls}"`;
  });
  body = body.replace(/data-hovercls="(h\d+)"/g, (_m, c) => `class="${c}"`);
  body = body.replace(
    /class="([^"]*)"([^>]*?)class="(h\d+)"/g,
    (_m, a, mid, b) => `class="${a} ${b}"${mid}`
  );

  body = body
    .replace(/\{\{\s*lang\s*\}\}/g, "pt")
    .replace(/\{\{\s*ptColor\s*\}\}/g, "#F5F5F5")
    .replace(/\{\{\s*enColor\s*\}\}/g, "#9A9A9A")
    .replace(/onClick="\{\{\s*toggleLang\s*\}\}"/g, 'onclick="window.__toggleLang()"')
    // as imagens sao servidas pelo Next a partir de /images
    .replace(/src="images\//g, 'src="/images/');

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

  mkdirSync(OUT, { recursive: true });
  writeFileSync(`${OUT}/${dest}`, out);
  console.log(`${dest} ${out.length} bytes, ${hoverRules.length} hover rules`);
}
