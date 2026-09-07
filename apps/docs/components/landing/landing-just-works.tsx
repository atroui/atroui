"use client"

/**
 * Zed "Just Works" — horizontal tabs + proof stage (text + UI mock).
 */

import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import {
  JustWorksProof,
  type JustWorksProofId,
} from "@/components/landing/just-works-proof"
import { LandingSectionHeader } from "@/components/landing/landing-section-header"
import { cn } from "@/lib/utils"

type FeatureId = JustWorksProofId

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
    tab: "Registry",
    title: "Install like any other shadcn block",
    body: "npx shadcn add @atroui/… copies TypeScript into your repo. No private CDN — you own every line from the first commit.",
    href: "/docs/registry",
    cta: "Learn More",
  },
  {
    id: "host-api",
    tab: "Host APIs",
    title: "Server routes on your keys",
    body: "Waitlist, contact, newsletter, OG, and scope handlers ship as Next.js routes. Wire Resend or SMTP once in your env.",
    href: "/docs/host-api",
    cta: "Learn More",
  },
  {
    id: "blocks",
    tab: "Blocks",
    title: "Sections, not atoms",
    body: "Heroes, pricing, and page chrome land ready to edit. Change CONTENT at the top — the structure is already production-shaped.",
    href: "/docs/components?category=Blocks",
    cta: "Learn More",
  },
  {
    id: "tools",
    tab: "Tools",
    title: "Live workspaces, not just docs",
    body: "OG workspace and Project planner run on this site. Scope a build, generate a social card — then install the same blocks into your repo.",
    href: "/og",
    cta: "Learn More",
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
          align="center"
          title="AtroUI Just Works"
          lede="Registry install, owned source, Host APIs on your keys."
        />

        <div
          role="tablist"
          aria-label="Product features"
          className="atro-jw-tabs"
        >
          {FEATURES.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={item.id === active}
              onClick={() => setActive(item.id)}
              className={cn(
                "atro-jw-tab",
                item.id === active && "atro-jw-tab--active"
              )}
            >
              {item.tab}
            </button>
          ))}
        </div>

        <div role="tabpanel" className="atro-jw-stage">
          <div className="atro-jw-copy">
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
          <JustWorksProof id={active} />
        </div>
      </div>
    </section>
  )
}
