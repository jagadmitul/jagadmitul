"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "@/lib/reduced-motion";

/**
 * Page transition wrapper. Cross-fades + softly blur-reveals the new page
 * content on every route change. Combined with the top RouteCurtain
 * progress bar, this gives the site an app-like feel without a heavy
 * full-screen overlay flash.
 *
 * The chrome (Header / Footer / Cursor / Background3D / AskMitul) stays
 * outside this wrapper so it never re-mounts during transitions.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, filter: "blur(6px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, filter: "blur(6px)" }}
        transition={{
          duration: 0.34,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
