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

type Ripple = { id: number; x: number; y: number };

/**
 * Morphing primary "ink" cursor:
 *   - Soft semi-transparent primary blob that lags + smooths on movement
 *   - Squashes and rotates in the direction of motion (velocity-aware)
 *   - Morphs into a labeled pill on `data-cursor-label` elements
 *   - Sprouts an expanding ring ripple on every click
 *   - A tiny crisp dot at the actual pointer position so accuracy is kept
 *
 * Disabled on touch and under prefers-reduced-motion.
 */
export function CustomCursor() {
  const reduced = useReducedMotion();
  const isTouch = useMediaQuery("(pointer: coarse)");
  const [hovered, setHovered] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const blobRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const rippleId = useRef(0);

  // Latest values readable inside the rAF loop without re-running the effect.
  const hoveredRef = useRef(false);
  const labelRef = useRef<string | null>(null);
  hoveredRef.current = hovered;
  labelRef.current = label;

  useEffect(() => {
    if (reduced || isTouch) return;

    let raf = 0;
    let mouseX = -200;
    let mouseY = -200;
    let blobX = -200;
    let blobY = -200;
    let prevBlobX = -200;
    let prevBlobY = -200;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 3}px, ${mouseY - 3}px, 0)`;
      }
    };

    const tick = () => {
      blobX += (mouseX - blobX) * 0.16;
      blobY += (mouseY - blobY) * 0.16;

      const dx = blobX - prevBlobX;
      const dy = blobY - prevBlobY;
      const speed = Math.min(Math.sqrt(dx * dx + dy * dy), 50);
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

      const stretch = 1 + Math.min(speed / 65, 0.55);
      const squash = 1 - Math.min(speed / 130, 0.22);

      if (blobRef.current) {
        const isHover = hoveredRef.current;
        const hasLabel = !!labelRef.current;
        const w = isHover ? (hasLabel ? 110 : 48) : 28;
        const h = isHover ? (hasLabel ? 38 : 48) : 28;
        const baseTranslate = `translate3d(${blobX - w / 2}px, ${blobY - h / 2}px, 0)`;
        const motion = isHover
          ? ""
          : ` rotate(${angle}deg) scale(${stretch}, ${squash})`;
        blobRef.current.style.transform = baseTranslate + motion;
      }

      prevBlobX = blobX;
      prevBlobY = blobY;
      raf = requestAnimationFrame(tick);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = t.closest(
        "a, button, [role=button], input, textarea, select, [data-cursor-hover]",
      );
      setHovered(!!interactive);
      const labelEl = t.closest<HTMLElement>("[data-cursor-label]");
      setLabel(labelEl?.dataset.cursorLabel ?? null);
    };

    const onLeave = () => {
      setHovered(false);
      setLabel(null);
    };

    const onClick = (e: MouseEvent) => {
      const id = ++rippleId.current;
      setRipples((rs) => [...rs, { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(() => {
        setRipples((rs) => rs.filter((r) => r.id !== id));
      }, 650);
    };

    document.body.style.cursor = "none";
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onClick);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onClick);
      document.body.style.cursor = "";
    };
  }, [reduced, isTouch]);

  if (reduced || isTouch) return null;

  return (
    <>
      {/* Soft morphing blob — semi-transparent primary fill, no border. */}
      <div
        ref={blobRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          width: hovered ? (label ? 110 : 48) : 28,
          height: hovered ? (label ? 38 : 48) : 28,
          borderRadius: hovered && label ? 999 : "50%",
          backgroundColor: hovered
            ? "var(--primary)"
            : "color-mix(in srgb, var(--primary) 32%, transparent)",
          backdropFilter: hovered ? "none" : "blur(2px)",
          boxShadow: hovered
            ? "0 8px 24px -6px color-mix(in srgb, var(--primary) 55%, transparent)"
            : "0 0 18px 2px color-mix(in srgb, var(--primary) 22%, transparent)",
          transition:
            "width 280ms cubic-bezier(0.34,1.56,0.64,1), height 280ms cubic-bezier(0.34,1.56,0.64,1), border-radius 240ms cubic-bezier(0.22,1,0.36,1), background-color 220ms ease, box-shadow 220ms ease",
          willChange: "transform, width, height, border-radius",
        }}
      >
        {label && (
          <span
            className="absolute inset-0 grid place-items-center px-3 text-[0.62rem] font-mono uppercase tracking-[0.16em] text-[color:var(--primary-ink)] whitespace-nowrap"
            style={{ pointerEvents: "none" }}
          >
            {label}
          </span>
        )}
      </div>

      {/* Crisp accuracy dot at exact pointer (hides on hover) */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: "var(--primary)",
          opacity: hovered ? 0 : 0.9,
          transition: "opacity 160ms ease",
          willChange: "transform",
        }}
      />

      {/* Click ripples — outer span handles translate, inner span animates
          the scale via keyframes. Keeping them on separate elements means the
          transform from translate doesn't get clobbered by the scale animation. */}
      {ripples.map((r) => (
        <span
          key={r.id}
          aria-hidden="true"
          className="pointer-events-none fixed top-0 left-0 z-[9998]"
          style={{
            transform: `translate3d(${r.x - 14}px, ${r.y - 14}px, 0)`,
            width: 28,
            height: 28,
          }}
        >
          <span
            className="cursor-ripple block w-full h-full rounded-full"
            style={{ border: "1.5px solid var(--primary)" }}
          />
        </span>
      ))}
    </>
  );
}
