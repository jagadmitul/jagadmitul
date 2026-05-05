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
 * Home - true bento grid using CSS Grid row-spans. Six cards, two per
 * column (top tall + bottom short). Each "tall" card spans 3 rows and
 * each "short" card spans 2 rows of an auto-sized grid, so all three
 * columns end at the same total height - columns visually aligned, no
 * gaps between row 1 and row 2 of any column.
 *
 * Direct grid items (not nested in column flex-cols) so each card gets
 * its own row span. h-full chain (ScrollReveal → TiltCard → card root)
 * ensures cards visually fill their assigned grid cell.
 *
 * Bottom row: ServicesCard (2 cols) + CtaMarquee (1 col).
 */
export default function Home() {
  return (
    <PageShell>
      <main className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6 lg:auto-rows-[minmax(120px,auto)]">
        {/* Row 1-3: tall cards */}
        <ScrollReveal className="lg:row-span-3 h-full">
          <TiltCard max={5}>
            <IntroCard />
          </TiltCard>
        </ScrollReveal>
        <ScrollReveal className="lg:row-span-3 h-full" delay={0.05}>
          <TiltCard max={5}>
            <ExperienceCard />
          </TiltCard>
        </ScrollReveal>
        <ScrollReveal className="lg:row-span-3 h-full" delay={0.1}>
          <TiltCard max={5}>
            <ProjectsCard limit={3} />
          </TiltCard>
        </ScrollReveal>

        {/* Row 4-5: short cards */}
        <ScrollReveal className="lg:row-span-2 h-full" delay={0.15}>
          <TiltCard max={5}>
            <NowCard />
          </TiltCard>
        </ScrollReveal>
        <ScrollReveal className="lg:row-span-2 h-full" delay={0.2}>
          <TiltCard max={5}>
            <SkillsCard />
          </TiltCard>
        </ScrollReveal>
        <ScrollReveal className="lg:row-span-2 h-full" delay={0.25}>
          <TiltCard max={5}>
            <StatsCard />
          </TiltCard>
        </ScrollReveal>

        {/* Bottom CTA row - Services span 2 cols, CTA span 1 */}
        <ScrollReveal className="lg:col-span-2 h-full" delay={0.05}>
          <ServicesCard limit={6} />
        </ScrollReveal>
        <ScrollReveal className="h-full" delay={0.1}>
          <CtaMarquee />
        </ScrollReveal>
      </main>
    </PageShell>
  );
}
