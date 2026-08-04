export type NavItem = {
  title: string
  href: string
  description?: string
}

export type NavSection = {
  title: string
  items: NavItem[]
}

export const navigation: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs", description: "Overview" },
      { title: "Installation", href: "/docs/installation", description: "Setup" },
      { title: "Theming", href: "/docs/theming", description: "Tokens" },
    ],
  },
  {
    title: "Analytics",
    items: [
      { title: "Analytics Provider", href: "/docs/components/analytics-analytics-provider" },
    ],
  },
  {
    title: "Ar",
    items: [
      { title: "Ar Portfolio", href: "/docs/components/ar-ar-portfolio" },
    ],
  },
  {
    title: "Brand",
    items: [
      { title: "Logo", href: "/docs/components/brand-logo" },
      { title: "Waitlist Form", href: "/docs/components/brand-waitlist-form" },
    ],
  },
  {
    title: "Case Studies",
    items: [
      { title: "Before After Slider", href: "/docs/components/case-studies-before-after-slider" },
      { title: "Visual Case Study", href: "/docs/components/case-studies-visual-case-study" },
    ],
  },
  {
    title: "Contact",
    items: [
      { title: "Calendly Embed", href: "/docs/components/contact-calendly-embed" },
      { title: "Contact Form", href: "/docs/components/contact-contact-form" },
    ],
  },
  {
    title: "Cta",
    items: [
      { title: "Contextual Cta", href: "/docs/components/cta-contextual-cta" },
      { title: "Exit Intent Popup", href: "/docs/components/cta-exit-intent-popup" },
    ],
  },
  {
    title: "Home",
    items: [
      { title: "Crafts", href: "/docs/components/home-crafts" },
      { title: "Hero", href: "/docs/components/home-hero" },
      { title: "Lab", href: "/docs/components/home-lab" },
      { title: "Principle", href: "/docs/components/home-principle" },
      { title: "Who", href: "/docs/components/home-who" },
      { title: "Work", href: "/docs/components/home-work" },
    ],
  },
  {
    title: "Journal",
    items: [
      { title: "Journal Content", href: "/docs/components/journal-journal-content" },
      { title: "Social Share", href: "/docs/components/journal-social-share" },
    ],
  },
  {
    title: "Layout & Site",
    items: [
      { title: "Faq Interactive Preview", href: "/docs/components/faq-interactive-preview" },
      { title: "Footer Bold", href: "/docs/components/footer-bold" },
      { title: "Hero Ai Value Proposition", href: "/docs/components/hero-ai-value-proposition" },
      { title: "Pricing Overview", href: "/docs/components/pricing-overview" },
      { title: "Site Footer", href: "/docs/components/site-footer" },
      { title: "Site Header", href: "/docs/components/site-header" },
      { title: "Theme Provider", href: "/docs/components/theme-provider" },
    ],
  },
  {
    title: "Motion",
    items: [
      { title: "Fade In", href: "/docs/components/motion-fade-in" },
      { title: "Stagger", href: "/docs/components/motion-stagger" },
    ],
  },
  {
    title: "Motion Primitives",
    items: [
      { title: "Scroll Progress", href: "/docs/components/motion-primitives-scroll-progress" },
    ],
  },
  {
    title: "Newsletter",
    items: [
      { title: "Newsletter Form", href: "/docs/components/newsletter-newsletter-form" },
    ],
  },
  {
    title: "Og",
    items: [
      { title: "Og Examples", href: "/docs/components/og-og-examples" },
      { title: "Og Live Preview", href: "/docs/components/og-og-live-preview" },
      { title: "Og Workspace", href: "/docs/components/og-og-workspace" },
    ],
  },
  {
    title: "Planner",
    items: [
      { title: "Project Planner", href: "/docs/components/planner-project-planner" },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "Resources Content", href: "/docs/components/resources-resources-content" },
    ],
  },
  {
    title: "Scope",
    items: [
      { title: "Scope Chat", href: "/docs/components/scope-scope-chat" },
    ],
  },
  {
    title: "Seo",
    items: [
      { title: "Json Ld", href: "/docs/components/seo-json-ld" },
      { title: "Made With Embed", href: "/docs/components/seo-made-with-embed" },
      { title: "Testimonial Schema", href: "/docs/components/seo-testimonial-schema" },
    ],
  },
  {
    title: "Studio",
    items: [
      { title: "Live Dashboard", href: "/docs/components/studio-live-dashboard" },
    ],
  },
  {
    title: "Thumbnail",
    items: [
      { title: "Thumbnail Live Preview", href: "/docs/components/thumbnail-thumbnail-live-preview" },
      { title: "Thumbnail Workspace", href: "/docs/components/thumbnail-thumbnail-workspace" },
    ],
  },
  {
    title: "Ui",
    items: [
      { title: "Breadcrumbs", href: "/docs/components/ui-breadcrumbs" },
      { title: "Button", href: "/docs/components/ui-button" },
      { title: "Card", href: "/docs/components/ui-card" },
      { title: "Form Select", href: "/docs/components/ui-form-select" },
      { title: "Founder Avatar", href: "/docs/components/ui-founder-avatar" },
      { title: "Prose", href: "/docs/components/ui-prose" },
      { title: "Textarea", href: "/docs/components/ui-textarea" },
      { title: "Theme Toggle", href: "/docs/components/ui-theme-toggle" },
      { title: "Timeline Animation", href: "/docs/components/ui-timeline-animation" },
      { title: "Ui Mockup Frame", href: "/docs/components/ui-ui-mockup-frame" },
    ],
  },
]

export const allNavItems = navigation.flatMap((section) => section.items)
