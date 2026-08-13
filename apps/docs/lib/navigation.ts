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
        title: "Host APIs",
        href: "/docs/host-api",
        description: "Forms & AI routes, BYOK",
      },
      {
        title: "Registry",
        href: "/docs/registry",
        description: "Own components in your repo",
      },
      { title: "Theming", href: "/docs/theming", description: "Tokens" },
      { title: "Brand kit", href: "/docs/brand", description: "Logo & voice" },
      {
        title: "Identity kit",
        href: "/docs/identity",
        description: "Brand & SEO config",
      },
      {
        title: "Launch workflow",
        href: "/docs/guides/launch-workflow",
        description: "Scope → OG",
      },
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
        description: "Actions and CTAs",
        badge: "registry",
      },
      {
        title: "Card",
        href: "/docs/components/ui-card",
        description: "Grouped surface",
        badge: "registry",
      },
      {
        title: "Form Select",
        href: "/docs/components/ui-form-select",
        description: "Styled select",
        badge: "registry",
      },
      {
        title: "Textarea",
        href: "/docs/components/ui-textarea",
        description: "Multi-line input",
        badge: "registry",
      },
      {
        title: "Breadcrumbs",
        href: "/docs/components/ui-breadcrumbs",
        description: "Path navigation",
        badge: "registry",
      },
      {
        title: "Prose",
        href: "/docs/components/ui-prose",
        description: "Long-form typography",
        badge: "registry",
      },
      {
        title: "Founder Avatar",
        href: "/docs/components/ui-founder-avatar",
        description: "Portrait mark",
        badge: "registry",
      },
      {
        title: "Theme Toggle",
        href: "/docs/components/ui-theme-toggle",
        description: "Light / dark switch",
        badge: "registry",
      },
      {
        title: "Theme Provider",
        href: "/docs/components/theme-provider",
        description: "next-themes root",
        badge: "registry",
      },
      {
        title: "Logo",
        href: "/docs/components/brand-logo",
        description: "Mark and wordmark",
        badge: "registry",
      },
      {
        title: "Mockup Frame",
        href: "/docs/components/ui-ui-mockup-frame",
        description: "Product chrome frame",
        badge: "registry",
      },
      {
        title: "Timeline",
        href: "/docs/components/ui-timeline-animation",
        description: "Scroll-linked motion",
        badge: "registry",
      },
      {
        title: "Fade In",
        href: "/docs/components/motion-fade-in",
        description: "Enter animation",
        badge: "registry",
      },
      {
        title: "Stagger",
        href: "/docs/components/motion-stagger",
        description: "Staggered children",
        badge: "registry",
      },
      {
        title: "Scroll Progress",
        href: "/docs/components/motion-primitives-scroll-progress",
        description: "Reading progress bar",
        badge: "registry",
      },
    ],
  },
  {
    title: "Blocks",
    items: [
      {
        title: "Site Header",
        href: "/docs/components/site-header",
        description: "Sticky nav chrome",
        badge: "registry",
      },
      {
        title: "Site Footer",
        href: "/docs/components/site-footer",
        description: "Simple site footer",
        badge: "registry",
      },
      {
        title: "Bold Footer",
        href: "/docs/components/footer-bold",
        description: "Editorial footer",
        badge: "registry",
      },
      {
        title: "Hero",
        href: "/docs/components/home-hero",
        description: "AI value-prop hero",
        badge: "registry",
      },
      {
        title: "Principle",
        href: "/docs/components/home-principle",
        description: "Positioning band",
        badge: "registry",
      },
      {
        title: "Work",
        href: "/docs/components/home-work",
        description: "Case study grid",
        badge: "registry",
      },
      {
        title: "Crafts",
        href: "/docs/components/home-crafts",
        description: "Capabilities band",
        badge: "registry",
      },
      {
        title: "Lab",
        href: "/docs/components/home-lab",
        description: "Experiments strip",
        badge: "registry",
      },
      {
        title: "Who",
        href: "/docs/components/home-who",
        description: "Founder / about",
        badge: "registry",
      },
      {
        title: "Pricing",
        href: "/docs/components/pricing-overview",
        description: "Offer tiers",
        badge: "registry",
      },
      {
        title: "Feature Grid",
        href: "/docs/components/feature-grid",
        description: "Product pillars",
        badge: "registry",
      },
      {
        title: "Logo Cloud",
        href: "/docs/components/logo-cloud",
        description: "Partner name strip",
        badge: "registry",
      },
      {
        title: "FAQ",
        href: "/docs/components/faq-interactive-preview",
        description: "Accordion answers",
        badge: "registry",
      },
      {
        title: "Contextual CTA",
        href: "/docs/components/cta-contextual-cta",
        description: "Scroll-triggered CTA",
        badge: "registry",
      },
      {
        title: "Exit Intent",
        href: "/docs/components/cta-exit-intent-popup",
        description: "Leave-intent modal",
        badge: "registry",
      },
      {
        title: "Contact Form",
        href: "/docs/components/contact-contact-form",
        description: "Lead capture form",
        badge: "host-api",
      },
      {
        title: "Calendly Embed",
        href: "/docs/components/contact-calendly-embed",
        description: "Booking embed",
        badge: "registry",
      },
      {
        title: "Waitlist Form",
        href: "/docs/components/brand-waitlist-form",
        description: "Waitlist signup",
        badge: "host-api",
      },
      {
        title: "Newsletter Form",
        href: "/docs/components/newsletter-newsletter-form",
        description: "Email capture",
        badge: "host-api",
      },
      {
        title: "Journal",
        href: "/docs/components/journal-journal-content",
        description: "Blog index layout",
        badge: "registry",
      },
      {
        title: "Social Share",
        href: "/docs/components/journal-social-share",
        description: "Share links",
        badge: "registry",
      },
      {
        title: "Resources",
        href: "/docs/components/resources-resources-content",
        description: "Resource library",
        badge: "registry",
      },
      {
        title: "Before / After",
        href: "/docs/components/case-studies-before-after-slider",
        description: "Compare slider",
        badge: "registry",
      },
      {
        title: "Case Study",
        href: "/docs/components/case-studies-visual-case-study",
        description: "Case study layout",
        badge: "registry",
      },
      {
        title: "AR Portfolio",
        href: "/docs/components/ar-ar-portfolio",
        description: "AR showcase",
        badge: "registry",
      },
      {
        title: "Made With Embed",
        href: "/docs/components/seo-made-with-embed",
        description: "Credit badge",
        badge: "registry",
      },
    ],
  },
  {
    title: "Indie",
    items: [
      {
        title: "Count Up",
        href: "/docs/components/count-up",
        description: "In-view number animation",
        badge: "registry",
      },
      {
        title: "Deadline Countdown",
        href: "/docs/components/deadline-countdown",
        description: "Days-to-deadline band",
        badge: "registry",
      },
      {
        title: "Currently",
        href: "/docs/components/currently",
        description: "What you’re up to now",
        badge: "registry",
      },
      {
        title: "Project List",
        href: "/docs/components/project-list",
        description: "Hairline project list",
        badge: "registry",
      },
      {
        title: "Log Preview",
        href: "/docs/components/log-preview",
        description: "Recent log entries",
        badge: "registry",
      },
      {
        title: "Changelog",
        href: "/docs/components/changelog",
        description: "Filterable ship log",
        badge: "registry",
      },
      {
        title: "Command Menu",
        href: "/docs/components/command-menu",
        description: "⌘K command palette",
        badge: "registry",
      },
      {
        title: "Reveal",
        href: "/docs/components/reveal",
        description: "Scroll reveal wrapper",
        badge: "registry",
      },
      {
        title: "Theme Toggle Icon",
        href: "/docs/components/theme-toggle-icon",
        description: "Compact sun/moon toggle",
        badge: "registry",
      },
      {
        title: "Site Header Narrow",
        href: "/docs/components/site-header-narrow",
        description: "640px indie header",
        badge: "registry",
      },
      {
        title: "Site Footer Narrow",
        href: "/docs/components/site-footer-narrow",
        description: "Quiet indie footer",
        badge: "registry",
      },
      {
        title: "Social Float",
        href: "/docs/components/social-float",
        description: "Fixed social FAB",
        badge: "registry",
      },
      {
        title: "Reading Shelf",
        href: "/docs/components/reading-shelf",
        description: "Book cover shelf",
        badge: "registry",
      },
      {
        title: "Personal Hero",
        href: "/docs/components/personal-hero",
        description: "Indie intro + portrait",
        badge: "registry",
      },
      {
        title: "Resume",
        href: "/docs/components/resume",
        description: "Printable resume block",
        badge: "registry",
      },
      {
        title: "Local Clock",
        href: "/docs/components/local-clock",
        description: "Timezone time chip",
        badge: "registry",
      },
      {
        title: "Weather Chip",
        href: "/docs/components/weather-chip",
        description: "Open-Meteo weather",
        badge: "registry",
      },
      {
        title: "Stack List",
        href: "/docs/components/stack-list",
        description: "Tools and stack list",
        badge: "registry",
      },
    ],
  },
  {
    title: "Tools",
    items: [
      {
        title: "OG Examples",
        href: "/docs/components/og-og-examples",
        description: "OG style gallery",
        badge: "registry",
      },
      {
        title: "OG Live Preview",
        href: "/docs/components/og-og-live-preview",
        description: "OG card preview",
        badge: "registry",
      },
      {
        title: "OG Workspace",
        href: "/docs/components/og-og-workspace",
        description: "OG generator UI",
        badge: "host-api",
      },
      {
        title: "Thumbnail Preview",
        href: "/docs/components/thumbnail-thumbnail-live-preview",
        description: "Thumb style preview",
        badge: "registry",
      },
      {
        title: "Thumbnail Workspace",
        href: "/docs/components/thumbnail-thumbnail-workspace",
        description: "Thumb generator UI",
        badge: "host-api",
      },
      {
        title: "Project Planner",
        href: "/docs/components/planner-project-planner",
        description: "Scope planner",
        badge: "registry",
      },
      {
        title: "Scope Chat",
        href: "/docs/components/scope-scope-chat",
        description: "AI scoping chat",
        badge: "host-api",
      },
      {
        title: "Live Dashboard",
        href: "/docs/components/studio-live-dashboard",
        description: "Studio status board",
        badge: "registry",
      },
    ],
  },
  {
    title: "Headless",
    items: [
      {
        title: "Analytics Provider",
        href: "/docs/components/analytics-analytics-provider",
        description: "Plausible / GA wrapper",
        badge: "registry",
      },
      {
        title: "JSON-LD",
        href: "/docs/components/seo-json-ld",
        description: "schema.org helpers",
        badge: "registry",
      },
      {
        title: "Testimonial Schema",
        href: "/docs/components/seo-testimonial-schema",
        description: "Review structured data",
        badge: "registry",
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
  Indie: "Block",
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
