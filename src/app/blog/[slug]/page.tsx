import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { PageShell } from "@/components/chrome/PageShell";
import { IntroCard } from "@/components/sections/IntroCard";
import { GradientCover } from "@/components/visual/GradientCover";
import { ARTICLES, type ArticleBlock } from "@/lib/data";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return { title: "Article not found" };
  return {
    title: `${article.title} - Mitul Jagad`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  const related = ARTICLES.filter((a) => a.slug !== slug).slice(0, 2);

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
            {/* Back link - `flex w-fit` so it occupies its own line. The
                previous `inline-flex` made it sit beside the category pill
                because both were inline-level elements. */}
            <Link
              href="/blog"
              className="flex w-fit items-center gap-2 text-xs font-mono uppercase tracking-wider text-ink-mute hover:text-primary transition mb-6"
            >
              <ArrowLeft size={14} />
              ALL ARTICLES
            </Link>

            <span className="text-[0.6rem] font-mono uppercase tracking-wider rounded-full bg-paper px-2.5 py-1 text-primary inline-block mb-4">
              {article.category}
            </span>

            <h1 className="text-3xl lg:text-5xl font-semibold text-ink leading-tight">
              {article.title}
            </h1>

            <div className="mt-6 flex items-center gap-6 text-xs font-mono uppercase tracking-wider text-ink-mute">
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={12} />
                {article.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={12} />
                {article.readingTime}
              </span>
              {article.source && <span>{article.source}</span>}
            </div>

            <GradientCover
              slug={article.slug}
              title={article.title}
              tag={article.category}
              className="mt-8 aspect-video rounded-2xl"
            />

            <div className="mt-10 prose-content space-y-5">
              {/* Lede paragraph (the excerpt) - bigger than the body, sets the tone */}
              <p className="text-lg text-ink-mute leading-relaxed font-medium">
                {article.excerpt}
              </p>
              {/* Body - rendered from the structured ArticleBlock array */}
              {article.body.map((block, i) => (
                <BlockRenderer key={i} block={block} />
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-hairline flex items-center justify-between gap-4 flex-wrap">
              <span className="text-xs font-mono uppercase tracking-wider text-ink-mute inline-flex items-center gap-2">
                <Share2 size={14} />
                SHARE
              </span>
              <div className="flex gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono px-3 py-1.5 rounded-lg bg-paper hover:bg-primary hover:text-primary-ink transition"
                >
                  TWITTER
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://jagadmitul.com/blog/${article.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono px-3 py-1.5 rounded-lg bg-paper hover:bg-primary hover:text-primary-ink transition"
                >
                  LINKEDIN
                </a>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-4 lg:mt-6 rounded-2xl bg-paper-2/85 backdrop-blur-xl border border-hairline p-6 lg:p-10 shadow-card">
              <h3 className="text-xl font-semibold text-ink mb-6">
                Continue reading
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    href={`/blog/${r.slug}`}
                    className="group block rounded-xl bg-paper overflow-hidden hover:shadow-card transition"
                  >
                    <GradientCover
                      slug={r.slug}
                      title={r.title}
                      tag={r.category}
                      className="aspect-[6/4]"
                    />
                    <div className="p-4">
                      <span className="text-[0.6rem] font-mono uppercase tracking-wider text-primary">
                        {r.category}
                      </span>
                      <h4 className="mt-1 font-semibold text-ink leading-tight group-hover:text-primary transition">
                        {r.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
    </PageShell>
  );
}

/**
 * Renders one ArticleBlock from the structured body. Keeps the article
 * page narrow + typed so we don't need MDX or a markdown renderer for
 * what is, in practice, a small handful of block types.
 */
function BlockRenderer({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p className="text-base text-ink leading-relaxed">{block.text}</p>
      );
    case "h2":
      return (
        <h2 className="text-2xl font-semibold text-ink leading-tight mt-8 mb-1">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="text-lg font-semibold text-ink leading-tight mt-6 mb-1">
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul className="list-disc pl-6 space-y-2 text-base text-ink leading-relaxed">
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="list-decimal pl-6 space-y-2 text-base text-ink leading-relaxed">
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ol>
      );
    case "code":
      return (
        <pre className="rounded-xl bg-ink/95 text-paper p-4 lg:p-5 overflow-x-auto text-sm font-mono leading-relaxed">
          <code>{block.text}</code>
        </pre>
      );
    case "quote":
      return (
        <blockquote className="border-l-2 border-primary pl-4 italic text-ink-mute leading-relaxed">
          {block.text}
        </blockquote>
      );
  }
}
