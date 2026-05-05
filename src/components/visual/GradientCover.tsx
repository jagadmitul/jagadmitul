"use client";

import { useMemo } from "react";

type Props = {
  slug: string;
  title: string;
  tag?: string;
  className?: string;
};

/**
 * Auto-generated gradient cover for a project / article. Replaces the
 * generic templated `project-1.png` / `blog-img-1.jpg` images with a
 * deterministic gradient seeded by the slug, plus the title and tag set
 * over it - same idea as Vercel's OG image generator, scoped to the card.
 *
 * No external images, no template look. Each cover is unique per slug.
 */

// Hand-picked palette of gradient stops that look good against either
// light or dark page backgrounds. Each row is [from, via, to].
const GRADIENTS: Array<[string, string, string]> = [
  ["#4770FF", "#7857FF", "#D14424"],
  ["#0EA5E9", "#6366F1", "#A855F7"],
  ["#F59E0B", "#EF4444", "#EC4899"],
  ["#10B981", "#06B6D4", "#3B82F6"],
  ["#8B5CF6", "#EC4899", "#F97316"],
  ["#F43F5E", "#A855F7", "#3B82F6"],
  ["#06B6D4", "#22D3EE", "#10B981"],
  ["#FACC15", "#FB923C", "#EF4444"],
];

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export function GradientCover({ slug, title, tag, className = "" }: Props) {
  const palette = useMemo(() => GRADIENTS[hash(slug) % GRADIENTS.length], [slug]);
  const angle = useMemo(() => (hash(slug) % 360), [slug]);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(${angle}deg, ${palette[0]} 0%, ${palette[1]} 50%, ${palette[2]} 100%)`,
      }}
    >
      {/* noise / grain overlay for tactile feel */}
      <div
        className="absolute inset-0 opacity-[0.18] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='180' height='180' filter='url(%23n)' opacity='0.85'/></svg>\")",
        }}
      />
      {/* subtle radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.18), transparent 50%)",
        }}
      />
      {/* content */}
      <div className="absolute inset-0 p-5 flex flex-col justify-between text-white">
        {tag && (
          <span className="self-start text-[0.6rem] font-mono uppercase tracking-[0.18em] rounded-full bg-black/35 backdrop-blur px-2.5 py-1">
            {tag}
          </span>
        )}
        <h3 className="text-lg lg:text-xl font-semibold leading-tight max-w-[14ch] drop-shadow-sm">
          {title}
        </h3>
      </div>
    </div>
  );
}
