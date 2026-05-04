"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "@/lib/reduced-motion";

/**
 * Page transition wrapper. Keys an AnimatePresence on the current pathname
 * so every route change cross-fades + lifts the page content. Reduced
 * motion: no animation, just renders children directly.
 *
 * Mounted in the root layout, wrapping the children prop. The chrome
 * (Header / Footer / Cursor / Background3D / AskMitul) sits OUTSIDE the
 * transition so it stays put while pages cross-fade — that's what makes
 * the navigation feel smooth instead of janky.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
