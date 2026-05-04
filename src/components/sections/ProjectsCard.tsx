import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/lib/data";
import { GradientCover } from "@/components/visual/GradientCover";

export function ProjectsCard({ limit = 3 }: { limit?: number }) {
  const featured = PROJECTS.filter((p) => p.featured).slice(0, limit);

  return (
    <div className="rounded-2xl bg-paper-2/85 backdrop-blur-xl border border-hairline p-6 shadow-card h-full flex flex-col">
      <div className="flex items-baseline justify-between mb-5">
        <div>
          <span className="text-[0.65rem] font-mono uppercase tracking-[0.16em] text-primary">
            RECENT PROJECTS
          </span>
          <h2 className="mt-1 text-xl font-semibold text-ink">
            Things I&apos;ve shipped <span className="text-primary">recently</span>
          </h2>
        </div>
        <Link
          href="/portfolio"
          className="text-xs font-mono uppercase tracking-wider text-ink-mute hover:text-primary transition"
        >
          ALL →
        </Link>
      </div>

      <div className="space-y-3">
        {featured.map((project) => (
          <Link
            key={project.id}
            href={`/portfolio/${project.slug}`}
            data-cursor-label="OPEN"
            className="group block rounded-xl bg-paper p-4 hover:shadow-card transition"
          >
            <div className="flex gap-4">
              <GradientCover
                slug={project.slug}
                title={project.title}
                tag={project.year}
                className="aspect-[6/4] w-32 flex-shrink-0 rounded-lg group-hover:scale-[1.03] transition-transform duration-500"
              />
              <div className="flex-1 min-w-0 flex flex-col">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold text-ink leading-tight">
                    {project.title}
                  </h3>
                  <ArrowUpRight
                    size={16}
                    className="text-ink-mute group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition flex-shrink-0"
                  />
                </div>
                <p className="text-xs text-ink-mute mt-1 line-clamp-2">
                  {project.shortDescription}
                </p>
                <div className="mt-auto pt-2 flex items-center gap-2">
                  <span className="text-[0.65rem] font-mono uppercase tracking-wider text-primary">
                    {project.metric}
                  </span>
                  <span className="text-[0.65rem] font-mono text-ink-mute">
                    · {project.year}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
