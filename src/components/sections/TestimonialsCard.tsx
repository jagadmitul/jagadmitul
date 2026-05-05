import { Quote } from "lucide-react";

/**
 * Testimonials card - sits in column 2 below SkillsCard to balance
 * column heights with column 3. Two short quotes with attributed roles.
 *
 * Note for Mitul on first deploy: replace these with real LinkedIn
 * recommendations or client testimonials. They're written here in a
 * voice that's consistent with his actual work record.
 */
const TESTIMONIALS = [
  {
    quote:
      "Mitul is the kind of senior you give the hardest problem to and don't hear from again until it's solved. The SQL win speaks for itself - he reduced a query from 50 seconds to under 4 without an architectural rewrite.",
    author: "Engineering Lead",
    company: "Production SaaS · 2023",
  },
  {
    quote:
      "Shipped our SSO system across 8 products without a single auth ticket in the first month post-launch. Quiet, measured work - exactly what production engineering should look like.",
    author: "Product Director",
    company: "Healthcare Platform · 2024",
  },
];

export function TestimonialsCard() {
  return (
    <div className="rounded-2xl bg-paper-2/85 backdrop-blur-xl border border-hairline p-6 shadow-card">
      <div className="flex items-baseline justify-between mb-5">
        <div>
          <span className="text-[0.65rem] font-mono uppercase tracking-[0.16em] text-primary">
            WHAT CLIENTS SAY
          </span>
          <h2 className="mt-1 text-xl font-semibold text-ink">
            Quietly, <span className="text-primary">on the record</span>
          </h2>
        </div>
        <Quote size={20} className="text-primary opacity-40" />
      </div>

      <div className="space-y-4">
        {TESTIMONIALS.map((t, i) => (
          <figure
            key={i}
            data-cursor-hover
            className="p-4 rounded-xl bg-paper border border-transparent hover:border-primary/30 transition"
          >
            <blockquote className="text-sm text-ink leading-relaxed italic">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-3 pt-3 border-t border-hairline flex items-center justify-between text-[0.7rem] font-mono uppercase tracking-wider">
              <span className="text-ink">{t.author}</span>
              <span className="text-ink-mute">{t.company}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
