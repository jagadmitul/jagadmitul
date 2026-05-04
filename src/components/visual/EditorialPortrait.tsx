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
        {/* HAIR — full, confident wavy quiff. Big silhouette on top with
            real volume; covers the whole crown so it doesn't read as bald.
            Wavy front, swept slightly to one side. */}
        <g>
          {/* Outer hair silhouette — bold sweeping curve from temple to temple */}
          <path
            className={drawCls}
            d="M 195 175
               C 188 130, 200 80, 245 55
               C 280 40, 320 38, 360 52
               C 395 66, 412 105, 410 150
               C 410 165, 408 180, 405 195"
            strokeWidth="3"
          />
          {/* Wavy front — defines hair line on forehead */}
          <path
            className={drawCls}
            d="M 215 145
               Q 240 130, 265 138
               Q 290 148, 315 132
               Q 345 120, 380 138
               Q 400 148, 408 158"
            strokeWidth="2.2"
          />
          {/* Volume — internal flow line giving the quiff height */}
          <path
            className={drawCls}
            d="M 240 110 Q 280 80, 330 88 Q 370 96, 395 120"
            strokeWidth="1.6"
            opacity="0.7"
          />
          <path
            className={drawCls}
            d="M 260 92 Q 300 70, 360 84"
            strokeWidth="1.4"
            opacity="0.55"
          />
        </g>

        {/* FACE — sharper V-jaw, narrower than v2. Defined chin point. */}
        <path
          className={drawCls}
          d="M 200 195
             C 200 235, 210 265, 232 290
             C 252 308, 280 320, 300 320
             C 320 320, 348 308, 368 290
             C 390 265, 400 235, 400 195"
          strokeWidth="2.8"
        />

        {/* EYES — left (clean dash + pupil, no ellipse outline) */}
        <g>
          <path
            className={drawCls}
            d="M 244 174 Q 258 169, 272 174"
            strokeWidth="2.4"
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

        {/* EYES — right */}
        <g>
          <path
            className={drawCls}
            d="M 324 174 Q 338 169, 352 174"
            strokeWidth="2.4"
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

        {/* EYEBROWS — bold, confident, both straight (no asymmetry — the
            asymmetry from v2 read as confused, not confident) */}
        <path
          className={drawCls}
          d="M 240 154 L 274 152"
          strokeWidth="3"
        />
        <path
          className={drawCls}
          d="M 322 152 L 356 154"
          strokeWidth="3"
        />

        {/* NOSE — clean simple line. No nostril detail — was overdoing it. */}
        <path
          className={drawCls}
          d="M 298 188 L 296 218 Q 298 224, 306 222"
          strokeWidth="1.8"
        />

        {/* MOUTH — calm confident smile, gentle upward curve */}
        <path
          className={drawCls}
          d="M 278 250 Q 300 256, 322 250"
          strokeWidth="2.2"
        />

        {/* BEARD — clean defined edge, no stubble dots */}
        <path
          className={drawCls}
          d="M 232 250
             C 242 280, 268 305, 300 308
             C 332 305, 358 280, 368 250"
          strokeWidth="1.8"
        />

        {/* TURTLENECK / CREW — clean sweater silhouette, no fussy lapels.
            Reads as 'creative-director / founder' rather than 'banker'. */}
        <path
          className={drawCls}
          d="M 165 380
             L 220 335
             Q 260 320, 300 320
             Q 340 320, 380 335
             L 435 380"
          strokeWidth="2.6"
        />
        {/* Subtle collar fold */}
        <path
          className={drawCls}
          d="M 250 340 Q 300 348, 350 340"
          strokeWidth="1.6"
          opacity="0.7"
        />
      </g>
    </svg>
  );
}
