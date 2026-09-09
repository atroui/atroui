"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { AnimateNumber } from "atroui"
import { LandingSectionHeader } from "@/components/landing/landing-section-header"
import { catalogNavItems, navigation } from "@/lib/navigation"

const SECTION_HREF: Record<string, string> = {
  Primitives: "/docs/components?category=Primitives",
  Blocks: "/docs/components?category=Blocks",
  Tools: "/og",
  Headless: "/docs/components?category=Headless",
  More: "/docs/changelog",
}

const blurbs: Record<string, string> = {
  Primitives: "Buttons, cards, inputs, theme controls",
  Blocks: "Marketing sections and page chrome",
  Tools: "OG workspace & project planner — live tools",
  Headless: "Analytics and structured-data helpers",
  More: "Compare, changelog, blog, updates",
}

/** Catalog band — each family deep-links to its real surface. */
export function LandingCatalogEcosystem() {
  const sections = navigation.filter(
    (s) =>
      s.title !== "Getting Started" &&
      s.title !== "Setup" &&
      s.title !== "Kits" &&
      s.title !== "Reference" &&
      s.title !== "More"
  )
  const total = catalogNavItems.length

  return (
    <section className="atro-section">
      <div className="atro-section-inner">
        <LandingSectionHeader
          variant="product"
          align="left"
          title="The growing catalog"
          lede={
            <>
              <AnimateNumber value={total} from={0} suffix="+" /> blocks in
              clear families — browse by intent, not folder depth.
            </>
          }
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
                {section.title === "Tools" ? (
                  "2 live"
                ) : (
                  <>
                    <AnimateNumber
                      value={section.items.length}
                      from={0}
                    />{" "}
                    blocks
                  </>
                )}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
