"use client"

/**
 * Zed "Just Works" — horizontal tabs + proof stage (text + UI mock).
 *
 * Family Values 2 (fluidity): the stage crossfades instead of hard-swapping,
 * and the tab ink travels between tabs via shared layout.
 */

import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import {
  JustWorksProof,
  type JustWorksProofId,
} from "@/components/landing/just-works-proof"
import { LandingSectionHeader } from "@/components/landing/landing-section-header"
import { easeOutSoft, panelTween } from "@/lib/motion"
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

const swapTween = { duration: 0.2, ease: easeOutSoft } as const

export function LandingJustWorks() {
  const reduce = useReducedMotion()
  const [active, setActive] = React.useState<FeatureId>("registry")
  const feature = FEATURES.find((f) => f.id === active) ?? FEATURES[0]!
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
          <div className="atro-jw-swap">
            <AnimatePresence initial={false}>
              <motion.div
                key={feature.id}
                className="atro-jw-copy"
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={
                  reduce ? undefined : { opacity: 0, y: -6, pointerEvents: "none" }
                }
                transition={reduce ? { duration: 0 } : swapTween}
              >
                <h3 className="ds-headline text-foreground">
                  {feature.title}
                </h3>
                <p className="ds-body mt-3 max-w-prose">
                  {feature.body}
                </p>
                <Link href={feature.href} className="atro-btn-ghost mt-5">
                  {feature.cta}
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="atro-jw-swap">
            <AnimatePresence initial={false}>
              <motion.div
                key={active}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -6 }}
                transition={reduce ? { duration: 0 } : swapTween}
              >
                <JustWorksProof id={active} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
