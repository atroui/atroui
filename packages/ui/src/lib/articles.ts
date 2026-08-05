import type { ComponentType } from "react";

import {
  JOURNAL_ARTICLES,
  JOURNAL_LOADERS,
} from "../content/journal/_registry";

export const ARTICLE_CATEGORIES = [
  "AI",
  "Design",
  "Development",
  "Business",
] as const;

export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number];

export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tag: string;
  category: ArticleCategory;
  readTime: string;
  featured?: boolean;
  author?: string;
  image?: string;
};

export const ARTICLES = (
  [
    ...JOURNAL_ARTICLES,
    {
    slug: "shipping-ai-features-that-dont-feel-grafted-on",
    title: "Shipping AI features that don't feel grafted on",
    description:
      "The difference between a useful AI feature and an afterthought comes down to five design decisions.",
    date: "2026-04-10",
    tag: "Essay",
    category: "AI",
    readTime: "6 min read",
    featured: true,
  },
  {
    slug: "the-7-day-mvp-sprint-playbook",
    title: "The 7-day MVP sprint playbook",
    description:
      "A day-by-day breakdown of how we ship a working product in a week.",
    date: "2026-03-28",
    tag: "Playbook",
    category: "Development",
    readTime: "8 min read",
  },
  {
    slug: "async-client-communication",
    title: "Async client communication that actually works",
    description:
      "Daily updates, Loom walkthroughs, and decision logs - how we run projects without daily standups.",
    date: "2026-03-15",
    tag: "Guide",
    category: "Business",
    readTime: "5 min read",
  },
  {
    slug: "design-tokens-in-practice",
    title: "Design tokens in practice",
    description:
      "How we structure color, type, spacing, and motion tokens for Tailwind v4 projects.",
    date: "2026-03-08",
    tag: "Guide",
    category: "Design",
    readTime: "7 min read",
  },
  {
    slug: "when-not-to-use-ai",
    title: "When not to use AI",
    description:
      "Five situations where a regular form, filter, or rule engine beats an LLM call.",
    date: "2026-02-22",
    tag: "Essay",
    category: "AI",
    readTime: "4 min read",
  },
  {
    slug: "pricing-your-mvp",
    title: "Pricing your MVP before you build",
    description:
      "Fixed-price scoping: how we estimate MVPs without scope creep eating the margin.",
    date: "2026-02-10",
    tag: "Playbook",
    category: "Business",
    readTime: "6 min read",
  },
  {
    slug: "tailwind-v4-migration-notes",
    title: "Tailwind v4 migration notes",
    description:
      "What changed moving from config files to CSS-first tokens - and what we'd do differently.",
    date: "2026-01-28",
    tag: "Notes",
    category: "Development",
    readTime: "5 min read",
  },
  {
    slug: "shipping-dark-mode-right",
    title: "Shipping dark mode right",
    description:
      "Semantic tokens, contrast checks, and the three mistakes that make dark mode feel like an afterthought.",
    date: "2026-01-15",
    tag: "Guide",
    category: "Design",
    readTime: "6 min read",
  },
  {
    slug: "scope-creep-antidote",
    title: "The scope creep antidote",
    description:
      "One core workflow, written success metrics, and a 'not in v1' list - our sprint scoping ritual.",
    date: "2025-12-20",
    tag: "Playbook",
    category: "Business",
    readTime: "5 min read",
  },
  {
    slug: "indie-founder-stack-2026",
    title: "The indie founder stack in 2026",
    description:
      "Next.js, Supabase, Clerk, Vercel, and the AI SDK - why we keep reaching for the same tools.",
    date: "2025-12-05",
    tag: "Essay",
    category: "Development",
    readTime: "7 min read",
  },
  {
    slug: "og-images-that-convert",
    title: "OG images that actually convert",
    description:
      "Dimensions, typography, and contrast rules for 1200×630 cards that look sharp everywhere.",
    date: "2025-11-18",
    tag: "Guide",
    category: "Design",
    readTime: "4 min read",
  },
  {
    slug: "postgres-for-indie-saas",
    title: "Postgres for indie SaaS",
    description:
      "When to use Supabase vs. raw Postgres, and the schema patterns we copy into every project.",
    date: "2025-11-02",
    tag: "Guide",
    category: "Development",
    readTime: "8 min read",
  },
  ] satisfies ArticleMeta[]
).sort((a, b) => b.date.localeCompare(a.date));

const LEGACY_ARTICLE_LOADERS: Record<string, () => Promise<{ default: ComponentType }>> = {
  "shipping-ai-features-that-dont-feel-grafted-on": () =>
    import("../content/articles/shipping-ai-features-that-dont-feel-grafted-on.mdx"),
  "the-7-day-mvp-sprint-playbook": () =>
    import("../content/articles/the-7-day-mvp-sprint-playbook.mdx"),
  "async-client-communication": () =>
    import("../content/articles/async-client-communication.mdx"),
  "design-tokens-in-practice": () =>
    import("../content/articles/design-tokens-in-practice.mdx"),
  "when-not-to-use-ai": () =>
    import("../content/articles/when-not-to-use-ai.mdx"),
  "pricing-your-mvp": () =>
    import("../content/articles/pricing-your-mvp.mdx"),
  "tailwind-v4-migration-notes": () =>
    import("../content/articles/tailwind-v4-migration-notes.mdx"),
  "shipping-dark-mode-right": () =>
    import("../content/articles/shipping-dark-mode-right.mdx"),
  "scope-creep-antidote": () =>
    import("../content/articles/scope-creep-antidote.mdx"),
  "indie-founder-stack-2026": () =>
    import("../content/articles/indie-founder-stack-2026.mdx"),
  "og-images-that-convert": () =>
    import("../content/articles/og-images-that-convert.mdx"),
  "postgres-for-indie-saas": () =>
    import("../content/articles/postgres-for-indie-saas.mdx"),
};

const ARTICLE_LOADERS: Record<string, () => Promise<{ default: ComponentType }>> = {
  ...JOURNAL_LOADERS,
  ...LEGACY_ARTICLE_LOADERS,
};

export async function loadArticle(
  slug: string
): Promise<ComponentType | null> {
  const loader = ARTICLE_LOADERS[slug];
  if (!loader) return null;
  const mod = await loader();
  return mod.default;
}

export function getArticle(slug: string): ArticleMeta | null {
  return ARTICLES.find((a) => a.slug === slug) ?? null;
}

export function getArticles(): ArticleMeta[] {
  return ARTICLES;
}

export function getRelatedArticles(slug: string, limit = 2): ArticleMeta[] {
  const current = getArticle(slug);
  if (!current) return [];
  return ARTICLES.filter(
    (a) => a.slug !== slug && a.category === current.category
  ).slice(0, limit);
}

export function formatArticleDate(date: string): string {
  return new Date(date + "T00:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
