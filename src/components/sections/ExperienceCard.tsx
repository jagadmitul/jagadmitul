"use client";

import Image from "next/image";
import { EXPERIENCE } from "@/lib/data";

/**
 * Experience list — recreates the original portfolio's auto-scrolling
 * vertical list. Two copies of the entries are rendered back-to-back so
 * the CSS keyframe `scroll-y` can loop seamlessly. Pauses on hover.
 */
export function ExperienceCard() {
  const all = [...EXPERIENCE, ...EXPERIENCE];

  return (
    <div className="rounded-2xl bg-paper-2/85 backdrop-blur-xl border border-hairline p-6 shadow-card overflow-hidden h-full flex flex-col">
      <div className="flex items-baseline justify-between mb-5">
        <div>
          <span className="text-[0.65rem] font-mono uppercase tracking-[0.16em] text-primary">
            WORK EXPERIENCE
          </span>
          <h2 className="mt-1 text-xl font-semibold text-ink">
            5+ years across{" "}
            <span className="text-primary">5 senior roles</span>
          </h2>
        </div>
      </div>

      <div className="relative h-[26rem] overflow-hidden group">
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-paper-2 to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-paper-2 to-transparent z-10 pointer-events-none" />

        <ol
          className="space-y-4 animate-scroll-y group-hover:[animation-play-state:paused]"
          style={{ willChange: "transform" }}
        >
          {all.map((job, idx) => (
            <li
              key={`${job.id}-${idx}`}
              data-cursor-hover
              className="flex items-start gap-4 p-4 rounded-xl bg-paper border border-transparent hover:border-primary/30 hover:bg-primary/5 hover:shadow-card transition"
            >
              <div className="flex-shrink-0 grid place-items-center w-12 h-12 rounded-lg bg-paper-2 overflow-hidden">
                {job.logo ? (
                  <Image
                    src={job.logo}
                    alt={job.company}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                ) : (
                  <span className="text-base font-semibold text-primary">
                    {job.company[0]}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2 flex-wrap">
                  <h3 className="text-sm font-semibold text-ink">{job.company}</h3>
                  <span className="text-[0.65rem] font-mono text-ink-mute uppercase tracking-wider whitespace-nowrap">
                    {job.period.split(" · ")[0]}
                  </span>
                </div>
                <p className="text-sm text-ink-mute mt-0.5">{job.role}</p>
                <p className="text-[0.7rem] font-mono text-ink-mute mt-1 uppercase tracking-wider">
                  {job.location}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
