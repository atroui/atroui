"use client"

/**
 * Zed "Just Works" — tabbed feature panel. One idea at a time; no bento soup.
 */

import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { LandingSectionHeader } from "@/components/landing/landing-section-header"

type FeatureId = "registry" | "host-api" | "blocks" | "identity"

const FEATURES: {
  id: FeatureId
  tab: string
  title: string
  body: string
  href: string
  cta: string
}[] = [
  {
    id: "registry",
    tab: "shadcn registry",
    title: "Install like any other registry block",
    body: "npx shadcn add @atroui/… copies TypeScript into your repo. No private CDN, no runtime wrapper — you own every line from the first commit.",
    href: "/docs/registry",
    cta: "Registry guide",
  },
  {
    id: "host-api",
    tab: "Host APIs",
    title: "Server routes that use your keys",
    body: "Contact, waitlist, newsletter, OG, thumbnail, and scope handlers ship as hardened Next.js routes. Wire Resend, SMTP, or model providers once in your env.",
    href: "/docs/host-api",
    cta: "Host API docs",
  },
  {
    id: "blocks",
    tab: "Production blocks",
    title: "Sections, not atoms",
    body: "Heroes, pricing, footers, and page chrome land ready to edit. Change CONTENT at the top of the file — the structure is already production-shaped.",
    href: "/docs/components",
    cta: "Browse blocks",
  },
  {
    id: "identity",
    tab: "Identity kit",
    title: "Brand and SEO in one config",
    body: "getBrand(), JSON-LD helpers, sitemap utilities, and favicon patterns — so your install stays on-brand without a second design pass.",
    href: "/docs/identity",
    cta: "Identity kit",
  },
]

export function LandingJustWorks() {
  const [active, setActive] = React.useState<FeatureId>("registry")
  const feature = FEATURES.find((f) => f.id === active) ?? FEATURES[0]!

  return (
    <section className="atro-section">
      <div className="atro-section-inner">
        <LandingSectionHeader
          variant="product"
          title="AtroUI Just Works"
          lede="Powerful out of the box — registry install, owned source, Host APIs on your keys. It only gets better as the catalog grows."
        />
        <div className="atro-section-links">
          <Link href="/docs/changelog" className="atro-section-link">
            View changelog →
          </Link>
          <Link href="/docs/installation" className="atro-section-link">
            Installation →
          </Link>
        </div>

        <div className="atro-just-works">
          <div
            role="tablist"
            aria-label="Product features"
            className="atro-just-works-tabs"
          >
            {FEATURES.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={item.id === active}
                onClick={() => setActive(item.id)}
                className="atro-just-works-tab"
              >
                {item.tab}
              </button>
            ))}
          </div>

          <div role="tabpanel" className="atro-just-works-panel">
            <h3 className="ds-headline text-xl text-foreground">{feature.title}</h3>
            <p className="ds-body mt-3 max-w-prose text-muted-foreground">
              {feature.body}
            </p>
            <Link
              href={feature.href}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {feature.cta}
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
