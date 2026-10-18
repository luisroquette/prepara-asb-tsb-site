"use client";

import { useEffect, useRef } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Hero() {
  const frame = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow) return;
      if (event.data?.type !== "prepara-aurora-cta") return;
      const target = event.data.target;
      if (target !== "curso" && target !== "resultados") return;
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <section className="hero" aria-label="Apresentação do curso">
      <h1 className="sr-only">Sua vaga em saúde bucal começa com um plano.</h1>
      <iframe
        ref={frame}
        src={`${basePath}/aurora/index.html`}
        title="Sua vaga em saúde bucal começa com um plano. Animação Aurora com quatro estilos alternados automaticamente."
        className="hero-frame"
        loading="eager"
      />
    </section>
  );
}
