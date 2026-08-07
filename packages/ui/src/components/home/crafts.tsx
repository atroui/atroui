import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

import { FadeIn } from "../motion/fade-in"

/**
 * Homepage crafts band — what you offer (capabilities), not priced packages.
 * Pricing lives in PricingOverview; keep these distinct in the catalog.
 */
const CRAFTS = [
  {
    title: "MVP sprints",
    detail: "One core workflow live in a week — auth, data, deploy.",
    outcome: "7 days",
    href: "/services/mvp-sprint",
  },
  {
    title: "AI features",
    detail: "Streaming UI, guardrails, and cost-aware model wiring.",
    outcome: "1–2 weeks",
    href: "/services/ai-feature",
  },
  {
    title: "Design systems",
    detail: "Tokens, dark-first components, and docs your team can extend.",
    outcome: "2–3 weeks",
    href: "/services/design-system",
  },
  {
    title: "Full-stack builds",
    detail: "Multi-week product work with fixed milestones and handoff.",
    outcome: "Scoped",
    href: "/services/full-stack",
  },
] as const

export function HomeCrafts() {
  return (
    <section className="border-t border-border-subtle">
      <div className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle ms-shell-pad py-12 sm:py-16">
          <FadeIn className="max-w-2xl">
            <p className="ms-stamp">Crafts</p>
            <h2 className="ds-display mt-4 text-3xl tracking-tight text-foreground sm:text-5xl">
              What we{" "}
              <span className="ds-display-italic text-brand">actually ship</span>
              .
            </h2>
            <p className="ds-lede mt-4 max-w-lg">
              Capabilities, not a rate card. Swap the list for your studio —
              prices stay on the Pricing band.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle">
          <ul className="grid grid-cols-1 divide-y divide-border-subtle sm:grid-cols-2 sm:divide-x md:grid-cols-4 md:divide-y-0">
            {CRAFTS.map((craft, i) => (
              <li key={craft.title}>
                <FadeIn delay={0.04 * i}>
                  <Link
                    href={craft.href}
                    className="group flex h-full flex-col p-6 sm:p-8"
                  >
                    <p className="font-mono text-[11px] tabular-nums text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-3 flex items-center gap-1.5 text-lg font-medium text-foreground">
                      {craft.title}
                      <ArrowUpRight
                        className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100"
                        aria-hidden
                      />
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {craft.detail}
                    </p>
                    <p className="mt-4 text-xs font-medium tracking-wide text-brand uppercase">
                      {craft.outcome}
                    </p>
                  </Link>
                </FadeIn>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
