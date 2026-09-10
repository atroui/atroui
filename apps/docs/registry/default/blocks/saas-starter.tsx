import { ArrowRight } from "lucide-react"
import Link from "next/link"

/**
 * SaasStarter — one-file SaaS landing composite.
 * Edit CONTENT below to match your product. No sibling imports;
 * after `npx shadcn add @atroui/saas-starter` this file lives in your repo.
 * Token-aware (role tokens only), soft-rect chrome, reduced-motion safe
 * (single pulse dot guarded with motion-reduce:animate-none).
 */
const CONTENT = {
  announcement: "v2.0 is live — AI summaries included on every plan",
  announcementHref: "/updates",
  stamp: "Acme · SaaS starter",
  headlineBefore: "Ship your SaaS",
  headlineAccent: "this week",
  headlineAfter: ".",
  subhead:
    "One file, every section: hero, logos, features, stats, pricing teaser, and CTA. Edit CONTENT and deploy.",
  primaryCta: { label: "Start free trial", href: "/contact" },
  secondaryCta: { label: "View pricing", href: "#saas-starter-pricing" },
  logos: ["Northline", "Cascade", "Harbor", "Kiln", "Fieldwork", "Orbit"],
  features: [
    {
      title: "Auth in minutes",
      description: "Email + OAuth flows with guarded routes out of the box.",
    },
    {
      title: "Billing built in",
      description: "Plans, trials, and webhooks wired to your provider.",
    },
    {
      title: "AI summaries",
      description: "Stream per-workspace digests on your own API keys.",
    },
    {
      title: "Deploy anywhere",
      description: "Static-first pages with zero-config hosting handoff.",
    },
  ],
  stats: [
    { value: "7 days", label: "Median time to launch" },
    { value: "99.9%", label: "Uptime across starter deploys" },
    { value: "$0", label: "Extra UI spend — you own the files" },
  ],
  pricing: {
    name: "Starter",
    price: "$49",
    per: "/mo",
    note: "Cancel anytime. Fixed scope, no hourly theater.",
    cta: { label: "Choose Starter", href: "/contact?plan=starter" },
  },
  ctaBand: {
    title: "Launch before Friday.",
    body: "Copy this file, edit CONTENT, and hand the link to your team.",
    cta: { label: "Get the starter", href: "/contact" },
  },
  footerNote: "MIT — you own every file this block copies into your repo.",
}

export function SaasStarter() {
  return (
    <section aria-label="SaaS starter" className="w-full bg-background text-foreground">
      {/* Hero — announcement lives below the fold as gradual revelation */}
      <div className="border-y border-border-subtle">
        <div className="mx-auto flex max-w-7xl flex-col items-center space-y-5 border-x border-border-subtle px-6 py-12 text-center sm:px-10 sm:py-14">
          <p className="atro-chip">
            <span className="size-1.5 rounded-full bg-brand" aria-hidden />
            {CONTENT.stamp}
          </p>
          <h2 className="max-w-3xl text-4xl leading-[1.05] font-medium tracking-tight text-balance sm:text-5xl">
            {CONTENT.headlineBefore}{" "}
            <span className="italic text-brand">{CONTENT.headlineAccent}</span>
            {CONTENT.headlineAfter}
          </h2>
          <p className="max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            {CONTENT.subhead}
          </p>
          <div className="flex w-full max-w-xl flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
            <Link href={CONTENT.primaryCta.href} className="atro-btn w-full justify-center sm:w-auto">
              {CONTENT.primaryCta.label}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link href={CONTENT.secondaryCta.href} className="atro-btn-ghost w-full justify-center sm:w-auto">
              {CONTENT.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>

      {/* Announcement — after hero (gradual revelation) */}
      <div className="border-b border-border-subtle">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 border-x border-border-subtle px-6 py-2.5 text-center sm:px-10">
          <span className="size-1.5 shrink-0 animate-pulse rounded-full bg-brand motion-reduce:animate-none" aria-hidden />
          <p className="truncate text-xs text-muted-foreground">
            {CONTENT.announcement}{" "}
            <Link href={CONTENT.announcementHref} className="font-medium text-brand underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
              See what&apos;s new
            </Link>
          </p>
        </div>
      </div>

      {/* Logo row */}
      <div className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle px-6 py-8 sm:px-10">
          <ul aria-label="Trusted by" className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--atro-panel-radius,var(--radius))] border border-border-subtle bg-border-subtle sm:grid-cols-3 md:grid-cols-6">
            {CONTENT.logos.map((name) => (
              <li key={name} className="flex min-h-14 items-center justify-center bg-background px-3 py-3">
                <span className="text-sm font-medium tracking-tight text-muted-foreground">{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Feature grid */}
      <div className="border-b border-border-subtle">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 border-x border-border-subtle px-6 py-10 sm:grid-cols-2 sm:px-10 lg:grid-cols-4">
          {CONTENT.features.map((f) => (
            <div key={f.title} className="group relative flex flex-col overflow-hidden rounded-[var(--atro-panel-radius,var(--radius))] border border-border-subtle bg-card p-5">
              <h3 className="text-[0.9375rem] font-medium tracking-tight text-foreground">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
              <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color-mix(in_oklch,var(--brand)_40%,transparent)] to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="border-b border-border-subtle">
        <dl className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-border-subtle border-x border-border-subtle sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {CONTENT.stats.map((s) => (
            <div key={s.label} className="px-6 py-6 sm:px-8">
              <dd className="text-2xl font-medium tracking-tight tabular-nums text-foreground sm:text-3xl">{s.value}</dd>
              <dt className="mt-1 text-xs text-muted-foreground">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>

      {/* Pricing teaser */}
      <div id="saas-starter-pricing" className="border-b border-border-subtle scroll-mt-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 border-x border-border-subtle px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">Pricing teaser</p>
            <p className="mt-2 text-xl font-medium text-foreground">
              {CONTENT.pricing.name} — {CONTENT.pricing.price}
              <span className="text-sm font-normal text-muted-foreground">{CONTENT.pricing.per}</span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{CONTENT.pricing.note}</p>
          </div>
          <Link href={CONTENT.pricing.cta.href} className="atro-btn w-full justify-center sm:w-auto">
            {CONTENT.pricing.cta.label}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>

      {/* CTA band */}
      <div className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle px-6 py-10 sm:px-10">
          <div className="flex flex-col gap-4 rounded-[var(--atro-panel-radius,var(--radius))] border border-border-subtle bg-card p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h3 className="text-xl font-medium tracking-tight text-foreground sm:text-2xl">{CONTENT.ctaBand.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{CONTENT.ctaBand.body}</p>
            </div>
            <Link href={CONTENT.ctaBand.cta.href} className="atro-btn shrink-0">
              {CONTENT.ctaBand.cta.label}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div>
        <div className="mx-auto max-w-7xl border-x border-border-subtle px-6 py-4 sm:px-10">
          <p className="text-center text-xs text-muted-foreground">{CONTENT.footerNote}</p>
        </div>
      </div>
    </section>
  )
}
