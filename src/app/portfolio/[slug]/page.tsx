import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { PageShell } from "@/components/chrome/PageShell";
import { IntroCard } from "@/components/sections/IntroCard";
import { GradientCover } from "@/components/visual/GradientCover";
import { PROJECTS } from "@/lib/data";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} — Mitul Jagad`,
    description: project.shortDescription,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <PageShell>
      <main className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24">
            <IntroCard />
          </div>
        </div>

        <article className="lg:col-span-2">
          <div className="rounded-2xl bg-paper-2/85 backdrop-blur-xl border border-hairline p-6 lg:p-10 shadow-card">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-ink-mute hover:text-primary transition mb-6"
            >
              <ArrowLeft size={14} />
              ALL PROJECTS
            </Link>

            <div className="flex items-center gap-3 flex-wrap mb-3">
              <span className="text-[0.6rem] font-mono uppercase tracking-wider rounded-full bg-paper px-2.5 py-1 text-primary">
                {project.client ?? "PROJECT"}
              </span>
              <span className="text-[0.6rem] font-mono uppercase tracking-wider text-ink-mute">
                {project.year}
              </span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-semibold text-ink leading-tight">
              {project.title}
            </h1>
            <p className="mt-4 text-lg text-ink-mute leading-relaxed">
              {project.shortDescription}
            </p>

            <GradientCover
              slug={project.slug}
              title={project.title}
              tag={project.client ?? project.year}
              className="mt-8 aspect-[6/4] rounded-2xl"
            />

            <div className="mt-8 p-6 rounded-2xl bg-primary text-primary-ink">
              <div className="text-[0.65rem] font-mono uppercase tracking-[0.16em] opacity-80 mb-2">
                {project.metricLabel}
              </div>
              <div className="text-4xl lg:text-5xl font-semibold leading-none">
                {project.metric}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono rounded-md bg-paper px-3 py-1.5 text-ink"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-ink">The work</h2>
              {project.longDescription.map((para, i) => (
                <p
                  key={i}
                  className="text-base text-ink-mute leading-relaxed"
                >
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-10">
              <h2 className="text-2xl font-semibold text-ink mb-4">Outcomes</h2>
              <ul className="space-y-3">
                {project.outcomes.map((outcome, i) => (
                  <li
                    key={i}
                    className="flex gap-3 items-start p-4 rounded-xl bg-paper"
                  >
                    <Check
                      size={18}
                      className="text-primary mt-0.5 flex-shrink-0"
                    />
                    <span className="text-base text-ink leading-relaxed">
                      {outcome}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12 pt-8 border-t border-hairline flex items-center justify-between gap-4 flex-wrap">
              <p className="text-base text-ink-mute">
                Have a project like this?
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-ink hover:bg-primary-hover transition"
              >
                Start a project
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </article>
      </main>
    </PageShell>
  );
}
