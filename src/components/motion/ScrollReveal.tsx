"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useReducedMotion } from "@/lib/reduced-motion";

type ScrollRevealProps = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
};

/**
 * Scroll-triggered fade + lift reveal. Tightened from the previous
 * version: shorter duration (0.45s) and smaller lift (16px) so the
 * initial above-the-fold load doesn't feel empty/laggy. Disables under
 * reduced motion. Always passes `className` through so callers can use
 * `h-full` etc. for stretchable layouts.
 */
export function ScrollReveal({
  children,
  delay = 0,
  y = 16,
  className,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once, margin: "0px 0px -5% 0px" });

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{
        duration: 0.45,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
