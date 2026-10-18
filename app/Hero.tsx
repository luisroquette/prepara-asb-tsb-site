"use client";

import { useEffect, useRef, useState } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const frameLoad = useRef<() => void>(() => {});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    frameLoad.current = () => {
      frame.current?.contentWindow?.postMessage({ type: "prepara-aurora-ping" }, window.location.origin);
    };
    function onMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow) return;
      if (event.data?.type === "prepara-aurora-ready") {
        setReady(true);
      } else if (event.data?.type === "prepara-aurora-step" && event.data.direction === 1) {
        section.current?.nextElementSibling?.scrollIntoView({ behavior: "instant" });
      } else if (event.data?.type === "prepara-aurora-cta" && (event.data.target === "curso" || event.data.target === "resultados")) {
        document.getElementById(event.data.target)?.scrollIntoView({ behavior: "smooth" });
      }
    }
    window.addEventListener("message", onMessage);
    frameLoad.current();
    return () => {
      window.removeEventListener("message", onMessage);
      frameLoad.current = () => {};
    };
  }, []);

  return (
    <section className="hero" ref={section} tabIndex={0} aria-label="Apresentação do curso com quatro estilos Aurora automáticos">
      <h1 className="sr-only">Sua vaga em saúde bucal começa com um plano.</h1>
      <iframe
        ref={frame}
        onLoad={() => frameLoad.current()}
        src={`${basePath}/aurora/`}
        title="Sua vaga em saúde bucal começa com um plano. Animação Aurora com quatro estilos automáticos."
        className={`hero-frame${ready ? " ready" : ""}`}
        loading="eager"
      />
      <p className="hero-scroll">ROLE PARA CONTINUAR <span aria-hidden="true">↓</span></p>
    </section>
  );
}
