import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { FadeIn } from "../motion/fade-in";
import { STYLE_PRESETS, type StyleKey } from "../../lib/og/presets";
import { cn } from "../../lib/utils";

export type OgExample = {
  /** URL-safe id for the generated PNG filename and router query. */
  slug: string;
  /** Short display title shown on the card. */
  title: string;
  /** Uppercase eyebrow category (e.g. "Blog cover", "Launch"). */
  category: string;
  /** Full prompt sent to the generator. Designed textless with safe zones
   *  so the image works both as a standalone example and as a background
   *  for Phase 2's text-overlay compositor. */
  prompt: string;
  /** Which Quick-mode preset this example's aesthetic maps onto. Clicking
   *  the card remixes into Quick mode with this preset preselected. */
  preset: StyleKey;
};

/**
 * Maker-shaped OG categories — the ones indies, devs, and SaaS founders
 * actually ship. Every prompt is intentionally textless (FLUX garbles
 * letters); the crisp text comes from Quick mode's Satori overlay.
 */
export const EXAMPLES: OgExample[] = [
  {
    slug: "blog-post-cover",
    category: "Blog cover",
    title: "Editorial tech article",
    preset: "editorial",
    prompt:
      "Editorial tech blog cover background, soft gradient from deep ink-blue to violet, abstract geometric shapes floating, subtle dotted grid pattern, muted premium color palette, cinematic depth of field, clean minimalist composition with generous empty space on the left for a headline overlay, no text, no letters, no typography, no logos, 1200x630",
  },
  {
    slug: "product-launch",
    category: "Launch",
    title: "Product launch announcement",
    preset: "vibrantLaunch",
    prompt:
      "Product launch announcement background, warm sunset gradient from coral orange to hot pink, abstract 3D floating shapes with soft bloom lighting, energetic but clean premium feel, center-safe zone kept open for a large product name overlay, no text, no letters, no typography, no logos, 1200x630",
  },
  {
    slug: "newsletter-issue",
    category: "Newsletter",
    title: "Weekly newsletter issue",
    preset: "paperQuote",
    prompt:
      "Weekly tech newsletter issue cover background, classic editorial aesthetic, deep navy and warm cream palette, subtle paper grain texture, a minimal geometric illustration of a folded envelope in the upper right corner, clean left side kept empty for an issue title, no text, no letters, no typography, no logos, 1200x630",
  },
  {
    slug: "podcast-episode",
    category: "Podcast",
    title: "Podcast episode cover",
    preset: "techMinimal",
    prompt:
      "Podcast episode cover background, rich radial gradient from deep purple to teal, soft abstract sound waves arcing across the frame, a subtle vinyl record motif in the lower right, premium audio studio feel, left-safe composition for an episode title overlay, no text, no letters, no typography, no logos, 1200x630",
  },
  {
    slug: "changelog-release",
    category: "Changelog",
    title: "Release notes / changelog",
    preset: "darkDev",
    prompt:
      "Developer changelog release notes background, dark terminal aesthetic, deep charcoal base with a subtle mint-green glow accent, minimalist abstract code bracket motif offset to the right, developer-tool premium feel, clean central space reserved for a version number and title overlay, no text, no letters, no typography, no logos, 1200x630",
  },
  {
    slug: "indie-revenue-update",
    category: "Build in public",
    title: "Indie revenue update",
    preset: "indieNeon",
    prompt:
      "Build-in-public revenue update background, confident dark mode, deep navy with a single bold cyan gradient sweep from lower left to upper right, abstract upward-trending line motif subtly embedded, maker/indie-hacker energy, center-safe zone reserved for a revenue number and caption overlay, no text, no letters, no typography, no logos, 1200x630",
  },
  {
    slug: "open-source-banner",
    category: "Open source",
    title: "Open-source project banner",
    preset: "techMinimal",
    prompt:
      "Open source project README banner background, modern developer aesthetic, midnight blue base with cyan and soft pink neon accent highlights, a subtle isometric geometric pattern drifting across the frame, sharp and confident, left-safe zone reserved for a project name and tagline overlay, no text, no letters, no typography, no logos, 1200x630",
  },
  {
    slug: "webinar-event-promo",
    category: "Webinar",
    title: "Live webinar / event promo",
    preset: "indieNeon",
    prompt:
      "Live webinar event promo background, deep indigo night-sky gradient, bright cyan highlight accents, an abstract soft spotlight beam entering from the upper right corner, energetic and premium, lower-two-thirds safe zone reserved for an event title and date overlay, no text, no letters, no typography, no logos, 1200x630",
  },
];

/**
 * Editorial example index — thumbnail + remixed links, no card grid.
 */
export function OgExamples({
  className,
  preview = false,
}: {
  className?: string;
  /** Docs: skip scroll-reveal so rows stay visible in a canvas. */
  preview?: boolean;
}) {
  return (
    <ul className={cn("divide-y divide-border-subtle", className)}>
      {EXAMPLES.map((ex, i) => {
        const quickHref = `/og?mode=quick&style=${ex.preset}&title=${encodeURIComponent(ex.title)}#og-workspace`;
        const promptHref = `/og?prompt=${encodeURIComponent(ex.prompt)}#og-workspace`;
        const styleLabel = STYLE_PRESETS[ex.preset]?.label ?? ex.preset;

        const row = (
          <div
            className={cn(
              "grid grid-cols-1 gap-4 px-6 py-5 transition-colors md:grid-cols-12 md:items-center md:gap-4 md:px-8 md:py-6",
            )}
          >
            <span className="font-mono text-[11px] tabular-nums text-muted-foreground md:col-span-1">
              {String(i + 1).padStart(2, "0")}
            </span>

            <Link
              href={quickHref}
              scroll
              className="group relative aspect-1200/630 overflow-hidden ring-1 ring-border-subtle md:col-span-3"
              aria-label={`Remix Quick mode: ${ex.title}`}
            >
              <img
                src={`/examples/${ex.slug}.png`}
                alt={`${ex.title} — sample 1200×630 OG image`}
                width={1200}
                height={630}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </Link>

            <div className="min-w-0 md:col-span-4">
              <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                {ex.category}
              </p>
              <p className="ds-headline mt-1 text-base text-foreground sm:text-lg">
                {ex.title}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {styleLabel} preset
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 md:col-span-4 md:justify-end">
              <Link
                href={quickHref}
                scroll
                className="inline-flex min-h-10 items-center gap-1.5 text-sm font-medium text-foreground hover:text-brand"
              >
                Remix style
                <ArrowUpRight className="size-3.5" aria-hidden />
              </Link>
              <Link
                href={promptHref}
                scroll
                className="inline-flex min-h-10 items-center text-sm text-muted-foreground hover:text-foreground"
              >
                Use prompt
              </Link>
            </div>
          </div>
        );

        return (
          <li key={ex.slug}>
            {preview ? row : <FadeIn delay={0.02 * i}>{row}</FadeIn>}
          </li>
        );
      })}
    </ul>
  );
}
