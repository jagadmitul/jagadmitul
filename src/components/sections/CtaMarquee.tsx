"use client";

import { ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/motion/MagneticButton";

const PHRASES = [
  "AVAILABLE FOR HIRE",
  "SHIPPING AI AGENTS",
  "READING EXPLAIN PLANS",
  "CRAFTING DIGITAL EXPERIENCES",
  "SAAS · FINTECH · HEALTHTECH",
  "REMOTE — ALL TIMEZONES",
];

export function CtaMarquee() {
  return (
    <div className="rounded-2xl bg-ink p-6 lg:p-8 text-paper relative overflow-hidden flex flex-col h-full">
      {/* Animated radial gradient that recolors with theme */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 80% 20%, var(--primary), transparent 55%), radial-gradient(circle at 10% 90%, var(--primary), transparent 60%)",
        }}
      />
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--paper) 1px, transparent 1px), linear-gradient(90deg, var(--paper) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 flex flex-col flex-1">
        <span className="text-[0.65rem] font-mono uppercase tracking-[0.16em] text-primary mb-4">
          OPEN LINE
        </span>
        <h2 className="text-3xl lg:text-4xl font-semibold leading-tight text-paper">
          Let&apos;s 👋{" "}
          <span style={{ color: "var(--primary)" }}>Work Together</span>
        </h2>
        <p className="mt-3 text-sm text-paper/70 max-w-xs">
          Got a system that needs to hold up under load? I reply within 24 hours.
        </p>

        <div className="mt-6">
          <MagneticButton
            href="/contact"
            className="rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-ink hover:bg-primary-hover transition"
          >
            Start a project
            <ArrowUpRight size={16} />
          </MagneticButton>
        </div>

        {/* Marquee at bottom */}
        <div className="mt-auto pt-8 -mx-6 lg:-mx-8 -mb-6 lg:-mb-8 border-t border-paper/10 overflow-hidden">
          <div className="py-4 flex whitespace-nowrap animate-marquee">
            {[...PHRASES, ...PHRASES].map((phrase, i) => (
              <span
                key={i}
                className="px-6 text-xs font-mono uppercase tracking-[0.18em] text-paper/70"
              >
                {phrase}
                <span className="ml-6 text-primary">●</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
