import type { Service } from "./services";
import { SERVICES } from "./services";

export type ProcessStep = {
  title: string;
  duration: string;
  description: string;
};

export type ServiceDetail = Service & {
  startingPrice: number;
  deliverables: string[];
  bestFor: string[];
  technologies: string[];
  processSteps: ProcessStep[];
  faqs: { q: string; a: string }[];
  addOns: { name: string; price: string; description: string }[];
};

const SERVICE_DETAILS: Record<string, Omit<ServiceDetail, keyof Service>> = {
  "mvp-sprint": {
    startingPrice: 4800,
    deliverables: [
      "Working MVP deployed to production",
      "Auth + database + one core workflow",
      "One AI feature wired in",
      "CI/CD pipeline on Vercel",
      "Written handoff docs",
      "7 days post-launch support",
    ],
    bestFor: [
      "Founders validating an idea fast",
      "Pre-seed startups with a deadline",
      "Side projects ready to launch",
      "Teams needing a technical co-founder for a week",
    ],
    technologies: ["Next.js 16", "TypeScript", "Tailwind", "shadcn/ui", "Clerk", "Supabase", "Vercel"],
    processSteps: [
      { title: "Kickoff & scope", duration: "Day 1", description: "30-min call, written scope doc, repo setup, and design direction locked." },
      { title: "Core build", duration: "Days 2–5", description: "Auth, database, main workflow, and daily async updates with live preview links." },
      { title: "AI feature + polish", duration: "Day 6", description: "One AI integration, error states, loading UX, and responsive pass." },
      { title: "Ship & handoff", duration: "Day 7", description: "Production deploy, docs, handoff call, and two revision rounds included." },
    ],
    faqs: [
      { q: "What if my idea is bigger than 7 days?", a: "We scope ruthlessly to one core workflow. If it's bigger, we'll recommend the Full-Stack Build or a phased sprint approach." },
      { q: "Do I own the code?", a: "Yes. Full repo access from day one. MIT or your preferred license - it's yours." },
      { q: "What about design?", a: "We use shadcn/ui with custom tokens. Clean, professional, and fast - not a bespoke brand identity." },
    ],
    addOns: [
      { name: "Extra revision round", price: "$400", description: "One additional round of changes post-handoff." },
      { name: "Stripe billing setup", price: "$600", description: "Subscriptions or one-time payments wired in." },
      { name: "Extended support", price: "$800/week", description: "Continued bug fixes and small features." },
    ],
  },
  "ai-integration": {
    startingPrice: 2400,
    deliverables: [
      "Scoped AI feature in your existing app",
      "Streaming UI with graceful fallbacks",
      "Prompt engineering + guardrails",
      "Cost monitoring + rate limiting",
      "Integration tests for happy path",
      "Documentation for your team",
    ],
    bestFor: [
      "Products adding their first AI feature",
      "Teams replacing a brittle prototype",
      "Startups needing cost-aware inference",
      "Founders who tried Bolt-on chatbots",
    ],
    technologies: ["Vercel AI SDK", "OpenAI / Anthropic", "Next.js", "Zod", "Postgres"],
    processSteps: [
      { title: "Discovery", duration: "Days 1–2", description: "Map the job-to-be-done, define success metrics, and audit your existing stack." },
      { title: "Prototype", duration: "Days 3–5", description: "Working integration in a branch with streaming, guardrails, and cost caps." },
      { title: "Polish & ship", duration: "Days 6–10", description: "Error states, monitoring, team docs, and production deploy." },
    ],
    faqs: [
      { q: "Which AI providers do you support?", a: "OpenAI, Anthropic, Google, and open models via Hugging Face or Replicate. We pick based on your use case and budget." },
      { q: "How do you handle costs?", a: "Rate limiting, per-user caps, and model selection tuned to your budget. We set up monitoring so you're never surprised." },
      { q: "Can you work in our codebase?", a: "Yes. We slot in via PRs, adopt your conventions, and document everything for your team." },
    ],
    addOns: [
      { name: "RAG pipeline", price: "$1,200", description: "Document ingestion, embeddings, and retrieval-augmented generation." },
      { name: "Eval suite", price: "$800", description: "Automated quality checks for prompt outputs." },
      { name: "Multi-model routing", price: "$600", description: "Fallback chains and cost-optimized model selection." },
    ],
  },
  "design-system": {
    startingPrice: 3600,
    deliverables: [
      "Design tokens (color, type, spacing, motion)",
      "Component library (20+ components)",
      "Light + dark mode",
      "Accessibility audit (WCAG AA)",
      "Living docs site",
      "Figma file + team training session",
    ],
    bestFor: [
      "Teams with inconsistent UI",
      "Startups scaling past 2 engineers",
      "Products launching dark mode",
      "Companies post-rebrand needing structure",
    ],
    technologies: ["Tailwind CSS", "shadcn/ui", "Storybook", "Figma", "TypeScript"],
    processSteps: [
      { title: "Audit & tokens", duration: "Week 1", description: "Review existing UI, extract patterns, and define the token foundation." },
      { title: "Components", duration: "Week 2", description: "Build core components with variants, states, and accessibility baked in." },
      { title: "Docs & handoff", duration: "Week 3", description: "Living docs site, Figma sync, and a team training session." },
    ],
    faqs: [
      { q: "Do you use our existing components?", a: "We audit what you have, keep what works, and refactor what doesn't. No rip-and-replace unless needed." },
      { q: "Storybook or custom docs?", a: "Your call. We default to a lightweight docs site with copy-paste examples - faster to maintain." },
      { q: "What about Figma?", a: "We deliver a Figma file synced to tokens. Designers and engineers work from the same source of truth." },
    ],
    addOns: [
      { name: "Icon set", price: "$400", description: "Custom icon library aligned to your tokens." },
      { name: "Motion guidelines", price: "$600", description: "Animation tokens and interaction patterns." },
      { name: "Additional training", price: "$300/session", description: "Extra team onboarding sessions." },
    ],
  },
  "full-stack-build": {
    startingPrice: 8000,
    deliverables: [
      "Complete product (frontend + backend + infra)",
      "Auth, payments, and analytics",
      "Admin dashboard",
      "Observability + error tracking",
      "Written engineering docs",
      "Handoff call + 2 revision rounds",
    ],
    bestFor: [
      "Startups needing a senior technical partner",
      "Founders with funding and a deadline",
      "Teams replacing multiple freelancers",
      "Products beyond MVP complexity",
    ],
    technologies: ["Next.js", "TypeScript", "Postgres", "Stripe", "Vercel", "Resend"],
    processSteps: [
      { title: "Strategy & architecture", duration: "Week 1", description: "Product scope, data model, and technical architecture locked with weekly review cadence." },
      { title: "Core product", duration: "Weeks 2–4", description: "Frontend, backend, auth, payments - daily async updates and shared repo access." },
      { title: "Polish & launch", duration: "Weeks 5–6", description: "Admin tools, observability, performance pass, docs, and production launch." },
      { title: "Iterate", duration: "Week 7–8", description: "Post-launch fixes, two revision rounds, and optional retainer for ongoing work." },
    ],
    faqs: [
      { q: "How is this different from the MVP Sprint?", a: "More scope, more features, and a longer timeline. MVP Sprint is one workflow in 7 days; Full-Stack Build is a complete product in 4–8 weeks." },
      { q: "Do you do product strategy?", a: "Yes - weekly calls cover product decisions, not just engineering. We push back on scope creep together." },
      { q: "What happens after launch?", a: "Two revision rounds included. Optional monthly retainer for ongoing features and maintenance." },
    ],
    addOns: [
      { name: "Mobile-responsive PWA", price: "$1,500", description: "Progressive web app with offline support." },
      { name: "Multi-tenant architecture", price: "$2,000", description: "Workspace/team isolation and billing per tenant." },
      { name: "Monthly retainer", price: "$3,000/mo", description: "Ongoing studio time for features and maintenance." },
    ],
  },
};

export function getServiceDetail(id: string): ServiceDetail | null {
  const base = SERVICES.find((s) => s.id === id);
  const detail = SERVICE_DETAILS[id];
  if (!base || !detail) return null;
  return { ...base, ...detail };
}

export function getAllServiceDetails(): ServiceDetail[] {
  return SERVICES.map((s) => getServiceDetail(s.id)!).filter(Boolean);
}

export type ServiceComparisonRow = {
  service: string;
  serviceId: string;
  timeline: string;
  startingPrice: number;
  deliverables: string[];
  bestFor: string[];
  technologies: string[];
};

export function getServiceComparisonData(): ServiceComparisonRow[] {
  return getAllServiceDetails().map((s) => ({
    service: s.name,
    serviceId: s.id,
    timeline: s.timeline,
    startingPrice: s.startingPrice,
    deliverables: s.deliverables,
    bestFor: s.bestFor,
    technologies: s.technologies,
  }));
}
