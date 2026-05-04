import { Sparkles, Zap, Target } from "lucide-react";

/**
 * "What I'm on this week" card — fills the empty space below the IntroCard
 * in column 1. Three small entries with typed icons + the current focus.
 * Hand-edited content, easy to update.
 */
const NOW_ITEMS = [
  {
    Icon: Zap,
    tag: "BUILDING",
    title: "OnwardOS",
    body: "AI-native study-abroad suite — multi-step LangGraph pipelines, Claude Sonnet, pgvector retrieval.",
  },
  {
    Icon: Target,
    tag: "REFINING",
    title: "Multi-agent orchestration patterns",
    body: "Productionising checkpoint recovery + structured output for healthcare intake flows.",
  },
  {
    Icon: Sparkles,
    tag: "AVAILABLE",
    title: "Senior contracts · 30 hrs/wk",
    body: "Open to 3–6 month engagements in SaaS / FinTech / HealthTech, or the right FT senior role.",
  },
];

export function NowCard() {
  return (
    <div className="rounded-2xl bg-paper-2/85 backdrop-blur-xl border border-hairline p-6 shadow-card h-full flex flex-col">
      <div className="flex items-baseline justify-between mb-5">
        <div>
          <span className="text-[0.65rem] font-mono uppercase tracking-[0.16em] text-primary">
            NOW · MAY 2026
          </span>
          <h2 className="mt-1 text-xl font-semibold text-ink">
            What I&apos;m <span className="text-primary">on this week</span>
          </h2>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[0.6rem] font-mono uppercase tracking-wider text-ink-mute">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          LIVE
        </span>
      </div>

      <ul className="space-y-3">
        {NOW_ITEMS.map((item, i) => (
          <li
            key={i}
            data-cursor-hover
            className="group flex items-start gap-3 p-3 rounded-xl bg-paper hover:shadow-card transition"
          >
            <div className="grid place-items-center w-9 h-9 rounded-lg bg-paper-2 text-primary group-hover:bg-primary group-hover:text-primary-ink transition flex-shrink-0">
              <item.Icon size={15} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[0.6rem] font-mono uppercase tracking-[0.16em] text-primary">
                {item.tag}
              </div>
              <div className="text-sm font-semibold text-ink mt-0.5">
                {item.title}
              </div>
              <p className="text-xs text-ink-mute mt-1 leading-relaxed">
                {item.body}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
