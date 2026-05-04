"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "@/lib/reduced-motion";

function subscribeMql(query: string) {
  return (cb: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", cb);
    return () => mql.removeEventListener("change", cb);
  };
}

function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    subscribeMql(query),
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/**
 * A custom dual-cursor: a smooth-trailing ring + a centered dot. Expands on
 * any element marked `data-cursor-hover` or with role="button"/anchor/button.
 * Optionally swaps to a text label when hovering elements with
 * `data-cursor-label="..."`.
 *
 * Disabled entirely on touch devices and under `prefers-reduced-motion`.
 */
export function CustomCursor() {
  const reduced = useReducedMotion();
  const isTouch = useMediaQuery("(pointer: coarse)");
  const [hovered, setHovered] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (reduced || isTouch) return;

    let raf = 0;
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
      }
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX - 18}px, ${ringY - 18}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive =
        t.closest("a, button, [role=button], input, textarea, select, [data-cursor-hover]");
      setHovered(!!interactive);
      const labelEl = t.closest<HTMLElement>("[data-cursor-label]");
      setLabel(labelEl?.dataset.cursorLabel ?? null);
    };

    const onLeave = () => {
      setHovered(false);
      setLabel(null);
    };

    document.body.style.cursor = "none";
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseleave", onLeave);
      document.body.style.cursor = "";
    };
  }, [reduced, isTouch]);

  if (reduced || isTouch) return null;

  return (
    <>
      {/* Outer ring — eased follower */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: `1.5px solid var(--primary)`,
          transition:
            "width 220ms cubic-bezier(0.22,1,0.36,1), height 220ms cubic-bezier(0.22,1,0.36,1), background-color 200ms, border-radius 220ms",
          ...(hovered && {
            width: label ? 110 : 56,
            height: label ? 38 : 56,
            backgroundColor: "var(--primary)",
            mixBlendMode: "multiply" as const,
            borderRadius: label ? 12 : "50%",
          }),
        }}
      >
        {label && (
          <span
            className="absolute inset-0 grid place-items-center text-[0.62rem] font-mono uppercase tracking-wider text-primary-ink"
            style={{ pointerEvents: "none" }}
          >
            {label}
          </span>
        )}
      </div>
      {/* Inner dot — instant follower */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "var(--primary)",
          opacity: hovered ? 0 : 1,
          transition: "opacity 160ms",
        }}
      />
    </>
  );
}
