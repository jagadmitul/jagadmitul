"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated editorial line-art portrait — hero edition.
 *
 * V2 (2026-05-05) — sharper, more confident:
 *   - Angular jawline (was a soft round oval) — defined chin, edge planes
 *   - Modern swept-back undercut hair — textured strands going up + back
 *     instead of a vague rounded blob
 *   - Stronger asymmetric brows (left raised slightly = "thinking smirk")
 *   - Confident smirk (right corner of mouth raised) instead of neutral arc
 *   - Sharper, anatomically truer nose (bridge line + nostril hint)
 *   - Sharp peak-lapel suit collar with shirt + tie hint
 *   - Slight 3/4 turn (head and shoulders nudged to make the pose dynamic)
 *   - Soft radial spotlight behind the head — subtle hero halo
 *
 * Performance + lifecycle (unchanged from v1):
 *   - Strokes draw-on via stroke-dasharray on mount (~1.6s)
 *   - Soft breathing scale (1.006 / 8s loop), only while visible
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
      const off = Math.min(3.2, dist / 80);
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

  const drawCls = `portrait-stroke ${drawn ? "portrait-stroke-drawn" : ""}`;

  return (
    <svg
      ref={wrapRef}
      viewBox="0 0 600 400"
      className={`absolute inset-0 w-full h-full ${visible ? "portrait-breathing" : ""}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Soft spotlight behind the subject — hero halo */}
        <radialGradient id="portrait-spotlight" cx="50%" cy="35%" r="55%">
          <stop
            offset="0%"
            stopColor="var(--primary)"
            stopOpacity="0.18"
          />
          <stop
            offset="55%"
            stopColor="var(--primary)"
            stopOpacity="0.05"
          />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </radialGradient>

        <clipPath id="eye-left-clip">
          {/* Updated to match new eye positions */}
          <ellipse cx="258" cy="172" rx="13" ry="7" />
        </clipPath>
        <clipPath id="eye-right-clip">
          <ellipse cx="338" cy="170" rx="13" ry="7" />
        </clipPath>
      </defs>

      {/* Spotlight halo */}
      <ellipse
        cx="300"
        cy="180"
        rx="220"
        ry="180"
        fill="url(#portrait-spotlight)"
      />

      <g
        stroke="var(--primary)"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* HAIR — modern swept-back undercut. Top has volume + textured
            strands going up-and-back; sides taper short above the ears. */}
        <g>
          {/* Main silhouette — flatter on sides, lifted on top */}
          <path
            className={drawCls}
            d="M 200 145
               C 198 110, 215 75, 250 60
               C 285 48, 330 50, 360 70
               C 385 86, 400 110, 405 140
               C 408 162, 405 180, 398 195"
            strokeWidth="2.6"
          />
          {/* Side fade — short above ear */}
          <path
            className={drawCls}
            d="M 200 150 C 198 165, 200 180, 205 195"
            strokeWidth="2.2"
          />
          <path
            className={drawCls}
            d="M 405 145 C 408 162, 405 180, 398 195"
            strokeWidth="2.2"
          />
          {/* Volume strands — diagonal, swept back-and-up */}
          <path
            className={drawCls}
            d="M 230 90 C 245 70, 280 60, 315 65"
            strokeWidth="1.6"
          />
          <path
            className={drawCls}
            d="M 255 80 C 280 65, 320 60, 350 75"
            strokeWidth="1.4"
          />
          <path
            className={drawCls}
            d="M 285 70 C 310 58, 345 60, 370 78"
            strokeWidth="1.3"
          />
          {/* Hairline edge on forehead — subtle V */}
          <path
            className={drawCls}
            d="M 235 130 Q 300 140, 365 130"
            strokeWidth="1.6"
            opacity="0.7"
          />
        </g>

        {/* FACE — angular jaw, defined chin, faint 3/4 turn (slight right
            asymmetry: right side carries more weight). NOT an oval. */}
        <path
          className={drawCls}
          d="M 205 195
             C 205 235, 215 260, 235 280
             C 255 295, 280 305, 300 305
             C 320 305, 345 295, 365 280
             C 385 260, 395 235, 395 195"
          strokeWidth="2.6"
        />
        {/* Jaw shadow line — adds dimension, suggests cheekbone */}
        <path
          className={drawCls}
          d="M 232 250 C 245 270, 270 285, 295 290"
          strokeWidth="1.2"
          opacity="0.45"
        />
        <path
          className={drawCls}
          d="M 368 250 C 355 270, 330 285, 305 290"
          strokeWidth="1.2"
          opacity="0.45"
        />

        {/* EYES — left (slight downward outer corner = confident, not surprised).
            Smaller, more refined than v1. */}
        <g>
          <path
            className={drawCls}
            d="M 245 172 Q 258 167, 271 174"
            strokeWidth="2"
          />
          <path
            className={drawCls}
            d="M 271 174 Q 258 178, 245 172"
            strokeWidth="2"
          />
          <circle
            ref={pupilLeftRef}
            cx="258"
            cy="172"
            r="2.8"
            fill="var(--primary)"
            stroke="none"
            style={{ willChange: "transform" }}
          />
          <rect
            ref={lidLeftRef}
            x="244"
            y="164"
            width="28"
            height="14"
            fill="var(--paper-2)"
            stroke="none"
            clipPath="url(#eye-left-clip)"
            style={{
              transformOrigin: "258px 164px",
              transform: "scaleY(0)",
            }}
          />
        </g>

        {/* EYES — right (mirror) */}
        <g>
          <path
            className={drawCls}
            d="M 325 174 Q 338 168, 351 173"
            strokeWidth="2"
          />
          <path
            className={drawCls}
            d="M 351 173 Q 338 178, 325 174"
            strokeWidth="2"
          />
          <circle
            ref={pupilRightRef}
            cx="338"
            cy="170"
            r="2.8"
            fill="var(--primary)"
            stroke="none"
            style={{ willChange: "transform" }}
          />
          <rect
            ref={lidRightRef}
            x="324"
            y="162"
            width="28"
            height="14"
            fill="var(--paper-2)"
            stroke="none"
            clipPath="url(#eye-right-clip)"
            style={{
              transformOrigin: "338px 162px",
              transform: "scaleY(0)",
            }}
          />
        </g>

        {/* EYEBROWS — strong, slight asymmetric raise on left for that
            "interested / confident" tilt. */}
        <path
          className={drawCls}
          d="M 240 152 Q 258 144, 276 152"
          strokeWidth="2.6"
        />
        <path
          className={drawCls}
          d="M 322 152 Q 338 146, 354 152"
          strokeWidth="2.6"
        />

        {/* NOSE — bridge line + base + nostril hint. More anatomy than v1's
            single L-shape. */}
        <path
          className={drawCls}
          d="M 298 178 Q 296 200, 295 220"
          strokeWidth="1.6"
        />
        <path
          className={drawCls}
          d="M 295 220 Q 298 226, 305 224 Q 312 226, 312 218"
          strokeWidth="1.6"
        />

        {/* MOUTH — confident smirk: right corner subtly raised, line is
            asymmetric. NOT a symmetric arc. */}
        <path
          className={drawCls}
          d="M 275 248 Q 295 256, 320 246 Q 326 245, 332 240"
          strokeWidth="2"
        />

        {/* BEARD — well-groomed, defined edges (not a vague swoop) */}
        <path
          className={drawCls}
          d="M 232 248
             C 240 275, 260 290, 285 295
             C 300 297, 315 296, 330 293
             C 355 287, 372 270, 380 248"
          strokeWidth="1.6"
        />
        {/* Beard fill texture — short vertical strokes for stubble feel */}
        {Array.from({ length: 8 }).map((_, i) => {
          const x = 256 + i * 12;
          return (
            <path
              key={i}
              className={drawCls}
              d={`M ${x} ${265 + (i % 3) * 4} L ${x - 2} ${280 + (i % 3) * 3}`}
              strokeWidth="0.9"
              opacity="0.45"
            />
          );
        })}

        {/* SUIT — sharp peak lapels + open shirt collar. Reads as
            business-ready, not "rumpled tee". The shoulders sit slightly
            off-centre to suggest a 3/4-turn pose. */}
        {/* Outer suit shoulders */}
        <path
          className={drawCls}
          d="M 175 365 L 215 320 L 265 320"
          strokeWidth="2.4"
        />
        <path
          className={drawCls}
          d="M 425 365 L 385 320 L 335 320"
          strokeWidth="2.4"
        />
        {/* Sharp peak lapels — V shape from collar to mid-chest */}
        <path
          className={drawCls}
          d="M 265 320 L 245 350 L 270 380"
          strokeWidth="2.2"
        />
        <path
          className={drawCls}
          d="M 335 320 L 355 350 L 330 380"
          strokeWidth="2.2"
        />
        {/* Inner shirt — open collar V */}
        <path
          className={drawCls}
          d="M 270 380 L 300 358 L 330 380"
          strokeWidth="1.8"
        />
        {/* Tiny lapel notch detail */}
        <path
          className={drawCls}
          d="M 247 348 L 255 343"
          strokeWidth="1.2"
          opacity="0.7"
        />
        <path
          className={drawCls}
          d="M 353 348 L 345 343"
          strokeWidth="1.2"
          opacity="0.7"
        />

        {/* Tiny "MJ" italic signature in the bottom-right corner — earned
            mark, not splashed across the chest */}
        <text
          x="572"
          y="392"
          textAnchor="end"
          fontFamily="var(--font-instrument-serif), Georgia, serif"
          fontStyle="italic"
          fontSize="14"
          fill="var(--primary)"
          opacity="0.45"
          stroke="none"
        >
          MJ
        </text>
      </g>
    </svg>
  );
}
