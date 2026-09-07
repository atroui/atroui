import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { LandingSectionHeader } from "@/components/landing/landing-section-header"
import { catalogNavItems, navigation } from "@/lib/navigation"

const SECTION_HREF: Record<string, string> = {
  Primitives: "/docs/components?category=Primitives",
  Blocks: "/docs/components?category=Blocks",
  Indie: "/docs/components?category=Indie",
  Tools: "/og",
  Headless: "/docs/components?category=Headless",
  More: "/docs/changelog",
}

const blurbs: Record<string, string> = {
  Primitives: "Buttons, cards, inputs, theme controls",
  Blocks: "Marketing sections and page chrome",
  Indie: "Personal-site kit — projects, resume, clocks",
  Tools: "OG workspace & project planner — live tools",
  Headless: "Analytics and structured-data helpers",
  More: "Compare, changelog, blog, updates",
}

const CARE_CHIPS = [
  { label: "Dark-first tokens", href: "/docs/theming" },
  { label: "OG workspace", href: "/og" },
  { label: "Project planner", href: "/planner" },
  { label: "Collections", href: "/docs/collections" },
] as const

/** Catalog band — each family deep-links to its real surface. */
export function LandingCatalogEcosystem() {
  const sections = navigation.filter((s) => s.title !== "Getting Started")
  const total = catalogNavItems.length

  return (
    <section className="atro-section">
      <div className="atro-section-inner">
        <LandingSectionHeader
          variant="product"
          align="left"
          title="The growing catalog"
          lede={`${total}+ blocks in clear families — browse by intent, not folder depth.`}
          action={
            <Link
              href="/docs/components"
              className="atro-btn-ghost"
            >
              View all
              <ArrowUpRight className="size-3.5" aria-hidden />
            </Link>
          }
        />

        <div className="atro-eco-list">
          {sections.map((section) => (
            <Link
              key={section.title}
              href={
                SECTION_HREF[section.title] ??
                `/docs/components?category=${encodeURIComponent(section.title)}`
              }
              className="atro-eco-row"
            >
              <span className="atro-eco-name">{section.title}</span>
              <span className="atro-eco-desc">
                {blurbs[section.title] ?? section.items[0]?.description}
              </span>
              <span className="atro-eco-count">
                {section.title === "Tools"
                  ? "2 live"
                  : `${section.items.length} blocks`}
              </span>
            </Link>
          ))}
        </div>

        <div className="atro-care-grid atro-care-grid--inline">
          {CARE_CHIPS.map((item) => (
            <Link key={item.label} href={item.href} className="atro-care-chip">
              <span className="atro-care-chip-label">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
