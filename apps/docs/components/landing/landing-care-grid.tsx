import Link from "next/link"
import { LandingSectionHeader } from "@/components/landing/landing-section-header"

const CARE_ITEMS = [
  {
    label: "Dark-first tokens",
    desc: "oklch palette, Tailwind v4",
    href: "/docs/theming",
  },
  {
    label: "View transitions",
    desc: "Shared motion easings",
    href: "/docs/components/motion-fade-in",
  },
  {
    label: "Adaptive theme",
    desc: "Context-aware surfaces",
    href: "/docs/components/adaptive-theme-switch",
  },
  {
    label: "JSON-LD helpers",
    desc: "Structured data, no UI",
    href: "/docs/components/seo-json-ld",
  },
  {
    label: "Collections",
    desc: "Curated install sets",
    href: "/docs/collections",
  },
  {
    label: "Compare",
    desc: "AtroUI vs copy-paste kits",
    href: "/docs/compare",
  },
] as const

/** Zed "Built with ultimate care" — small secondary features, low visual weight. */
export function LandingCareGrid() {
  return (
    <section className="atro-section">
      <div className="atro-section-inner">
        <LandingSectionHeader
          variant="product"
          title="Built with care"
          lede="Every surface in the catalog shares tokens, motion, and install conventions. Anything less isn't worth shipping."
        />
        <div className="atro-care-grid">
          {CARE_ITEMS.map((item) => (
            <Link key={item.label} href={item.href} className="atro-care-chip">
              <span className="atro-care-chip-label">{item.label}</span>
              <span className="atro-care-chip-desc">{item.desc}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
