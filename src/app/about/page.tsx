import type { Metadata } from "next";
import { PageShell } from "@/components/chrome/PageShell";
import { IntroCard } from "@/components/sections/IntroCard";
import { ABOUT, EXPERIENCE, STATS } from "@/lib/data";

export const metadata: Metadata = {
  title: "About - Mitul Jagad",
  description:
    "Senior Full Stack Developer with 5+ years building production AI agents and full-stack systems. Open for contract.",
};

export default function AboutPage() {
  return (
    <PageShell>
      <main className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
        {/* Left: Intro card (sticky) */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24">
            <IntroCard />
          </div>
        </div>

        {/* Right: About content */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl bg-paper-2/85 backdrop-blur-xl border border-hairline p-6 lg:p-10 shadow-card">
            <span className="text-[0.65rem] font-mono uppercase tracking-[0.16em] text-primary">
              ABOUT ME
            </span>
            <h1 className="mt-2 text-3xl lg:text-4xl font-semibold text-ink leading-tight">
              The work, on the record.{" "}
              <span className="text-primary">What it actually shipped.</span>
            </h1>

            <div className="mt-6 space-y-4 text-base text-ink-mute leading-relaxed">
              {ABOUT.intro.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Real metric strip */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-xl border border-hairline bg-hairline">
              {STATS.map((s) => (
                <div key={s.label} className="bg-paper-2 p-4">
                  <div className="text-xl lg:text-2xl font-semibold text-primary">
                    {s.value}
                  </div>
                  <div className="text-[0.65rem] font-mono uppercase tracking-wider text-ink-mute mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* What I've shipped */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold text-ink mb-4">
                What I&apos;ve shipped recently
              </h2>
              <ul className="space-y-3">
                {ABOUT.shipped.map((item, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-base text-ink-mute leading-relaxed"
                  >
                    <span className="text-primary font-mono text-sm flex-shrink-0 mt-0.5">
                      →
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Where I work best - replace the left-stripe notification look
                with a primary-tinted pull-quote card. Quote glyph + soft
                gradient bg. Reads as editorial, not as an alert. */}
            <div
              className="mt-10 p-6 lg:p-8 rounded-2xl border border-primary/20 relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, color-mix(in srgb, var(--primary) 14%, transparent), color-mix(in srgb, var(--primary) 4%, transparent) 60%, transparent)",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute top-3 right-4 font-display select-none pointer-events-none"
                style={{
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "6rem",
                  lineHeight: 1,
                  color: "var(--primary)",
                  opacity: 0.22,
                }}
              >
                &ldquo;
              </span>
              <div className="text-[0.7rem] font-mono uppercase tracking-[0.18em] text-primary mb-3">
                WHERE I WORK BEST
              </div>
              <p className="text-lg lg:text-xl text-ink leading-relaxed font-medium relative z-10">
                {ABOUT.strongest}
              </p>
            </div>

            {/* What I can help build */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold text-ink mb-4">
                What I can help you build
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ABOUT.helpWith.map((item, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-paper hover:shadow-card transition"
                  >
                    <h4 className="font-semibold text-ink text-sm">
                      {item.title}
                    </h4>
                    <p className="text-sm text-ink-mute mt-1">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 p-5 rounded-xl bg-primary text-primary-ink">
              <p className="text-base leading-relaxed">{ABOUT.closing}</p>
            </div>
          </div>

          {/* Career timeline */}
          <div className="mt-4 lg:mt-6 rounded-2xl bg-paper-2/85 backdrop-blur-xl border border-hairline p-6 lg:p-10 shadow-card">
            <span className="text-[0.65rem] font-mono uppercase tracking-[0.16em] text-primary">
              EXPERIENCE
            </span>
            <h2 className="mt-2 text-2xl font-semibold text-ink mb-6">
              Where I&apos;ve worked
            </h2>

            <ol className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-hairline">
              {EXPERIENCE.map((job) => (
                <li key={job.id} className="relative pl-10">
                  <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-paper border-2 border-primary" />
                  <div className="flex items-baseline justify-between gap-4 flex-wrap">
                    <h3 className="text-lg font-semibold text-ink">
                      {job.role}
                    </h3>
                    <span className="text-xs font-mono uppercase tracking-wider text-ink-mute">
                      {job.period}
                    </span>
                  </div>
                  <p className="text-sm text-primary mt-1">
                    {job.company} · {job.location}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {job.bullets.map((b, i) => (
                      <li
                        key={i}
                        className="text-sm text-ink-mute leading-relaxed flex gap-2"
                      >
                        <span className="text-primary mt-1 flex-shrink-0">
                          →
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </main>
    </PageShell>
  );
}
