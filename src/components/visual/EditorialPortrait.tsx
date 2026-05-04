"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated editorial line-art portrait — replaces the static "MJ" monogram
 * in the IntroCard. Built as one continuous SVG of strokes (hair, face,
 * eyes, beard, collar) all using `var(--primary)`, so it adapts to every
 * theme. Lifecycle:
 *   1. On mount the strokes draw on (stroke-dasharray reveal, ~1.6s)
 *   2. Continuous: subtle breathing (group scale 1 → 1.008 → 1, 5s loop)
 *   3. Continuous: hair strands sway via group rotate
 *   4. Pupils track the cursor (clamped to ±3px) — the portrait "looks at"
 *      the visitor as they move around the page
 *   5. Eyes blink every 4–7s (random) via a sliding eyelid mask
 *
 * Pure SVG, no canvas. Reduced-motion: skips the breathing/sway/blink and
 * just draws the static portrait.
 */
export function EditorialPortrait() {
  const wrapRef = useRef<SVGSVGElement | null>(null);
  const lidLeftRef = useRef<SVGRectElement | null>(null);
  const lidRightRef = useRef<SVGRectElement | null>(null);
  const pupilLeftRef = useRef<SVGCircleElement | null>(null);
  const pupilRightRef = useRef<SVGCircleElement | null>(null);
  const [drawn, setDrawn] = useState(false);

  // Trigger the draw-on animation after first paint
  useEffect(() => {
    const id = window.setTimeout(() => setDrawn(true), 60);
    return () => window.clearTimeout(id);
  }, []);

  // Pupil tracking + blinking
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    let raf = 0;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const tick = () => {
      const svg = wrapRef.current;
      if (svg) {
        const rect = svg.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = mouseX - cx;
        const dy = mouseY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const off = Math.min(3.5, dist / 80);
        const ox = (dx / dist) * off;
        const oy = (dy / dist) * off;
        if (pupilLeftRef.current) {
          pupilLeftRef.current.setAttribute("cx", String(255 + ox));
          pupilLeftRef.current.setAttribute("cy", String(175 + oy));
        }
        if (pupilRightRef.current) {
          pupilRightRef.current.setAttribute("cx", String(345 + ox));
          pupilRightRef.current.setAttribute("cy", String(175 + oy));
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Random blink
    let blinkTimer = 0;
    const scheduleBlink = () => {
      const delay = 3000 + Math.random() * 4000;
      blinkTimer = window.setTimeout(() => {
        const lids = [lidLeftRef.current, lidRightRef.current];
        lids.forEach((lid) => {
          if (!lid) return;
          lid.style.transition = "transform 90ms ease-in";
          lid.style.transform = "scaleY(1)";
          window.setTimeout(() => {
            lid.style.transition = "transform 130ms ease-out";
            lid.style.transform = "scaleY(0)";
          }, 110);
        });
        scheduleBlink();
      }, delay);
    };
    scheduleBlink();

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      window.clearTimeout(blinkTimer);
    };
  }, []);

  // CSS class string for any path that should draw-on on mount.
  const drawCls = `portrait-stroke ${drawn ? "portrait-stroke-drawn" : ""}`;

  return (
    <svg
      ref={wrapRef}
      viewBox="0 0 600 400"
      className="absolute inset-0 w-full h-full portrait-breathing"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Eyelid clip — used to mask blinking */}
        <clipPath id="eye-left-clip">
          <ellipse cx="255" cy="175" rx="14" ry="8" />
        </clipPath>
        <clipPath id="eye-right-clip">
          <ellipse cx="345" cy="175" rx="14" ry="8" />
        </clipPath>
      </defs>

      <g
        stroke="var(--primary)"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* HAIR — gently swaying group */}
        <g className="portrait-hair-sway">
          <path
            className={drawCls}
            d="M 195 100
               C 200 70, 240 45, 300 45
               C 360 45, 400 70, 405 110
               C 408 130, 405 150, 400 165"
            strokeWidth="2.4"
          />
          <path
            className={drawCls}
            d="M 215 110 C 230 90, 270 75, 320 80"
            strokeWidth="1.6"
          />
          <path
            className={drawCls}
            d="M 250 95 C 280 80, 320 78, 350 90"
            strokeWidth="1.4"
          />
        </g>

        {/* FACE oval */}
        <path
          className={drawCls}
          d="M 200 165
             C 200 240, 240 280, 300 280
             C 360 280, 400 240, 400 165"
          strokeWidth="2.4"
        />

        {/* EYES — left */}
        <g>
          <ellipse
            className={drawCls}
            cx="255"
            cy="175"
            rx="14"
            ry="8"
            strokeWidth="2"
          />
          <circle
            ref={pupilLeftRef}
            cx="255"
            cy="175"
            r="3"
            fill="var(--primary)"
            stroke="none"
            style={{ transition: "cx 80ms ease, cy 80ms ease" }}
          />
          {/* eyelid — scales down to invisible at rest, scales up to blink */}
          <rect
            ref={lidLeftRef}
            x="241"
            y="167"
            width="28"
            height="16"
            fill="var(--paper-2)"
            stroke="none"
            clipPath="url(#eye-left-clip)"
            style={{
              transformOrigin: "255px 167px",
              transform: "scaleY(0)",
            }}
          />
        </g>

        {/* EYES — right */}
        <g>
          <ellipse
            className={drawCls}
            cx="345"
            cy="175"
            rx="14"
            ry="8"
            strokeWidth="2"
          />
          <circle
            ref={pupilRightRef}
            cx="345"
            cy="175"
            r="3"
            fill="var(--primary)"
            stroke="none"
            style={{ transition: "cx 80ms ease, cy 80ms ease" }}
          />
          <rect
            ref={lidRightRef}
            x="331"
            y="167"
            width="28"
            height="16"
            fill="var(--paper-2)"
            stroke="none"
            clipPath="url(#eye-right-clip)"
            style={{
              transformOrigin: "345px 167px",
              transform: "scaleY(0)",
            }}
          />
        </g>

        {/* EYEBROWS */}
        <path
          className={drawCls}
          d="M 240 158 Q 255 152, 270 158"
          strokeWidth="2.2"
        />
        <path
          className={drawCls}
          d="M 330 158 Q 345 152, 360 158"
          strokeWidth="2.2"
        />

        {/* NOSE */}
        <path
          className={drawCls}
          d="M 300 185 L 295 215 Q 300 222, 308 218"
          strokeWidth="1.8"
        />

        {/* MOUTH */}
        <path
          className={drawCls}
          d="M 275 240 Q 300 252, 325 240"
          strokeWidth="2"
        />

        {/* BEARD hint */}
        <path
          className={drawCls}
          d="M 240 240 C 250 270, 280 285, 300 285 C 320 285, 350 270, 360 240"
          strokeWidth="1.4"
          opacity="0.7"
        />

        {/* COLLAR + SHIRT */}
        <path
          className={drawCls}
          d="M 200 320 L 260 290 L 300 310 L 340 290 L 400 320 L 420 380 L 180 380 Z"
          strokeWidth="2.2"
        />
        <path
          className={drawCls}
          d="M 290 305 L 300 330 L 310 305"
          strokeWidth="1.8"
        />
      </g>
    </svg>
  );
}
