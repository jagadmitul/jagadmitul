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

        {/* Eyelid masks — match the new almond-eye geometry */}
        <clipPath id="eye-left-clip">
          <path d="M 240 213 Q 256 205, 272 213 Q 256 222, 240 213 Z" />
        </clipPath>
        <clipPath id="eye-right-clip">
          <path d="M 328 213 Q 344 205, 360 213 Q 344 222, 328 213 Z" />
        </clipPath>
      </defs>

      {/* Spotlight */}
      <ellipse
        cx="300"
        cy="200"
        rx="260"
        ry="220"
        fill="url(#portrait-spotlight)"
      />

      {/* ─────────────── BLAZER ─────────────── */}
      {/* Big shoulder shape that fills the bottom of the frame so the
          subject doesn't look like a floating head. Shoulders go all the
          way to the edges. */}
      <g>
        <path
          d="M 0 460
             L 0 410
             C 60 365, 140 340, 215 333
             L 250 340
             L 300 380
             L 350 340
             L 385 333
             C 460 340, 540 365, 600 410
             L 600 460 Z"
          fill={BLAZER}
        />
        {/* Shirt collar — clean small V, no fussy lapels */}
        <path
          d="M 250 340
             L 280 372
             L 300 388
             L 320 372
             L 350 340
             L 335 350
             L 300 380
             L 265 350 Z"
          fill={SHIRT}
        />
        {/* Inner skin V at neckline */}
        <path
          d="M 280 372 L 300 388 L 320 372 L 305 360 L 300 364 L 295 360 Z"
          fill={SKIN}
        />
      </g>

      {/* ─────────────── NECK ─────────────── */}
      <path
        d="M 275 295
           Q 275 335, 290 360
           L 310 360
           Q 325 335, 325 295 Z"
        fill={SKIN}
      />

      {/* ─────────────── FACE — egg shape, taller than wide, young proportions.
          Top hides under the hair; the visible face starts around y=160. */}
      <path
        d="M 215 195
           C 215 145, 245 115, 300 115
           C 355 115, 385 145, 385 195
           C 385 240, 380 270, 365 290
           C 350 305, 325 315, 300 315
           C 275 315, 250 305, 235 290
           C 220 270, 215 240, 215 195 Z"
        fill={SKIN}
      />

      {/* ─────────────── HAIR — full styled wavy quiff, sits ON TOP of the
          face (renders after face so it covers crown). NOT a helmet — has
          three distinct tufts on the upper edge for texture. */}
      <g>
        <path
          d="M 213 200
             C 208 165, 212 130, 232 105
             C 248 88, 264 80, 280 80
             Q 280 65, 298 60
             Q 320 58, 332 75
             Q 340 65, 358 70
             Q 380 80, 388 100
             C 400 115, 408 140, 408 170
             C 408 188, 405 200, 400 205
             L 395 195
             Q 388 175, 372 168
             L 360 172
             Q 335 145, 305 148
             Q 280 152, 262 168
             Q 245 175, 230 175
             Q 220 175, 213 200 Z"
          fill={HAIR}
        />
        {/* Wave highlight on the quiff */}
        <path
          d="M 248 95
             Q 282 75, 320 85
             Q 350 95, 372 115
             Q 348 100, 318 95
             Q 285 90, 252 105 Z"
          fill={HAIR}
          opacity="0.7"
        />
        {/* Forehead hairline subtle stroke */}
        <path
          d="M 230 175 Q 270 170, 305 173 Q 350 175, 372 178"
          stroke={STROKE}
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          opacity="0.3"
        />
      </g>

      {/* ─────────────── BEARD — sits low on the face. Top edge stays well
          BELOW the eyes. Cheekbone-to-chin shape that follows real beard
          growth (not covering the mouth-and-up region). */}
      <path
        d="M 230 245
           Q 235 270, 250 290
           Q 270 308, 300 312
           Q 330 308, 350 290
           Q 365 270, 370 245
           Q 358 250, 345 250
           Q 322 250, 300 250
           Q 278 250, 255 250
           Q 242 250, 230 245 Z"
        fill={BEARD}
      />
      {/* Mustache (separate filled shape that doesn't block the mouth) */}
      <path
        d="M 270 240
           Q 285 234, 300 240
           Q 315 234, 330 240
           Q 320 244, 300 244
           Q 280 244, 270 240 Z"
        fill={BEARD}
      />

      {/* ─────────────── EYEBROWS — bold, slight upward tilt = friendly */}
      <path
        className={drawCls}
        d="M 238 195 Q 256 188, 274 194"
        stroke={STROKE}
        strokeWidth="3.4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        className={drawCls}
        d="M 326 194 Q 344 188, 362 195"
        stroke={STROKE}
        strokeWidth="3.4"
        strokeLinecap="round"
        fill="none"
      />

      {/* ─────────────── EYES (left) — almond-shaped with stroke outline,
          smaller and more refined than v4's round eyes. */}
      <g>
        {/* Almond outline — confident upper + lower lids */}
        <path
          d="M 240 213 Q 256 207, 272 213 Q 256 220, 240 213 Z"
          fill="var(--paper-2)"
          stroke={STROKE}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle
          ref={pupilLeftRef}
          cx="256"
          cy="213"
          r="3"
          fill={STROKE}
          style={{ willChange: "transform" }}
        />
        <circle cx="257.5" cy="211.5" r="1" fill="var(--paper-2)" />
        <rect
          ref={lidLeftRef}
          x="240"
          y="206"
          width="32"
          height="14"
          fill={SKIN}
          stroke="none"
          clipPath="url(#eye-left-clip)"
          style={{
            transformOrigin: "256px 207px",
            transform: "scaleY(0)",
          }}
        />
      </g>

      {/* ─────────────── EYES (right) ─────────────── */}
      <g>
        <path
          d="M 328 213 Q 344 207, 360 213 Q 344 220, 328 213 Z"
          fill="var(--paper-2)"
          stroke={STROKE}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle
          ref={pupilRightRef}
          cx="344"
          cy="213"
          r="3"
          fill={STROKE}
          style={{ willChange: "transform" }}
        />
        <circle cx="345.5" cy="211.5" r="1" fill="var(--paper-2)" />
        <rect
          ref={lidRightRef}
          x="328"
          y="206"
          width="32"
          height="14"
          fill={SKIN}
          stroke="none"
          clipPath="url(#eye-right-clip)"
          style={{
            transformOrigin: "344px 207px",
            transform: "scaleY(0)",
          }}
        />
      </g>

      {/* ─────────────── NOSE — short clean curve, well above the beard */}
      <path
        d="M 298 225 Q 296 240, 300 247 Q 304 250, 308 247"
        stroke={STROKE}
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
        opacity="0.55"
      />

      {/* ─────────────── MOUTH — gentle smile in the gap between mustache
          and beard */}
      <path
        className={drawCls}
        d="M 285 268 Q 300 274, 315 268"
        stroke={STROKE}
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
