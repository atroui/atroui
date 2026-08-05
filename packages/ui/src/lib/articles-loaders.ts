import type { ComponentType } from "react";

import { JOURNAL_LOADERS } from "../content/journal/_loaders";

const LEGACY_ARTICLE_LOADERS: Record<
  string,
  () => Promise<{ default: ComponentType }>
> = {
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

const ARTICLE_LOADERS: Record<
  string,
  () => Promise<{ default: ComponentType }>
> = {
  ...JOURNAL_LOADERS,
  ...LEGACY_ARTICLE_LOADERS,
};

/** Requires an MDX-capable bundler (e.g. Next.js docs app with `@next/mdx`). */
export async function loadArticle(
  slug: string
): Promise<ComponentType | null> {
  const loader = ARTICLE_LOADERS[slug];
  if (!loader) return null;
  const mod = await loader();
  return mod.default;
}
