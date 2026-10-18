"use client";

import { useEffect, useRef } from "react";
import steps from "./method-steps.json";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function MethodTimeline() {
  const section = useRef<HTMLElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    let pending = false;
    const sync = () => {
      pending = false;
      const element = section.current;
      const target = frame.current?.contentWindow;
      if (!element || !target) return;
      const range = Math.max(1, element.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -element.getBoundingClientRect().top / range));
      target.postMessage({ type: "prepara-timeline-progress", progress }, window.location.origin);
    };
    const schedule = () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(sync);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const onFrameLoad = () => {
    const element = section.current;
    if (!element) return;
    const range = Math.max(1, element.offsetHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, -element.getBoundingClientRect().top / range));
    frame.current?.contentWindow?.postMessage({ type: "prepara-timeline-progress", progress }, window.location.origin);
  };

  return (
    <section className="method-timeline" ref={section} aria-label="Seis etapas do método Prepara ASB/TSB">
      <iframe ref={frame} onLoad={onFrameLoad} src={`${basePath}/timeline/`} title="Linha do tempo interativa com as seis etapas do curso" loading="lazy" className="method-timeline-frame" tabIndex={-1} />
      <ol className="method-timeline-static">
        {steps.map((step, index) => <li key={step.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}
      </ol>
    </section>
  );
}
