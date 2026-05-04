"use client";

import { CountUp } from "@/components/motion/CountUp";

/**
 * Animated stats card — fills the empty space below ProjectsCard in column 3
 * of the home page. Four animated metrics that count up when scrolled into
 * view: years shipping, p99 win, users served, MFE bottleneck cut.
 */
const STATS = [
  {
    label: "YEARS SHIPPING PROD",
    valueTo: 5,
    suffix: "+",
  },
  {
    label: "P99 WIN · TAPUZ",
    valueTo: 92,
    suffix: "%",
    note: "50s → 4s",
  },
  {
    label: "USERS · MEDCHRON SSO",
    valueTo: 100,
    suffix: "K+",
  },
  {
    label: "MFE BOTTLENECK CUT",
    valueTo: 40,
    suffix: "%",
  },
];

export function StatsCard() {
  return (
    <div className="rounded-2xl bg-paper-2/85 backdrop-blur-xl border border-hairline p-6 shadow-card h-full flex flex-col">
      <div className="mb-5">
        <span className="text-[0.65rem] font-mono uppercase tracking-[0.16em] text-primary">
          BY THE NUMBERS
        </span>
        <h2 className="mt-1 text-xl font-semibold text-ink">
          Real wins, <span className="text-primary">measured.</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-hairline bg-hairline flex-1 min-h-[12rem]">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="bg-paper-2 p-4 flex flex-col gap-1 hover:bg-paper transition"
          >
            <div className="text-[0.6rem] font-mono uppercase tracking-[0.14em] text-ink-mute">
              {s.label}
            </div>
            <div className="text-3xl font-semibold text-primary leading-none mt-1">
              <CountUp to={s.valueTo} suffix={s.suffix} />
            </div>
            {s.note && (
              <div className="text-[0.65rem] font-mono text-ink-mute mt-1">
                {s.note}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-auto pt-4 border-t border-hairline flex items-center justify-between">
        <span className="text-[0.65rem] font-mono uppercase tracking-wider text-ink-mute">
          PROD-VERIFIED · 2020–2026
        </span>
        <span className="inline-flex items-center gap-1.5 text-[0.65rem] font-mono text-primary">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          LIVE
        </span>
      </div>
    </div>
  );
}
