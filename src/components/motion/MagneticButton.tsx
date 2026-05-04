"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/reduced-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
  type?: "button" | "submit";
};

/**
 * Magnetic button with a tight activation radius — only pulls toward the
 * cursor when the cursor is hovering directly over (or 1.5× the button's
 * own size away from) the element. Springs back to rest immediately on
 * leave. Disabled under reduced motion.
 *
 * Lower strength + tighter radius than the previous version so the
 * Resume button doesn't visibly drift across the page.
 */
export function MagneticButton({
  children,
  className,
  href,
  onClick,
  strength = 0.18,
  type = "button",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) return;

    let raf = 0;
    let tx = 0,
      ty = 0,
      cx = 0,
      cy = 0;

    const tick = () => {
      tx += (cx - tx) * 0.22;
      ty += (cy - ty) * 0.22;
      el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      // Tight activation zone — only react when cursor is within the
      // button's own footprint expanded slightly.
      const insideX = Math.abs(dx) < r.width * 0.7;
      const insideY = Math.abs(dy) < r.height * 1.1;
      if (!insideX || !insideY) {
        cx = 0;
        cy = 0;
        setActive(false);
        return;
      }
      cx = dx * strength;
      cy = dy * strength;
      setActive(true);
    };

    const onLeave = () => {
      cx = 0;
      cy = 0;
      setActive(false);
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      el.style.transform = "";
    };
  }, [reduced, strength]);

  const baseClass =
    "inline-flex items-center justify-center gap-2 will-change-transform " +
    (className ?? "") +
    (active ? " scale-[1.02]" : "");

  if (href) {
    return (
      <a ref={ref as React.RefObject<HTMLAnchorElement>} href={href} className={baseClass}>
        {children}
      </a>
    );
  }
  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      className={baseClass}
    >
      {children}
    </button>
  );
}
