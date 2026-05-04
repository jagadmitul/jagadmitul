/**
 * Real Mitul data — sourced from his LinkedIn profile + resume PDF.
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
    "Businesses are automating workflows, shipping AI agents, and rebuilding how they operate — and they need developers who can actually build it, not just talk about it.",
    "That's what I do.",
    "I'm a Senior Full Stack Developer with 5+ years building production systems, and for the past year I've been specializing in AI agents, workflow automation, and LLM-powered applications alongside my core full-stack work.",
  ],
  shipped: [
    "AI agents that automate multi-step business workflows end-to-end",
    "Enterprise SSO system with 2FA, passkeys, and RBAC for a 100K+ user platform",
    "SQL optimization that cut query time from 50s → 4s (92% improvement, 5× peak capacity)",
    "Micro-frontend platform that let teams deploy independently, cutting release bottlenecks by 40%",
  ],
  strongest:
    "I'm at my strongest on problems that sit at the intersection of AI and real systems — not demos or prototypes, but production-grade agents and automations that handle real data, real edge cases, and real load.",
  helpWith: [
    {
      title: "AI agents & multi-agent systems",
      detail: "LangChain, LangGraph, OpenAI, custom pipelines",
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
      title: "Web3 & smart contracts",
      detail: "Solidity, dApps, on-chain integrations",
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
    role: "Full Stack Developer",
    period: "Oct 2023 — Present · 2 yrs 8 mos",
    location: "Remote",
    type: "Freelance",
    bullets: [
      "Building AI agents, workflow automations, and full-stack systems for clients across SaaS and FinTech.",
      "Available for contract and consulting engagements.",
    ],
  },
  {
    id: "omnis-ai",
    company: "Omnis AI",
    role: "Team Lead — Senior Full Stack Developer",
    period: "Oct 2024 — Feb 2026 · 1 yr 5 mos",
    location: "United States · Remote",
    type: "Full-time",
    bullets: [
      "Led full-stack development of MedChronAI, an AI-powered healthcare platform serving 100K+ users in production.",
      "Architected enterprise SSO with 2FA, passkeys (WebAuthn), magic links, and RBAC — zero auth-related tickets in first month post-launch.",
      "Built micro-frontend architecture using Module Federation, reducing code duplication by 40% and enabling independent team deployments.",
      "Built and deployed AI agent pipelines using LangChain/LangGraph for multi-step workflow automation.",
      "Managed and mentored junior developers; conducted code reviews and established engineering standards.",
    ],
  },
  {
    id: "rebrandic",
    company: "Rebrandic",
    logo: "/img/rebrandic.png",
    role: "Senior FullStack Developer",
    period: "Jun 2023 — May 2025 · 2 yrs",
    location: "Remote",
    type: "Full-time",
    bullets: [
      "Oversaw secure, scalable system architecture for diverse client projects, ensuring data security and compliance.",
      "Optimized application security with best practices in authentication and encryption.",
      "Implemented robust DevOps processes with CI/CD pipelines and cloud infrastructure management.",
    ],
  },
  {
    id: "tpots",
    company: "Tpots",
    logo: "/img/tpots.png",
    role: "Software Developer",
    period: "Jun 2022 — Nov 2023 · 1 yr 6 mos",
    location: "Surat, Gujarat, India · On-site",
    type: "Full-time",
    bullets: [
      "Built and maintained frontend interfaces using Next.js and Vue.js, focusing on performance and accessibility.",
      "Developed RESTful APIs and backend services in Node.js, integrated with both SQL and NoSQL databases.",
      "Participated in agile delivery cycles — sprint planning, code review, and deployment.",
      "Collaborated with cross-functional teams in an on-site environment.",
    ],
  },
  {
    id: "zodiac",
    company: "Zodiac Techlance",
    role: "Full Stack Developer",
    period: "Feb 2020 — Aug 2022 · 2 yrs 7 mos",
    location: "Remote",
    type: "Full-time",
    bullets: [
      "Developed scalable full-stack solutions integrating smart contracts and AI tools for enhanced automation.",
      "Designed secure, scalable architectures ensuring compliance with data security standards.",
      "Implemented security best practices in authentication, encryption, and secure API design.",
    ],
  },
];

export type Skill = {
  name: string;
  icon?: string; // path under /img/
  category: "ai" | "frontend" | "backend" | "infra" | "design";
};

export const SKILLS: Skill[] = [
  { name: "LangChain", category: "ai" },
  { name: "LangGraph", category: "ai" },
  { name: "OpenAI", category: "ai" },
  { name: "Anthropic", category: "ai" },
  { name: "React", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "TypeScript", category: "frontend" },
  { name: "React Native", category: "frontend" },
  { name: "Vue.js", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Node.js", category: "backend" },
  { name: "NestJS", category: "backend" },
  { name: "Python", category: "backend" },
  { name: "FastAPI", category: "backend" },
  { name: "GraphQL", category: "backend" },
  { name: "PostgreSQL", category: "infra" },
  { name: "MongoDB", category: "infra" },
  { name: "Redis", category: "infra" },
  { name: "Prisma", category: "infra" },
  { name: "AWS", category: "infra" },
  { name: "Docker", category: "infra" },
  { name: "Vercel", category: "infra" },
  { name: "Solidity", category: "backend" },
  { name: "Figma", icon: "/img/figma.svg", category: "design" },
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
      "Multi-step LangChain / LangGraph pipelines, tool-use agents, workflow automation that handles real data, real edge cases, and real load.",
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
      "End-to-end product development — Next.js + NestJS + Postgres — from MVP to production-grade at scale.",
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
      "SSO with 2FA, passkeys (WebAuthn), magic links, and RBAC — built so the team stops noticing it exists.",
    icon: "shield",
    bullets: [
      "OAuth 2.0 + OIDC integrations",
      "Passkeys + WebAuthn",
      "Token exchange + claims normalization",
      "Sub-100ms session propagation",
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
      "AWS, Docker, CI/CD pipelines, infrastructure-as-code. The boring work that keeps systems running at 3 AM.",
    icon: "cloud",
    bullets: [
      "AWS architecture + Terraform",
      "Docker / Kubernetes",
      "GitHub Actions + Bitbucket Pipelines",
      "Observability + on-call rotation",
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
      "End-to-end business process automation using LangGraph orchestration — hours of work reduced to under 5 minutes.",
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
      "Centralized SSO across 8 products with passkeys, 2FA, magic links, and RBAC — zero auth tickets in m1.",
    longDescription: [
      "A healthcare SaaS platform needed a unified authentication system supporting enterprise customers with strict security requirements.",
      "Centralized SSO layer connecting multiple identity providers via OAuth 2.0 + OIDC, 2FA (TOTP), passkey support (WebAuthn), magic links, RBAC with granular permission levels, token exchange normalizing identity claims across providers, and session propagation enabling SSO across all product surfaces.",
    ],
    thumbnail: "/img/project-2.png",
    tags: ["WebAuthn", "OAuth 2.0", "OIDC", "Node.js", "PostgreSQL"],
    metric: "100K+ users",
    metricLabel: "0 AUTH TICKETS · M1",
    year: "2024",
    client: "MedChron.AI",
    featured: true,
    outcomes: [
      "Enterprise customers onboard without friction",
      "Zero auth-related support tickets in the first month post-launch",
      "Supports 100K+ active users with sub-100ms auth response times",
    ],
  },
  {
    id: "tapuz-sql",
    slug: "tapuz-sql",
    title: "TAPUZ — SQL Optimization at Scale",
    shortDescription:
      "Israel's largest shipping platform — read the EXPLAIN plan, fixed the index, dropped p99 from 50s to 4s.",
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
    title: "MedChron.AI — Healthcare Platform",
    shortDescription:
      "AI-powered healthcare platform for symptom generation and patient profiling, serving 100K+ users.",
    longDescription: [
      "AI-powered healthcare platform for automatic symptom generation and patient profiling.",
      "AI analyzes user input to identify symptoms, medical history, and more. Automates patient data management and offers actionable insights for healthcare professionals.",
    ],
    tags: ["Next.js", "NestJS", "AI/ML", "PostgreSQL"],
    metric: "100K+ users",
    metricLabel: "PRODUCTION HEALTHCARE",
    year: "2024–2026",
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
    title: "Collective Shift — WordPress + Lambda",
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
    id: "bhawsar",
    slug: "bhawsar",
    title: "Bhawsar Chemicals Dashboard",
    shortDescription:
      "High-efficiency operations dashboard built with React + Tailwind + Redux Toolkit.",
    longDescription: [
      "Built a highly efficient dashboard using ReactJS and Tailwind CSS.",
      "Integrated APIs for seamless CRUD operations and generated detailed reports. Used Redux-Toolkit for optimal state management.",
    ],
    tags: ["React", "Tailwind", "Redux Toolkit", "REST APIs"],
    metric: "Internal tool",
    metricLabel: "OPERATIONS DASHBOARD",
    year: "2023",
    featured: false,
    outcomes: [
      "Fast CRUD across multiple resources",
      "Auto-generated detailed reports",
      "Clean state management with Redux Toolkit",
    ],
  },
];

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
};

export const ARTICLES: Article[] = [
  {
    id: "opus-47-math",
    slug: "opus-47-hidden-math",
    title: "Opus 4.7: The Hidden Math",
    excerpt:
      "Three days in, the benchmarks say SOTA. Anthropic's own migration docs tell a different story. The 35% tokenizer change, the MRCR regression, and a practical framework for when 4.7 is actually worth it.",
    cover: "/img/blog-img-1.jpg",
    date: "Apr 2026",
    readingTime: "8 min",
    category: "AI Engineering",
    source: "LinkedIn · 12 slides · 620 impressions",
  },
  {
    id: "sql-50-to-4",
    slug: "sql-50s-to-4s",
    title: "From 50s to under 4s — A SQL Optimization Story",
    excerpt:
      "During peak traffic, a core query was timing out. Reading execution plans, validating cardinality, restructuring subqueries, and adding Redis caching with explicit invalidation. 92% improvement, 5× peak capacity, zero rollback.",
    cover: "/img/blog-img-2.jpg",
    date: "Mar 2026",
    readingTime: "6 min",
    category: "Performance",
    source: "LinkedIn · 720 impressions",
  },
  {
    id: "open-to-opportunities",
    slug: "open-to-new-opportunities",
    title: "I'm Open to New Opportunities",
    excerpt:
      "After wrapping up recent projects, I'm looking for my next challenge — contract work, project-based collaboration, or a full-time role. Industries: SaaS, FinTech, HealthTech, E-commerce.",
    cover: "/img/blog-img-3.jpg",
    date: "Apr 2026",
    readingTime: "3 min",
    category: "Career",
    source: "LinkedIn · 873 impressions",
  },
  {
    id: "gitex-2024",
    slug: "gitex-2024-takeaways",
    title: "Reflecting on an Impactful Week at GITEX 2024",
    excerpt:
      "Emerging tech trends in AI, blockchain, cloud computing. Real-world applications of AI and IoT. Innovation in full-stack development. Networking with industry leaders.",
    cover: "/img/blog-img-4.jpg",
    date: "Oct 2024",
    readingTime: "5 min",
    category: "Events",
    source: "LinkedIn · 1,406 impressions",
  },
  {
    id: "react-summit",
    slug: "react-summit-2023",
    title: "React Summit US 2023 — Notes from the Floor",
    excerpt:
      "Joined 1,500 other engineers and 60+ speakers at React Summit US. Highlights, takeaways, and what's next for the React ecosystem.",
    cover: "/img/blog-img-5.jpg",
    date: "Nov 2023",
    readingTime: "7 min",
    category: "React",
  },
  {
    id: "langgraph-prod",
    slug: "langgraph-in-production",
    title: "LangGraph Checkpointing in Production",
    excerpt:
      "What durable state actually means when your agent dies mid-tool-call and resumes from a Postgres checkpoint. Patterns from MedChron's intake flow that the docs don't tell you.",
    cover: "/img/blog-img-6.jpg",
    date: "May 2026",
    readingTime: "9 min",
    category: "AI Engineering",
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
      "Engagements are scoped per project. A one-week consult typically starts around $2,500. An embedded 3–6 month senior contract usually lands in the $8K–$15K/month range depending on hours and scope. Send a short brief to jagadmitul@gmail.com and I'll send a tailored proposal within 24 hours.",
  },
  {
    id: "availability",
    prompt: "Availability",
    answer:
      "Currently open for senior engagements. I have approximately 30 hours per week of capacity — well-suited for a 3–6 month embedded contract or the right full-time senior / staff role. Happy to share my calendar on the first call.",
  },
  {
    id: "stack",
    prompt: "Tech stack",
    answer:
      "TypeScript end-to-end. Next.js and React on the frontend, NestJS and Node.js on the backend, Python with LangChain and LangGraph for AI agent work, PostgreSQL with Prisma, Redis for caching, AWS for infrastructure, Docker, and Vercel for deployment.",
  },
  {
    id: "experience",
    prompt: "Recent work",
    answer:
      "Led full-stack engineering at MedChron.AI — a 100,000-user healthcare platform with enterprise SSO, micro-frontend architecture, and production AI agent pipelines. Earlier I optimized SQL performance at TAPUZ (Israel's largest shipping platform) from over 50 seconds to under 4 seconds — a 92% improvement that scaled peak capacity 5×.",
  },
  {
    id: "ai",
    prompt: "AI agents",
    answer:
      "Yes — I build production-grade multi-step agents with LangChain and LangGraph orchestration. Tool-use, structured output parsing, human-in-the-loop checkpoints, and end-to-end observability. The kind that handle real production load and edge cases, not demos.",
  },
  {
    id: "location",
    prompt: "Location",
    answer:
      "Based in Surat, Gujarat (UTC+05:30). Working remote across US, UK, Australia and Israel timezones — fully comfortable with overnight async collaboration and shared deep-work windows.",
  },
  {
    id: "start",
    prompt: "How to start",
    answer:
      "Send a short brief to jagadmitul@gmail.com — what you're building, your current stack, the immediate need, and a rough timeline. I reply within 24 hours with a 30-minute introductory call link if there's a fit.",
  },
];

/**
 * Conversational intents that don't appear as quick prompts but ARE
 * matched in free-form input — greetings, identity questions, thanks,
 * goodbyes, etc. Lets the chat handle natural-language openers like
 * "hi", "who are you", "thanks", etc. instead of bouncing them to email.
 */
const EXTRA_INTENTS: Record<string, string> = {
  greeting:
    "Hey there 👋 I'm Mitul — a senior full-stack & AI engineer based in Surat, India. Pick a quick prompt below or ask me anything about my work, pricing, availability, or stack.",
  identity:
    "I'm Mitul Jagad — a senior full-stack engineer with 5+ years shipping production systems for SaaS, FinTech, and HealthTech startups across the US, UK, AU and Israel. For the past year I've specialised in AI agents and workflow automation. Recent wins: 100K-user SSO platform at MedChron.AI and a 92% SQL latency win at TAPUZ.",
  what:
    "I build production-grade systems where AI meets real engineering — multi-step LangGraph agents, performance-critical backends, enterprise auth, and full-stack SaaS. Most of my engagements are 3–6 month embedded senior contracts, but I'm also open to the right full-time senior / staff role.",
  hire:
    "Yes — I'm currently open for senior engagements (3–6 month contracts or the right full-time role). Around 30 hours/week of capacity. Send a short brief to jagadmitul@gmail.com and I'll get back to you within 24 hours.",
  thanks:
    "You're welcome 🙌 — anything else I can answer? Otherwise jagadmitul@gmail.com is the fastest way to reach me directly.",
  bye:
    "Take care 👋 — jagadmitul@gmail.com is always the fastest way to reach me directly.",
  help:
    "Sure! I can answer questions about my pricing, availability, tech stack, recent work, AI agent specialism, location, or how to start an engagement. Pick a prompt below or just type your question.",
  resume:
    "You can grab my resume from the Resume button on the homepage, or download it directly: jagadmitul.vercel.app/resume.pdf",
  social:
    "GitHub: github.com/jagadmitul · LinkedIn: linkedin.com/in/jagadmitul · Email: jagadmitul@gmail.com — I reply within 24 hours.",
  // Casual Hinglish / Gujarati opener — covers "kaisa hai", "kem cho",
  // "bhai sab thik", "yaar", etc. Replies in mixed Hindi/Gujarati/English
  // because that's how Mitul actually talks to friends.
  casual:
    "Arre bhai, sab badhiya 🙌 — kaam chal raha hai, agents ship ho rahe hain. Tu bata, koi specific question hai? Pricing, work, stack, AI agents — neeche ek prompt pick kar le ya seedha jagadmitul@gmail.com pe likh de.",
  // Explicit "answer in hindi/gujarati" request
  language:
    "Haan haan, samjho ho gaya 😄 — short jawab Hindi/Gujarati mein bhi de sakta hoon, but pricing, stack, work jaisi serious cheezein clarity ke liye English mein hi rakhta hoon. Tu bata, kya jaanna hai?",
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
  namaste: "greeting",
  namaskar: "greeting",
  salaam: "greeting",
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
  // Hinglish + Gujarati casual openers / fillers — everything below maps
  // to the `casual` intent which replies in mixed Hindi/Gujarati/English.
  bhai: "casual",
  bhaiya: "casual",
  bro: "casual",
  yaar: "casual",
  dost: "casual",
  dude: "casual",
  kaisa: "casual",
  kaise: "casual",
  kaisi: "casual",
  hai: "casual",
  ho: "casual",
  kya: "casual",
  kyu: "casual",
  kyun: "casual",
  theek: "casual",
  thik: "casual",
  sahi: "casual",
  achha: "casual",
  accha: "casual",
  badhiya: "casual",
  badhia: "casual",
  baki: "casual",
  baaki: "casual",
  sab: "casual",
  sabkuch: "casual",
  re: "casual",
  arre: "casual",
  arey: "casual",
  haan: "casual",
  nahi: "casual",
  // Gujarati
  kem: "casual",
  cho: "casual",
  che: "casual",
  su: "casual",
  saru: "casual",
  saaru: "casual",
  mast: "casual",
  badhu: "casual",
  pan: "casual",
  // Explicit "switch to hindi/gujarati" requests
  hindi: "language",
  hinglish: "language",
  gujarati: "language",
  gujju: "language",
  desi: "language",
  bharat: "language",
};

const CHATBOT_FALLBACK =
  "Hmm, I'm not quite sure on that one — but I can answer questions about my pricing, availability, tech stack, AI agent work, recent projects, or how to start an engagement. Try one of the prompts below, or just rephrase. For anything specific, jagadmitul@gmail.com works too.";

// Multi-character keywords that are SAFE to substring-match (rare bigrams
// that never appear inside common Hindi/Gujarati/English words). The
// blanket .includes() fallback used to be here was the source of the
// "ai → agents" bug — "bhai", "kaisa", "hai" all contain "ai" and were
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
