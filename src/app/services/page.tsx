import type { Metadata } from "next";
import Link from "next/link";
import {
  Sparkles,
  Layers,
  Gauge,
  Shield,
  Blocks,
  Cloud,
  ArrowUpRight,
  Check,
} from "lucide-react";
import { PageShell } from "@/components/chrome/PageShell";
import { IntroCard } from "@/components/sections/IntroCard";
import { SERVICES } from "@/lib/data";

const ICONS = {
  sparkles: Sparkles,
  layers: Layers,
  gauge: Gauge,
  shield: Shield,
  blocks: Blocks,
  cloud: Cloud,
} as const;

export const metadata: Metadata = {
  title: "Services — Mitul Jagad",
  description:
    "Six engineering services: AI agents, full-stack apps, performance optimization, auth & security, architecture, cloud & DevOps.",
};

const ENGAGEMENTS = [
  {
    name: "Consult",
    duration: "1 week",
    price: "from $2,500",
    description:
      "Architecture review, performance audit, AI-agent feasibility. Written report + 30-min call.",
  },
  {
    name: "Build",
    duration: "3–6 months",
    price: "$450/day",
    description:
      "Embedded as senior engineer with your team. Full-stack, AI agents, performance, auth.",
    featured: true,
  },
  {
    name: "Lead",
    duration: "Full time",
    price: "to be discussed",
    description:
      "Senior, staff, or tech lead role at SaaS, FinTech, HealthTech, or AI-native products.",
  },
];

export default function ServicesPage() {
  return (
    <PageShell>
      <main className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24">
            <IntroCard />
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-4 lg:gap-6">
          {/* Services grid */}
          <div className="rounded-2xl bg-paper-2/85 backdrop-blur-xl border border-hairline p-6 lg:p-10 shadow-card">
            <span className="text-[0.65rem] font-mono uppercase tracking-[0.16em] text-primary">
              SERVICES
            </span>
            <h1 className="mt-2 text-3xl lg:text-4xl font-semibold text-ink leading-tight">
              Six modes I work in —{" "}
              <span className="text-primary">all production-grade.</span>
            </h1>
            <p className="mt-3 text-base text-ink-mute max-w-2xl">
              Every service below comes with the same baseline: real metrics, no demos, written hand-off, and a 24h response SLA.
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {SERVICES.map((service) => {
                const Icon = ICONS[service.icon as keyof typeof ICONS] ?? Sparkles;
                return (
                  <article
                    key={service.id}
                    className="group p-5 lg:p-6 rounded-2xl bg-paper hover:shadow-card transition"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="grid place-items-center w-12 h-12 rounded-xl bg-paper-2">
                        <Icon size={22} className="text-primary" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-ink leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-sm text-ink-mute mt-2 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {service.bullets.map((b, i) => (
                        <li
                          key={i}
                          className="text-sm text-ink flex items-start gap-2"
                        >
                          <Check
                            size={14}
                            className="text-primary mt-0.5 flex-shrink-0"
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Engagement modes */}
          <div className="rounded-2xl bg-paper-2/85 backdrop-blur-xl border border-hairline p-6 lg:p-10 shadow-card">
            <span className="text-[0.65rem] font-mono uppercase tracking-[0.16em] text-primary">
              HOW WE WORK TOGETHER
            </span>
            <h2 className="mt-2 text-2xl lg:text-3xl font-semibold text-ink leading-tight">
              Three engagement modes
            </h2>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {ENGAGEMENTS.map((e) => (
                <div
                  key={e.name}
                  className={`p-5 rounded-xl border ${
                    e.featured
                      ? "border-primary bg-primary/5"
                      : "border-hairline bg-paper"
                  }`}
                >
                  {e.featured && (
                    <span className="text-[0.6rem] font-mono uppercase tracking-wider text-primary mb-2 block">
                      MOST PICKED
                    </span>
                  )}
                  <h3 className="text-lg font-semibold text-ink">{e.name}</h3>
                  <p className="text-xs font-mono text-ink-mute mt-1 uppercase tracking-wider">
                    {e.duration} · {e.price}
                  </p>
                  <p className="text-sm text-ink mt-3">{e.description}</p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-primary hover:gap-2 transition-all"
                  >
                    PICK THIS MODE <ArrowUpRight size={12} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </PageShell>
  );
}
