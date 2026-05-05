/**
 * Real Mitul data - sourced from his LinkedIn profile + resume PDF.
 * Single source of truth for every page.
 */

export const PROFILE = {
  name: "Mitul Jagad",
  pronouns: "He/Him",
  greeting: "Mitul Jagad 👋",
  headline:
    "Senior Full Stack Developer | AI Agents & Workflow Automation | Helping SaaS & FinTech startups ship faster",
  shortHeadline: "Senior Full Stack Developer & AI Agents Engineer",
  tagline:
    "A Senior Full Stack Developer & AI Engineer with 5+ years building production systems for SaaS and FinTech startups.",
  location: "Surat, Gujarat, India",
  shortLocation: "Surat, IN",
  timezone: "UTC+05:30",
  email: "jagadmitul@gmail.com",
  phone: "+91 7383348315",
  linkedin: "https://www.linkedin.com/in/jagadmitul",
  github: "https://github.com/jagadmitul",
  resumeUrl: "/resume.pdf",
  yearsExperience: 5,
  status: "OPEN_TO_WORK" as const,
  capacity: "~30 hrs/week",
  responseSla: "≤ 24 hours",
  followers: 3196,
  connections: "500+",
} as const;

export const ABOUT = {
  intro: [
    "Businesses are automating workflows, shipping AI agents, and rebuilding how they operate - and they need developers who can actually build it, not just talk about it.",
    "That's what I do.",
    "I'm a Senior Full Stack Developer with six years of shipping production systems, working close to the metal on AI agents, workflow automation, and LLM-powered apps alongside the rest of the stack.",
  ],
  shipped: [
    "AI agents that automate multi-step business workflows from intake through to result",
    "Enterprise SSO across a 10+ product suite with 2FA, passkeys, and RBAC for a 100K+ user platform",
    "SQL optimization that cut query time from 50s → 4s (92% improvement, 5× peak capacity)",
    "Micro-frontend platform that let teams ship independently, cutting release bottlenecks by 40%",
    "Two live consumer apps on Google Play - JinRaag (Jain music streaming) and JinRoop (AI devotional wallpapers)",
  ],
  strongest:
    "My best work is on agents and automations that have to actually run in production - not the demo, the version someone gets paged about at 3 AM.",
  helpWith: [
    {
      title: "AI agents & multi-agent systems",
      detail: "LangChain, LangGraph, OpenAI, Anthropic Claude, custom pipelines",
    },
    {
      title: "Workflow automation",
      detail: "n8n, Zapier alternatives, custom orchestration",
    },
    {
      title: "Full-stack SaaS applications",
      detail: "React, Next.js, Node.js, NestJS",
    },
    {
      title: "Scalable backend infrastructure",
      detail: "AWS, PostgreSQL, Redis, Docker",
    },
    {
      title: "Performance + scale",
      detail: "EXPLAIN-plan reading, indexing, caching, load testing",
    },
  ],
  closing:
    "I'm available for contract work, consulting, and the right full-time role. Particularly interested in SaaS, FinTech, HealthTech, and AI-native products.",
} as const;

export const STATS = [
  { label: "YEARS SHIPPING", value: "5+" },
  { label: "SQL OPTIMIZATION", value: "50s → 4s" },
  { label: "USERS SERVED", value: "100K+" },
  { label: "MFE BOTTLENECK CUT", value: "40%" },
] as const;

export type Job = {
  id: string;
  company: string;
  logo?: string;
  role: string;
  period: string;
  location: string;
  type: string;
  bullets: string[];
};

export const EXPERIENCE: Job[] = [
  {
    id: "self-employed",
    company: "Self Employed",
    role: "Full Stack & AI Engineer",
    period: "Oct 2023 - Present",
    location: "Remote",
    type: "Freelance",
    bullets: [
      "Shipped JinRaag (free Jain music streaming, 500+ songs) and JinRoop (AI-generated devotional wallpapers) - both live on Google Play Store + web with a 4.8★ rating.",
      "Built production AI agents and LangGraph workflow automations for SaaS and FinTech clients - multi-step pipelines, tool-use, structured output, human-in-the-loop checkpoints.",
      "Open for contract and consulting engagements - typically embedded 3-6 month senior roles.",
    ],
  },
  {
    id: "omnis-ai",
    company: "Omnis AI",
    logo: "/img/omnis.png",
    role: "Team Lead - Senior Full Stack Developer",
    period: "Oct 2024 - Feb 2026 · 1 yr 5 mos",
    location: "United States · Remote",
    type: "Full-time",
    bullets: [
      "Led full-stack development of MedChronAI, an AI-powered healthcare platform serving 100K+ users in production.",
      "Architected enterprise SSO across a 10+ product suite (Office 365-style) with 2FA, passkeys (WebAuthn), magic links, and RBAC - zero auth-related tickets in the first month post-launch.",
      "Built micro-frontend architecture using Module Federation, reducing code duplication by 40% and enabling independent team deployments.",
      "Designed and deployed AI agent pipelines using LangChain / LangGraph for multi-step workflow automation in healthcare intake flows.",
      "Managed and mentored junior developers; ran code reviews and established team engineering standards.",
    ],
  },
  {
    id: "rebrandic",
    company: "Rebrandic",
    logo: "/img/rebrandic.png",
    role: "Senior Full Stack Developer",
    period: "Jun 2023 - May 2025 · 2 yrs",
    location: "Remote",
    type: "Full-time",
    bullets: [
      "Owned secure, scalable system architecture across diverse client SaaS projects - data layer, API design, auth, and deploy pipelines.",
      "Tightened production security: auth hardening, encrypted data flows, secret management, and incident review processes.",
      "Set up CI/CD pipelines (GitHub Actions / Bitbucket) and cloud infrastructure on AWS.",
    ],
  },
  {
    id: "tpots",
    company: "Tpots",
    logo: "/img/tpots.png",
    role: "Software Developer",
    period: "Jun 2022 - Nov 2023 · 1 yr 6 mos",
    location: "Surat, Gujarat, India · On-site",
    type: "Full-time",
    bullets: [
      "Built and maintained Next.js + Vue.js frontends - focused on performance, accessibility, and responsive UX.",
      "Wrote RESTful APIs and backend services in Node.js, integrating with both SQL (PostgreSQL) and NoSQL (MongoDB) databases.",
      "Sprint planning, code review, deployment - worked the full agile cycle, not just the easy bits.",
    ],
  },
  {
    id: "zodiac",
    company: "Zodiac Techlance",
    logo: "/img/zodiac.png",
    role: "Full Stack Developer",
    period: "Feb 2020 - Aug 2022 · 2 yrs 7 mos",
    location: "Remote",
    type: "Full-time",
    bullets: [
      "Built scalable full-stack systems with early integrations of smart contracts (Solidity) and AI/ML tooling for client automation flows.",
      "Designed secure system architectures meeting client compliance requirements (auth, encryption, API hardening).",
      "First role - scaled from junior to senior contributor across multi-client engagements over 2.5 years.",
    ],
  },
];

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  bullets: string[];
};

export const SERVICES: Service[] = [
  {
    id: "ai-agents",
    title: "AI Agents & Automation",
    description:
      "Multi-step LangChain and LangGraph pipelines, tool-use agents, workflow automations that hold up when the input is weird and the load isn't a demo.",
    icon: "sparkles",
    bullets: [
      "Multi-agent orchestration with LangGraph",
      "Tool-use + structured output parsing",
      "Human-in-the-loop checkpoints",
      "Production observability + recovery",
    ],
  },
  {
    id: "saas-apps",
    title: "Full-Stack SaaS Applications",
    description:
      "Product development from first commit to paying customers - Next.js, NestJS, Postgres, the whole stack.",
    icon: "layers",
    bullets: [
      "Next.js 16 + React 19 + TypeScript",
      "NestJS + Prisma + PostgreSQL",
      "Auth, billing, RBAC, multi-tenant",
      "API design + GraphQL when it fits",
    ],
  },
  {
    id: "performance",
    title: "Performance Optimization",
    description:
      "I read the EXPLAIN plan first. Most performance problems are solved by understanding the system, not by clever code.",
    icon: "gauge",
    bullets: [
      "SQL query optimization (50s → 4s wins)",
      "Index design + cardinality validation",
      "Caching strategy (Redis, edge)",
      "Load testing + capacity planning",
    ],
  },
  {
    id: "auth",
    title: "Auth & Security",
    description:
      "SSO with 2FA, passkeys (WebAuthn), magic links, and RBAC - built so the team stops noticing it exists.",
    icon: "shield",
    bullets: [
      "OAuth 2.0 + OIDC integrations",
      "Passkeys + WebAuthn, 2FA, magic links",
      "Token exchange + claims normalization across providers",
      "Session propagation across multi-product suites",
    ],
  },
  {
    id: "mfe",
    title: "Architecture & Platforms",
    description:
      "Module Federation micro-frontends, monorepo design, internal platforms that let teams deploy independently.",
    icon: "blocks",
    bullets: [
      "Module Federation + Single-SPA",
      "Turborepo / Nx monorepos",
      "Shared design systems",
      "40% faster release cadence",
    ],
  },
  {
    id: "infra",
    title: "Cloud & DevOps",
    description:
      "AWS, Docker, CI/CD pipelines, deploy automation. The unglamorous part - the part that decides whether you sleep through the night.",
    icon: "cloud",
    bullets: [
      "AWS architecture (Lambda, S3, EC2, CloudFront)",
      "Docker + Docker Compose",
      "GitHub Actions + Bitbucket Pipelines",
      "Observability, alerts, and incident response",
    ],
  },
];

export type Project = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string[];
  thumbnail?: string;
  tags: string[];
  metric: string;
  metricLabel: string;
  year: string;
  client?: string;
  featured: boolean;
  outcomes: string[];
};

export const PROJECTS: Project[] = [
  {
    id: "ai-workflow-agent",
    slug: "ai-workflow-agent",
    title: "AI Workflow Automation Agent",
    shortDescription:
      "End-to-end business process automation using LangGraph orchestration - hours of work reduced to under 5 minutes.",
    longDescription: [
      "Built a production AI agent system that automated a multi-step business workflow previously handled manually.",
      "Multi-step pipeline using LangChain / LangGraph orchestration, tool-use agents with API and database access, human-in-the-loop checkpoints, structured output parsing, and observability for tracking agent runs and failures.",
    ],
    thumbnail: "/img/project-1.png",
    tags: ["LangGraph", "LangChain", "AI Agents", "Python", "Automation"],
    metric: "100+/day",
    metricLabel: "AUTOMATED RUNS · 99%+ SUCCESS",
    year: "2025",
    featured: true,
    outcomes: [
      "Workflow processing time reduced from hours to under 5 minutes",
      "Human error in data processing eliminated",
      "100+ automated runs per day with 99%+ success rate",
    ],
  },
  {
    id: "enterprise-sso",
    slug: "enterprise-sso",
    title: "Enterprise SSO Platform",
    shortDescription:
      "Centralized SSO across a 10+ product suite (Office 365-style) with passkeys, 2FA, magic links, and RBAC - zero auth tickets in m1.",
    longDescription: [
      "A healthcare SaaS group needed a unified authentication layer across its full product suite - 10+ products under one identity, the way Office 365 binds Outlook, Teams, OneDrive, etc.",
      "Centralized SSO layer connecting multiple identity providers via OAuth 2.0 + OIDC, 2FA (TOTP), passkey support (WebAuthn), magic links, RBAC with granular permission levels, token exchange normalizing identity claims across providers, and session propagation enabling SSO across every product surface.",
    ],
    thumbnail: "/img/project-2.png",
    tags: ["WebAuthn", "OAuth 2.0", "OIDC", "Node.js", "PostgreSQL"],
    metric: "100K+ users",
    metricLabel: "0 AUTH TICKETS · M1",
    year: "2024",
    client: "MedChron.AI",
    featured: true,
    outcomes: [
      "Enterprise customers onboard without friction across the full 10+ product suite",
      "Zero auth-related support tickets in the first month post-launch",
      "Supports 100K+ active users with consistently fast auth response across every product",
    ],
  },
  {
    id: "tapuz-sql",
    slug: "tapuz-sql",
    title: "TAPUZ - SQL Optimization at Scale",
    shortDescription:
      "Israel's largest shipping platform - read the EXPLAIN plan, fixed the index, dropped p99 from 50s to 4s.",
    longDescription: [
      "Resolved 90+ open production tickets for Israel's largest shipping e-commerce platform (NuxtJS frontend, NestJS backend).",
      "Analyzed execution plans, identified full table scan across ~2M rows, validated cardinality estimates, introduced composite indexes aligned with JOIN/WHERE patterns, restructured subqueries, implemented keyset pagination, and added Redis caching with explicit invalidation rules.",
      "Every change was benchmarked before and after. Indexes that didn't move p99 came back out before the PR landed.",
    ],
    thumbnail: "/img/project-3.png",
    tags: ["PostgreSQL", "NestJS", "NuxtJS", "Redis", "Performance"],
    metric: "50s → 4s",
    metricLabel: "P99 LATENCY · 92% IMPROVEMENT",
    year: "2023",
    client: "TAPUZ · ISR",
    featured: true,
    outcomes: [
      "Query time improved from over 50 seconds to under 4 seconds (92% improvement)",
      "Timeout errors eliminated",
      "Peak traffic capacity increased by 5×",
      "Database CPU and I/O load significantly reduced",
    ],
  },
  {
    id: "medchron",
    slug: "medchron",
    title: "MedChron.AI - Healthcare Platform",
    shortDescription:
      "AI-powered healthcare platform for symptom generation and patient profiling, serving 100K+ users.",
    longDescription: [
      "AI-powered healthcare platform for automatic symptom generation and patient profiling.",
      "AI analyzes user input to identify symptoms, medical history, and more. Automates patient data management and offers actionable insights for healthcare professionals.",
    ],
    tags: ["Next.js", "NestJS", "AI/ML", "PostgreSQL"],
    metric: "100K+ users",
    metricLabel: "PRODUCTION HEALTHCARE",
    year: "2024-2026",
    client: "Omnis AI",
    featured: false,
    outcomes: [
      "Production system serving 100K+ users",
      "Integrated SSO + MFE + AI agent pipelines",
      "Mentored junior developers throughout build",
    ],
  },
  {
    id: "collective-shift",
    slug: "collective-shift",
    title: "Collective Shift - WordPress + Lambda",
    shortDescription:
      "Custom Gutenberg blocks in React, PostgreSQL + AWS Lambda backend, Bitbucket pipelines to S3.",
    longDescription: [
      "Developed custom Gutenberg blocks in React for a fully customized WordPress site.",
      "Extended WordPress query loops to introduce new functionalities. Integrated PostgreSQL database and developed AWS Lambda functions using Sequelize ORM. Deployed via Bitbucket pipelines and Serverless framework to S3.",
    ],
    tags: ["WordPress", "React", "AWS Lambda", "Sequelize", "Serverless"],
    metric: "Serverless WP",
    metricLabel: "CUSTOM GUTENBERG",
    year: "2023",
    featured: false,
    outcomes: [
      "Custom block library for editorial workflow",
      "Serverless backend with explicit cost ceiling",
      "CI/CD via Bitbucket pipelines",
    ],
  },
  {
    id: "jinraag-jinroop",
    slug: "jinraag-jinroop",
    title: "JinRaag · JinRoop - Jain Devotional Suite",
    shortDescription:
      "Two live consumer apps for the global Jain community: JinRaag (free music streaming - 500+ songs, 50+ artists) and JinRoop (AI-generated devotional wallpapers that auto-sync to prayer times). Both shipping on web + Play Store.",
    longDescription: [
      "A two-app suite serving the global Jain diaspora under one brand. JinRaag is a free streaming platform - pitched as the world's largest free Jain music library - with 500+ songs, 50+ artists, and 10+ categories (Stavan, Bhajan, Aarti, Stotra, Chalisa). JinRoop is a companion wallpaper app that generates personalised AI art and changes the device background four times a day, synchronised to traditional Jain prayer timings - available in English, Hindi, and Gujarati with a free tier and ₹29/month premium.",
      "End-to-end engineering across both apps. Turborepo monorepo with NestJS 11 API, Next.js 15 web, Expo + React Native mobile, Prisma 6 on PostgreSQL. Multi-role auth (Listener / Artist / Admin), multi-artist song attribution (singer, composer, lyricist relations), play-history tracking, editorial + auto-generated playlists, in-app premium subscriptions, AI image generation for personalised wallpapers, push notifications, and a full admin console for content + analytics.",
      "Live: jinraag.com · jinroop.jinraag.com · Play Store: com.jinroop.app · shah.jinraag",
    ],
    tags: [
      "Next.js",
      "NestJS",
      "Expo",
      "Prisma",
      "PostgreSQL",
      "AI Image Gen",
      "Subscriptions",
    ],
    metric: "2 apps · live",
    metricLabel: "WEB + ANDROID · 4.8★",
    year: "2026",
    client: "JinRaag",
    featured: true,
    outcomes: [
      "Both apps live on Google Play Store with a 4.8★ rating",
      "JinRaag: 500+ songs, 50+ artists, 10+ categories curated and live",
      "JinRoop: AI-generated personalised wallpapers in EN/HI/GU, premium tier shipped at ₹29/month",
      "Single Turborepo monorepo serving web + Android from one codebase, with shared Prisma schema and admin console",
    ],
  },
];

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "code"; lang?: string; text: string }
  | { type: "quote"; text: string };

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  date: string;
  readingTime: string;
  category: string;
  source?: string;
  body: ArticleBlock[];
};

export const ARTICLES: Article[] = [
  {
    id: "claude-code-by-the-numbers",
    slug: "claude-code-by-the-numbers",
    title: "A month with Claude Code, by the numbers",
    excerpt:
      "Three accounts, two months, ~8 billion tokens, ~$5,250 spent. What I actually learned about cache reads, context strategy, and where Claude Code earns its money - pulled straight from the usage reports.",
    cover: "/img/blog-img-1.jpg",
    date: "May 2026",
    readingTime: "7 min",
    category: "AI Engineering",
    body: [
      {
        type: "p",
        text: "I run Claude Code hard. Two months of pulling daily usage reports across three accounts paint a picture I wish I'd seen on day one - so here it is, with real numbers, not vibes.",
      },
      { type: "h2", text: "The headline numbers" },
      {
        type: "p",
        text: "Across one month (April 3 → May 2, 2026) my own account processed ~3.19 billion tokens for ~$2,116 - averaging ~$78/day with one $315 spike on April 18. A second account (similar usage) ran ~$1,928 over the same window. And a March-month run on a third account did 1.88 billion tokens for ~$1,208. Roll it up: roughly 8 billion tokens and $5,250 spent on Claude Code over two months.",
      },
      {
        type: "p",
        text: "If you stop reading here, the only takeaway you need: cache reads dominate everything else.",
      },
      { type: "h2", text: "Cache reads are the cost story" },
      {
        type: "p",
        text: "Of those ~3.19 billion tokens on my main account in April, 3.11 billion were cache reads. That's 97%. Input + output combined accounted for under 250 million. The Anthropic prompt cache is what makes Claude Code economically viable for long agentic workloads - without it, the same workload would cost an order of magnitude more.",
      },
      {
        type: "p",
        text: "So the real lever you have is: how warm is your cache? Every clear-context, every long sleep, every cold session pays the input-token tax all over again. Every continuation lets the cache do the heavy lifting at fractional cost.",
      },
      { type: "h2", text: "What spikes the bill" },
      {
        type: "p",
        text: "Looking at the daily breakdown, the $200+ days share three patterns:",
      },
      {
        type: "ul",
        items: [
          "Big agentic loops with lots of tool-use - each tool call re-reads context.",
          "Long sessions that survived multiple compactions - context grows, every read gets bigger.",
          "Heavy code-editing days - large file reads + writes + lints feed back into the cache cycle.",
        ],
      },
      {
        type: "p",
        text: "The cheap days ($1-$15) are the opposite: short scoped sessions, small context, no tool-use loops.",
      },
      { type: "h2", text: "Practical rules I've landed on" },
      {
        type: "ol",
        items: [
          "Stay in cache window. The cache TTL is 5 minutes. If you're sleeping/waiting longer than that, the next wake-up pays for the full context again. Either stay under ~270 seconds OR commit to a much longer wait that amortises the cache miss.",
          "Scope sessions tightly. Open a fresh session per logical task instead of pushing one mega-session that accumulates context. Smaller cache footprint per session = lower per-read cost.",
          "Use Haiku and Sonnet where you can. The reports show Opus is where the money goes. Drop down a tier for routine edits, lints, status checks - keep Opus for the hard stuff.",
          "Watch the cache-read column, not the input/output. That's where 97% of your spend lives.",
        ],
      },
      { type: "h2", text: "Is it worth it?" },
      {
        type: "p",
        text: "$2K/month for one engineer's tooling is a number that needs justifying. For my work - multi-step agent design, full-stack feature builds, performance audits - Claude Code does the work of probably 1.5-2x my own throughput. At that ratio it pays for itself many times over. But the moment you stop using it for high-leverage tasks and start using it for ergonomic search-and-replace, the ratio flips.",
      },
      {
        type: "p",
        text: "Track your spend. Read your daily reports. The cache numbers will tell you everything you need to know about whether you're using the tool or just paying it.",
      },
    ],
  },
  {
    id: "opus-47-math",
    slug: "opus-47-hidden-math",
    title: "Opus 4.7: The Hidden Math",
    excerpt:
      "Three days in, the benchmarks say SOTA. The migration docs and my own usage data tell a different story. The tokenizer shift, the MRCR drop, and a practical framework for when 4.7 is actually worth the bill.",
    cover: "/img/blog-img-2.jpg",
    date: "Apr 2026",
    readingTime: "6 min",
    category: "AI Engineering",
    source: "First posted on LinkedIn",
    body: [
      {
        type: "p",
        text: "Anthropic shipped Opus 4.7 and the headline benchmarks all moved up. Before you swap your default model, the interesting story is in the migration notes and the bill.",
      },
      { type: "h2", text: "The tokenizer changed" },
      {
        type: "p",
        text: "4.7 ships a revised tokenizer. For English-heavy prompts it's a wash; for code, structured output, and non-English text the token counts drift noticeably from 4.6. That matters for two reasons: your cost projections (priced per token) and your context budgets (sized in tokens). A 30k-char file that fit comfortably in a 4.6 context window may push you closer to the edge in 4.7. Re-measure before you assume.",
      },
      { type: "h2", text: "MRCR is not a free upgrade" },
      {
        type: "p",
        text: "Multi-Round Conversational Recall (MRCR) measures how reliably the model can pull facts from earlier in a long conversation. 4.7's published numbers on MRCR aren't strictly better than 4.6 across the board - for some long-context workloads, 4.6 still edges it. If your agent depends on stable recall of facts dropped 50k tokens ago, A/B test before you migrate the whole system.",
      },
      { type: "h2", text: "The cost picture from real usage" },
      {
        type: "p",
        text: "Pulling my own daily reports: a typical day mixing haiku and opus runs around $40-$80. Days that are heavy opus + agentic tool-use can blow past $200. Cache reads are doing the bulk of the work - they account for the vast majority of token volume and most of the cost. A model swap that changes how the cache hits (different tokeniser → different cache keys) can transiently spike your bill until the cache repopulates.",
      },
      { type: "h2", text: "When 4.7 is actually worth it" },
      {
        type: "ul",
        items: [
          "Hard reasoning tasks where 4.6 was already at its limit - code refactors that touch many files, multi-step planning, complex SQL generation.",
          "Workloads where small accuracy improvements compound - agents that loop (a 2% reliability bump per step compounds across 20 steps).",
          "Net-new context where you're already paying full input cost - the tokeniser change has the smallest blast radius here.",
        ],
      },
      { type: "h2", text: "When to stay on 4.6" },
      {
        type: "ul",
        items: [
          "Long-context workloads that depend heavily on recall from earlier turns.",
          "Production agents whose cost ceilings are tight and have stable cache patterns.",
          "Anything where you have measured reliability and can't afford a quiet regression.",
        ],
      },
      { type: "h2", text: "The honest take" },
      {
        type: "p",
        text: "Don't read the leaderboard and switch. Read the migration notes. Run the same task on both for a week. Watch your cost graph and your eval pass-rate. Then move (or don't) with data, not with the press release.",
      },
    ],
  },
  {
    id: "explain-plans",
    slug: "reading-explain-plans",
    title: "Reading EXPLAIN plans without losing your mind",
    excerpt:
      "Postgres EXPLAIN ANALYZE looks like an alien language until you learn the three things to read first. After that, every slow query becomes a five-minute conversation, not a forty-minute mystery.",
    cover: "/img/blog-img-3.jpg",
    date: "Mar 2026",
    readingTime: "8 min",
    category: "Performance",
    body: [
      {
        type: "p",
        text: "Most performance problems I've fixed in production weren't fixed by clever code. They were fixed by reading the execution plan. EXPLAIN ANALYZE is the most useful single tool in the Postgres ecosystem - and most engineers I've met don't read its output past the first line.",
      },
      { type: "h2", text: "What you're actually looking at" },
      {
        type: "p",
        text: "An EXPLAIN ANALYZE output is a tree, printed inside-out. The deepest indented node runs first; its result feeds the parent above it; that parent's result feeds its parent; and so on up to the root, which is the final result Postgres returns to the client.",
      },
      {
        type: "p",
        text: "Every node carries two sets of numbers. The first - `cost=` - is the planner's estimate before the query ran. The second - `actual time=` - is what really happened. The interesting bugs live in the gap between those two.",
      },
      { type: "h2", text: "Three things to read first" },
      { type: "h3", text: "1. Is there a Seq Scan over a big table?" },
      {
        type: "p",
        text: "A Seq Scan reads every row. If the table has a million rows and the WHERE filters down to a thousand, you almost certainly want an index. If the planner chose Seq Scan despite the index existing, your `WHERE` clause probably can't use the index - typically because of a function on the column (`WHERE LOWER(email) = ...`), an implicit cast, or selectivity the planner mis-estimated.",
      },
      { type: "h3", text: "2. Are the row estimates wildly off?" },
      {
        type: "p",
        text: "Look at `rows=` (estimated) vs `actual rows=`. If the planner expected 50 rows and got back 50,000, every join above that point will be wrong-sized - usually a Nested Loop where you wanted a Hash Join. Fix: run `ANALYZE table_name` to refresh statistics, or bump `default_statistics_target` for that column. Stale or coarse stats mislead the planner into picking the wrong algorithm.",
      },
      { type: "h3", text: "3. Where's the time going?" },
      {
        type: "p",
        text: "Each node reports `actual time=A..B rows=N loops=L`. The total work for that node is roughly `(B - A) × L`. A node that runs 10,000 loops at 0.5ms each is your bottleneck even if each individual call looks fast. This is the classic N+1 query in disguise - fix it by pulling the inner work into a join or a CTE.",
      },
      { type: "h2", text: "Patterns that show up over and over" },
      {
        type: "ul",
        items: [
          "Nested Loop where you wanted Hash Join - almost always a row-estimate problem (run ANALYZE).",
          "Index Scan when you wanted Bitmap Index Scan - the planner thinks the index returns few rows; if it returns many, Bitmap is faster.",
          "Sort using disk - `Sort Method: external merge Disk:` in the output. Bump `work_mem` for the session, or restructure the query so the sort step is smaller.",
          "Filter inside Index Scan - the index isn't selective enough; you need a composite index covering all WHERE columns.",
        ],
      },
      { type: "h2", text: "How I work through a slow query" },
      {
        type: "ol",
        items: [
          "Run `EXPLAIN (ANALYZE, BUFFERS) SELECT ...` - the BUFFERS flag adds disk I/O numbers.",
          "Read the plan inside-out. Find the deepest expensive node.",
          "Check if estimated rows ≈ actual rows. If not, run ANALYZE and re-plan.",
          "If the deep node is a Seq Scan over a big table, build the index that would let it do an Index Scan instead.",
          "Re-run, compare, validate the win is real (not just one cold-cache vs warm-cache lucky run).",
          "If the new index didn't move p99, drop it before you ship. Indexes have a write cost - keep only the ones that earn their keep.",
        ],
      },
      { type: "h2", text: "What this gets you" },
      {
        type: "p",
        text: "I've shipped query optimizations that took p99 latency from 50 seconds to under 4 - a 92% improvement, 5× peak capacity recovered, zero rollbacks. The interesting part is none of it was clever. It was reading the plan, finding the Seq Scan, building the right composite index, validating before/after, and being willing to delete the indexes that didn't help.",
      },
      {
        type: "p",
        text: "EXPLAIN ANALYZE is talking to you. It's worth learning the language.",
      },
    ],
  },
  {
    id: "tailwind-v4-theme",
    slug: "tailwind-v4-theme-one-year-in",
    title: "Tailwind v4's @theme: one year in",
    excerpt:
      "The CSS-first @theme block was the biggest shift in Tailwind's history and the documentation barely sells it. After a year of building real apps with it, here's what changed and why I'm not going back.",
    cover: "/img/blog-img-4.jpg",
    date: "Feb 2026",
    readingTime: "5 min",
    category: "Frontend",
    body: [
      {
        type: "p",
        text: "Tailwind v4 dropped the `tailwind.config.js` file in favour of a CSS-first `@theme` block. After a year of using it on production sites, it's the single best change Tailwind has made - and most teams I talk to still don't realise how much it simplifies things.",
      },
      { type: "h2", text: "What changed in one sentence" },
      {
        type: "p",
        text: "Your design tokens - colours, fonts, spacing, shadows - now live as CSS variables inside an `@theme` block in your CSS, not as a JavaScript object in a config file.",
      },
      { type: "h2", text: "What that actually means in code" },
      {
        type: "code",
        lang: "css",
        text: `@import "tailwindcss";\n\n@theme {\n  --color-paper: #f0f2f5;\n  --color-ink: #1a1f2c;\n  --color-primary: #4770ff;\n  --font-sans: "Instrument Sans", ui-sans-serif, system-ui;\n}`,
      },
      {
        type: "p",
        text: "Now `bg-paper`, `text-ink`, `bg-primary`, and `font-sans` are utility classes - and the variables themselves are real CSS custom properties you can also reference directly in styles, JS, or third-party components.",
      },
      { type: "h2", text: "Why this matters" },
      { type: "h3", text: "Themes become trivial" },
      {
        type: "p",
        text: "Multi-theme sites used to mean either rebuilding Tailwind with different configs or overriding utility classes by hand. Now you set `--color-primary` to one value at `:root` and another at `[data-theme=\"dark\"]`, and every `bg-primary` in the app re-tints automatically. No re-build. No `dark:` prefix proliferation. Just CSS variables doing what they were designed to do.",
      },
      { type: "h3", text: "Third-party libraries finally fit" },
      {
        type: "p",
        text: "Any library that accepts a CSS variable for a colour can now be wired into your design tokens directly - no token-mapping shim, no theme-provider gymnastics.",
      },
      { type: "h3", text: "Less config noise" },
      {
        type: "p",
        text: "A 200-line `tailwind.config.js` extending the default theme, declaring custom plugins, and exporting types collapses into a 30-line `@theme` block in the CSS file you were already going to edit.",
      },
      { type: "h2", text: "What's lost" },
      {
        type: "p",
        text: "If you were doing heavy programmatic theme generation in JavaScript (e.g. computing token scales from a base value), v4's @theme is less ergonomic. You can still do it - the tokens are just CSS, and CSS now has `color-mix()` and arithmetic - but if your design system was built around computed JS objects, the migration takes some thinking.",
      },
      { type: "h2", text: "How to migrate" },
      {
        type: "ol",
        items: [
          "Run the official upgrade tool - it handles the mechanical bits.",
          "Move each `theme.extend.colors` entry into `@theme` as `--color-<name>`.",
          "Replace any place you accessed tokens from JS (often custom plugins or shadcn-style components) with CSS variable references.",
          "Delete `tailwind.config.js`. You won't need it back.",
        ],
      },
      {
        type: "p",
        text: "I migrated three production sites to v4 over the last year. None of them have been moved back. The CSS-first model is genuinely better for the way design systems are built today.",
      },
    ],
  },
  {
    id: "use-sync-external-store",
    slug: "use-sync-external-store-default",
    title: "Why useSyncExternalStore quietly became my default",
    excerpt:
      "useEffect + useState was getting me hydration mismatches every other week. useSyncExternalStore solved it cleanly - and once you see the pattern, you start using it everywhere.",
    cover: "/img/blog-img-5.jpg",
    date: "Jan 2026",
    readingTime: "5 min",
    category: "React",
    body: [
      {
        type: "p",
        text: "If you build SSR React apps, you've hit this: a `useState` initialised from `window.matchMedia(...)` flashes the wrong value during hydration. A theme stored in `localStorage` flickers on first paint. A scroll-position-driven component renders one thing on the server and another on the client, and React yells at you in the console.",
      },
      {
        type: "p",
        text: "The standard fix used to be: render nothing on the server, set a `mounted` flag in `useEffect`, then render the real value once mounted. It works, but every component using a browser API needs the boilerplate, and you're paying with a flash of empty content.",
      },
      { type: "h2", text: "useSyncExternalStore exists for exactly this" },
      {
        type: "p",
        text: "React 18 shipped `useSyncExternalStore` and the marketing was \"for state-management library authors\". That undersold it. It's the cleanest way to subscribe a React component to anything outside React's state graph - `matchMedia`, `localStorage`, `document.visibilityState`, scroll position, the network status - and have hydration just work.",
      },
      { type: "h2", text: "The pattern" },
      {
        type: "code",
        lang: "tsx",
        text: `function useMediaQuery(query: string): boolean {\n  return useSyncExternalStore(\n    // Subscribe to changes\n    (callback) => {\n      const mql = window.matchMedia(query);\n      mql.addEventListener("change", callback);\n      return () => mql.removeEventListener("change", callback);\n    },\n    // Read the current value (client)\n    () => window.matchMedia(query).matches,\n    // Server snapshot (no window) - return a stable default\n    () => false\n  );\n}`,
      },
      {
        type: "p",
        text: "Three callbacks: how to subscribe, how to read on the client, how to read on the server. React handles the rest - including suppressing the hydration warning when the server snapshot legitimately differs from the client value.",
      },
      { type: "h2", text: "Where I now reach for it instead of useEffect" },
      {
        type: "ul",
        items: [
          "Reading `prefers-reduced-motion` to gate animations.",
          "Reading `(pointer: coarse)` to disable a custom cursor on touch devices.",
          "Reading the persisted theme from `localStorage` without a flash of default theme.",
          "Reading `document.visibilityState` to pause expensive animations when the tab is hidden.",
          "Reading the active route in custom hooks that need to react to URL changes outside Next's router context.",
        ],
      },
      { type: "h2", text: "When NOT to use it" },
      {
        type: "p",
        text: "It's a subscription primitive - wrong choice for one-shot async state (use a fetcher / `useSWR` / etc.). It's also wrong for state that React already owns (don't wrap your `useState` in it). The rule: if the source of truth lives outside React and changes over time, this is your hook.",
      },
      { type: "h2", text: "The bigger lesson" },
      {
        type: "p",
        text: "React 18's quieter additions - `useSyncExternalStore`, `useId`, `useDeferredValue` - have aged better than the hyped ones. They solved real problems most teams were patching around with brittle custom code. Worth re-reading the release notes; you may have a couple of `useEffect`s that want to be something else.",
      },
    ],
  },
];

export const TOOLS = [
  { name: "VS Code", icon: "/img/mico.svg" },
  { name: "Figma", icon: "/img/figma.svg" },
  { name: "Notion", icon: "/img/notion.svg" },
  { name: "Framer", icon: "/img/framer.svg" },
  { name: "Webflow", icon: "/img/webflow.svg" },
  { name: "Zeplin", icon: "/img/zeplin.svg" },
] as const;

export const COMPANIES = [
  { name: "Omnis AI", role: "Team Lead" },
  { name: "Rebrandic", logo: "/img/rebrandic.png", role: "Senior Dev" },
  { name: "Tpots", logo: "/img/tpots.png", role: "Software Dev" },
  { name: "Zodiac Techlance", role: "Full Stack Dev" },
  { name: "TAPUZ · ISR", role: "Performance Eng" },
  { name: "MedChron.AI", role: "Lead Engineer" },
] as const;

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Works" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export const CHATBOT_PROMPTS = [
  {
    id: "pricing",
    prompt: "Pricing",
    answer:
      "Engagements are scoped per project. A one-week consult typically starts around $2,500. An embedded 3-6 month senior contract usually lands in the $8K-$15K/month range depending on hours and scope. Send a short brief to jagadmitul@gmail.com and I'll send a tailored proposal within 24 hours.",
  },
  {
    id: "availability",
    prompt: "Availability",
    answer:
      "Currently open for senior engagements. I have approximately 30 hours per week of capacity - well-suited for a 3-6 month embedded contract or the right full-time senior / staff role. Happy to share my calendar on the first call.",
  },
  {
    id: "stack",
    prompt: "Tech stack",
    answer:
      "TypeScript everywhere. Next.js + React on the frontend, NestJS + Node.js on the backend, Python with LangChain and LangGraph for AI agent work, PostgreSQL with Prisma, Redis for caching, AWS for infra, Docker, and Vercel for deploys.",
  },
  {
    id: "experience",
    prompt: "Recent work",
    answer:
      "Led full-stack engineering at MedChron.AI - a 100K+ user healthcare platform with enterprise SSO across a 10+ product suite, micro-frontend architecture, and production AI agent pipelines. Earlier I optimized SQL performance at TAPUZ (Israel's largest shipping platform) from over 50 seconds to under 4 seconds - a 92% improvement, 5× peak capacity. Most recently shipped two consumer apps live on Play Store: JinRaag (Jain music streaming) and JinRoop (AI devotional wallpapers).",
  },
  {
    id: "ai",
    prompt: "AI agents",
    answer:
      "Yes - multi-step LangChain and LangGraph agents with tool-use, structured-output parsing, human-in-the-loop checkpoints, and observability built in from day one. The kind that survive Monday morning, not just the demo.",
  },
  {
    id: "location",
    prompt: "Location",
    answer:
      "Based in Surat, Gujarat (UTC+05:30). Working remote across US, UK, Australia and Israel timezones - fully comfortable with overnight async collaboration and shared deep-work windows.",
  },
  {
    id: "start",
    prompt: "How to start",
    answer:
      "Send a short brief to jagadmitul@gmail.com - what you're building, your current stack, the immediate need, and a rough timeline. I reply within 24 hours with a 30-minute introductory call link if there's a fit.",
  },
];

/**
 * Conversational intents that don't appear as quick prompts but ARE
 * matched in free-form input - greetings, identity questions, thanks,
 * goodbyes, etc. Lets the chat handle natural-language openers like
 * "hi", "who are you", "thanks", etc. instead of bouncing them to email.
 */
const EXTRA_INTENTS: Record<string, string> = {
  greeting:
    "Hi there 👋 I'm Mitul - a senior full-stack & AI engineer based in Surat, India. Feel free to pick a quick prompt below or ask me anything about my work, pricing, availability, or stack. I also reply in Hindi, Gujarati, French, Spanish, or German if that's easier for you.",
  identity:
    "I'm Mitul Jagad - senior full-stack engineer, six years of shipping production systems for SaaS / FinTech / HealthTech startups across the US, UK, AU and Israel. Lots of AI agent and workflow automation work alongside the rest of the stack. Recent: enterprise SSO across a 10+ product suite at MedChron.AI (100K+ users), 92% SQL latency win at TAPUZ, and two live consumer apps (JinRaag + JinRoop) on Google Play.",
  what:
    "I build the agents, backends, and auth systems that have to actually work in prod - LangGraph multi-step pipelines, performance-critical APIs, enterprise SSO, full-stack SaaS. Mostly 3-6 month embedded senior contracts. Open to the right full-time senior / staff role too.",
  hire:
    "Yes, I'm currently open for senior engagements (3-6 month contracts or the right full-time role). Around 30 hours/week of capacity. Feel free to send a short brief to jagadmitul@gmail.com and I'll get back to you within 24 hours.",
  thanks:
    "You're very welcome - happy to help. Anything else I can answer? Otherwise jagadmitul@gmail.com is the fastest way to reach me directly.",
  bye:
    "Take care - jagadmitul@gmail.com is always the fastest way to reach me directly.",
  help:
    "Of course - I can answer questions about my pricing, availability, tech stack, recent work, AI agent specialism, location, or how to start an engagement. Feel free to pick a prompt below, or type your question. I respond in English, Hindi, Gujarati, French, Spanish, or German.",
  resume:
    "You can grab my resume from the Resume button on the homepage, or download it directly: jagadmitul.vercel.app/resume.pdf",
  social:
    "GitHub: github.com/jagadmitul · LinkedIn: linkedin.com/in/jagadmitul · Email: jagadmitul@gmail.com - I reply within 24 hours.",

  // ─── Multi-language casual replies ─────────────────────────────────
  // Triggered when the visitor uses a greeting / casual phrase in that
  // specific language. Each reply uses the formal/respectful register
  // (Hindi "aap", Gujarati "tame", French "vous", Spanish "usted",
  // German "Sie") because the visitor could be a recruiter, client, or
  // anyone professional - tone needs to land warm but never chummy.

  casual_hi:
    "Namaste 🙏 Sab badhiya hai - kaam chal raha hai, naye projects bhi shuru kiye hain. Aap kya jaanna chahenge - pricing, availability, tech stack, ya recent work? Niche prompts hain, athva jagadmitul@gmail.com par message kar dijiye, 24 hours mein reply kar deta hoon.",

  casual_gu:
    "Namaste 🙏 Saaru chu, kaam pan saaru chale che. Tame shu jaanva mango cho - pricing, availability, tech stack, ke recent work? Niche prompts che, athva jagadmitul@gmail.com par mail karjo - 24 kalak ma jawab aapis.",

  casual_fr:
    "Bonjour 👋 Tout va bien - je continue à livrer des projets. Que souhaitez-vous savoir : tarifs, disponibilité, stack technique, ou travaux récents ? Vous trouverez les questions ci-dessous, ou vous pouvez m'écrire à jagadmitul@gmail.com - je réponds sous 24 heures.",

  casual_es:
    "¡Hola! 👋 Todo va bien - sigo enviando proyectos a producción. ¿Qué le gustaría saber: tarifas, disponibilidad, stack técnico, o trabajos recientes? Abajo están las preguntas frecuentes, o puede escribirme a jagadmitul@gmail.com - respondo en menos de 24 horas.",

  casual_de:
    "Hallo 👋 Alles läuft gut - ich liefere weiterhin Projekte aus. Was möchten Sie wissen: Preise, Verfügbarkeit, Tech-Stack, oder aktuelle Arbeiten? Unten finden Sie die häufigen Fragen, oder Sie können mir an jagadmitul@gmail.com schreiben - ich antworte innerhalb von 24 Stunden.",

  // Explicit "what languages do you support" request
  language:
    "I'm happy to chat in English (default), Hindi, Gujarati, French, Spanish, or German - just write in whichever feels easiest and I'll pick up the language from there. For specific topics like pricing, stack, or recent work I keep the answer in English so the details stay precise.",
};

const CHATBOT_KEYWORDS: Record<string, string> = {
  // pricing
  pricing: "pricing",
  price: "pricing",
  cost: "pricing",
  charge: "pricing",
  budget: "pricing",
  rate: "pricing",
  quote: "pricing",
  fees: "pricing",
  expensive: "pricing",
  affordable: "pricing",
  invoice: "pricing",
  // availability
  available: "availability",
  availability: "availability",
  free: "availability",
  capacity: "availability",
  schedule: "availability",
  busy: "availability",
  open: "availability",
  // stack
  stack: "stack",
  tech: "stack",
  technology: "stack",
  language: "stack",
  framework: "stack",
  tools: "stack",
  typescript: "stack",
  javascript: "stack",
  python: "stack",
  react: "stack",
  next: "stack",
  nextjs: "stack",
  node: "stack",
  nestjs: "stack",
  postgres: "stack",
  database: "stack",
  // experience / projects
  experience: "experience",
  recent: "experience",
  work: "experience",
  project: "experience",
  projects: "experience",
  portfolio: "experience",
  shipped: "experience",
  built: "experience",
  past: "experience",
  case: "experience",
  // AI agents
  ai: "ai",
  agent: "ai",
  agents: "ai",
  langchain: "ai",
  langgraph: "ai",
  llm: "ai",
  llms: "ai",
  automation: "ai",
  workflow: "ai",
  workflows: "ai",
  openai: "ai",
  anthropic: "ai",
  claude: "ai",
  gpt: "ai",
  // location
  location: "location",
  based: "location",
  where: "location",
  remote: "location",
  timezone: "location",
  india: "location",
  surat: "location",
  // start
  start: "start",
  begin: "start",
  process: "start",
  email: "start",
  contact: "start",
  reach: "start",
  brief: "start",
  message: "start",
  call: "start",
  meeting: "start",
  // EXTRA conversational intents
  hi: "greeting",
  hii: "greeting",
  hiii: "greeting",
  hello: "greeting",
  hey: "greeting",
  yo: "greeting",
  sup: "greeting",
  morning: "greeting",
  afternoon: "greeting",
  evening: "greeting",
  greetings: "greeting",
  bro: "greeting",
  dude: "greeting",
  re: "greeting",
  // Indian greetings - intentionally route to the language-aware Hindi
  // intent so the reply lands warm in the visitor's likely register.
  namaste: "casual_hi",
  namaskar: "casual_hi",
  salaam: "casual_hi",
  who: "identity",
  yourself: "identity",
  about: "identity",
  intro: "identity",
  introduction: "identity",
  bio: "identity",
  what: "what",
  hire: "hire",
  hiring: "hire",
  job: "hire",
  contract: "hire",
  freelance: "hire",
  consult: "hire",
  thanks: "thanks",
  thank: "thanks",
  thx: "thanks",
  cheers: "thanks",
  appreciated: "thanks",
  bye: "bye",
  goodbye: "bye",
  later: "bye",
  cya: "bye",
  help: "help",
  question: "help",
  ask: "help",
  options: "help",
  resume: "resume",
  cv: "resume",
  github: "social",
  linkedin: "social",
  twitter: "social",
  social: "social",
  // ─── Hindi casual triggers (replies in respectful Hindi / "aap" form) ───
  bhai: "casual_hi",
  bhaiya: "casual_hi",
  yaar: "casual_hi",
  dost: "casual_hi",
  kaisa: "casual_hi",
  kaise: "casual_hi",
  kaisi: "casual_hi",
  haal: "casual_hi",
  hai: "casual_hi",
  ho: "casual_hi",
  kya: "casual_hi",
  kyu: "casual_hi",
  kyun: "casual_hi",
  theek: "casual_hi",
  thik: "casual_hi",
  sahi: "casual_hi",
  achha: "casual_hi",
  accha: "casual_hi",
  badhiya: "casual_hi",
  badhia: "casual_hi",
  baki: "casual_hi",
  baaki: "casual_hi",
  sab: "casual_hi",
  sabkuch: "casual_hi",
  arre: "casual_hi",
  arey: "casual_hi",
  haan: "casual_hi",
  nahi: "casual_hi",

  // ─── Gujarati casual triggers (replies in respectful Gujarati / "tame") ───
  kem: "casual_gu",
  cho: "casual_gu",
  che: "casual_gu",
  chhe: "casual_gu",
  shu: "casual_gu",
  saru: "casual_gu",
  saaru: "casual_gu",
  mast: "casual_gu",
  majama: "casual_gu",
  badhu: "casual_gu",
  pan: "casual_gu",
  tame: "casual_gu",
  khabar: "casual_gu",
  jaanva: "casual_gu",

  // ─── French casual triggers ───
  bonjour: "casual_fr",
  bonsoir: "casual_fr",
  salut: "casual_fr",
  merci: "casual_fr",
  comment: "casual_fr",
  ça: "casual_fr",
  vais: "casual_fr",

  // ─── Spanish casual triggers ───
  hola: "casual_es",
  buenos: "casual_es",
  buenas: "casual_es",
  gracias: "casual_es",
  qué: "casual_es",
  estás: "casual_es",
  estas: "casual_es",
  tal: "casual_es",

  // ─── German casual triggers ───
  hallo: "casual_de",
  guten: "casual_de",
  tag: "casual_de",
  danke: "casual_de",
  geht: "casual_de",

  // ─── Explicit "do you speak X / what languages" requests ───
  hindi: "language",
  hinglish: "language",
  gujarati: "language",
  gujju: "language",
  desi: "language",
  bharat: "language",
  french: "language",
  français: "language",
  francais: "language",
  spanish: "language",
  español: "language",
  espanol: "language",
  german: "language",
  deutsch: "language",
  multilingual: "language",
  languages: "language",
  polyglot: "language",
  translate: "language",
  speak: "language",
  respond: "language",
};

const CHATBOT_FALLBACK =
  "Hmm, I'm not quite sure on that one - but I can answer questions about my pricing, availability, tech stack, AI agent work, recent projects, or how to start an engagement. Try one of the prompts below, or just rephrase. For anything specific, jagadmitul@gmail.com works too.";

// Multi-character keywords that are SAFE to substring-match (rare bigrams
// that never appear inside common Hindi/Gujarati/English words). The
// blanket .includes() fallback used to be here was the source of the
// "ai → agents" bug - "bhai", "kaisa", "hai" all contain "ai" and were
// triggering the AI agents response. We keep an explicit allow-list so
// long phrases like "what's your stack" still resolve via the long word.
const SUBSTRING_SAFE = new Set([
  "pricing",
  "availability",
  "stack",
  "experience",
  "portfolio",
  "langchain",
  "langgraph",
  "automation",
  "workflow",
  "openai",
  "anthropic",
  "location",
  "remote",
  "timezone",
  "freelance",
  "contract",
  "thanks",
  "resume",
  "github",
  "linkedin",
  "namaste",
  "gujarati",
  "hinglish",
]);

export function matchPrompt(question: string): string {
  const q = question.toLowerCase().trim();
  if (!q) return CHATBOT_FALLBACK;

  const counts: Record<string, number> = {};
  // Primary: tokenise and look up each whole token in the keyword map.
  // Punctuation, contractions, slashes are all stripped to whitespace.
  const tokens = q.split(/[\s,.!?'"()/\-_]+/).filter(Boolean);
  for (const token of tokens) {
    const intent = CHATBOT_KEYWORDS[token];
    if (intent) counts[intent] = (counts[intent] ?? 0) + 2;
  }

  // Secondary: only the SUBSTRING_SAFE allow-list does a .includes() check.
  // Short ambiguous keys ("ai", "do", "hi", "ho") are NEVER substring-matched
  // because they false-trigger inside Hindi/Gujarati words.
  if (Object.keys(counts).length === 0) {
    for (const [keyword, intent] of Object.entries(CHATBOT_KEYWORDS)) {
      if (!SUBSTRING_SAFE.has(keyword)) continue;
      if (q.includes(keyword)) counts[intent] = (counts[intent] ?? 0) + 1;
    }
  }

  const best = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  if (!best) return CHATBOT_FALLBACK;
  const intent = best[0];

  if (intent in EXTRA_INTENTS) return EXTRA_INTENTS[intent];
  const found = CHATBOT_PROMPTS.find((p) => p.id === intent);
  return found?.answer ?? CHATBOT_FALLBACK;
}
