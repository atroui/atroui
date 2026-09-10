"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"

/**
 * Edit CONTENT / TIERS to match your pricing. Monthly/yearly toggle with
 * aria-pressed, one highlighted tier. Self-contained — prices are plain
 * spans (no sibling ui imports).
 * After install this file lives in your repo.
 */
const CONTENT = {
  stamp: "Pricing",
  headlineBefore: "Simple plans,",
  headlineAccent: "cancel anytime",
  headlineAfter: ".",
  lede: "Start free, upgrade when it pays for itself. Prices in USD.",
  toggleMonthly: "Monthly",
  toggleYearly: "Yearly",
  yearlyNote: "2 months free",
}

type Billing = "monthly" | "yearly"

const TIERS = [
  {
    name: "Starter",
    blurb: "For side projects finding shape.",
    monthly: "$12",
    yearly: "$10",
    per: "/mo",
    billed: { monthly: "Billed monthly", yearly: "Billed yearly" },
    cta: { label: "Start free", href: "/signup?plan=starter" },
    features: ["3 projects", "Community support", "Basic analytics"],
    highlight: false,
  },
  {
    name: "Pro",
    blurb: "For teams shipping every week.",
    monthly: "$29",
    yearly: "$24",
    per: "/mo",
    billed: { monthly: "Billed monthly", yearly: "Billed yearly" },
    cta: { label: "Start 14-day trial", href: "/signup?plan=pro" },
    features: [
      "Unlimited projects",
      "Priority support",
      "Advanced analytics",
      "Custom domains",
    ],
    highlight: true,
    badge: "Most popular",
  },
  {
    name: "Scale",
    blurb: "For products with real traffic.",
    monthly: "$79",
    yearly: "$66",
    per: "/mo",
    billed: { monthly: "Billed monthly", yearly: "Billed yearly" },
    cta: { label: "Talk to us", href: "/contact?plan=scale" },
    features: ["Everything in Pro", "SSO & audit logs", "Dedicated manager"],
    highlight: false,
  },
]

export function PricingTiers() {
  const [billing, setBilling] = useState<Billing>("monthly")

  return (
    <section className="border-t border-border-subtle bg-background text-foreground">
      <div className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle px-6 py-12 sm:px-10 sm:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              {CONTENT.stamp}
            </p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground sm:text-5xl">
              {CONTENT.headlineBefore}{" "}
              <span className="italic text-brand">{CONTENT.headlineAccent}</span>
              {CONTENT.headlineAfter}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              {CONTENT.lede}
            </p>

            <div
              role="group"
              aria-label="Billing period"
              className="mt-6 inline-flex items-center gap-1 rounded-[var(--atro-control-radius)] border border-border-subtle bg-muted/50 p-1"
            >
              {(["monthly", "yearly"] as const).map((period) => (
                <button
                  key={period}
                  type="button"
                  aria-pressed={billing === period}
                  onClick={() => setBilling(period)}
                  className={
                    billing === period
                      ? "rounded-[calc(var(--atro-control-radius)-4px)] bg-background px-4 py-1.5 text-sm font-medium text-foreground shadow-sm ring-1 ring-border-subtle"
                      : "rounded-[calc(var(--atro-control-radius)-4px)] px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  }
                >
                  {period === "monthly"
                    ? CONTENT.toggleMonthly
                    : CONTENT.toggleYearly}
                </button>
              ))}
            </div>
            {billing === "yearly" ? (
              <p className="mt-2 text-xs font-medium text-brand">
                {CONTENT.yearlyNote}
              </p>
            ) : null}
          </div>

          <ul className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3">
            {TIERS.map((tier) => (
              <li
                key={tier.name}
                className={
                  tier.highlight
                    ? "flex flex-col rounded-[var(--atro-panel-radius)] border bg-card p-6 ring-1 sm:p-7 border-[color-mix(in_oklch,var(--brand)_50%,var(--border-subtle))] ring-[color-mix(in_oklch,var(--brand)_30%,transparent)]"
                    : "flex flex-col rounded-[var(--atro-panel-radius)] border border-border-subtle bg-card p-6 sm:p-7"
                }
              >
                {tier.highlight && "badge" in tier && tier.badge ? (
                  <p className="mb-3 inline-flex w-fit items-center rounded-full bg-[color-mix(in_oklch,var(--brand)_12%,transparent)] px-2.5 py-1 text-[11px] font-semibold tracking-wide text-brand uppercase">
                    {tier.badge}
                  </p>
                ) : null}
                <h3 className="text-lg font-medium text-foreground">
                  {tier.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {tier.blurb}
                </p>
                <p className="mt-5 flex items-baseline gap-1">
                  <span
                    aria-live="polite"
                    className="text-4xl font-medium tracking-tight tabular-nums text-foreground"
                  >
                    {billing === "monthly" ? tier.monthly : tier.yearly}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {tier.per}
                  </span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {billing === "monthly" ? tier.billed.monthly : tier.billed.yearly}
                </p>
                <ul className="mt-5 space-y-2 border-t border-border-subtle pt-5">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-foreground/90"
                    >
                      <Check
                        className="mt-0.5 size-3.5 shrink-0 text-brand"
                        strokeWidth={2.5}
                        aria-hidden
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={tier.cta.href}
                  className={
                    tier.highlight
                      ? "atro-btn mt-6 w-full justify-center"
                      : "atro-btn-ghost mt-6 w-full justify-center"
                  }
                >
                  {tier.cta.label}
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
