"use client";

import { useInView, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/reduced-motion";

type Props = {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
};

/**
 * Animated number counter that runs once when the element enters the
 * viewport. Springs from 0 → `to` with the given duration. Falls back
 * to the static final value under reduced motion.
 */
export function CountUp({
  to,
  suffix = "",
  prefix = "",
  duration = 1.6,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const reduced = useReducedMotion();
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (reduced || !inView) return;
    motionValue.set(to);
    const unsub = spring.on("change", (latest) => {
      setDisplay(latest);
    });
    return () => unsub();
  }, [inView, to, motionValue, spring, reduced]);

  const renderValue = reduced ? to : display;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {Math.round(renderValue).toLocaleString()}
      {suffix}
    </span>
  );
}
