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

/** Zed "Growing extensions ecosystem" — dense list, not card grid. */
export function LandingCatalogEcosystem() {
  const sections = navigation.filter((s) => s.title !== "Getting Started")
  const total = catalogNavItems.length

  return (
    <section className="atro-section">
      <div className="atro-section-inner">
        <LandingSectionHeader
          variant="product"
          title="The growing catalog"
          lede={`${total}+ blocks curated into clear families — browse by intent, not folder depth.`}
          action={
            <Link href="/docs/components" className="ms-cta-ghost h-10 px-4 text-sm">
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
              <span className="atro-eco-count">{section.items.length} blocks</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
