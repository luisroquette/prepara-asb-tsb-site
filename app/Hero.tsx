"use client";

import { useEffect, useRef, useState } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const frameLoad = useRef<() => void>(() => {});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let phase: "idle" | "playing" | "done" = "idle";
    let frameReady = false;
    let completionTimer: ReturnType<typeof setTimeout> | undefined;
    let exitQueued = false;
    let lastWheel = -Infinity;
    let touchStart: number | null = null;
    let touchSent = false;
    const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const active = () => {
      const bounds = section.current?.getBoundingClientRect();
      return bounds && bounds.top <= window.innerHeight / 2 && bounds.bottom >= window.innerHeight / 2;
    };
    const enter = () => {
      if (phase === "idle") {
        phase = "playing";
        frame.current?.contentWindow?.postMessage({ type: "prepara-aurora-play" }, window.location.origin);
        completionTimer = setTimeout(complete, 3600);
      } else if (phase === "playing") {
        exitQueued = true;
      } else {
        section.current?.nextElementSibling?.scrollIntoView({ behavior: "smooth" });
      }
    };
    const complete = () => {
      if (phase !== "playing") return;
      phase = "done";
      if (exitQueued) enter();
    };
    frameLoad.current = () => {
      frame.current?.contentWindow?.postMessage({ type: "prepara-aurora-ping" }, window.location.origin);
    };
    function onMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow) return;
      if (event.data?.type === "prepara-aurora-ready") {
        frameReady = true;
        setReady(true);
      } else if (event.data?.type === "prepara-aurora-complete") {
        complete();
      } else if (event.data?.type === "prepara-aurora-step" && event.data.direction === 1 && active() && !reducedMotion()) {
        if (frameReady) enter();
        else section.current?.nextElementSibling?.scrollIntoView({ behavior: "smooth" });
      } else if (event.data?.type === "prepara-aurora-cta" && (event.data.target === "curso" || event.data.target === "resultados")) {
        document.getElementById(event.data.target)?.scrollIntoView({ behavior: "smooth" });
      }
    }
    const onWheel = (event: WheelEvent) => {
      if (!frameReady || !active() || reducedMotion() || !event.deltaY) return;
      event.preventDefault();
      const now = performance.now();
      if (event.deltaY > 0 && now - lastWheel > 450) enter();
      lastWheel = now;
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (!frameReady || !active() || reducedMotion() || event.repeat || event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.target instanceof HTMLElement && event.target.closest("a,button,input,textarea,select,[contenteditable]")) return;
      if (event.key !== "PageDown" && event.key !== "ArrowDown" && event.key !== " ") return;
      event.preventDefault();
      enter();
    };
    const onTouchStart = (event: TouchEvent) => {
      touchStart = event.touches[0]?.clientY ?? null;
      touchSent = false;
    };
    const onTouchMove = (event: TouchEvent) => {
      if (!frameReady || !active() || reducedMotion() || touchStart === null) return;
      event.preventDefault();
      if (!touchSent && touchStart - (event.touches[0]?.clientY ?? touchStart) > 40) {
        touchSent = true;
        enter();
      }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("message", onMessage);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    frameLoad.current();
    return () => {
      clearTimeout(completionTimer);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("message", onMessage);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      frameLoad.current = () => {};
    };
  }, []);

  return (
    <section className="hero" ref={section} tabIndex={0} aria-label="Apresentação do curso com quatro estilos Aurora ativados pela rolagem">
      <h1 className="sr-only">Sua vaga em saúde bucal começa com um plano.</h1>
      <iframe
        ref={frame}
        onLoad={() => frameLoad.current()}
        src={`${basePath}/aurora/`}
        title="Sua vaga em saúde bucal começa com um plano. Animação Aurora com quatro estilos ativados pela rolagem."
        className={`hero-frame${ready ? " ready" : ""}`}
        loading="eager"
      />
      <p className="hero-scroll">ROLE PARA VER · ROLE DE NOVO PARA SEGUIR <span aria-hidden="true">↓</span></p>
    </section>
  );
}
