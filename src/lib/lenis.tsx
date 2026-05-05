"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { useReducedMotion } from "@/lib/reduced-motion";

/**
 * Lenis smooth-scroll provider. Tuned for a long, buttery, slightly heavy
 * feel - the previous 1.15s duration felt tight; this is calmer and more
 * editorial. Disabled entirely under `prefers-reduced-motion`.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    // Force the page to start at scroll=0 BEFORE Lenis initialises so
    // there's no mismatch between the browser's restored position and
    // Lenis's internal state. NO_FLASH_SCRIPT also does this, but doing
    // it again here covers the post-hydration window when fonts and
    // dynamic content could have nudged the scroll.
    window.scrollTo(0, 0);
    const lenis = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });
    // Tell Lenis its current scroll is exactly 0 - overrides any value it
    // would have read from window.scrollY.
    lenis.scrollTo(0, { immediate: true });
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
