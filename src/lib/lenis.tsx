"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { useReducedMotion } from "@/lib/reduced-motion";

/**
 * Lenis smooth-scroll provider. Tuned for a long, buttery, slightly heavy
 * feel — the previous 1.15s duration felt tight; this is calmer and more
 * editorial. Disabled entirely under `prefers-reduced-motion`.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({
      // Lerp-only mode (no duration) — feels snappier and more responsive
      // than the previous duration-based easing which felt heavy/tight.
      lerp: 0.12,
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });
    let frameId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };
    frameId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, [reduced]);

  return <>{children}</>;
}
