/**
 * Service packages shown on /services and teased on /.
 * Pricing is placeholder - easy to swap.
 */

export type Service = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: string;
  priceSuffix?: string;
  timeline: string;
  features: string[];
  ctaLabel: string;
  ctaHref: string;
  highlight?: boolean;
  badge?: string;
};

export const SERVICES: Service[] = [
  {
    id: "mvp-sprint",
    name: "7-Day MVP Sprint",
    tagline: "Zero to shipped in one week",
    description:
      "A focused week where we design, build, and ship a working MVP on top of a modern stack. Perfect for validating an idea fast.",
    price: "$4,800",
    priceSuffix: "flat",
    timeline: "7 days",
    features: [
      "Daily async updates + async design reviews",
      "Next.js 16 + TypeScript + Tailwind + shadcn",
      "Auth, database, and one AI feature wired in",
      "Deployed to Vercel with CI/CD",
      "Two rounds of revisions",
      "Handoff + 7 days of post-launch support",
    ],
    ctaLabel: "Book the sprint",
    ctaHref: "/contact?service=mvp-sprint",
    highlight: true,
    badge: "Most popular",
  },
  {
    id: "ai-integration",
    name: "AI Feature Integration",
    tagline: "Drop AI into your product, properly",
    description:
      "Add a well-designed AI feature to your existing app - streaming, cost-aware, safe, and actually useful.",
    price: "$2,400",
    priceSuffix: "from",
    timeline: "1–2 weeks",
    features: [
      "Scoping + success metrics up front",
      "Vercel AI SDK or direct provider integration",
      "Prompt engineering + guardrails",
      "Streaming UI with graceful fallbacks",
      "Cost monitoring + rate limiting",
    ],
    ctaLabel: "Talk to the studio",
    ctaHref: "/contact?service=ai-integration",
  },
  {
    id: "design-system",
    name: "Custom Design System",
    tagline: "A design language you can ship on",
    description:
      "A production-ready design system - tokens, components, and docs - that matches your brand and stays consistent as you scale.",
    price: "$3,600",
    priceSuffix: "from",
    timeline: "2–3 weeks",
    features: [
      "Design tokens (color, type, spacing, radii, motion)",
      "Tailwind + shadcn component library",
      "Light + dark mode, accessibility baked in",
      "Living Storybook / Docs site",
      "Figma handoff + team training",
    ],
    ctaLabel: "Start a system",
    ctaHref: "/contact?service=design-system",
  },
  {
    id: "full-stack-build",
    name: "Full-Stack Product Build",
    tagline: "A complete product, built with you",
    description:
      "End-to-end product development for startups that need a senior studio partner. Strategy, product, design, and engineering in one loop.",
    price: "$8,000",
    priceSuffix: "from",
    timeline: "4–8 weeks",
    features: [
      "Weekly strategy + product reviews",
      "Senior full-stack build (frontend, backend, infra)",
      "Payments, auth, and analytics set up",
      "Observability + error tracking",
      "Written docs + engineering handoff",
    ],
    ctaLabel: "Scope a build",
    ctaHref: "/contact?service=full-stack-build",
  },
];
