import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/chrome/PageShell";
import { IntroCard } from "@/components/sections/IntroCard";
import { GradientCover } from "@/components/visual/GradientCover";
import { PROJECTS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Works - Mitul Jagad",
  description:
    "Selected projects: AI workflow agents, enterprise SSO, SQL optimization, healthcare platforms, and more.",
};

export default function PortfolioPage() {
  return (
    <PageShell>
      <main className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24">
            <IntroCard />
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-2xl bg-paper-2/85 backdrop-blur-xl border border-hairline p-6 lg:p-10 shadow-card">
            <span className="text-[0.65rem] font-mono uppercase tracking-[0.16em] text-primary">
              SELECTED WORK
            </span>
            <h1 className="mt-2 text-3xl lg:text-4xl font-semibold text-ink leading-tight">
              Selected work,{" "}
              <span className="text-primary">real metrics</span>
            </h1>
            <p className="mt-3 text-base text-ink-mute max-w-2xl">
              Six shipped projects - AI agents, a 100K-user SSO suite, the SQL win that turned 50-second queries into 4-second ones, and two consumer apps live on Google Play.
            </p>

            <div className="mt-8 space-y-4 lg:space-y-6">
              {PROJECTS.map((project) => (
                <Link
                  key={project.id}
                  href={`/portfolio/${project.slug}`}
                  data-cursor-label="OPEN"
                  className="group block rounded-2xl bg-paper p-4 lg:p-6 hover:shadow-card transition"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                    <GradientCover
                      slug={project.slug}
                      title={project.title}
                      tag={project.year}
                      className="aspect-[6/4] rounded-xl group-hover:scale-[1.02] transition-transform duration-500"
                    />

                    <div className="flex flex-col">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-[0.6rem] font-mono uppercase tracking-wider text-primary">
                          {project.client ?? "PROJECT"}
                        </span>
                        <ArrowUpRight
                          size={20}
                          className="text-ink-mute group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition flex-shrink-0"
                        />
                      </div>
                      <h2 className="text-xl lg:text-2xl font-semibold text-ink leading-tight mb-2">
                        {project.title}
                      </h2>
                      <p className="text-sm text-ink-mute leading-relaxed">
                        {project.shortDescription}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="text-[0.65rem] font-mono rounded bg-paper-2 px-2 py-1 text-ink-mute"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="mt-auto pt-4">
                        <div className="text-2xl lg:text-3xl font-semibold text-primary leading-none">
                          {project.metric}
                        </div>
                        <div className="text-[0.6rem] font-mono uppercase tracking-wider text-ink-mute mt-1">
                          {project.metricLabel}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </PageShell>
  );
}
