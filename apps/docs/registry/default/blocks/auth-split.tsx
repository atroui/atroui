"use client"

import Link from "next/link"
import { ArrowRight, Lock } from "lucide-react"

/**
 * Edit CONTENT to match your auth page. Split layout — sign-in panel on
 * the left, product preview on the right. DashboardShell is exported from
 * this same file so the block stays self-contained.
 * After install this file lives in your repo.
 */
const CONTENT = {
  stamp: "Welcome back",
  headlineBefore: "Pick up",
  headlineAccent: "where you left off",
  headlineAfter: ".",
  lede: "Sign in to your workspace. New here? Create an account instead.",
  emailLabel: "Work email",
  emailPlaceholder: "you@company.com",
  passwordLabel: "Password",
  submitLabel: "Sign in",
  switchNote: "New to the product?",
  switchCta: { label: "Create an account", href: "/signup" },
  shellTitle: "Workspace overview",
  shellCaption: "Live preview — replace with your own dashboard.",
  metrics: [
    { label: "Active users", value: "8,412" },
    { label: "Conversion", value: "4.2%" },
    { label: "MRR", value: "$96k" },
  ],
  rows: [
    { name: "Acme launch", status: "Live", progress: "100%" },
    { name: "Billing portal", status: "In review", progress: "80%" },
    { name: "Mobile PWA", status: "Building", progress: "45%" },
  ],
}

/** Placeholder product preview — swap for your real dashboard. */
export function DashboardShell() {
  return (
    <div className="overflow-hidden rounded-[var(--atro-panel-radius,var(--radius))] border border-border-subtle bg-background">
      <div className="flex items-center gap-3 border-b border-border-subtle bg-muted/70 px-3 py-2.5 sm:px-4">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#FF5F57]/80 dark:bg-[#FF5F57]/70" />
          <span className="size-2.5 rounded-full bg-[#FEBC2E]/80 dark:bg-[#FEBC2E]/70" />
          <span className="size-2.5 rounded-full bg-[#28C840]/80 dark:bg-[#28C840]/70" />
        </div>
        <p className="min-w-0 flex-1 truncate text-center text-xs text-muted-foreground">
          {CONTENT.shellCaption}
        </p>
        <Lock className="size-3 shrink-0 text-muted-foreground/60" aria-hidden />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[160px_1fr]">
        <div className="hidden border-r border-border-subtle p-3 sm:block">
          <div className="space-y-1.5" aria-hidden>
            {["Overview", "Projects", "Billing", "Settings"].map((item, i) => (
              <div
                key={item}
                className={
                  i === 0
                    ? "rounded-[var(--atro-control-radius,var(--radius))] bg-[color-mix(in_oklch,var(--brand)_12%,transparent)] px-2.5 py-1.5 text-xs font-medium text-foreground"
                    : "rounded-[var(--atro-control-radius,var(--radius))] px-2.5 py-1.5 text-xs text-muted-foreground"
                }
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-0 p-4 sm:p-5">
          <p className="text-sm font-medium text-foreground">
            {CONTENT.shellTitle}
          </p>
          <dl className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {CONTENT.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-[var(--atro-control-radius,var(--radius))] border border-border-subtle bg-card p-2.5"
              >
                <dd className="text-sm font-semibold tabular-nums text-foreground sm:text-base">
                  {metric.value}
                </dd>
                <dt className="mt-0.5 truncate text-[11px] text-muted-foreground">
                  {metric.label}
                </dt>
              </div>
            ))}
          </dl>
          <ul className="mt-3 divide-y divide-border-subtle rounded-[var(--atro-control-radius,var(--radius))] border border-border-subtle">
            {CONTENT.rows.map((row) => (
              <li
                key={row.name}
                className="flex items-center justify-between gap-3 px-3 py-2.5"
              >
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-foreground">
                    {row.name}
                  </p>
                  <p className="text-[11px] tabular-nums text-muted-foreground">
                    {row.progress}
                  </p>
                </div>
                <span className="shrink-0 rounded-[var(--atro-control-radius,var(--radius))] border border-border-subtle bg-muted/60 px-2 py-0.5 text-[11px] text-muted-foreground">
                  {row.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export function AuthSplit() {
  return (
    <section className="border-t border-border-subtle bg-background text-foreground">
      <div className="border-b border-border-subtle">
        <div className="mx-auto grid max-w-7xl grid-cols-1 border-x border-border-subtle lg:grid-cols-2">
          <div className="flex flex-col justify-center px-6 py-12 sm:px-10 sm:py-16">
            <p className="atro-chip w-fit">
              <span className="size-1.5 rounded-full bg-brand" aria-hidden />
              {CONTENT.stamp}
            </p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              {CONTENT.headlineBefore}{" "}
              <span className="italic text-brand">
                {CONTENT.headlineAccent}
              </span>
              {CONTENT.headlineAfter}
            </h2>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              {CONTENT.lede}
            </p>

            <form
              className="mt-8 max-w-md space-y-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <label
                  htmlFor="auth-split-email"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  {CONTENT.emailLabel}
                </label>
                <input
                  id="auth-split-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder={CONTENT.emailPlaceholder}
                  className="h-[var(--atro-control-height,2.25rem)] w-full rounded-[var(--atro-control-radius,var(--radius))] border border-border-subtle bg-background px-3 text-base text-foreground transition-[border-color,box-shadow] outline-none placeholder:text-muted-foreground/60 focus-visible:border-ring focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="auth-split-password"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  {CONTENT.passwordLabel}
                </label>
                <input
                  id="auth-split-password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="h-[var(--atro-control-height,2.25rem)] w-full rounded-[var(--atro-control-radius,var(--radius))] border border-border-subtle bg-background px-3 text-base text-foreground transition-[border-color,box-shadow] outline-none placeholder:text-muted-foreground/60 focus-visible:border-ring focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:text-sm"
                />
              </div>
              <button type="submit" className="atro-btn w-full justify-center">
                {CONTENT.submitLabel}
                <ArrowRight className="size-4" aria-hidden />
              </button>
            </form>

            <p className="mt-6 max-w-md text-sm text-muted-foreground">
              {CONTENT.switchNote}{" "}
              <Link
                href={CONTENT.switchCta.href}
                className="font-medium text-brand"
              >
                {CONTENT.switchCta.label}
              </Link>
            </p>
          </div>

          <div className="border-t border-border-subtle bg-muted/30 px-6 py-12 sm:px-10 sm:py-16 lg:border-t-0 lg:border-l">
            <div className="mx-auto max-w-md lg:max-w-none">
              <DashboardShell />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
