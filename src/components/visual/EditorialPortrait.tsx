"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated terminal console - the IntroCard identity element.
 *
 * Replaces the previous portrait/monogram attempts with something
 * genuinely different: a stylised macOS-style terminal that cycles
 * through real developer commands and outputs, typing each one out
 * character-by-character with a blinking cursor. Five frames cycle
 * forever, each ~3.5s, telling the story of what Mitul actually does:
 *
 *   $ whoami           -> Senior Full Stack & AI Engineer
 *   $ git log -1       -> feat: ship JinRaag + JinRoop
 *   $ agent.invoke     -> LangGraph multi-step pipeline
 *   $ stats            -> 100K+ users, 50s -> 4s, 5+ yrs
 *   $ open status      -> Online, available for contracts
 *
 * Always-dark terminal styling regardless of palette (classic dev feel).
 * The primary-color accents inside (the prompt, the soft halo, the glow)
 * adapt to whichever theme is active. Subtle 3D tilt on cursor.
 *
 * Performance: typing animation uses one chained setTimeout, no rAF.
 * Component pauses when off-screen (IntersectionObserver). Reduced
 * motion shows the final frame statically.
 */
const FRAMES = [
  {
    cmd: "whoami",
    out: "Senior Full Stack & AI Engineer",
    note: "Surat, IN  -  UTC+05:30",
  },
  {
    cmd: "git log -1 --oneline",
    out: "feat: ship JinRaag + JinRoop",
    note: "Mitul  -  2 days ago  -  main",
  },
  {
    cmd: "await agent.invoke({ task })",
    out: "// LangGraph multi-step pipeline",
    note: "shipped @ medchron.ai",
  },
  {
    cmd: "stats --since 2020",
    out: "100K+ users  -  50s -> 4s  -  5+ yrs",
    note: "production-verified",
  },
  {
    cmd: "open status",
    out: "Online  -  Available for contracts",
    note: "30 hrs/wk  -  reply within 24h",
  },
] as const;

const TYPE_SPEED = 38; // ms per character
const COMMAND_HOLD = 280; // ms after command typed before output appears
const FRAME_HOLD = 2400; // ms full frame is shown before advancing

export function EditorialPortrait() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [frameIdx, setFrameIdx] = useState(0);
  const [typedCmd, setTypedCmd] = useState("");
  const [showOut, setShowOut] = useState(false);

  // Mount entry
  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 60);
    return () => window.clearTimeout(id);
  }, []);

  // Pause when off-screen
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

  // Typing animation - one frame at a time, advances on its own
  useEffect(() => {
    if (!visible) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const current = FRAMES[frameIdx];

    if (reduced) {
      // Show full frame statically, no typing animation
      setTypedCmd(current.cmd);
      setShowOut(true);
      return;
    }

    // Reset for new frame
    setTypedCmd("");
    setShowOut(false);

    let charIdx = 0;
    let typeTimer = 0;
    let outTimer = 0;
    let advanceTimer = 0;

    const typeNext = () => {
      charIdx++;
      setTypedCmd(current.cmd.slice(0, charIdx));
      if (charIdx < current.cmd.length) {
        typeTimer = window.setTimeout(typeNext, TYPE_SPEED);
      } else {
        // Command finished typing - reveal output after small pause
        outTimer = window.setTimeout(() => setShowOut(true), COMMAND_HOLD);
        // Then hold the full frame, then advance
        advanceTimer = window.setTimeout(
          () => setFrameIdx((f) => (f + 1) % FRAMES.length),
          COMMAND_HOLD + FRAME_HOLD,
        );
      }
    };

    typeTimer = window.setTimeout(typeNext, TYPE_SPEED);

    return () => {
      window.clearTimeout(typeTimer);
      window.clearTimeout(outTimer);
      window.clearTimeout(advanceTimer);
    };
  }, [frameIdx, visible]);

  // Cursor 3D tilt - CSS variable updates only, no React state
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
    };
    const onLeave = () => {
      wrap.style.setProperty("--mx", "0.5");
      wrap.style.setProperty("--my", "0.5");
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

  const current = FRAMES[frameIdx];

  return (
    <div
      ref={wrapRef}
      className={`mj-stage absolute inset-0 grid place-items-center p-4 ${
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
      {/* Soft primary halo - bleeds out from behind the terminal */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 55%, color-mix(in srgb, var(--primary) 28%, transparent) 0%, transparent 70%)",
        }}
      />

      {/* The terminal window. Always dark (classic terminal aesthetic
          regardless of light/dark theme). Primary-color accents inside
          adapt to the active palette. */}
      <div
        className="mj-letters relative w-full max-w-md rounded-2xl overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #14171f 0%, #0c0e13 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow:
            "0 24px 48px -16px color-mix(in srgb, var(--primary) 50%, transparent), 0 1px 0 rgba(255,255,255,0.06) inset",
        }}
      >
        {/* Title bar */}
        <div className="flex items-center gap-1.5 px-3.5 py-2.5 border-b border-white/[0.06]">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "#ff5f57" }}
          />
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "#febc2e" }}
          />
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "#28c840" }}
          />
          <span className="ml-3 text-[0.6rem] font-mono uppercase tracking-[0.18em] text-white/40">
            ~ / mitul
          </span>
        </div>

        {/* Body */}
        <div
          className="px-4 py-4 font-mono text-[0.78rem] sm:text-sm space-y-1.5"
          style={{ minHeight: "9rem" }}
        >
          {/* Command line */}
          <div className="flex gap-2 items-baseline">
            <span style={{ color: "var(--primary)" }}>$</span>
            <span className="text-white/90 break-all">
              {typedCmd}
              <span
                className="inline-block w-1.5 h-3.5 ml-0.5 align-middle"
                style={{
                  background: showOut ? "transparent" : "var(--primary)",
                  animation: showOut ? "none" : "term-blink 1s steps(2) infinite",
                }}
              />
            </span>
          </div>

          {/* Output */}
          <div
            className="pl-3.5 text-white/85 break-words transition-opacity duration-300"
            style={{ opacity: showOut ? 1 : 0 }}
          >
            {current.out}
          </div>

          {/* Note (smaller, dimmer) */}
          <div
            className="pl-3.5 text-[0.7rem] text-white/45 transition-opacity duration-500"
            style={{ opacity: showOut ? 1 : 0, transitionDelay: "120ms" }}
          >
            {current.note}
          </div>
        </div>
      </div>
    </div>
  );
}
