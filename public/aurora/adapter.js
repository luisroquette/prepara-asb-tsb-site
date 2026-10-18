const presets = ["Stream", "Cascade", "Veil", "Ember"];
let playing = false;
let lastWheel = -Infinity;

if (window.parent === window) {
  document.documentElement.style.setProperty("--aurora-reveal", "1");
}

const style = document.createElement("style");
style.textContent = 'div[class*="pointer-events-auto"][class*="bottom-6"]:has(> button[aria-pressed]){display:none!important}';
document.head.append(style);

function requestStep(direction) {
  window.parent.postMessage({ type: "prepara-aurora-step", direction }, window.location.origin);
}

window.addEventListener("wheel", (event) => {
  if (window.parent === window || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  event.preventDefault();
  const now = performance.now();
  if (Math.abs(event.deltaY) > 1 && now - lastWheel > 450) requestStep(Math.sign(event.deltaY));
  lastWheel = now;
}, { passive: false });

let touchStart = null;
let touchSent = false;
window.addEventListener("touchstart", (event) => {
  touchStart = event.touches[0]?.clientY ?? null;
  touchSent = false;
}, { passive: true });
window.addEventListener("touchmove", (event) => {
  if (touchStart === null || window.parent === window || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  event.preventDefault();
  const distance = touchStart - (event.touches[0]?.clientY ?? touchStart);
  if (!touchSent && Math.abs(distance) > 40) {
    touchSent = true;
    requestStep(Math.sign(distance));
  }
}, { passive: false });

window.addEventListener("keydown", (event) => {
  if (window.parent === window || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (event.repeat || event.target?.closest?.("button,a,input,textarea,select,[contenteditable]")) return;
  const direction = event.key === "PageDown" || event.key === "ArrowDown" || (event.key === " " && !event.shiftKey) ? 1
    : event.key === "PageUp" || event.key === "ArrowUp" || (event.key === " " && event.shiftKey) ? -1 : 0;
  if (!direction) return;
  event.preventDefault();
  requestStep(direction);
});

window.addEventListener("message", (event) => {
  if (event.origin !== window.location.origin || event.source !== window.parent) return;
  if (event.data?.type !== "prepara-aurora-play" || playing) return;
  playing = true;
  document.documentElement.style.setProperty("--aurora-reveal", "1");
  presets.slice(1).forEach((preset, index) => {
    setTimeout(() => {
      const button = Array.from(document.querySelectorAll('button[aria-pressed]')).find(
        (item) => item.textContent.trim() === preset,
      );
      if (button && button.getAttribute("aria-pressed") !== "true") button.click();
    }, (index + 1) * 850);
  });
  setTimeout(() => window.parent.postMessage({ type: "prepara-aurora-complete" }, window.location.origin), 3600);
});

document.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button || !window.parent || window.parent === window) return;

  const action = button.textContent.trim();
  if (action === "Conhecer o curso" || action === "Ver resultados") {
    window.parent.postMessage(
      { type: "prepara-aurora-cta", target: action === "Conhecer o curso" ? "curso" : "resultados" },
      window.location.origin,
    );
  }
});
