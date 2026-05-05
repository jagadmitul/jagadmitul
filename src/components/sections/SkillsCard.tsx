import {
  SiNextdotjs,
  SiNestjs,
  SiLangchain,
  SiPostgresql,
  SiAnthropic,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";

/**
 * The "expert area" card - Mitul's six core production tools, displayed
 * in the same nested-tile layout as the original portfolio. The chip-cloud
 * "ALSO SHIPS WITH" section was removed - it was making column 2 visibly
 * taller than the others and felt cluttered.
 */
const EXPERT_TILES = [
  { name: "Next.js", Icon: SiNextdotjs, color: "var(--ink)" },
  { name: "NestJS", Icon: SiNestjs, color: "#E0234E" },
  { name: "LangChain", Icon: SiLangchain, color: "#1C3C3C" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  { name: "AWS", Icon: FaAws, color: "#FF9900" },
  { name: "Anthropic", Icon: SiAnthropic, color: "#D4A27F" },
];

export function SkillsCard() {
  return (
    <div className="rounded-2xl bg-paper-2/85 backdrop-blur-xl border border-hairline p-6 shadow-card h-full flex flex-col">
      <div className="mb-5">
        <span className="text-[0.65rem] font-mono uppercase tracking-[0.16em] text-primary">
          MY EXPERT AREA
        </span>
        <h2 className="mt-1 text-xl font-semibold text-ink">
          The stack I ship{" "}
          <span className="text-primary">production with</span>
        </h2>
      </div>

      {/* `grid-rows-2` + `flex-1` makes the 3x2 grid stretch to fill the
          card's remaining vertical space. Each tile is `flex flex-col` with
          a `flex-1` icon box, so the icon area grows and the name pins to
          the bottom - no centered grid + dead space above/below the
          tile cluster like the previous content-center version. */}
      <div className="grid grid-cols-3 grid-rows-2 gap-2 flex-1">
        {EXPERT_TILES.map((tool) => (
          <div
            key={tool.name}
            data-cursor-hover
            className="rounded-2xl bg-paper p-2 md:p-3 text-center group hover:shadow-card transition cursor-default flex flex-col"
          >
            <div className="grid place-content-center rounded-lg bg-paper-2 group-hover:scale-110 transition-transform flex-1">
              <tool.Icon size={32} color={tool.color} />
            </div>
            <p className="mt-2 text-xs font-medium text-ink">{tool.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
