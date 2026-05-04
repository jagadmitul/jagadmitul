import { PageShell } from "@/components/chrome/PageShell";
import { IntroCard } from "@/components/sections/IntroCard";
import { ExperienceCard } from "@/components/sections/ExperienceCard";
import { SkillsCard } from "@/components/sections/SkillsCard";
import { ProjectsCard } from "@/components/sections/ProjectsCard";
import { ServicesCard } from "@/components/sections/ServicesCard";
import { CtaMarquee } from "@/components/sections/CtaMarquee";
import { StatsCard } from "@/components/sections/StatsCard";
import { NowCard } from "@/components/sections/NowCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { TiltCard } from "@/components/motion/TiltCard";

/**
 * Home — three-column grid where columns are flex-col stacks of cards.
 * Each column has 2 cards (top + bottom). Cards size to their natural
 * content height — no forced stretching means no empty interior space
 * inside any card. Bottom row: ServicesCard (col-span-2) + CtaMarquee.
 */
export default function Home() {
  return (
    <PageShell>
      <main className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6 lg:items-start">
        {/* Column 1 */}
        <div className="flex flex-col gap-4 lg:gap-6">
          <ScrollReveal>
            <TiltCard max={5}>
              <IntroCard />
            </TiltCard>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <TiltCard max={5}>
              <NowCard />
            </TiltCard>
          </ScrollReveal>
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-4 lg:gap-6">
          <ScrollReveal delay={0.05}>
            <TiltCard max={5}>
              <ExperienceCard />
            </TiltCard>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <TiltCard max={5}>
              <SkillsCard />
            </TiltCard>
          </ScrollReveal>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-4 lg:gap-6">
          <ScrollReveal delay={0.1}>
            <TiltCard max={5}>
              <ProjectsCard limit={3} />
            </TiltCard>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <TiltCard max={5}>
              <StatsCard />
            </TiltCard>
          </ScrollReveal>
        </div>

        {/* Bottom CTA row */}
        <ScrollReveal className="lg:col-span-2" delay={0.05}>
          <ServicesCard limit={6} />
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <CtaMarquee />
        </ScrollReveal>
      </main>
    </PageShell>
  );
}
