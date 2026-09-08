/**
 * Compact registry family map — short slugs, one @atroui/ legend.
 * Gradual revelation: browse the gallery for the full list; this is the shape.
 */
const FAMILIES: { name: string; items: string[] }[] = [
  {
    name: "Libs",
    items: ["utils", "brand", "site-url", "seo", "analytics"],
  },
  {
    name: "UI",
    items: [
      "button",
      "card",
      "textarea",
      "form-select",
      "breadcrumbs",
      "prose",
      "theme-toggle",
      "theme-adapt",
      "theme-provider",
      "logo",
      "mockup-frame",
      "timeline-animation",
      "founder-avatar",
    ],
  },
  {
    name: "Motion",
    items: ["fade-in", "stagger", "scroll-progress"],
  },
  {
    name: "Chrome",
    items: ["site-header", "site-footer", "footer-bold"],
  },
  {
    name: "Home",
    items: ["home-hero", "home-who", "home-principle", "home-work", "home-lab"],
  },
  {
    name: "Convert",
    items: [
      "pricing-overview",
      "faq",
      "contextual-cta",
      "exit-intent-popup",
      "contact-form",
    ],
  },
  {
    name: "Capture",
    items: [
      "waitlist-form",
      "newsletter-form",
      "calendly-embed",
      "made-with-embed",
    ],
  },
  {
    name: "Content",
    items: ["social-share", "journal-content", "resources-content"],
  },
  {
    name: "Studio",
    items: [
      "before-after-slider",
      "visual-case-study",
      "ar-portfolio",
      "live-dashboard",
      "project-planner",
    ],
  },
  {
    name: "SEO",
    items: ["json-ld", "testimonial-schema", "analytics-provider"],
  },
  {
    name: "Tools",
    items: [
      "og-live-preview",
      "og-examples",
      "og-workspace",
      "thumbnail-live-preview",
      "thumbnail-workspace",
      "scope-chat",
    ],
  },
  {
    name: "Host APIs",
    items: [
      "api-contact",
      "api-waitlist",
      "api-newsletter",
      "api-generate",
      "api-thumbnail",
      "api-scope",
    ],
  },
]

export function DocsRegistryMap() {
  return (
    <dl className="docs-registry-map">
      {FAMILIES.map((family) => (
        <div key={family.name} className="docs-registry-map-row">
          <dt>{family.name}</dt>
          <dd>
            {family.items.map((item) => (
              <code key={item}>{item}</code>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  )
}
