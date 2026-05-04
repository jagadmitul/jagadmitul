import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { GradientCover } from "@/components/visual/GradientCover";
import { ARTICLES } from "@/lib/data";

/**
 * Compact "latest article" card. Shows the most recent article with its
 * GradientCover, excerpt, and meta. Sits in column 3 to help balance the
 * column heights with column 2.
 */
export function LatestArticleCard() {
  const latest = ARTICLES[0];
  return (
    <Link
      href={`/blog/${latest.slug}`}
      className="group block rounded-2xl bg-paper-2/85 backdrop-blur-xl border border-hairline p-6 shadow-card hover:shadow-lg transition"
    >
      <div className="flex items-baseline justify-between mb-4">
        <span className="text-[0.65rem] font-mono uppercase tracking-[0.16em] text-primary">
          LATEST FROM THE BLOG
        </span>
        <ArrowUpRight
          size={16}
          className="text-ink-mute group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition"
        />
      </div>

      <GradientCover
        slug={latest.slug}
        title={latest.title}
        tag={latest.category}
        className="aspect-[6/4] rounded-xl mb-4 group-hover:scale-[1.02] transition-transform duration-500"
      />

      <p className="text-sm text-ink-mute line-clamp-3 leading-relaxed">
        {latest.excerpt}
      </p>

      <div className="mt-4 flex items-center gap-4 text-[0.65rem] font-mono uppercase tracking-wider text-ink-mute">
        <span className="inline-flex items-center gap-1">
          <Clock size={11} />
          {latest.readingTime}
        </span>
        {latest.source && <span>· {latest.source}</span>}
      </div>
    </Link>
  );
}
