"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
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

// Number of trailing droplets behind the head. Reduced from 6 → 4 after
// perf review — each droplet is a node the SVG goo filter blurs + merges,
// and the filter cost is roughly linear in droplet count.
const TRAIL_COUNT = 4;

/**
 * Liquid mercury cursor. A head droplet leads, six trailing droplets fall
 * progressively further behind, all wrapped in an SVG `feGaussianBlur` +
 * `feColorMatrix` "goo" filter so they merge into one flowing blob that
 * pinches and stretches with motion. On hover over interactive elements
 * the trail collapses into the head and (if the element has
 * `data-cursor-label`) a label pill peels out beside it. Click emits an
 * expanding ring ripple.
 *
 * Disabled on touch and under `prefers-reduced-motion`.
 */
export function CustomCursor() {
  const reduced = useReducedMotion();
  const isTouch = useMediaQuery("(pointer: coarse)");
  const [hovered, setHovered] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const headRef = useRef<HTMLDivElement | null>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRef = useRef<HTMLDivElement | null>(null);
  const rippleId = useRef(0);

  const hoveredRef = useRef(false);
  const labelStrRef = useRef<string | null>(null);
  hoveredRef.current = hovered;
  labelStrRef.current = label;

  useEffect(() => {
    if (reduced || isTouch) return;

    let raf = 0;
    let running = false;
    let mouseX = -200;
    let mouseY = -200;

    const nodes = Array.from({ length: TRAIL_COUNT + 1 }, (_, i) => ({
      x: -200,
      y: -200,
      lerp: 0.32 - i * 0.035,
    }));

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Wake the rAF loop on movement. Once everything is settled the
      // loop pauses itself; this restarts it.
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const tick = () => {
      const isHover = hoveredRef.current;
      const hasLabel = !!labelStrRef.current;
      const tightening = isHover ? 0.55 : 0;

      // Track the largest delta this frame — if every node is essentially
      // settled (delta < 0.15px), we pause the loop until the next mousemove.
      let maxDelta = 0;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const target =
          i === 0
            ? { x: mouseX, y: mouseY }
            : {
                x: nodes[i - 1].x,
                y: nodes[i - 1].y,
              };
        const lerp = Math.min(1, n.lerp + tightening);
        const ndx = (target.x - n.x) * lerp;
        const ndy = (target.y - n.y) * lerp;
        n.x += ndx;
        n.y += ndy;
        const d = Math.abs(ndx) + Math.abs(ndy);
        if (d > maxDelta) maxDelta = d;

        const el = i === 0 ? headRef.current : trailRefs.current[i - 1];
        if (!el) continue;

        let w: number;
        let h: number;
        if (i === 0) {
          w = isHover ? (hasLabel ? 64 : 40) : 22;
          h = isHover ? 40 : 22;
        } else {
          const t = 1 - i / (TRAIL_COUNT + 1.4);
          const s = 18 * t;
          w = isHover ? s * 0.55 : s;
          h = w;
        }
        el.style.width = `${w}px`;
        el.style.height = `${h}px`;
        el.style.transform = `translate3d(${n.x - w / 2}px, ${n.y - h / 2}px, 0)`;
      }

      if (labelRef.current) {
        const head = nodes[0];
        labelRef.current.style.transform = `translate3d(${head.x + 22}px, ${head.y - 14}px, 0)`;
      }

      // Idle gate — pause the loop when the cursor has fully caught up.
      // Hover state changes also wake the loop via the deps array on the
      // outer effect (it tears down + re-runs).
      if (maxDelta < 0.15) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
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
      // Wake the loop so the size transition stays centred over the next
      // ~280ms while CSS transitions the width/height.
      wake();
      // Keep ticking for the duration of the size transition (~280ms +
      // settle), since maxDelta could be < 0.15 even mid-transition.
      const stopAt = performance.now() + 360;
      const keepAlive = () => {
        if (performance.now() < stopAt) {
          wake();
          window.setTimeout(keepAlive, 50);
        }
      };
      keepAlive();
    };

    const onLeave = () => {
      setHovered(false);
      setLabel(null);
      wake();
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
      {/* SVG filter defs — fixed-position 0×0 svg so it doesn't take layout
          space. The gooey filter blurs all children of `.cursor-goo` and then
          stamps a hard alpha threshold so anything close enough merges into
          one liquid blob. */}
      <svg
        aria-hidden="true"
        width={0}
        height={0}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
      >
        <defs>
          {/* Smaller stdDeviation (was 6, now 4) — Gaussian blur is the
              filter's hot path and cost scales with the kernel size. The
              feComposite stage is dropped because the alpha threshold
              already gives crisp edges; one less filter pass per frame. */}
          <filter id="cursor-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 18 -9"
            />
          </filter>
        </defs>
      </svg>

      {/* Goo wrapper — full-viewport, non-interactive. Holds head + trail
          droplets so the SVG filter can merge them. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9999]"
        style={{
          filter: "url(#cursor-goo)",
        }}
      >
        {/* Head droplet — solid primary fill */}
        <div
          ref={headRef}
          className="absolute top-0 left-0 rounded-full"
          style={{
            backgroundColor: "var(--primary)",
            transition:
              "width 260ms cubic-bezier(0.34,1.56,0.64,1), height 260ms cubic-bezier(0.34,1.56,0.64,1)",
            willChange: "transform, width, height",
          }}
        />
        {/* Trail droplets — same primary fill, gooey filter merges them
            into the head so they read as one liquid ribbon */}
        {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              trailRefs.current[i] = el;
            }}
            className="absolute top-0 left-0 rounded-full"
            style={{
              backgroundColor: "var(--primary)",
              willChange: "transform, width, height",
            }}
          />
        ))}
      </div>

      {/* Label pill — sits outside the goo wrapper so text is sharp.
          Position is updated per-frame in the rAF loop. */}
      <div
        ref={labelRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[10000]"
        style={{ willChange: "transform" }}
      >
        {label && hovered && (
          <span
            className="inline-block rounded-full bg-[color:var(--primary)] px-3 py-1 text-[0.62rem] font-mono uppercase tracking-[0.16em] text-[color:var(--primary-ink)] whitespace-nowrap shadow-lg cursor-label-in"
          >
            {label}
          </span>
        )}
      </div>

      {/* Click ripples */}
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
