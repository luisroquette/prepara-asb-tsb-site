"use client";

import { useEffect } from "react";

export default function ScrollEffects() {
  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const targets = document.querySelectorAll<HTMLElement>('[data-scroll-reveal]');
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('scroll-visible');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    targets.forEach((target) => observer.observe(target));
    document.documentElement.classList.add('scroll-effects-ready');
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove('scroll-effects-ready');
    };
  }, []);

  return null;
}
