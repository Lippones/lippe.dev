window.__extract = (doc, win) => {
  const out = [];
  const walk = (el) => {
    for (const n of el.children) {
      const cs = win.getComputedStyle(n);
      if (cs.display === "none") continue;
      if (n.tagName === "NEXTJS-PORTAL" || n.closest("nextjs-portal")) continue;
      if (n.classList.contains("fv-peek") || n.closest(".fv-peek")) continue;
      const d = [...n.childNodes]
        .filter((c) => c.nodeType === 3)
        .map((c) => c.textContent.trim())
        .filter(Boolean)
        .join(" ")
        .trim();
      if (d) {
        const r = n.getBoundingClientRect();
        out.push({
          t: d.slice(0, 26).replace(/\s+/g, " "),
          x: Math.round(r.x),
          y: Math.round(r.y + win.scrollY),
          fs: cs.fontSize,
          fw: cs.fontWeight,
          ls: cs.letterSpacing,
          lh: cs.lineHeight,
          c: cs.color,
        });
      }
      walk(n);
    }
  };
  walk(doc.body);
  return out;
};

window.__boxes = (doc, win) => {
  const out = [];
  for (const n of doc.querySelectorAll("*")) {
    const cs = win.getComputedStyle(n);
    if (cs.display === "none") continue;
    const bg =
      cs.backgroundImage !== "none" ||
      (cs.backgroundColor !== "rgba(0, 0, 0, 0)" &&
        cs.backgroundColor !== "transparent");
    const bd =
      parseFloat(cs.borderTopWidth) +
        parseFloat(cs.borderBottomWidth) +
        parseFloat(cs.borderLeftWidth) +
        parseFloat(cs.borderRightWidth) >
      0;
    if (!bg && !bd) continue;
    if (n.hasAttribute("data-progress")) continue;
    if (n.classList.contains("fv-peek") || n.classList.contains("fv-fill")) continue;
    const r = n.getBoundingClientRect();
    if (r.width < 4 && r.height < 4) continue;
    out.push(
      [
        Math.round(r.x),
        Math.round(r.y + win.scrollY),
        Math.round(r.width),
        Math.round(r.height),
      ].join("|")
    );
  }
  return out.sort();
};

window.__compare = async (refPath) => {
  document.getElementById("cmpframe")?.remove();
  const f = document.createElement("iframe");
  f.id = "cmpframe";
  f.style.cssText = `position:fixed;left:-20000px;top:0;width:${innerWidth}px;height:${innerHeight}px;border:0`;
  f.src = refPath;
  document.body.appendChild(f);
  await new Promise((r) => f.addEventListener("load", r, { once: true }));
  await new Promise((r) => setTimeout(r, 4200));
  window.scrollTo({ top: 0, behavior: "instant" });

  const ref = window.__extract(f.contentDocument, f.contentWindow);
  const app = window.__extract(document, window);
  const byText = (a) => {
    const m = new Map();
    for (const e of a) if (!m.has(e.t)) m.set(e.t, e);
    return m;
  };
  const R = byText(ref);
  const A = byText(app);
  const keys = [...R.keys()].filter((k) => A.has(k));
  const diffs = [];
  for (const k of keys) {
    const a = A.get(k);
    const r = R.get(k);
    const d = [];
    for (const p of ["fs", "fw", "ls", "lh", "c"])
      if (a[p] !== r[p]) d.push(`${p} ref=${r[p]} app=${a[p]}`);
    if (Math.abs(a.x - r.x) > 1) d.push(`x ref=${r.x} app=${a.x}`);
    if (Math.abs(a.y - r.y) > 2) d.push(`y ref=${r.y} app=${a.y}`);
    if (d.length) diffs.push(`[${k}] ${d.join(" | ")}`);
  }
  const BR = window.__boxes(f.contentDocument, f.contentWindow);
  const BA = window.__boxes(document, window);
  const sR = new Set(BR);
  const sA = new Set(BA);
  const result = {
    matched: keys.length,
    hRef: f.contentDocument.documentElement.scrollHeight,
    hApp: document.documentElement.scrollHeight,
    boxes: `${BR.length}/${BA.length}`,
    onlyRef: BR.filter((x) => !sA.has(x)).slice(0, 6),
    onlyApp: BA.filter((x) => !sR.has(x)).slice(0, 6),
    diffs: diffs.slice(0, 15),
  };
  f.remove();
  return result;
};
"helpers prontos";
