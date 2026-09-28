// Auditoria de responsividade: overflow horizontal, elementos que estouram a
// viewport, alvos de toque pequenos e texto minusculo.
window.__audit = () => {
  const de = document.documentElement;
  const vw = de.clientWidth;

  const overflowing = [];
  for (const n of document.querySelectorAll("body *")) {
    const cs = getComputedStyle(n);
    if (cs.display === "none" || cs.visibility === "hidden") continue;
    if (cs.position === "fixed") continue;
    if (n.closest(".fv-peek")) continue;
    const r = n.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;
    const right = r.right + window.scrollX;
    const left = r.left + window.scrollX;
    if (right > vw + 1 || left < -1) {
      overflowing.push(
        `${n.tagName}${n.className && typeof n.className === "string" ? "." + n.className.split(" ")[0] : ""} ` +
          `left=${Math.round(left)} right=${Math.round(right)} w=${Math.round(r.width)} "${(n.textContent || "").trim().slice(0, 24)}"`
      );
    }
  }

  // alvos de toque: links e botoes visiveis
  const smallTargets = [];
  for (const n of document.querySelectorAll("a, button")) {
    const cs = getComputedStyle(n);
    if (cs.display === "none") continue;
    const r = n.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    if (r.height < 24 || r.width < 24) {
      smallTargets.push(
        `${n.tagName} ${Math.round(r.width)}x${Math.round(r.height)} "${(n.textContent || "").trim().slice(0, 26)}"`
      );
    }
  }

  // texto abaixo de 12px
  const tiny = new Set();
  for (const n of document.querySelectorAll("body *")) {
    const cs = getComputedStyle(n);
    if (cs.display === "none") continue;
    const hasText = [...n.childNodes].some(
      (c) => c.nodeType === 3 && c.textContent.trim()
    );
    if (!hasText) continue;
    const fs = parseFloat(cs.fontSize);
    if (fs < 12) tiny.add(`${fs}px "${n.textContent.trim().slice(0, 22)}"`);
  }

  return {
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    clientWidth: vw,
    scrollWidth: de.scrollWidth,
    hasHorizontalScroll: de.scrollWidth > vw,
    docHeight: de.scrollHeight,
    overflowCount: overflowing.length,
    overflowing: overflowing.slice(0, 8),
    smallTargets: smallTargets.slice(0, 8),
    tinyText: [...tiny].slice(0, 8),
  };
};
"audit pronto";
