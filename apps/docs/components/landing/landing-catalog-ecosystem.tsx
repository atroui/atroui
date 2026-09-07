import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { LandingSectionHeader } from "@/components/landing/landing-section-header"
import { catalogNavItems, navigation } from "@/lib/navigation"

const blurbs: Record<string, string> = {
  Primitives: "Buttons, cards, inputs, theme controls",
  Blocks: "Marketing sections and page chrome",
  Indie: "Personal-site kit — projects, resume, clocks",
  Tools: "OG images, thumbnails, planner workspaces",
  Headless: "Analytics and structured-data helpers",
}

const CARE_CHIPS = [
  { label: "Dark-first tokens", href: "/docs/theming" },
  { label: "View transitions", href: "/docs/components/motion-fade-in" },
  { label: "JSON-LD helpers", href: "/docs/components/seo-json-ld" },
  { label: "Collections", href: "/docs/collections" },
] as const

/** Zed ecosystem band — dense list + quiet secondary chips (care folded in). */
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
              className="zed-btn-ghost h-9 px-3.5 text-sm"
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
              href="/docs/components"
              className="atro-eco-row"
            >
              <span className="atro-eco-name">{section.title}</span>
              <span className="atro-eco-desc">{blurbs[section.title]}</span>
              <span className="atro-eco-count">
                {section.items.length} blocks
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
