import type { MockupVariant } from "../components/ui/ui-mockup-frame";

export type CaseStudyResult = {
  metric: string;
  value: string;
  description?: string;
};

export type CaseStudy = {
  id: string;
  title: string;
  client: {
    name: string;
    industry: string;
    website?: string;
  };
  projectType: string;
  challenge: string;
  solution: string;
  results: CaseStudyResult[];
  technologies: string[];
  timeline: string;
  budget: string;
  testimonial?: string;
  testimonialAuthor?: string;
  image: string;
  mockupVariant?: MockupVariant;
  featured?: boolean;
  relatedServices: string[];
  /** Override detail link - e.g. live product at /og */
  href?: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "og-image-generator",
    title: "OG Image Generator - free AI social cards",
    client: {
      name: "Makershot",
      industry: "Studio product",
      website: "https://makershot.tech/og",
    },
    projectType: "In-house product",
    challenge:
      "Indie makers and bloggers still ship bland default OG images - or burn an afternoon in Figma for a 1200×630 card. We needed proof of craft that also helps people ship.",
    solution:
      "We built a free OG maker: prompt → FLUX background + Satori typography overlay at exact 1200×630. Style presets, live preview, instant download. No signup, no watermark - the same stack we use on client sprints.",
    results: [
      { metric: "Format", value: "1200×630", description: "Exact Open Graph canvas" },
      { metric: "Access", value: "Free", description: "No signup · no watermark" },
      { metric: "Pipeline", value: "AI + type", description: "FLUX backgrounds, Satori text" },
    ],
    technologies: ["Next.js", "FLUX", "Satori", "TypeScript", "Vercel"],
    timeline: "Shipped",
    budget: "Free tool",
    image: "/og",
    mockupVariant: "saas",
    featured: true,
    relatedServices: ["mvp-sprint", "ai-integration"],
    href: "/og",
  },
  {
    id: "saas-mvp-launch",
    title: "B2B SaaS MVP shipped in 7 days",
    client: {
      name: "Stealth SaaS founder",
      industry: "Developer tools",
    },
    projectType: "MVP Sprint",
    challenge:
      "A solo founder had validated demand through waitlist signups but needed a working product - auth, billing, and core workflow - before a YC application deadline in two weeks.",
    solution:
      "We ran a 7-day MVP sprint: scoped to one core workflow, wired Clerk auth, Stripe checkout, and a Postgres-backed dashboard. Daily async updates and a live Vercel preview kept the founder in the loop.",
    results: [
      { metric: "Time to launch", value: "7 days", description: "From kickoff to production deploy" },
      { metric: "Waitlist conversion", value: "34%", description: "Signups who activated in week one" },
      { metric: "Lighthouse score", value: "96", description: "Performance on launch day" },
    ],
    technologies: ["Next.js", "TypeScript", "Clerk", "Stripe", "Supabase", "Vercel"],
    timeline: "7 days",
    budget: "$4,800",
    testimonial:
      "Koustav shipped what would have taken me two months in a week. I talked to the person building it every day - no handoffs, no surprises.",
    testimonialAuthor: "Founder, dev tools startup",
    image: "/og",
    mockupVariant: "saas",
    featured: true,
    relatedServices: ["mvp-sprint"],
  },
  {
    id: "ai-document-pipeline",
    title: "AI document extraction for legal ops",
    client: {
      name: "Legal tech startup",
      industry: "Legal / compliance",
    },
    projectType: "AI Integration",
    challenge:
      "Their team spent 4+ hours per contract manually extracting key clauses. They needed structured data from PDFs without building an entire ML pipeline.",
    solution:
      "We integrated a streaming document parser with guardrails: chunked uploads, schema-validated JSON output, cost caps per document, and a review UI where humans could correct extractions before export.",
    results: [
      { metric: "Processing time", value: "−72%", description: "Per contract, vs. manual review" },
      { metric: "Accuracy", value: "94%", description: "On structured fields after tuning" },
      { metric: "Cost per doc", value: "$0.08", description: "Average inference cost" },
    ],
    technologies: ["Vercel AI SDK", "OpenAI", "Next.js", "Zod", "Postgres"],
    timeline: "10 days",
    budget: "$2,800",
    testimonial:
      "The AI feature actually fits our workflow - not a chatbot bolted on the side. Our ops team uses it daily.",
    testimonialAuthor: "Head of Product, legal tech",
    image: "/og",
    mockupVariant: "ai",
    featured: true,
    relatedServices: ["ai-integration"],
  },
  {
    id: "design-system-rebuild",
    title: "Design system for a growing fintech",
    client: {
      name: "Series A fintech",
      industry: "Fintech",
    },
    projectType: "Design System",
    challenge:
      "Three frontend engineers were shipping inconsistent UI. Components lived in three repos with no shared tokens, and dark mode was an afterthought.",
    solution:
      "We built a token-first design system on Tailwind + shadcn: color, type, spacing, and motion tokens; 28 production components; light/dark modes; and a living docs site with copy-paste examples.",
    results: [
      { metric: "Component reuse", value: "3×", description: "Shared components across products" },
      { metric: "PR review time", value: "−40%", description: "UI-related feedback dropped" },
      { metric: "WCAG compliance", value: "AA", description: "All core components audited" },
    ],
    technologies: ["Tailwind CSS", "shadcn/ui", "Storybook", "Figma", "TypeScript"],
    timeline: "3 weeks",
    budget: "$4,200",
    image: "/og",
    mockupVariant: "design",
    relatedServices: ["design-system"],
  },
  {
    id: "marketplace-platform",
    title: "Two-sided marketplace from zero",
    client: {
      name: "Marketplace founder",
      industry: "E-commerce",
    },
    projectType: "Full-Stack Build",
    challenge:
      "A founder needed a complete two-sided marketplace - listings, payments, messaging, and admin - with a 6-week runway before a seed round demo.",
    solution:
      "End-to-end build over 6 weeks: seller onboarding, Stripe Connect payouts, real-time messaging, search with filters, and an admin dashboard. Weekly strategy calls kept scope tight.",
    results: [
      { metric: "GMV in month one", value: "$12k", description: "After soft launch" },
      { metric: "Build timeline", value: "6 weeks", description: "Scope to production" },
      { metric: "Uptime", value: "99.9%", description: "First 90 days post-launch" },
    ],
    technologies: ["Next.js", "Stripe Connect", "Supabase", "Resend", "Vercel"],
    timeline: "6 weeks",
    budget: "$12,000",
    testimonial:
      "One person built what agencies quoted us $40k and 4 months for. The codebase is clean enough that we hired our first engineer and they ramped in a week.",
    testimonialAuthor: "CEO, marketplace startup",
    image: "/og",
    mockupVariant: "marketplace",
    relatedServices: ["full-stack-build"],
  },
];

export function getCaseStudy(id: string): CaseStudy | null {
  return CASE_STUDIES.find((c) => c.id === id) ?? null;
}

export function getCaseStudyHref(study: CaseStudy): string {
  return study.href ?? `/work/${study.id}`;
}

export function getCaseStudiesByService(serviceId: string): CaseStudy[] {
  return CASE_STUDIES.filter((c) => c.relatedServices.includes(serviceId));
}
