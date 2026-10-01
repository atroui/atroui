"use client"

import { ArrowRight, Check } from "lucide-react"
import Link from "next/link"

import { AnimateNumber } from "../ui/animate-number"

/**
 * Edit CONTENT / PACKAGES to match your studio pricing.
 * Matches the AtroUI docs Pricing Overview band.
 * Package prices tween via AnimateNumber (careful delight on reveal).
 */

/** Split a price label so digits can tween (`$4,800`, `from $2,400`, `$8,000+`). */
function AnimatedPrice({
  price,
  className,
}: {
  price: string
  className?: string
}) {
  const match = price.trim().match(/^(.*?)([\d,]+)(.*)$/)
  if (!match?.[2]) {
    return <span className={className}>{price}</span>
  }
  const prefix = match[1] ?? ""
  const digits = match[2]
  const suffix = match[3] ?? ""
  return (
    <AnimateNumber
      value={Number(digits.replace(/,/g, ""))}
      from={0}
      prefix={prefix}
      suffix={suffix}
      className={className}
    />
  )
}

const CONTENT = {
  stamp: "Pricing",
  headlineBefore: "Fixed packages.",
  headlineAccent: "No hourly theater.",
  lede: "Scope once, price once, ship once. You know the number before we write a line of code.",
  allHref: "/services",
  allLabel: "All packages",
  investmentLabel: "Investment",
  investmentNote:
    "Scope once. Price once. Ship once. If we go over, that's our problem - not yours.",
}

const PACKAGES = [
  {
    id: "mvp-sprint",
    name: "7-Day MVP Sprint",
    tagline: "One core workflow, live",
    timeline: "7 days",
    price: "$4,800",
    priceSuffix: "fixed",
    badge: "Most booked",
    features: [
      "Fixed scope before day one",
      "Auth, core flow, deploy",
      "Daily async updates",
      "Handoff docs included",
    ],
    ctaLabel: "Start a sprint",
    ctaHref: "/contact?service=mvp-sprint",
    detailsHref: "/services/mvp-sprint",
    highlight: true,
    description: "Ship one validated workflow in a week.",
  },
  {
    id: "ai-feature",
    name: "AI Feature",
    tagline: "Drop AI into an existing product",
    timeline: "5-10 days",
    price: "from $2,400",
    priceSuffix: "",
    badge: "",
    features: [],
    ctaLabel: "Scope AI",
    ctaHref: "/contact?service=ai-integration",
    detailsHref: "/services/ai-feature",
    highlight: false,
    description: "Model wiring, UX, and evals for one feature.",
  },
  {
    id: "design-system",
    name: "Design System",
    tagline: "Tokens, components, docs",
    timeline: "2-3 weeks",
    price: "from $3,600",
    priceSuffix: "",
    badge: "",
    features: [],
    ctaLabel: "Talk systems",
    ctaHref: "/contact?service=design-system",
    detailsHref: "/services/design-system",
    highlight: false,
    description: "A coherent dark-first kit your team can extend.",
  },
  {
    id: "full-stack",
    name: "Full-Stack Build",
    tagline: "Longer engagement",
    timeline: "Scoped after a call",
    price: "Custom",
    priceSuffix: "",
    badge: "",
    features: [],
    ctaLabel: "Book intro",
    ctaHref: "/contact?service=full-stack-build",
    detailsHref: "/services/full-stack",
    highlight: false,
    description: "Multi-week product work with fixed milestones.",
  },
]

/** Lead moment for landing demos — header + featured package only. */
export function PricingLead() {
  const featured = PACKAGES.find((p) => p.highlight) ?? PACKAGES[0]!

  return (
    <div className="@container w-full bg-background text-foreground">
      <div className="border-y border-border-subtle">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 border-x border-border-subtle px-6 py-8 @min-[40rem]:flex-row @min-[40rem]:items-end @min-[40rem]:justify-between @min-[40rem]:px-10 @min-[40rem]:py-10">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              {CONTENT.stamp}
            </p>
            <h2 className="mt-3 text-3xl font-medium tracking-tight text-foreground @min-[40rem]:text-4xl">
              {CONTENT.headlineBefore}{" "}
              <span className="italic text-brand">
                {CONTENT.headlineAccent}
              </span>
            </h2>
            <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
              {CONTENT.lede}
            </p>
          </div>
          <Link
            href={CONTENT.allHref}
            className="atro-btn-ghost shrink-0"
          >
            {CONTENT.allLabel}
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </div>
      </div>

      <div className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle">
          <div className="grid grid-cols-1 @min-[40rem]:grid-cols-12">
            <div className="flex flex-col justify-between gap-6 border-b border-border-subtle p-6 @min-[40rem]:col-span-7 @min-[40rem]:border-r @min-[40rem]:border-b-0 @min-[40rem]:p-8">
              <div>
                {featured.badge ? (
                  <span className="mb-2 inline-block text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                    {featured.badge}
                  </span>
                ) : null}
                <h3 className="text-xl font-medium text-foreground @min-[40rem]:text-2xl">
                  {featured.name}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {featured.tagline} · {featured.timeline}
                </p>
                <ul className="mt-4 space-y-2">
                  {featured.features.slice(0, 3).map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-foreground/90"
                    >
                      <Check
                        className="mt-0.5 size-3.5 shrink-0 text-brand"
                        strokeWidth={2.5}
                        aria-hidden
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href={featured.ctaHref}
                className="atro-btn w-full justify-center @min-[40rem]:w-auto"
              >
                {featured.ctaLabel}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>

            <div className="flex flex-col justify-between gap-4 bg-muted/30 p-6 @min-[40rem]:col-span-5 @min-[40rem]:p-8">
              <div>
                <p className="font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
                  {CONTENT.investmentLabel}
                </p>
                <p className="mt-2 text-4xl font-medium tracking-tight text-foreground @min-[40rem]:text-5xl">
                  {featured.price}
                </p>
                {featured.priceSuffix ? (
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {featured.priceSuffix} · {featured.timeline}
                  </p>
                ) : null}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {CONTENT.investmentNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function PricingOverview() {
  const featured = PACKAGES.find((p) => p.highlight) ?? PACKAGES[0]!
  const rest = PACKAGES.filter((p) => p.id !== featured.id)

  return (
    <section className="border-t border-border-subtle">
      <div className="border-b border-border-subtle">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 border-x border-border-subtle px-6 py-12 @min-[40rem]:flex-row @min-[40rem]:items-end @min-[40rem]:justify-between @min-[40rem]:px-10 @min-[40rem]:py-16">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              {CONTENT.stamp}
            </p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground @min-[40rem]:text-5xl">
              {CONTENT.headlineBefore}{" "}
              <span className="italic text-brand">
                {CONTENT.headlineAccent}
              </span>
            </h2>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
              {CONTENT.lede}
            </p>
          </div>
          <Link
            href={CONTENT.allHref}
            className="atro-btn-ghost shrink-0"
          >
            {CONTENT.allLabel}
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </div>
      </div>

      <div className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle">
          <div className="grid grid-cols-1 @min-[64rem]:grid-cols-12">
            <div className="flex flex-col justify-between gap-8 border-b border-border-subtle p-6 @min-[40rem]:p-8 @min-[64rem]:col-span-7 @min-[64rem]:border-r @min-[64rem]:border-b-0 @min-[64rem]:p-10">
              <div>
                {featured.badge ? (
                  <span className="mb-3 inline-block text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                    {featured.badge}
                  </span>
                ) : null}
                <h3 className="text-2xl font-medium text-foreground @min-[40rem]:text-3xl">
                  {featured.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {featured.tagline} · {featured.timeline}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {featured.features.slice(0, 4).map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-foreground/90"
                    >
                      <Check
                        className="mt-0.5 size-3.5 shrink-0 text-brand"
                        strokeWidth={2.5}
                        aria-hidden
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href={featured.ctaHref}
                className="atro-btn w-full justify-center @min-[40rem]:w-auto"
              >
                {featured.ctaLabel}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>

            <div className="flex flex-col justify-between gap-8 bg-muted/30 p-6 @min-[40rem]:p-8 @min-[64rem]:col-span-5 @min-[64rem]:p-10">
              <div>
                <p className="font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
                  {CONTENT.investmentLabel}
                </p>
                <p className="mt-3 text-4xl font-medium tracking-tight text-foreground @min-[40rem]:text-5xl @min-[48rem]:text-6xl">
                  <AnimatedPrice price={featured.price} />
                </p>
                {featured.priceSuffix ? (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {featured.priceSuffix} · {featured.timeline}
                  </p>
                ) : null}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {CONTENT.investmentNote}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle">
          <ul className="divide-y divide-border-subtle">
            {rest.map((s, i) => (
              <li key={s.id}>
                <div className="grid grid-cols-1 gap-3 px-6 py-5 @min-[48rem]:grid-cols-12 @min-[48rem]:items-center @min-[48rem]:gap-4 @min-[48rem]:px-8 @min-[48rem]:py-6">
                  <span className="font-mono text-[11px] tabular-nums text-muted-foreground @min-[48rem]:col-span-1">
                    {String(i + 2).padStart(2, "0")}
                  </span>
                  <div className="@min-[48rem]:col-span-4">
                    <p className="text-base font-medium text-foreground @min-[40rem]:text-lg">
                      {s.name}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {s.tagline} · {s.timeline}
                    </p>
                  </div>
                  <p className="hidden text-sm text-muted-foreground @min-[48rem]:col-span-3 @min-[48rem]:block @min-[48rem]:line-clamp-2">
                    {s.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 @min-[48rem]:col-span-4 @min-[48rem]:justify-end">
                    <span className="text-lg font-semibold tabular-nums text-foreground">
                      <AnimatedPrice price={s.price} />
                      {s.priceSuffix ? (
                        <span className="ml-1.5 text-sm font-normal text-muted-foreground">
                          {s.priceSuffix}
                        </span>
                      ) : null}
                    </span>
                    <Link
                      href={s.detailsHref}
                      className="inline-flex min-h-10 items-center text-sm font-medium text-muted-foreground hover:text-foreground"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
