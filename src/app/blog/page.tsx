import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Calendar } from "lucide-react";
import { PageShell } from "@/components/chrome/PageShell";
import { IntroCard } from "@/components/sections/IntroCard";
import { GradientCover } from "@/components/visual/GradientCover";
import { ARTICLES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog — Mitul Jagad",
  description:
    "Articles on AI engineering, performance optimization, and building production systems.",
};

export default function BlogPage() {
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
              WRITING
            </span>
            <h1 className="mt-2 text-3xl lg:text-4xl font-semibold text-ink leading-tight">
              My recent articles &{" "}
              <span className="text-primary">publications</span>
            </h1>
            <p className="mt-3 text-base text-ink-mute max-w-2xl">
              Notes from production — AI agents, performance work, what actually breaks at scale.
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {ARTICLES.map((article) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.slug}`}
                  className="group block rounded-2xl bg-paper overflow-hidden hover:shadow-card transition"
                >
                  <GradientCover
                    slug={article.slug}
                    title={article.title}
                    tag={article.category}
                    className="aspect-[6/4]"
                  />
                  <div className="p-5">
                    <h2 className="text-lg font-semibold text-ink leading-tight group-hover:text-primary transition">
                      {article.title}
                    </h2>
                    <p className="text-sm text-ink-mute mt-2 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-4 text-[0.7rem] font-mono uppercase tracking-wider text-ink-mute">
                      <span className="inline-flex items-center gap-1">
                        <Calendar size={11} />
                        {article.date}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock size={11} />
                        {article.readingTime}
                      </span>
                    </div>
                    {article.source && (
                      <div className="mt-3 pt-3 border-t border-hairline text-[0.65rem] font-mono text-ink-mute">
                        {article.source}
                      </div>
                    )}
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
