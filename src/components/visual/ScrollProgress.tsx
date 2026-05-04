"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useReducedMotion } from "@/lib/reduced-motion";

/**
 * Thin progress bar pinned to the top of the viewport that fills as the
 * page is scrolled. Pure motion utility — no JS overhead beyond Motion's
 * scroll listener.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  if (reduced) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-primary z-[9998] origin-left pointer-events-none"
      style={{ scaleX }}
    />
  );
}
