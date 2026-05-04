"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/lib/reduced-motion";

/**
 * Top progress bar that runs across the viewport on every navigation.
 * Mirrors the pattern Vercel / Notion / Linear all use: a 2px primary
 * line fills from 0 → 100% width over ~520ms, sits a beat at full width,
 * then fades out. Fast, premium, app-like — no full-screen colour flash.
 */
export function RouteCurtain() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setTick((t) => t + 1);
  }, [pathname]);

  if (reduced) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={tick}
        className="fixed top-0 left-0 right-0 z-[200] pointer-events-none h-[2px] origin-left"
        style={{
          background: "var(--primary)",
          boxShadow: "0 0 12px 0 color-mix(in srgb, var(--primary) 60%, transparent)",
        }}
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: [0, 0.6, 1, 1], opacity: [1, 1, 1, 0] }}
        transition={{
          duration: 0.85,
          times: [0, 0.45, 0.7, 1],
          ease: [0.65, 0, 0.35, 1],
        }}
      />
    </AnimatePresence>
  );
}
