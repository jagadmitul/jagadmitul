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

      {/* Calligraphic line-art MJ - three sequenced strokes drawn on like
          a signature: M first, a baseline arc connecting M's bottom-right
          to J's bottom-left (the calligraphic flourish), then J with its
          hook. Stroked in primary, rounded caps, no font dependency.
          The mj-stroke class on each path drives the stagger via CSS. */}
      <svg
        className="mj-letters relative select-none"
        viewBox="0 0 280 140"
        fill="none"
        stroke="var(--primary)"
        strokeLinejoin="round"
        strokeLinecap="round"
        style={{
          width: "82%",
          maxWidth: "560px",
          height: "auto",
        }}
        aria-label="Mitul Jagad monogram"
      >
        {/* M - 4 angular strokes meeting at sharp peaks */}
        <path
          className="mj-stroke mj-stroke-1"
          d="M 20 128 L 20 16 L 75 92 L 130 16 L 130 128"
          strokeWidth="14"
        />
        {/* Calligraphic connector - a downward arc from M's bottom-right
            looping under the baseline and rising into J's bottom-left.
            Thinner than the letters so it reads as a flourish, not a
            third letter. */}
        <path
          className="mj-stroke mj-stroke-2"
          d="M 130 128 Q 162 152, 188 128"
          strokeWidth="7"
          opacity="0.65"
        />
        {/* J - vertical bar with hook at the bottom */}
        <path
          className="mj-stroke mj-stroke-3"
          d="M 250 16 L 250 92 Q 250 128, 218 128 Q 188 128, 188 100"
          strokeWidth="14"
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
