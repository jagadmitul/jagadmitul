"use client";

import { useEffect, useRef, useState } from "react";

/**
 * MJ monogram - the "trading-card foil" version.
 *
 * Replaced the line-art portrait with a layered identity mark that
 * actually feels premium across every theme:
 *
 *   1. Massive italic Instrument Serif "MJ" - primary-coloured letterforms
 *      with a slow sheen sweep (background-clip: text + animated
 *      background-position).
 *   2. Glassmorphic plate sitting behind the letters with backdrop-blur
 *      and a hairline border. Tones derived from --paper-2 + --ink so it
 *      reads correctly in light / dark / vermilion / sage / plum / mono.
 *   3. 3D tilt that follows the cursor over the card - the letters and
 *      glass plate rotate in opposite depths for parallax (perspective +
 *      preserve-3d). Returns to rest when the cursor leaves.
 *   4. A soft primary spotlight overlay that tracks the cursor like a
 *      light catching on the foil.
 *   5. Idle float - the letters drift on a 7s loop so the mark breathes
 *      even when the visitor isn't moving.
 *   6. Mount entry - fades + pops up from scale 0.88 once visible.
 *
 * Cursor + mount are pure CSS-variable + class toggles (no per-frame
 * React state), so the runtime cost stays at zero when idle. Reduced
 * motion + off-screen visibility both pause everything. The mouse
 * listener attaches only when the card is in view.
 */
export function EditorialPortrait() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 60);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!wrapRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) setVisible(e.isIntersecting);
      },
      { threshold: 0.1 },
    );
    io.observe(wrapRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const wrap = wrapRef.current;
    if (!wrap) return;

    let rect: DOMRect | null = null;
    const measure = () => {
      rect = wrap.getBoundingClientRect();
    };
    measure();

    const onMove = (e: MouseEvent) => {
      if (!rect) return;
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      wrap.style.setProperty("--mx", String(Math.max(0, Math.min(1, x))));
      wrap.style.setProperty("--my", String(Math.max(0, Math.min(1, y))));
      wrap.classList.add("mj-active");
    };
    const onLeave = () => {
      wrap.style.setProperty("--mx", "0.5");
      wrap.style.setProperty("--my", "0.5");
      wrap.classList.remove("mj-active");
    };

    wrap.addEventListener("mousemove", onMove, { passive: true });
    wrap.addEventListener("mouseleave", onLeave);
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [visible]);

  return (
    <div
      ref={wrapRef}
      className={`mj-stage absolute inset-0 grid place-items-center ${
        mounted ? "mj-mounted" : ""
      }`}
      style={
        {
          perspective: "1100px",
          "--mx": "0.5",
          "--my": "0.5",
        } as React.CSSProperties
      }
    >
      {/* Soft primary halo behind everything - bleeds out of the plate */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 60% at 50% 45%, color-mix(in srgb, var(--primary) 22%, transparent) 0%, transparent 70%)",
        }}
      />

      {/* Glass plate */}
      <div
        aria-hidden="true"
        className="mj-glass absolute rounded-3xl"
        style={{
          inset: "10%",
          background:
            "color-mix(in srgb, var(--paper-2) 35%, transparent)",
          border:
            "1px solid color-mix(in srgb, var(--ink) 14%, transparent)",
          backdropFilter: "blur(18px) saturate(140%)",
          WebkitBackdropFilter: "blur(18px) saturate(140%)",
          boxShadow:
            "0 12px 40px -12px color-mix(in srgb, var(--primary) 25%, transparent), inset 0 1px 0 color-mix(in srgb, var(--paper-2) 50%, transparent)",
        }}
      />

      {/* MJ letterforms */}
      <div
        className="mj-letters relative font-display select-none"
        style={{
          fontStyle: "italic",
          fontSize: "clamp(7rem, 16vw, 13rem)",
          lineHeight: 1,
          letterSpacing: "-0.06em",
        }}
      >
        MJ
      </div>

      {/* Cursor-tracking spotlight */}
      <div
        aria-hidden="true"
        className="mj-spotlight absolute pointer-events-none rounded-3xl"
        style={{
          inset: "10%",
          background:
            "radial-gradient(circle 220px at calc(var(--mx) * 100%) calc(var(--my) * 100%), color-mix(in srgb, var(--primary) 38%, transparent), transparent 55%)",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
