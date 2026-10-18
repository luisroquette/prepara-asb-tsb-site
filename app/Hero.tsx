"use client";

import { useEffect, useRef } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const presets = ["Stream", "Cascade", "Veil", "Ember"];

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const syncRef = useRef<() => void>(() => {});

  useEffect(() => {
    let pending = false;
    let lastStep = -Infinity;
    const sync = () => {
      pending = false;
      const element = section.current;
      const target = frame.current?.contentWindow;
      if (!element || !target) return;
      const stage = element.clientHeight;
      const distance = element.scrollTop;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const index = reducedMotion ? 0 : Math.min(presets.length - 1, Math.max(0, Math.floor((distance + stage * 0.05) / stage) - 1));
      const reveal = reducedMotion ? 1 : Math.min(1, distance / (stage * 0.7));
      target.postMessage({ type: "prepara-aurora-scroll", preset: presets[index], reveal }, window.location.origin);
    };
    const schedule = () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(sync);
    };
    syncRef.current = sync;
    const step = (direction: number) => {
      const element = section.current;
      if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const now = performance.now();
      if (now - lastStep < 1600) return;
      lastStep = now;
      const current = Math.round(element.scrollTop / element.clientHeight);
      const next = Math.max(0, Math.min(presets.length, current + direction));
      if (next === current && direction > 0) {
        element.nextElementSibling?.scrollIntoView({ behavior: "smooth" });
      } else if (next !== current) {
        element.scrollTo({ top: next * element.clientHeight, behavior: "smooth" });
      }
    };
    function onMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow) return;
      if (event.data?.type === "prepara-aurora-step" && (event.data.direction === 1 || event.data.direction === -1)) {
        step(event.data.direction);
        return;
      }
      if (event.data?.type !== "prepara-aurora-cta") return;
      const target = event.data.target;
      if (target !== "curso" && target !== "resultados") return;
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
    }
    const onWheel = (event: WheelEvent) => {
      const element = section.current;
      if (!element || element.getBoundingClientRect().top > window.innerHeight / 2 || element.getBoundingClientRect().bottom < window.innerHeight / 2) return;
      if (!event.deltaY || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      event.preventDefault();
      step(Math.sign(event.deltaY));
    };
    const onKeyDown = (event: KeyboardEvent) => {
      const element = section.current;
      if (!element || element.getBoundingClientRect().top > window.innerHeight / 2 || element.getBoundingClientRect().bottom < window.innerHeight / 2) return;
      if (event.altKey || event.ctrlKey || event.metaKey || (event.target instanceof HTMLElement && event.target.closest("a,button,input,textarea,select,[contenteditable]"))) return;
      const direction = event.key === "PageDown" || event.key === "ArrowDown" || (event.key === " " && !event.shiftKey) ? 1
        : event.key === "PageUp" || event.key === "ArrowUp" || (event.key === " " && event.shiftKey) ? -1 : 0;
      if (!direction || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      event.preventDefault();
      step(direction);
    };
    const element = section.current;
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("message", onMessage);
    window.addEventListener("keydown", onKeyDown);
    element?.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      window.removeEventListener("message", onMessage);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("wheel", onWheel);
      element?.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      syncRef.current = () => {};
    };
  }, []);

  return (
    <section className="hero" ref={section} tabIndex={0} aria-label="Apresentação do curso com quatro estilos Aurora controlados pela rolagem">
      <h1 className="sr-only">Sua vaga em saúde bucal começa com um plano.</h1>
      <div className="hero-sticky">
        <iframe
          ref={frame}
          onLoad={() => syncRef.current()}
          src={`${basePath}/aurora/`}
          title="Sua vaga em saúde bucal começa com um plano. Animação Aurora com quatro estilos controlados pela rolagem."
          className="hero-frame"
          loading="eager"
        />
        <p className="hero-scroll">ROLE PARA REVELAR O AURORA <span aria-hidden="true">↓</span></p>
      </div>
      <div className="hero-scroll-step" aria-hidden="true" />
      <div className="hero-scroll-step" aria-hidden="true" />
      <div className="hero-scroll-step" aria-hidden="true" />
      <div className="hero-scroll-step" aria-hidden="true" />
    </section>
  );
}
