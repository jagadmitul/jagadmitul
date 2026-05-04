import Link from "next/link";
import {
  Sparkles,
  Layers,
  Gauge,
  Shield,
  Blocks,
  Cloud,
} from "lucide-react";
import { SERVICES } from "@/lib/data";

const ICONS = {
  sparkles: Sparkles,
  layers: Layers,
  gauge: Gauge,
  shield: Shield,
  blocks: Blocks,
  cloud: Cloud,
} as const;

export function ServicesCard({ limit }: { limit?: number }) {
  const services = limit ? SERVICES.slice(0, limit) : SERVICES;

  return (
    <div className="rounded-2xl bg-paper-2/85 backdrop-blur-xl border border-hairline p-6 shadow-card">
      <div className="flex items-baseline justify-between mb-5">
        <div>
          <span className="text-[0.65rem] font-mono uppercase tracking-[0.16em] text-primary">
            WHAT I OFFER
          </span>
          <h2 className="mt-1 text-xl font-semibold text-ink">
            Senior engineering, <span className="text-primary">six modes</span>
          </h2>
        </div>
        {limit && limit < SERVICES.length && (
          <Link
            href="/services"
            className="text-xs font-mono uppercase tracking-wider text-ink-mute hover:text-primary transition"
          >
            ALL →
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {services.map((service) => {
          const Icon = ICONS[service.icon as keyof typeof ICONS] ?? Sparkles;
          return (
            <div
              key={service.id}
              className="rounded-2xl bg-paper p-2 md:p-3 group hover:bg-paper-2 hover:shadow-card transition"
            >
              <div className="rounded-lg bg-paper-2 p-4 lg:p-5 group-hover:bg-paper transition">
                <Icon size={28} className="text-primary mb-2" />
                <h3 className="text-sm font-semibold text-ink leading-tight">
                  {service.title}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
