import { ArrowRight, ArrowUpRight, Lock } from "lucide-react"
import Link from "next/link"

import { getBrand } from "@/lib/brand"

/**
 * Edit CONTENT to match your product. Layout mirrors the AtroUI docs Hero.
 * After install this file lives in your repo.
 */
const CONTENT = {
  stamp: "AtroUI · Own the UI",
  headlineBefore: "Stop losing weeks to",
  headlineAccent: "boilerplate",
  headlineAfter: ".",
  subhead:
    "Dark-first components you copy into your repo. Host APIs when you need the boring security - bring your own keys.",
  primaryCta: { label: "Own the UI", href: "/docs/registry" },
  secondaryCta: { label: "Browse components", href: "/docs/components" },
  founderName: "Koustav",
  founderRole: "Founder · every line of code",
  founderInitials: "KG",
  sprintTitle: "Registry install",
  sprintDay: "Step 2 / 4",
  sprintDays: [
    { day: "01", label: "Init shadcn", done: true },
    { day: "02", label: "Add AtroUI", done: false, active: true },
    { day: "03", label: "Theme tokens", done: false },
    { day: "04", label: "Ship UI", done: false },
  ],
  sprintCta: { label: "Read install docs", href: "/docs/installation" },
  ogTitle: "Own the UI.\nBorrow the API.",
  ogSubtitle: "registry + Host APIs",
  ogHref: "/docs/host-api",
}

export function HomeHero() {
  const brand = getBrand()

  return (
    <section className="relative flex flex-col overflow-hidden bg-background text-foreground">
      <div className="relative z-10">
        <article className="w-full border-y border-border-subtle">
          <div className="mx-auto flex max-w-7xl flex-col items-center space-y-5 border-x border-border-subtle px-6 py-10 text-center sm:px-10 sm:py-14">
            <p className="inline-flex items-center gap-2 rounded-lg border border-border-subtle px-3 py-1 text-[11px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
              <span
                className="size-1.5 rounded-full bg-[var(--color-brand,#0b7bff)]"
                aria-hidden
              />
              {CONTENT.stamp}
            </p>

            <h1 className="max-w-4xl text-[2.125rem] leading-[1.05] font-medium tracking-tight text-foreground sm:text-6xl md:text-7xl">
              {CONTENT.headlineBefore}{" "}
              <span className="italic text-[var(--color-brand,#0b7bff)]">
                {CONTENT.headlineAccent}
              </span>
              {CONTENT.headlineAfter}
            </h1>

            <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              {CONTENT.subhead}
            </p>
          </div>
        </article>

        <div className="border-b border-border-subtle">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-5 border-x border-border-subtle px-6 py-8 sm:px-10 sm:py-10">
            <div className="flex w-full max-w-xl flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
              <Link
                href={CONTENT.primaryCta.href}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground sm:w-auto"
              >
                {CONTENT.primaryCta.label}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                href={CONTENT.secondaryCta.href}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-border-subtle px-5 text-sm font-medium text-foreground sm:w-auto"
              >
                {CONTENT.secondaryCta.label}
                <ArrowRight className="size-3.5 opacity-60" aria-hidden />
              </Link>
            </div>

            <div className="flex w-full max-w-xl items-center justify-center gap-3 sm:max-w-none">
              <div
                aria-hidden
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-semibold tracking-wide text-foreground"
              >
                {CONTENT.founderInitials}
              </div>
              <div className="text-left text-sm leading-tight">
                <p className="font-medium text-foreground">
                  {CONTENT.founderName}
                </p>
                <p className="text-muted-foreground">{CONTENT.founderRole}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle px-6 py-8 sm:px-10 sm:py-10">
          <div className="overflow-hidden rounded-2xl border border-border-subtle bg-muted/20 shadow-[0_32px_80px_-40px_rgba(0,0,0,0.45)]">
            <div className="flex items-center gap-3 border-b border-border-subtle bg-muted/40 px-3 py-2.5 sm:px-4">
              <div className="flex gap-1.5" aria-hidden>
                <span className="size-2.5 rounded-full bg-foreground/15" />
                <span className="size-2.5 rounded-full bg-foreground/15" />
                <span className="size-2.5 rounded-full bg-foreground/15" />
              </div>
              <div className="flex min-w-0 flex-1 items-center justify-center">
                <div className="flex max-w-md items-center gap-2 truncate rounded-md border border-border-subtle bg-background px-3 py-1 text-[11px] text-muted-foreground sm:text-xs">
                  <Lock className="size-3 shrink-0 opacity-60" aria-hidden />
                  <span className="truncate">{`${brand.domain}/og`}</span>
                </div>
              </div>
              <Link
                href={CONTENT.ogHref}
                className="hidden items-center gap-1 text-[11px] font-medium text-[var(--color-brand,#0b7bff)] sm:inline-flex"
              >
                Open live
                <ArrowUpRight className="size-3" aria-hidden />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px]">
              <div className="min-w-0 border-b border-border-subtle p-4 lg:border-b-0 lg:border-r">
                <div className="flex aspect-[1200/630] flex-col justify-end rounded-xl bg-gradient-to-br from-[#0a0a0a] via-[#111827] to-[#0b7bff]/30 p-6 ring-1 ring-border-subtle">
                  <p className="whitespace-pre-line text-2xl font-medium tracking-tight text-white sm:text-3xl">
                    {CONTENT.ogTitle}
                  </p>
                  <p className="mt-2 text-sm text-white/70">
                    {brand.name} - {CONTENT.ogSubtitle}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between border-b border-border-subtle px-4 py-3">
                  <p className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
                    {CONTENT.sprintTitle}
                  </p>
                  <span className="text-[11px] tabular-nums text-[var(--color-brand,#0b7bff)]">
                    {CONTENT.sprintDay}
                  </span>
                </div>
                <ol className="divide-y divide-border-subtle">
                  {CONTENT.sprintDays.map((row) => (
                    <li
                      key={row.day}
                      className={
                        "active" in row && row.active
                          ? "flex items-center gap-3 bg-[color-mix(in_oklab,var(--color-brand,#0b7bff)_8%,transparent)] px-4 py-3"
                          : "flex items-center gap-3 px-4 py-3"
                      }
                    >
                      <span
                        className={
                          row.done || ("active" in row && row.active)
                            ? "font-mono text-[11px] tabular-nums text-foreground"
                            : "font-mono text-[11px] tabular-nums text-muted-foreground/50"
                        }
                      >
                        {row.day}
                      </span>
                      <span
                        className={
                          row.done || ("active" in row && row.active)
                            ? "text-sm text-foreground"
                            : "text-sm text-muted-foreground/60"
                        }
                      >
                        {row.label}
                      </span>
                      {row.done ? (
                        <span
                          className="ml-auto size-1.5 rounded-full bg-[var(--color-brand,#0b7bff)]"
                          aria-hidden
                        />
                      ) : "active" in row && row.active ? (
                        <span
                          className="ml-auto size-1.5 animate-pulse rounded-full bg-[var(--color-brand,#0b7bff)]"
                          aria-hidden
                        />
                      ) : null}
                    </li>
                  ))}
                </ol>
                <div className="border-t border-border-subtle px-4 py-3">
                  <Link
                    href={CONTENT.sprintCta.href}
                    className="group flex items-center justify-between text-sm font-medium text-foreground"
                  >
                    {CONTENT.sprintCta.label}
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
