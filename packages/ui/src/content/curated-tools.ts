/**
 * Curated directory of external AI tools we actually use or recommend.
 * Keep it small and honest — no affiliate cruft.
 */

export type CuratedCategory =
  | "ai-coding"
  | "design"
  | "deploy"
  | "content"
  | "foundations";

export type CuratedTool = {
  name: string;
  url: string;
  category: CuratedCategory;
  description: string;
};

export const CURATED_CATEGORIES: { id: CuratedCategory; label: string }[] = [
  { id: "ai-coding", label: "AI coding" },
  { id: "design", label: "Design & UI" },
  { id: "deploy", label: "Deploy & infra" },
  { id: "content", label: "Content & SEO" },
  { id: "foundations", label: "Foundations" },
];

export const CURATED_TOOLS: CuratedTool[] = [
  {
    name: "Cursor",
    url: "https://cursor.com",
    category: "ai-coding",
    description:
      "The editor we live in. AI-first, great Tab completion, and agent workflows that actually ship code.",
  },
  {
    name: "Claude",
    url: "https://claude.ai",
    category: "ai-coding",
    description:
      "Our daily driver for long-form reasoning and writing. Strong at planning before implementation.",
  },
  {
    name: "v0",
    url: "https://v0.dev",
    category: "ai-coding",
    description:
      "Fast prototype-to-code for shadcn-style React UIs. Great for exploring layouts before committing.",
  },
  {
    name: "Figma",
    url: "https://figma.com",
    category: "design",
    description:
      "Still the best tool for design systems, handoff, and collaborative visual thinking.",
  },
  {
    name: "shadcn/ui",
    url: "https://ui.shadcn.com",
    category: "design",
    description:
      "The component library baseline we extend on every project. Own the code, ship fast.",
  },
  {
    name: "Aceternity UI",
    url: "https://ui.aceternity.com",
    category: "design",
    description:
      "Beautiful motion-heavy components to borrow ideas from when a landing page needs character.",
  },
  {
    name: "Vercel",
    url: "https://vercel.com",
    category: "deploy",
    description:
      "Preview deploys, edge functions, analytics, and the AI SDK — the Next.js platform of choice.",
  },
  {
    name: "Supabase",
    url: "https://supabase.com",
    category: "deploy",
    description:
      "Postgres, auth, storage, and realtime in one. Our default data layer for MVPs.",
  },
  {
    name: "Neon",
    url: "https://neon.tech",
    category: "deploy",
    description:
      "Serverless Postgres with branching. Brilliant for staging environments that mirror production.",
  },
  {
    name: "Resend",
    url: "https://resend.com",
    category: "deploy",
    description:
      "Transactional email that doesn't make you want to go back to SendGrid. Clean API, great DX.",
  },
  {
    name: "Perplexity",
    url: "https://perplexity.ai",
    category: "content",
    description:
      "Our go-to for research with citations. Faster than hunting through Google for a defensible answer.",
  },
  {
    name: "Framer",
    url: "https://framer.com",
    category: "content",
    description:
      "When a client needs a marketing site and we don't need custom code — Framer ships in hours.",
  },
  {
    name: "Motion (Framer Motion)",
    url: "https://motion.dev",
    category: "foundations",
    description:
      "Our animation library of record. Tasteful defaults, great React API, and good enough for production.",
  },
  {
    name: "Vercel AI SDK",
    url: "https://sdk.vercel.ai",
    category: "foundations",
    description:
      "Streaming, tool use, and structured output across providers. The AI layer we reach for first.",
  },
];
