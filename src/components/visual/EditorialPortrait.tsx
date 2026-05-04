"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Notionists-style avatar of Mitul.
 *
 * V3 → V4 (2026-05-05): switched from line-art to a FILLED-SHAPE illustration
 * (the visual language that Notionists / Lorelei / Personas all share).
 * Hand-built so it reads as Mitul: wavy dark hair with volume on top, full
 * neatly-trimmed beard, friendly smile, navy blazer over a coloured shirt,
 * slight 3/4 turn. All fills derived from var(--primary) via color-mix
 * so the avatar re-tints in every theme — vermilion, sage, plum, mono —
 * not just blue.
 *
 * Tonal palette (all driven from --primary):
 *   - hair / brows         : --primary mixed with --ink (dark)
 *   - skin                 : --paper-2 with a small primary tint
 *   - beard                : --primary at ~80% with --ink (medium-dark)
 *   - blazer               : --primary mixed with --ink (dark accent)
 *   - shirt                : --primary mixed with --paper-2 (light accent)
 *
 * Animations preserved from v1-v3:
 *   - Strokes draw-on via stroke-dasharray on mount (~1.6s)
 *   - Soft breathing (1.006 / 8s loop), only while visible
 *   - Pupils track the cursor via mousemove + cached rect (no rAF)
 *   - Eyes blink every 4-7s
 *   - IntersectionObserver pauses everything off-screen
 *   - Honours prefers-reduced-motion
 */
export function EditorialPortrait() {
  const wrapRef = useRef<SVGSVGElement | null>(null);
  const lidLeftRef = useRef<SVGRectElement | null>(null);
  const lidRightRef = useRef<SVGRectElement | null>(null);
  const pupilLeftRef = useRef<SVGCircleElement | null>(null);
  const pupilRightRef = useRef<SVGCircleElement | null>(null);
  const [drawn, setDrawn] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = window.setTimeout(() => setDrawn(true), 60);
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

    let rect: DOMRect | null = null;
    const measure = () => {
      rect = wrapRef.current?.getBoundingClientRect() ?? null;
    };
    measure();

    const onMove = (e: MouseEvent) => {
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const off = Math.min(2.5, dist / 100);
      const ox = (dx / dist) * off;
      const oy = (dy / dist) * off;
      const t = `translate3d(${ox}px, ${oy}px, 0)`;
      if (pupilLeftRef.current) pupilLeftRef.current.style.transform = t;
      if (pupilRightRef.current) pupilRightRef.current.style.transform = t;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    let timer = 0;
    const blink = () => {
      const lids = [lidLeftRef.current, lidRightRef.current];
      lids.forEach((lid) => {
        if (!lid) return;
        lid.style.transition = "transform 90ms ease-in";
        lid.style.transform = "scaleY(1)";
        window.setTimeout(() => {
          if (!lid) return;
          lid.style.transition = "transform 130ms ease-out";
          lid.style.transform = "scaleY(0)";
        }, 110);
      });
    };
    const schedule = () => {
      const delay = 4000 + Math.random() * 3000;
      timer = window.setTimeout(() => {
        blink();
        schedule();
      }, delay);
    };
    schedule();
    return () => window.clearTimeout(timer);
  }, [visible]);

  // Class hook for the legacy line-stroke draw-on (kept for the few outline
  // strokes that survive the rewrite — beard edge, jacket lapel, mouth).
  const drawCls = `portrait-stroke ${drawn ? "portrait-stroke-drawn" : ""}`;

  // Tonal palette — every fill below derives from these CSS color-mix
  // expressions so the avatar adapts to whichever palette is active.
  const SKIN = "color-mix(in srgb, var(--paper-2) 78%, var(--primary) 22%)";
  const HAIR = "color-mix(in srgb, var(--primary) 65%, var(--ink) 35%)";
  const BEARD = "color-mix(in srgb, var(--primary) 70%, var(--ink) 30%)";
  const BLAZER = "color-mix(in srgb, var(--primary) 60%, var(--ink) 40%)";
  const SHIRT = "color-mix(in srgb, var(--primary) 78%, var(--paper-2) 22%)";
  const STROKE = "color-mix(in srgb, var(--ink) 80%, var(--primary) 20%)";

  return (
    <svg
      ref={wrapRef}
      viewBox="0 0 600 460"
      className={`absolute inset-0 w-full h-full ${visible ? "portrait-breathing" : ""}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Soft primary spotlight halo behind the subject */}
        <radialGradient id="portrait-spotlight" cx="50%" cy="35%" r="55%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.2" />
          <stop offset="55%" stopColor="var(--primary)" stopOpacity="0.06" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </radialGradient>

        {/* Eyelid masks — used by the blink animation */}
        <clipPath id="eye-left-clip">
          <ellipse cx="252" cy="207" rx="11" ry="8" />
        </clipPath>
        <clipPath id="eye-right-clip">
          <ellipse cx="338" cy="207" rx="11" ry="8" />
        </clipPath>
      </defs>

      {/* Spotlight */}
      <ellipse
        cx="300"
        cy="200"
        rx="240"
        ry="200"
        fill="url(#portrait-spotlight)"
      />

      {/* ─────────────── BLAZER (back-most, big shape) ─────────────── */}
      <g>
        {/* Outer blazer silhouette */}
        <path
          d="M 100 460
             L 100 415
             C 130 380, 175 358, 210 350
             L 240 345
             L 300 380
             L 360 345
             L 390 350
             C 425 358, 470 380, 500 415
             L 500 460 Z"
          fill={BLAZER}
        />
        {/* Shirt — V-neck collar shape, sits inside the blazer */}
        <path
          d="M 240 345
             L 268 380
             L 300 405
             L 332 380
             L 360 345
             L 350 360
             L 300 395
             L 250 360 Z"
          fill={SHIRT}
        />
        {/* Inner shirt opening (skin V) */}
        <path
          d="M 268 380 L 300 405 L 332 380 L 305 360 L 300 365 L 295 360 Z"
          fill={SKIN}
        />
        {/* Lapel notch detail — subtle stroke */}
        <path
          d="M 245 365 L 268 380 M 355 365 L 332 380"
          stroke={STROKE}
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
      </g>

      {/* ─────────────── NECK (behind face, in front of blazer) ─────────────── */}
      <path
        d="M 268 320
           Q 268 360, 285 380
           L 315 380
           Q 332 360, 332 320 Z"
        fill={SKIN}
      />

      {/* ─────────────── FACE shape (skin) ─────────────── */}
      <path
        d="M 200 220
           C 200 175, 230 140, 300 140
           C 370 140, 400 175, 400 220
           C 400 280, 370 320, 300 320
           C 230 320, 200 280, 200 220 Z"
        fill={SKIN}
      />

      {/* ─────────────── BEARD (sits on top of skin, defined edge) ─────────────── */}
      <path
        d="M 215 230
           C 215 270, 230 305, 260 320
           Q 280 328, 300 328
           Q 320 328, 340 320
           C 370 305, 385 270, 385 230
           C 385 235, 380 245, 372 250
           C 360 252, 350 252, 340 250
           Q 320 246, 300 246
           Q 280 246, 260 250
           C 250 252, 240 252, 228 250
           C 220 245, 215 235, 215 230 Z"
        fill={BEARD}
      />
      {/* Beard texture — short subtle highlights */}
      <g opacity="0.18">
        {Array.from({ length: 10 }).map((_, i) => {
          const x = 232 + i * 14;
          return (
            <path
              key={i}
              d={`M ${x} ${268 + (i % 3) * 4} L ${x} ${280 + (i % 3) * 3}`}
              stroke={SKIN}
              strokeWidth="1.1"
              strokeLinecap="round"
              fill="none"
            />
          );
        })}
      </g>

      {/* ─────────────── HAIR — wavy short with volume on top ─────────────── */}
      <g>
        {/* Main hair mass — covers crown, sides, hairline */}
        <path
          d="M 200 200
             C 196 165, 205 130, 225 105
             C 240 88, 260 78, 285 75
             C 310 72, 335 75, 360 90
             C 385 105, 400 135, 405 170
             C 408 188, 405 205, 400 218
             L 395 200
             Q 380 180, 360 175
             L 350 178
             Q 320 158, 290 162
             Q 270 165, 255 175
             Q 240 180, 225 178
             Q 210 180, 200 200 Z"
          fill={HAIR}
        />
        {/* Wavy strand 1 — adds texture on top */}
        <path
          d="M 230 110
             Q 260 92, 295 95
             Q 330 100, 360 115
             Q 340 102, 305 96
             Q 270 92, 240 105 Z"
          fill={HAIR}
          opacity="0.85"
        />
        {/* Wavy strand 2 — slight volume notch */}
        <path
          d="M 270 80
             Q 305 72, 340 88
             Q 320 78, 295 78
             Q 280 78, 270 80 Z"
          fill={HAIR}
          opacity="0.7"
        />
        {/* Subtle hairline texture along forehead */}
        <path
          d="M 225 175
             Q 250 168, 280 168
             Q 320 168, 365 175"
          stroke={STROKE}
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          opacity="0.35"
        />
      </g>

      {/* ─────────────── EYEBROWS — bold confident bars ─────────────── */}
      <path
        className={drawCls}
        d="M 235 185 Q 252 178, 270 184"
        stroke={STROKE}
        strokeWidth="3.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        className={drawCls}
        d="M 320 184 Q 338 178, 355 185"
        stroke={STROKE}
        strokeWidth="3.6"
        strokeLinecap="round"
        fill="none"
      />

      {/* ─────────────── EYES (left) ─────────────── */}
      <g>
        {/* Sclera */}
        <ellipse
          cx="252"
          cy="207"
          rx="11"
          ry="6"
          fill="var(--paper-2)"
        />
        {/* Iris ring (subtle) */}
        <circle cx="252" cy="207" r="5" fill={STROKE} opacity="0.15" />
        {/* Pupil — animated */}
        <circle
          ref={pupilLeftRef}
          cx="252"
          cy="207"
          r="3.4"
          fill={STROKE}
          style={{ willChange: "transform" }}
        />
        {/* Pupil highlight */}
        <circle
          cx="253.5"
          cy="205.5"
          r="1.1"
          fill="var(--paper-2)"
        />
        {/* Eyelid — slides down on blink */}
        <rect
          ref={lidLeftRef}
          x="240"
          y="200"
          width="24"
          height="14"
          fill={SKIN}
          stroke="none"
          clipPath="url(#eye-left-clip)"
          style={{
            transformOrigin: "252px 200px",
            transform: "scaleY(0)",
          }}
        />
      </g>

      {/* ─────────────── EYES (right) ─────────────── */}
      <g>
        <ellipse
          cx="338"
          cy="207"
          rx="11"
          ry="6"
          fill="var(--paper-2)"
        />
        <circle cx="338" cy="207" r="5" fill={STROKE} opacity="0.15" />
        <circle
          ref={pupilRightRef}
          cx="338"
          cy="207"
          r="3.4"
          fill={STROKE}
          style={{ willChange: "transform" }}
        />
        <circle
          cx="339.5"
          cy="205.5"
          r="1.1"
          fill="var(--paper-2)"
        />
        <rect
          ref={lidRightRef}
          x="326"
          y="200"
          width="24"
          height="14"
          fill={SKIN}
          stroke="none"
          clipPath="url(#eye-right-clip)"
          style={{
            transformOrigin: "338px 200px",
            transform: "scaleY(0)",
          }}
        />
      </g>

      {/* ─────────────── NOSE — minimal soft hint ─────────────── */}
      <path
        d="M 296 220
           Q 294 240, 296 250
           Q 300 254, 305 252"
        stroke={STROKE}
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
        opacity="0.45"
      />

      {/* ─────────────── MOUTH — friendly smile (sits on the beard) ─────────────── */}
      <path
        className={drawCls}
        d="M 282 285 Q 300 293, 318 285"
        stroke={STROKE}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
