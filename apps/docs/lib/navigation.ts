export type NavItem = {
  title: string
  href: string
  description?: string
  /** Catalog hint - host-bound tools, headless modules, or CLI registry */
  badge?: "host-api" | "headless" | "registry"
}

export type NavSection = {
  title: string
  items: NavItem[]
}

/**
 * Curated catalog - not a filesystem dump.
 * Primitives → reusable bits
 * Blocks → marketing / page modules (prefer CLI registry)
 * Tools → need host APIs or env to run fully
 * Headless → no visible UI
 */
export const navigation: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs", description: "Overview" },
      {
        title: "Installation",
        href: "/docs/installation",
        description: "shadcn CLI setup",
      },
      {
        title: "Registry",
        href: "/docs/registry",
        description: "Own components in your repo",
      },
      { title: "Theming", href: "/docs/theming", description: "Tokens" },
      { title: "Brand kit", href: "/docs/brand", description: "Logo & voice" },
      {
        title: "Compare",
        href: "/docs/compare",
        description: "vs copy-paste kits",
      },
      { title: "Changelog", href: "/docs/changelog", description: "Releases" },
      { title: "Blog", href: "/blog", description: "Guides & SEO" },
    ],
  },
  {
    title: "Primitives",
    items: [
      {
        title: "Button",
        href: "/docs/components/ui-button",
        badge: "registry",
      },
      { title: "Card", href: "/docs/components/ui-card" },
      { title: "Form Select", href: "/docs/components/ui-form-select" },
      { title: "Textarea", href: "/docs/components/ui-textarea" },
      { title: "Breadcrumbs", href: "/docs/components/ui-breadcrumbs" },
      { title: "Prose", href: "/docs/components/ui-prose" },
      { title: "Founder Avatar", href: "/docs/components/ui-founder-avatar" },
      {
        title: "Theme Toggle",
        href: "/docs/components/ui-theme-toggle",
        badge: "registry",
      },
      { title: "Theme Provider", href: "/docs/components/theme-provider" },
      {
        title: "Logo",
        href: "/docs/components/brand-logo",
        badge: "registry",
      },
      { title: "Mockup Frame", href: "/docs/components/ui-ui-mockup-frame" },
      { title: "Timeline", href: "/docs/components/ui-timeline-animation" },
      { title: "Fade In", href: "/docs/components/motion-fade-in" },
      { title: "Stagger", href: "/docs/components/motion-stagger" },
      {
        title: "Scroll Progress",
        href: "/docs/components/motion-primitives-scroll-progress",
      },
    ],
  },
  {
    title: "Blocks",
    items: [
      {
        title: "Site Header",
        href: "/docs/components/site-header",
        badge: "registry",
      },
      {
        title: "Site Footer",
        href: "/docs/components/site-footer",
        badge: "registry",
      },
      {
        title: "Bold Footer",
        href: "/docs/components/footer-bold",
        badge: "registry",
      },
      {
        title: "Hero",
        href: "/docs/components/home-hero",
        badge: "registry",
      },
      {
        title: "Principle",
        href: "/docs/components/home-principle",
        badge: "registry",
      },
      {
        title: "Work",
        href: "/docs/components/home-work",
        badge: "registry",
      },
      { title: "Crafts", href: "/docs/components/home-crafts" },
      {
        title: "Lab",
        href: "/docs/components/home-lab",
        badge: "registry",
      },
      {
        title: "Who",
        href: "/docs/components/home-who",
        badge: "registry",
      },
      {
        title: "Pricing",
        href: "/docs/components/pricing-overview",
        badge: "registry",
      },
      {
        title: "FAQ",
        href: "/docs/components/faq-interactive-preview",
        badge: "registry",
      },
      {
        title: "Contextual CTA",
        href: "/docs/components/cta-contextual-cta",
        badge: "registry",
      },
      {
        title: "Exit Intent",
        href: "/docs/components/cta-exit-intent-popup",
        badge: "registry",
      },
      {
        title: "Contact Form",
        href: "/docs/components/contact-contact-form",
        badge: "host-api",
      },
      {
        title: "Calendly Embed",
        href: "/docs/components/contact-calendly-embed",
        badge: "registry",
      },
      {
        title: "Waitlist Form",
        href: "/docs/components/brand-waitlist-form",
        badge: "host-api",
      },
      {
        title: "Newsletter Form",
        href: "/docs/components/newsletter-newsletter-form",
        badge: "host-api",
      },
      { title: "Journal", href: "/docs/components/journal-journal-content" },
      { title: "Social Share", href: "/docs/components/journal-social-share" },
      {
        title: "Resources",
        href: "/docs/components/resources-resources-content",
      },
      {
        title: "Before / After",
        href: "/docs/components/case-studies-before-after-slider",
      },
      {
        title: "Case Study",
        href: "/docs/components/case-studies-visual-case-study",
      },
      { title: "AR Portfolio", href: "/docs/components/ar-ar-portfolio" },
      {
        title: "Made With Embed",
        href: "/docs/components/seo-made-with-embed",
        badge: "registry",
      },
    ],
  },
  {
    title: "Tools",
    items: [
      { title: "OG Examples", href: "/docs/components/og-og-examples" },
      { title: "OG Live Preview", href: "/docs/components/og-og-live-preview" },
      {
        title: "OG Workspace",
        href: "/docs/components/og-og-workspace",
        badge: "host-api",
      },
      {
        title: "Thumbnail Preview",
        href: "/docs/components/thumbnail-thumbnail-live-preview",
      },
      {
        title: "Thumbnail Workspace",
        href: "/docs/components/thumbnail-thumbnail-workspace",
        badge: "host-api",
      },
      {
        title: "Project Planner",
        href: "/docs/components/planner-project-planner",
      },
      {
        title: "Scope Chat",
        href: "/docs/components/scope-scope-chat",
        badge: "host-api",
      },
      {
        title: "Live Dashboard",
        href: "/docs/components/studio-live-dashboard",
      },
    ],
  },
  {
    title: "Headless",
    items: [
      {
        title: "Analytics Provider",
        href: "/docs/components/analytics-analytics-provider",
        badge: "headless",
      },
      {
        title: "JSON-LD",
        href: "/docs/components/seo-json-ld",
        badge: "headless",
      },
      {
        title: "Testimonial Schema",
        href: "/docs/components/seo-testimonial-schema",
        badge: "headless",
      },
    ],
  },
]

export const allNavItems = navigation.flatMap((section) => section.items)

export const catalogNavItems = navigation
  .filter((section) => section.title !== "Getting Started")
  .flatMap((section) => section.items)

export const badgeLabel: Record<NonNullable<NavItem["badge"]>, string> = {
  "host-api": "Host API",
  headless: "Headless",
  registry: "CLI",
}

export type DocKind = "Primitive" | "Block" | "Tool" | "Headless"

const sectionKind: Record<string, DocKind> = {
  Primitives: "Primitive",
  Blocks: "Block",
  Tools: "Tool",
  Headless: "Headless",
}

export function findNavContext(href: string) {
  for (const section of navigation) {
    const index = section.items.findIndex((item) => item.href === href)
    if (index === -1) continue
    return {
      section,
      item: section.items[index]!,
      kind: sectionKind[section.title],
    }
  }
  return null
}

export function findCatalogNeighbors(href: string) {
  const index = catalogNavItems.findIndex((item) => item.href === href)
  if (index === -1) return { prev: null, next: null }
  return {
    prev: index > 0 ? catalogNavItems[index - 1]! : null,
    next:
      index < catalogNavItems.length - 1 ? catalogNavItems[index + 1]! : null,
  }
}
