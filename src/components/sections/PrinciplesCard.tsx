import { Gauge, Eye, Users } from "lucide-react";

/**
 * "How I work" card - three short principles that frame how Mitul
 * approaches engineering work. Sits in column 1 below NowCard to keep
 * column heights balanced with column 3 (which has 3 cards).
 */
const PRINCIPLES = [
  {
    Icon: Gauge,
    title: "Measurement first",
    body: "Read the EXPLAIN plan before writing code. Most performance wins are in the data, not the syntax.",
  },
  {
    Icon: Eye,
    title: "Boring on purpose",
    body: "Production systems should be boring. The team should stop noticing the thing I just shipped.",
  },
  {
    Icon: Users,
    title: "Async-first, ship-first",
    body: "Comfortable across timezones. Ship in small reviewable PRs. Talk later if needed.",
  },
];

export function PrinciplesCard() {
  return (
    <div className="rounded-2xl bg-paper-2/85 backdrop-blur-xl border border-hairline p-6 shadow-card">
      <div className="mb-5">
        <span className="text-[0.65rem] font-mono uppercase tracking-[0.16em] text-primary">
          HOW I WORK
        </span>
        <h2 className="mt-1 text-xl font-semibold text-ink">
          Three principles, <span className="text-primary">on repeat</span>
        </h2>
      </div>

      <ul className="space-y-3">
        {PRINCIPLES.map((p, i) => (
          <li
            key={i}
            data-cursor-hover
            className="group flex items-start gap-3 p-3 rounded-xl bg-paper border border-transparent hover:border-primary/30 hover:bg-primary/5 transition"
          >
            <div className="grid place-items-center w-9 h-9 rounded-lg bg-paper-2 text-primary group-hover:bg-primary group-hover:text-primary-ink transition flex-shrink-0">
              <p.Icon size={15} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-ink">{p.title}</div>
              <p className="text-xs text-ink-mute mt-1 leading-relaxed">
                {p.body}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
