const presets = ["Stream", "Cascade", "Veil", "Ember"];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const style = document.createElement("style");
style.textContent = 'div[class*="pointer-events-auto"][class*="bottom-6"]:has(> button[aria-pressed]){display:none!important}';
document.head.append(style);

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

if (!reducedMotion.matches) {
  window.setInterval(() => {
    if (document.visibilityState !== "visible") return;
    const buttons = Array.from(document.querySelectorAll('button[aria-pressed]')).filter((button) =>
      presets.includes(button.textContent.trim()),
    );
    if (buttons.length !== presets.length) return;
    const current = buttons.findIndex((button) => button.getAttribute("aria-pressed") === "true");
    buttons[(current + 1) % buttons.length].click();
  }, 8000);
}
