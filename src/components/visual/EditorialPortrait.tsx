"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated editorial line-art portrait.
 *
 * Performance notes (re-tuned 2026-05-04 after lag report):
 *   - NO requestAnimationFrame loop. The previous version polled per-frame
 *     and called getBoundingClientRect() on every tick, which forces layout
 *     and burned CPU even when the mouse wasn't moving. Now pupil tracking
 *     is driven by `mousemove` directly with a cached bounding rect (only
 *     re-measured on resize/scroll), so it costs ~zero when idle.
 *   - IntersectionObserver pauses the breathing animation and stops
 *     listening to mousemove when the portrait is off-screen.
 *   - Hair-sway dropped — barely visible, costs a constant transform
 *     composite. Only breathing remains, softer (1.006) and slower (7s).
 *   - Eyelid blink uses a single setTimeout chain, no rAF.
 *   - Pupils animate via CSS `transform: translate3d` (composited) rather
 *     than setAttribute("cx") (would re-paint).
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

  // Pause everything when off-screen
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

  // Pupil tracking — event-driven, not rAF. Caches the SVG rect and only
  // re-measures on resize/scroll. When the portrait is off-screen the
  // listener detaches entirely.
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
      const off = Math.min(3.5, dist / 80);
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

  // Blink — random 4-7s interval, runs only while visible
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
        {/* HAIR — static now, no sway. Sway burned a constant transform composite. */}
        <g>
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
            style={{ willChange: "transform" }}
          />
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
            style={{ willChange: "transform" }}
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
        <path
          className={drawCls}
          d="M 300 185 L 295 215 Q 300 222, 308 218"
          strokeWidth="1.8"
        />
        <path
          className={drawCls}
          d="M 275 240 Q 300 252, 325 240"
          strokeWidth="2"
        />
        <path
          className={drawCls}
          d="M 240 240 C 250 270, 280 285, 300 285 C 320 285, 350 270, 360 240"
          strokeWidth="1.4"
          opacity="0.7"
        />
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
