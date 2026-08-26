import { catalogNavItems, navigation, type NavItem } from "@/lib/navigation"

/**
 * How a specimen occupies its plate.
 * - `inline`    small enough to sit centred at real size (button, chip, clock)
 * - `contained` fills the stage at real size (form, card, list)
 * - `bleed`     a full page section, scaled down so the whole composition reads
 */
export type Fit = "inline" | "contained" | "bleed"

/**
 * `static` covers specimens that cannot honestly render inside a tile: modals
 * that own the viewport, fixed-position chrome that would escape the plate,
 * headless modules with no visual output, and tools that need host keys.
 * These get an authored meta face instead of a broken preview.
 */
export type Preview = "live" | "static"

/** Visual weight — the browse axis competitors don't offer. */
export type Density = "minimal" | "standard" | "rich"

export type CatalogEntry = NavItem & {
  slug: string
  section: string
  fit: Fit
  preview: Preview
  density: Density
  tags: string[]
}

type Meta = {
  fit: Fit
  preview?: Preview
  density: Density
  tags: string[]
}

/**
 * Presentation metadata keyed by URL slug. Kept separate from `navigation.ts`
 * so the sidebar stays a pure information-architecture concern.
 */
const META: Record<string, Meta> = {
  // ---- Primitives ----
  "ui-button": { fit: "inline", density: "minimal", tags: ["action", "form"] },
  "ui-card": { fit: "contained", density: "standard", tags: ["surface"] },
  "ui-form-select": { fit: "inline", density: "minimal", tags: ["form", "input"] },
  "ui-textarea": { fit: "inline", density: "minimal", tags: ["form", "input"] },
  "ui-breadcrumbs": { fit: "inline", density: "minimal", tags: ["navigation"] },
  "ui-prose": { fit: "contained", density: "standard", tags: ["typography", "content"] },
  "ui-founder-avatar": { fit: "inline", density: "minimal", tags: ["identity"] },
  "ui-theme-toggle": { fit: "inline", density: "minimal", tags: ["theme"] },
  "ui-theme-adapt": { fit: "inline", density: "standard", tags: ["theme"] },
  "theme-provider": {
    fit: "contained",
    preview: "static",
    density: "minimal",
    tags: ["theme", "setup"],
  },
  "brand-logo": { fit: "inline", density: "minimal", tags: ["identity", "brand"] },
  "ui-ui-mockup-frame": { fit: "contained", density: "standard", tags: ["surface", "product"] },
  "ui-timeline-animation": { fit: "contained", density: "rich", tags: ["motion"] },
  "motion-fade-in": { fit: "contained", density: "standard", tags: ["motion"] },
  "motion-stagger": { fit: "contained", density: "standard", tags: ["motion"] },
  "motion-primitives-scroll-progress": {
    fit: "contained",
    preview: "static",
    density: "minimal",
    tags: ["motion", "fixed"],
  },

  // ---- Blocks ----
  "site-header": { fit: "bleed", density: "standard", tags: ["navigation", "chrome"] },
  "site-footer": { fit: "bleed", density: "standard", tags: ["chrome"] },
  "footer-bold": { fit: "bleed", density: "rich", tags: ["chrome", "editorial"] },
  "home-hero": { fit: "bleed", density: "rich", tags: ["hero", "marketing"] },
  "home-principle": { fit: "bleed", density: "standard", tags: ["marketing"] },
  "home-work": { fit: "bleed", density: "rich", tags: ["marketing", "case study"] },
  "home-crafts": { fit: "bleed", density: "standard", tags: ["marketing"] },
  "home-lab": { fit: "bleed", density: "standard", tags: ["marketing"] },
  "home-who": { fit: "bleed", density: "standard", tags: ["marketing", "about"] },
  "pricing-overview": { fit: "bleed", density: "rich", tags: ["marketing", "pricing"] },
  "feature-grid": { fit: "bleed", density: "standard", tags: ["marketing"] },
  "logo-cloud": { fit: "bleed", density: "minimal", tags: ["marketing", "proof"] },
  "faq-interactive-preview": { fit: "contained", density: "standard", tags: ["marketing", "faq"] },
  "cta-contextual-cta": { fit: "contained", density: "standard", tags: ["marketing", "cta"] },
  "cta-exit-intent-popup": {
    fit: "contained",
    preview: "static",
    density: "standard",
    tags: ["marketing", "cta", "overlay"],
  },
  "contact-contact-form": { fit: "contained", density: "standard", tags: ["form", "lead"] },
  "contact-calendly-embed": { fit: "contained", density: "standard", tags: ["form", "booking"] },
  "brand-waitlist-form": { fit: "contained", density: "standard", tags: ["form", "lead"] },
  "newsletter-newsletter-form": { fit: "contained", density: "minimal", tags: ["form", "email"] },
  "journal-journal-content": { fit: "bleed", density: "rich", tags: ["content", "blog"] },
  "journal-social-share": { fit: "inline", density: "minimal", tags: ["content", "share"] },
  "resources-resources-content": { fit: "bleed", density: "rich", tags: ["content"] },
  "case-studies-before-after-slider": {
    fit: "contained",
    density: "rich",
    tags: ["case study", "interactive"],
  },
  "case-studies-visual-case-study": { fit: "bleed", density: "rich", tags: ["case study"] },
  "ar-ar-portfolio": {
    fit: "contained",
    preview: "static",
    density: "rich",
    tags: ["experimental", "3d"],
  },
  "seo-made-with-embed": { fit: "inline", density: "minimal", tags: ["seo", "badge"] },

  // ---- Indie ----
  "count-up": { fit: "inline", density: "minimal", tags: ["motion", "data"] },
  "deadline-countdown": { fit: "contained", density: "standard", tags: ["marketing", "urgency"] },
  currently: { fit: "inline", density: "minimal", tags: ["personal"] },
  "project-list": { fit: "contained", density: "standard", tags: ["personal", "list"] },
  "log-preview": { fit: "contained", density: "standard", tags: ["personal", "list"] },
  changelog: { fit: "contained", density: "rich", tags: ["content", "changelog"] },
  "command-menu": {
    fit: "contained",
    preview: "static",
    density: "rich",
    tags: ["navigation", "overlay"],
  },
  reveal: { fit: "contained", density: "standard", tags: ["motion"] },
  "theme-toggle-icon": { fit: "inline", density: "minimal", tags: ["theme"] },
  "site-header-narrow": { fit: "bleed", density: "minimal", tags: ["navigation", "personal"] },
  "site-footer-narrow": { fit: "bleed", density: "minimal", tags: ["chrome", "personal"] },
  "social-float": {
    fit: "contained",
    preview: "static",
    density: "minimal",
    tags: ["personal", "fixed"],
  },
  "reading-shelf": { fit: "contained", density: "standard", tags: ["personal", "content"] },
  "personal-hero": { fit: "bleed", density: "standard", tags: ["hero", "personal"] },
  resume: { fit: "bleed", density: "rich", tags: ["personal", "content"] },
  "local-clock": { fit: "inline", density: "minimal", tags: ["personal", "data"] },
  "weather-chip": { fit: "inline", density: "minimal", tags: ["personal", "data"] },
  "stack-list": { fit: "contained", density: "standard", tags: ["personal", "list"] },

  // ---- Tools ----
  "og-og-examples": { fit: "contained", density: "rich", tags: ["og", "tool"] },
  "og-og-live-preview": { fit: "contained", density: "standard", tags: ["og", "tool"] },
  "og-og-workspace": {
    fit: "contained",
    preview: "static",
    density: "rich",
    tags: ["og", "tool", "byok"],
  },
  "thumbnail-thumbnail-live-preview": {
    fit: "contained",
    density: "standard",
    tags: ["thumbnail", "tool"],
  },
  "thumbnail-thumbnail-workspace": {
    fit: "contained",
    preview: "static",
    density: "rich",
    tags: ["thumbnail", "tool", "byok"],
  },
  "planner-project-planner": { fit: "contained", density: "rich", tags: ["tool", "planning"] },
  "scope-scope-chat": {
    fit: "contained",
    preview: "static",
    density: "rich",
    tags: ["tool", "ai", "byok"],
  },
  "studio-live-dashboard": { fit: "contained", density: "rich", tags: ["tool", "dashboard"] },

  // ---- Headless ----
  "analytics-analytics-provider": {
    fit: "contained",
    preview: "static",
    density: "minimal",
    tags: ["analytics", "setup"],
  },
  "seo-json-ld": {
    fit: "contained",
    preview: "static",
    density: "minimal",
    tags: ["seo", "schema"],
  },
  "seo-testimonial-schema": {
    fit: "contained",
    preview: "static",
    density: "minimal",
    tags: ["seo", "schema"],
  },
}

const DEFAULT_META: Meta = { fit: "contained", density: "standard", tags: [] }

function slugFor(href: string) {
  return href.replace("/docs/components/", "")
}

function sectionFor(href: string) {
  return navigation.find((s) => s.items.some((i) => i.href === href))?.title ?? "Blocks"
}

/** Every catalog item, joined with its presentation metadata. */
export const catalog: CatalogEntry[] = catalogNavItems.map((item) => {
  const slug = slugFor(item.href)
  const meta = META[slug] ?? DEFAULT_META
  return {
    ...item,
    slug,
    section: sectionFor(item.href),
    fit: meta.fit,
    preview: meta.preview ?? "live",
    density: meta.density,
    tags: meta.tags,
  }
})

export const catalogSections = [...new Set(catalog.map((c) => c.section))]

export const catalogSectionCounts = catalogSections.map((name) => ({
  name,
  count: catalog.filter((entry) => entry.section === name).length,
}))

/** Query key shared by the header, family cards, and the catalog itself. */
export const FAMILY_PARAM = "family"

/** Curated live cards for the landing wall — mix of inline, contained, bleed. */
const FEATURED_SLUGS = [
  "ui-button",
  "home-hero",
  "count-up",
  "pricing-overview",
  "contact-contact-form",
  "feature-grid",
  "faq-interactive-preview",
  "currently",
  "local-clock",
  "logo-cloud",
  "deadline-countdown",
  "cta-contextual-cta",
] as const

export const featuredCatalog = FEATURED_SLUGS.map((slug) =>
  catalog.find((entry) => entry.slug === slug)
).filter((entry): entry is (typeof catalog)[number] => Boolean(entry))

export const catalogTags = [...new Set(catalog.flatMap((c) => c.tags))].sort()

export const densities: Density[] = ["minimal", "standard", "rich"]

export const catalogCount = catalog.length

export function registryNameFor(slug: string) {
  return slug.startsWith("ui-") ? slug.slice(3) : slug
}

/** Free-text match across the fields a person would actually type. */
export function matchesQuery(entry: CatalogEntry, query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return (
    entry.title.toLowerCase().includes(q) ||
    (entry.description?.toLowerCase().includes(q) ?? false) ||
    entry.section.toLowerCase().includes(q) ||
    entry.slug.toLowerCase().includes(q) ||
    entry.tags.some((tag) => tag.includes(q))
  )
}
