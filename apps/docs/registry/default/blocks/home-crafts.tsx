import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

/**
 * Edit CONTENT / CRAFTS for your studio offerings (capabilities, not prices).
 * Pair with @atroui/pricing-overview when you want a rate card.
 */
const CONTENT = {
  stamp: "Crafts",
  headlineBefore: "What we",
  headlineAccent: "actually ship",
  headlineAfter: ".",
  lede: "Capabilities, not a rate card. Prices stay on the Pricing band.",
}

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
]

export function HomeCrafts() {
  return (
    <section className="border-t border-border-subtle">
      <div className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle px-6 py-12 sm:px-10 sm:py-16">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              {CONTENT.stamp}
            </p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground sm:text-5xl">
              {CONTENT.headlineBefore}{" "}
              <span className="italic text-[var(--color-brand,#0b7bff)]">
                {CONTENT.headlineAccent}
              </span>
              {CONTENT.headlineAfter}
            </h2>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
              {CONTENT.lede}
            </p>
          </div>
        </div>
      </div>

      <div className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle">
          <ul className="grid grid-cols-1 divide-y divide-border-subtle sm:grid-cols-2 sm:divide-x md:grid-cols-4 md:divide-y-0">
            {CRAFTS.map((craft, i) => (
              <li key={craft.title}>
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
                  <p className="mt-4 text-xs font-medium tracking-wide text-[var(--color-brand,#0b7bff)] uppercase">
                    {craft.outcome}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
