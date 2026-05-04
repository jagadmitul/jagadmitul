"use client";

import { useEffect, useState } from "react";
import { PageShell } from "@/components/chrome/PageShell";

/**
 * Temporary concept-comparison page. Renders four candidate replacements
 * for the IntroCard "MJ" monogram, each constrained to the same aspect
 * ratio (6:4) so they can be compared apples-to-apples. Once a concept is
 * chosen this route can be deleted.
 */
export default function ConceptsPage() {
  return (
    <PageShell>
      <main className="space-y-10">
        <header className="rounded-2xl bg-paper-2/85 backdrop-blur-xl border border-hairline p-6 shadow-card">
          <span className="text-[0.65rem] font-mono uppercase tracking-[0.16em] text-primary">
            REVIEW · TEMPORARY
          </span>
          <h1 className="mt-1 text-2xl lg:text-3xl font-semibold text-ink leading-tight">
            Replace the &ldquo;MJ&rdquo; monogram &mdash;{" "}
            <span className="text-primary">pick one</span>
          </h1>
          <p className="mt-2 text-base text-ink-mute leading-relaxed max-w-2xl">
            All four work across every theme (color is driven by{" "}
            <code className="font-mono text-sm">var(--primary)</code>). Switch
            themes from the header to see how each adapts.
          </p>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ConceptCard
            n={1}
            name="Live Signal"
            note="EKG-style waveform + rotating role tag + live status pill. Reads as 'alive and shipping right now'. Matches the rest of the site's pulse animations and Lenis-scroll energy."
          >
            <LiveSignal />
          </ConceptCard>

          <ConceptCard
            n={2}
            name="Generative Mark"
            note="Animated SVG flow-field that draws an organic mark on mount. Pure art / decoration — beautiful but says nothing about who he is."
          >
            <GenerativeMark />
          </ConceptCard>

          <ConceptCard
            n={3}
            name="Live Console"
            note="Mini terminal panel that types out short code lines auto-cycling every ~4s. Engineer-on-brand and very distinctive."
          >
            <LiveConsole />
          </ConceptCard>

          <ConceptCard
            n={4}
            name="Number That Matters"
            note="Massive italic serif number cycling through real wins (50s→4s, 100K+, 92%). Brutal-confidence — show, don't tell."
          >
            <CyclingNumber />
          </ConceptCard>

          <ConceptCard
            n={5}
            name="Liquid Mercury MJ"
            note="Custom logo: same goo-filter physics as the cursor, but here the blobs settle into 'MJ'. Site-wide brand consistency — the cursor IS the logo. Hover to see them un-merge."
          >
            <LiquidMJ />
          </ConceptCard>

          <ConceptCard
            n={6}
            name="System Architecture Self-Portrait"
            note="A schematic 'block diagram' of Mitul-as-a-system. Labeled nodes (BRAIN · STACK · HANDS · OUTPUT) wired together. Zero other portfolios do this — pure engineer identity."
          >
            <SystemPortrait />
          </ConceptCard>

          <ConceptCard
            n={7}
            name="Continuous-Line Portrait"
            note="A single SVG stroke draws an abstract figure on mount (stroke-dasharray reveal). Editorial, hand-drawn, feels like a Picasso line study."
          >
            <ContinuousLine />
          </ConceptCard>

          <ConceptCard
            n={8}
            name="Live Agent Graph"
            note="Visualizes a LangGraph-style multi-agent workflow: nodes pulse, edges fire in sequence. Reflects the literal work he ships — AI agent pipelines."
          >
            <AgentGraph />
          </ConceptCard>
        </section>
      </main>
    </PageShell>
  );
}

function ConceptCard({
  n,
  name,
  note,
  children,
}: {
  n: number;
  name: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-paper-2/85 backdrop-blur-xl border border-hairline p-6 shadow-card">
      <div className="flex items-center gap-3 mb-4">
        <span className="grid place-items-center w-7 h-7 rounded-full bg-primary text-primary-ink text-sm font-mono font-semibold">
          {n}
        </span>
        <h2 className="text-xl font-semibold text-ink">{name}</h2>
      </div>
      <div className="aspect-[6/4] overflow-hidden rounded-xl relative">
        {children}
      </div>
      <p className="mt-4 text-sm text-ink-mute leading-relaxed">{note}</p>
    </div>
  );
}

/* ─────────────── Concept 1 — Live Signal ─────────────── */

const SIGNAL_TAGS = ["AGENTS", "SYSTEMS", "API", "RAG", "PIPELINES", "AUTH"];

function LiveSignal() {
  const [tag, setTag] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setTag((t) => (t + 1) % SIGNAL_TAGS.length);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(135deg, color-mix(in srgb, var(--primary) 14%, var(--paper-2)) 0%, var(--paper-2) 50%, color-mix(in srgb, var(--primary) 8%, var(--paper-2)) 100%)",
      }}
    >
      {/* dot grid */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(var(--ink-mute) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />

      {/* rotating tag */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10">
        <span className="inline-flex items-center gap-2 rounded-full bg-paper-2/95 backdrop-blur px-3 py-1 text-[0.65rem] font-mono uppercase tracking-[0.18em] text-primary border border-primary/20 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          {SIGNAL_TAGS[tag]}
        </span>
      </div>

      {/* EKG-style waveform */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 600 400"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="ekg-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--primary)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M 0 200 L 120 200 L 140 200 L 160 100 L 180 300 L 200 200 L 280 200 L 300 200 L 320 130 L 340 270 L 360 200 L 480 200 L 500 200 L 520 80 L 540 320 L 560 200 L 600 200"
          stroke="url(#ekg-grad)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* status pill */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10">
        <span className="inline-flex items-center gap-2 rounded-full bg-ink/90 backdrop-blur px-3 py-1.5 text-[0.65rem] font-mono uppercase tracking-[0.16em] text-paper-2 shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          BUILDING · OnwardOS
        </span>
      </div>
    </div>
  );
}

/* ─────────────── Concept 2 — Generative Mark ─────────────── */

function GenerativeMark() {
  // Pre-compute a deterministic flow-field of curves
  const lines = Array.from({ length: 26 }, (_, i) => {
    const seed = i * 0.37;
    const startY = 60 + i * 11;
    const ctrl1Y = startY + Math.sin(seed) * 80;
    const ctrl2Y = startY + Math.cos(seed * 1.3) * 80;
    return `M 50 ${startY} C 200 ${ctrl1Y}, 400 ${ctrl2Y}, 550 ${startY + Math.sin(seed * 2) * 40}`;
  });

  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(135deg, color-mix(in srgb, var(--primary) 18%, var(--paper-2)) 0%, var(--paper-2) 100%)",
      }}
    >
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 600 400"
        preserveAspectRatio="none"
      >
        {lines.map((d, i) => (
          <path
            key={i}
            d={d}
            stroke="var(--primary)"
            strokeWidth="1"
            fill="none"
            opacity={0.18 + (i / lines.length) * 0.4}
            strokeLinecap="round"
          />
        ))}
      </svg>
    </div>
  );
}

/* ─────────────── Concept 3 — Live Console ─────────────── */

const CONSOLE_LINES: { prompt: string; code: string; comment?: string }[] = [
  {
    prompt: "$",
    code: "await agent.invoke({ task })",
    comment: "// LangGraph in prod",
  },
  {
    prompt: ">",
    code: "shipped 100K-user SSO · 8 products",
  },
  {
    prompt: "$",
    code: "const mitul: Engineer = { ships: true }",
  },
  {
    prompt: ">",
    code: "50s → 4s · 92% query drop · 5x peak",
  },
];

function LiveConsole() {
  const [line, setLine] = useState(0);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const target = CONSOLE_LINES[line].code;
    let i = 0;
    setTyped("");
    const typeId = setInterval(() => {
      i++;
      setTyped(target.slice(0, i));
      if (i >= target.length) clearInterval(typeId);
    }, 28);
    const advance = setTimeout(() => {
      setLine((l) => (l + 1) % CONSOLE_LINES.length);
    }, 3600);
    return () => {
      clearInterval(typeId);
      clearTimeout(advance);
    };
  }, [line]);

  const cur = CONSOLE_LINES[line];

  return (
    <div
      className="absolute inset-0 p-5 flex flex-col"
      style={{
        background: "var(--ink)",
      }}
    >
      {/* fake mac dots */}
      <div className="flex items-center gap-1.5 mb-4">
        <span className="w-2.5 h-2.5 rounded-full bg-paper/30" />
        <span className="w-2.5 h-2.5 rounded-full bg-paper/30" />
        <span className="w-2.5 h-2.5 rounded-full bg-paper/30" />
        <span className="ml-3 text-[0.6rem] font-mono uppercase tracking-[0.16em] text-paper/40">
          mitul ~ /
        </span>
      </div>

      <div className="flex-1 font-mono text-sm space-y-2 overflow-hidden">
        {/* preceding faded lines */}
        <div className="text-paper/35">
          $ git log --author=mitul --oneline | wc -l
        </div>
        <div className="text-paper/35">2,841</div>

        {/* current typing line */}
        <div className="flex items-baseline gap-2 mt-3">
          <span className="text-primary">{cur.prompt}</span>
          <span className="text-paper">
            {typed}
            <span className="inline-block w-1.5 h-3.5 ml-0.5 bg-primary align-middle animate-pulse" />
          </span>
        </div>
        {cur.comment && (
          <div className="text-paper/40 ml-4">{cur.comment}</div>
        )}
      </div>
    </div>
  );
}

/* ─────────────── Concept 5 — Liquid Mercury MJ ─────────────── */

function LiquidMJ() {
  // SVG goo filter merges nearby circles into one shape. Positioned to
  // form an 'M' on the left and a 'J' on the right. They drift gently.
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(135deg, color-mix(in srgb, var(--primary) 14%, var(--paper-2)) 0%, var(--paper-2) 50%, color-mix(in srgb, var(--primary) 8%, var(--paper-2)) 100%)",
      }}
    >
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="mj-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 22 -11"
            />
          </filter>
        </defs>
      </svg>

      <svg
        viewBox="0 0 600 400"
        className="absolute inset-0 w-full h-full mj-drift"
        style={{ filter: "url(#mj-goo)" }}
      >
        {/* M — five circles */}
        <circle cx="120" cy="280" r="42" fill="var(--primary)" />
        <circle cx="160" cy="180" r="38" fill="var(--primary)" />
        <circle cx="200" cy="220" r="34" fill="var(--primary)" />
        <circle cx="240" cy="180" r="38" fill="var(--primary)" />
        <circle cx="280" cy="280" r="42" fill="var(--primary)" />
        {/* J — three circles */}
        <circle cx="400" cy="170" r="40" fill="var(--primary)" />
        <circle cx="400" cy="260" r="36" fill="var(--primary)" />
        <circle cx="360" cy="310" r="40" fill="var(--primary)" />
      </svg>
    </div>
  );
}

/* ─────────────── Concept 6 — System Architecture Self-Portrait ─────────────── */

function SystemPortrait() {
  return (
    <div
      className="absolute inset-0 p-5"
      style={{
        background:
          "linear-gradient(135deg, color-mix(in srgb, var(--primary) 10%, var(--paper-2)) 0%, var(--paper-2) 100%)",
      }}
    >
      {/* dot grid */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(var(--ink-mute) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      />

      <svg
        viewBox="0 0 600 380"
        className="relative w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* connector lines */}
        <g
          stroke="var(--primary)"
          strokeWidth="1.4"
          strokeDasharray="3 4"
          opacity="0.55"
          fill="none"
        >
          <path d="M 300 70 L 300 130" />
          <path d="M 300 180 L 150 240" />
          <path d="M 300 180 L 450 240" />
          <path d="M 300 180 L 300 240" />
          <path d="M 150 290 L 300 340" />
          <path d="M 300 290 L 300 340" />
          <path d="M 450 290 L 300 340" />
        </g>

        {/* INPUT */}
        <g>
          <rect
            x="240"
            y="30"
            width="120"
            height="40"
            rx="8"
            fill="var(--paper-2)"
            stroke="var(--primary)"
            strokeWidth="1.2"
          />
          <text
            x="300"
            y="55"
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
            fontSize="11"
            fill="var(--ink)"
          >
            BRIEF · CLIENT
          </text>
        </g>

        {/* CORE — Mitul */}
        <g>
          <rect
            x="220"
            y="130"
            width="160"
            height="50"
            rx="10"
            fill="var(--primary)"
          />
          <text
            x="300"
            y="153"
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
            fontSize="10"
            fill="var(--primary-ink)"
            opacity="0.7"
          >
            CORE
          </text>
          <text
            x="300"
            y="170"
            textAnchor="middle"
            fontFamily="serif"
            fontStyle="italic"
            fontSize="18"
            fill="var(--primary-ink)"
          >
            MITUL
          </text>
        </g>

        {/* SUB-SYSTEMS */}
        {[
          { x: 90, label: "BRAIN", body: "AI / AGENTS" },
          { x: 240, label: "STACK", body: "TS · NEST · NEXT" },
          { x: 390, label: "HANDS", body: "SHIP · ITERATE" },
        ].map((m) => (
          <g key={m.label}>
            <rect
              x={m.x}
              y="240"
              width="120"
              height="50"
              rx="8"
              fill="var(--paper-2)"
              stroke="var(--primary)"
              strokeWidth="1"
              opacity="0.95"
            />
            <text
              x={m.x + 60}
              y="262"
              textAnchor="middle"
              fontFamily="ui-monospace, monospace"
              fontSize="9"
              fill="var(--primary)"
            >
              {m.label}
            </text>
            <text
              x={m.x + 60}
              y="278"
              textAnchor="middle"
              fontFamily="ui-monospace, monospace"
              fontSize="10"
              fill="var(--ink)"
            >
              {m.body}
            </text>
          </g>
        ))}

        {/* OUTPUT */}
        <g>
          <rect
            x="220"
            y="340"
            width="160"
            height="32"
            rx="6"
            fill="var(--ink)"
          />
          <text
            x="300"
            y="361"
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
            fontSize="11"
            fill="var(--paper-2)"
          >
            OUTPUT · PROD
          </text>
        </g>
      </svg>
    </div>
  );
}

/* ─────────────── Concept 7 — Continuous-Line Portrait ─────────────── */

function ContinuousLine() {
  // A single SVG path drawn as one stroke — abstract figure (head, neck,
  // shoulder line) inspired by Picasso line studies. Animates draw-on.
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(135deg, color-mix(in srgb, var(--primary) 12%, var(--paper-2)) 0%, var(--paper-2) 100%)",
      }}
    >
      <svg
        viewBox="0 0 600 400"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          className="line-draw"
          d="M 180 100
             C 220 60, 320 60, 360 110
             C 400 160, 380 220, 340 240
             C 320 250, 320 280, 340 290
             C 380 305, 420 320, 420 360
             L 180 360
             C 180 320, 220 305, 260 290
             C 280 280, 280 250, 260 240
             C 220 220, 200 160, 240 110
             C 250 100, 270 95, 290 95
             M 240 150 Q 260 165, 280 150
             M 320 150 Q 340 165, 360 150"
          stroke="var(--primary)"
          strokeWidth="2.2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="absolute bottom-4 left-4">
        <span className="inline-flex items-center gap-1.5 text-[0.6rem] font-mono uppercase tracking-wider text-ink-mute">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          STUDY · ONE STROKE
        </span>
      </div>
    </div>
  );
}

/* ─────────────── Concept 8 — Live Agent Graph ─────────────── */

const GRAPH_NODES = [
  { id: "in", x: 80, y: 200, label: "INPUT" },
  { id: "rt", x: 200, y: 100, label: "ROUTE" },
  { id: "rg", x: 320, y: 80, label: "RAG" },
  { id: "tl", x: 320, y: 200, label: "TOOL" },
  { id: "vd", x: 200, y: 300, label: "VALIDATE" },
  { id: "lm", x: 440, y: 160, label: "LLM" },
  { id: "ot", x: 540, y: 200, label: "OUTPUT" },
];

const GRAPH_EDGES: [string, string][] = [
  ["in", "rt"],
  ["in", "vd"],
  ["rt", "rg"],
  ["rt", "tl"],
  ["rg", "lm"],
  ["tl", "lm"],
  ["vd", "lm"],
  ["lm", "ot"],
];

function AgentGraph() {
  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setPulse((p) => (p + 1) % GRAPH_EDGES.length);
    }, 360);
    return () => clearInterval(id);
  }, []);

  const nodeById = (id: string) => GRAPH_NODES.find((n) => n.id === id)!;

  return (
    <div
      className="absolute inset-0"
      style={{
        background: "var(--ink)",
      }}
    >
      <svg
        viewBox="0 0 620 400"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* edges */}
        {GRAPH_EDGES.map(([a, b], i) => {
          const na = nodeById(a);
          const nb = nodeById(b);
          const active = i === pulse;
          return (
            <line
              key={`${a}-${b}`}
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              stroke={active ? "var(--primary)" : "rgba(255,255,255,0.15)"}
              strokeWidth={active ? 2 : 1}
              style={{ transition: "all 200ms ease" }}
            />
          );
        })}

        {/* nodes */}
        {GRAPH_NODES.map((n, i) => {
          const involved =
            GRAPH_EDGES[pulse][0] === n.id || GRAPH_EDGES[pulse][1] === n.id;
          return (
            <g key={n.id}>
              <circle
                cx={n.x}
                cy={n.y}
                r={involved ? 22 : 18}
                fill={involved ? "var(--primary)" : "rgba(255,255,255,0.08)"}
                stroke="var(--primary)"
                strokeWidth={involved ? 0 : 1.2}
                style={{ transition: "all 240ms ease" }}
              />
              <text
                x={n.x}
                y={n.y + 38}
                textAnchor="middle"
                fontFamily="ui-monospace, monospace"
                fontSize="9"
                fill={involved ? "var(--primary)" : "rgba(255,255,255,0.5)"}
                style={{ letterSpacing: "0.12em" }}
              >
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="absolute top-4 left-4">
        <span className="inline-flex items-center gap-1.5 text-[0.6rem] font-mono uppercase tracking-wider text-paper-2/60">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          AGENT WORKFLOW · LIVE
        </span>
      </div>
    </div>
  );
}

/* ─────────────── Concept 4 — Number That Matters ─────────────── */

const NUMBERS = [
  { value: "50s→4s", label: "SQL OPTIMISED · TAPUZ" },
  { value: "100K+", label: "USERS · MEDCHRON SSO" },
  { value: "92%", label: "QUERY-TIME DROP" },
  { value: "5+", label: "YEARS SHIPPING PROD" },
  { value: "8", label: "PRODUCTS · SSO PLATFORM" },
];

function CyclingNumber() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % NUMBERS.length), 2400);
    return () => clearInterval(id);
  }, []);
  const cur = NUMBERS[i];

  return (
    <div
      className="absolute inset-0 grid place-items-center text-center"
      style={{
        background:
          "linear-gradient(135deg, color-mix(in srgb, var(--primary) 14%, var(--paper-2)) 0%, var(--paper-2) 60%, color-mix(in srgb, var(--primary) 8%, var(--paper-2)) 100%)",
      }}
    >
      <div>
        <div
          key={cur.value}
          className="font-display italic text-primary leading-none cycling-number-in"
          style={{
            fontSize: "clamp(3.5rem, 9vw, 6rem)",
            letterSpacing: "-0.03em",
          }}
        >
          {cur.value}
        </div>
        <div className="mt-3 text-[0.65rem] font-mono uppercase tracking-[0.16em] text-ink-mute">
          {cur.label}
        </div>
      </div>

      {/* tiny live indicator */}
      <div className="absolute bottom-4 left-4">
        <span className="inline-flex items-center gap-1.5 text-[0.6rem] font-mono uppercase tracking-wider text-ink-mute">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          PROD-VERIFIED
        </span>
      </div>
    </div>
  );
}
