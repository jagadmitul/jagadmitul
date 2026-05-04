"use client";

import { useRef } from "react";
import clsx from "clsx";
import { useReducedMotion } from "@/lib/reduced-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  max?: number; // max degrees of tilt
};

/**
 * Wraps a card so it tilts subtly toward the cursor — adds a sense of depth
 * without being theatrical. Resets on mouse leave. Disabled under
 * reduced motion.
 */
export function TiltCard({ children, className, max = 6 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    const rx = -y * max;
    const ry = x * max;
    ref.current.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale3d(1.005, 1.005, 1)`;
  }

  function onLeave() {
    if (!ref.current) return;
    ref.current.style.transform = `perspective(900px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={clsx("h-full", className)}
      style={{
        transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
