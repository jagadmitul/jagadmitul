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
      {/* Soft primary halo behind the letters - the only background piece.
          No more nested glass plate (was creating a frame-inside-frame). */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 50% 50%, color-mix(in srgb, var(--primary) 22%, transparent) 0%, transparent 70%)",
        }}
      />

      {/* Signature-style MJ - thin flowing strokes, all smooth curves
          (no sharp angles), drawn on in sequence like a real signature.
          Three strokes: M as one continuous cursive shape, a thin
          baseline flourish connecting the letters, J descending with a
          hook. ~3px stroke - the elegant weight, not the chunky one. */}
      <svg
        className="mj-letters relative select-none"
        viewBox="0 0 280 110"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
        style={{
          width: "82%",
          maxWidth: "560px",
          height: "auto",
        }}
        aria-label="Mitul Jagad monogram"
      >
        {/* M as a single flowing cursive stroke - two smooth peaks with
            curves at the bottom (not angular hairpin valleys). */}
        <path
          className="mj-stroke mj-stroke-1"
          d="M 22 92
             C 22 35, 28 14, 56 14
             C 80 14, 84 50, 84 86
             C 84 50, 96 14, 122 14
             C 148 14, 152 38, 152 92"
        />
        {/* Calligraphic baseline flourish - thin sweep from M's exit to
            J's entry. Lighter so it reads as a connecting hairline, not
            a third letter. */}
        <path
          className="mj-stroke mj-stroke-2"
          d="M 152 92 C 170 102, 190 102, 200 92"
          strokeWidth="2"
          opacity="0.55"
        />
        {/* J - clean vertical descending into a smooth hook curve */}
        <path
          className="mj-stroke mj-stroke-3"
          d="M 232 14
             L 232 72
             C 232 92, 210 98, 192 90
             C 180 84, 180 72, 192 70"
        />
      </svg>

      {/* Cursor-tracking spotlight - now covers the full stage since there's
          no glass plate to clip it. Soft primary radial that follows the
          cursor and screen-blends over the letters. */}
      <div
        aria-hidden="true"
        className="mj-spotlight absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle 220px at calc(var(--mx) * 100%) calc(var(--my) * 100%), color-mix(in srgb, var(--primary) 38%, transparent), transparent 55%)",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
