"use client"

/**
 * Zed "Just Works" — horizontal tabs + proof stage (text + UI mock).
 *
 * Family Values 2 (fluidity): TransitionPanel wait-mode opacity+y for stage
 * swaps; tab ink travels via shared layout.
 */

import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { TransitionPanel } from "atroui"
import {
  JustWorksProof,
  type JustWorksProofId,
} from "@/components/landing/just-works-proof"
import { LandingSectionHeader } from "@/components/landing/landing-section-header"
import { panelTween } from "@/lib/motion"
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
    cta: "Registry docs",
  },
  {
    id: "host-api",
    tab: "Host APIs",
    title: "Server routes on your keys",
    body: "Waitlist, contact, newsletter, OG, and scope handlers ship as Next.js routes. Wire Resend or SMTP once in your env.",
    href: "/docs/host-api",
    cta: "Host API docs",
  },
  {
    id: "blocks",
    tab: "Blocks",
    title: "Sections, not atoms",
    body: "Heroes, pricing, and page chrome land ready to edit. Change CONTENT at the top — the structure is already production-shaped.",
    href: "/docs/components?category=Blocks",
    cta: "Browse blocks",
  },
  {
    id: "tools",
    tab: "Tools",
    title: "Live workspaces, not just docs",
    body: "OG workspace and Project planner run on this site. Scope a build, generate a social card — then install the same blocks into your repo.",
    href: "/og",
    cta: "Open the OG workspace",
  },
]

export function LandingJustWorks() {
  const reduce = useReducedMotion()
  const [active, setActive] = React.useState<FeatureId>("registry")
  const tablistRef = React.useRef<HTMLDivElement>(null)

  function onTabListKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const index = FEATURES.findIndex((item) => item.id === active)
    if (index < 0) return

    let next = index
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = (index + 1) % FEATURES.length
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = (index - 1 + FEATURES.length) % FEATURES.length
    } else if (event.key === "Home") {
      next = 0
    } else if (event.key === "End") {
      next = FEATURES.length - 1
    } else {
      return
    }

    event.preventDefault()
    const nextId = FEATURES[next]!.id
    setActive(nextId)
    tablistRef.current
      ?.querySelector<HTMLButtonElement>(`#jw-tab-${nextId}`)
      ?.focus()
  }

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
          ref={tablistRef}
          role="tablist"
          aria-label="Product features"
          onKeyDown={onTabListKeyDown}
          className="atro-jw-tabs"
        >
          {FEATURES.map((item) => {
            const selected = item.id === active
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`jw-tab-${item.id}`}
                aria-selected={selected}
                aria-controls="jw-stage-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(item.id)}
                className={cn(
                  "atro-jw-tab",
                  selected && "atro-jw-tab--active"
                )}
              >
                {item.tab}
                {selected ? (
                  reduce ? (
                    <span className="atro-jw-tab-ink" aria-hidden />
                  ) : (
                    <motion.span
                      layoutId="jw-tab-ink"
                      className="atro-jw-tab-ink"
                      transition={panelTween}
                      aria-hidden
                    />
                  )
                ) : null}
              </button>
            )
          })}
        </div>

        <div
          id="jw-stage-panel"
          role="tabpanel"
          aria-labelledby={`jw-tab-${active}`}
          className="atro-jw-stage"
        >
          <TransitionPanel activeKey={active} className="atro-jw-swap">
            {(key) => {
              const feature =
                FEATURES.find((item) => item.id === key) ?? FEATURES[0]!
              return (
                <div className="atro-jw-copy">
                  <h3 className="ds-headline text-foreground">
                    {feature.title}
                  </h3>
                  <p className="ds-body mt-3 max-w-prose">{feature.body}</p>
                  <Link href={feature.href} className="atro-btn-ghost mt-5">
                    {feature.cta}
                    <ArrowRight className="size-3.5" aria-hidden />
                  </Link>
                </div>
              )
            }}
          </TransitionPanel>

          <TransitionPanel activeKey={active} className="atro-jw-swap">
            {(key) => <JustWorksProof id={key as FeatureId} />}
          </TransitionPanel>
        </div>
      </div>
    </section>
  )
}
