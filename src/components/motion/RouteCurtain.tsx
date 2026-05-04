"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/lib/reduced-motion";

/**
 * Route curtain — every navigation (and the first page load) triggers a
 * primary-color panel that sweeps DOWN across the entire viewport from
 * above the page to below it. The motion takes 900ms total: ~450ms to
 * fully cover the screen, ~450ms to slide off the bottom revealing the
 * destination page.
 *
 * Two stacked panels (a darker base + a lighter primary-tinted leading
 * edge) so the wipe reads as a real "curtain" with depth, not a flat
 * color flash. Pointer-events disabled the whole way so clicks don't
 * land on the curtain.
 *
 * Reduced-motion: renders nothing, route changes are instant.
 */
export function RouteCurtain() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [tick, setTick] = useState(0);

  // Fire one curtain pass per pathname change. The `tick` state remounts
  // the AnimatePresence child (via key) so motion runs from scratch even
  // if the user clicks two links in quick succession.
  useEffect(() => {
    setTick((t) => t + 1);
  }, [pathname]);

  if (reduced) return null;

  return (
    <AnimatePresence>
      <motion.div
        key={tick}
        className="fixed inset-0 z-[200] pointer-events-none"
        initial={{ y: "-101%" }}
        animate={{ y: "101%" }}
        transition={{
          duration: 0.9,
          ease: [0.76, 0, 0.24, 1],
        }}
        onAnimationComplete={() => {
          // Component lives forever; the next pathname change re-keys it.
        }}
      >
        {/* Trailing band — slightly darker primary, sits below the top edge */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, color-mix(in srgb, var(--primary) 88%, var(--ink)) 0%, var(--primary) 35%, var(--primary) 100%)",
          }}
        />
        {/* Leading edge highlight — a 24px primary-ink band right at the
            top of the curtain so it reads as a sharp moving edge, not a
            mass of solid color. */}
        <div
          className="absolute top-0 left-0 right-0"
          style={{
            height: 24,
            background:
              "linear-gradient(to bottom, color-mix(in srgb, var(--primary-ink) 60%, transparent), transparent)",
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
