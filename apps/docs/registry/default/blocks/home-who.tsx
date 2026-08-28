import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { getBrand } from "@/lib/brand"

/**
 * Edit CONTENT to change bio, CTAs, and links.
 * This file is copied into your project by the AtroUI registry.
 */
const CONTENT = {
  stamp: "Who",
  headlineSuffix: "is yours.",
  bio: "Built by a solo founder who ships dark-first UI you copy into your repo - plus Host APIs when you need the boring security.",
  aboutHref: "/docs",
  aboutLabel: "Read the docs",
  externalHref: "https://www.iamk.xyz",
  externalLabel: "iamk.xyz",
  ctaStamp: "Ready when you are",
  ctaHeadline: "Own the UI. Borrow the API.",
  ctaBody:
    "Install from the registry. Host APIs when you need forms or AI tools - bring your own keys.",
  ctaLabel: "Own the UI",
  ctaHref: "/docs/registry",
  initials: "AT",
}

export type HomeWhoProps = {
  brandName?: string
  email?: string
  bio?: string
}

export function HomeWho({
  brandName,
  email,
  bio = CONTENT.bio,
}: HomeWhoProps = {}) {
  const brand = getBrand()
  const name = brandName ?? brand.name
  const mail = email ?? brand.email

  return (
    <section className="border-t border-border-subtle">
      <div className="border-b border-border-subtle">
        <div className="mx-auto grid max-w-7xl grid-cols-1 border-x border-border-subtle lg:grid-cols-12">
          <div className="border-b border-border-subtle p-6 sm:p-8 lg:col-span-7 lg:border-r lg:border-b-0 lg:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
              <div
                aria-hidden
                className="flex size-16 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold tracking-wide text-foreground"
              >
                {CONTENT.initials}
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                  {CONTENT.stamp}
                </p>
                <h2 className="mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
                  {name}{" "}
                  <span className="italic text-[var(--color-brand,#0b7bff)]">
                    {CONTENT.headlineSuffix}
                  </span>
                </h2>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
                  {bio}
                </p>
                <div className="mt-5 flex flex-wrap gap-4 text-sm">
                  <Link
                    href={CONTENT.aboutHref}
                    className="underline-offset-4 hover:underline"
                  >
                    {CONTENT.aboutLabel}
                  </Link>
                  <a
                    href={CONTENT.externalHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-4 hover:underline"
                  >
                    {CONTENT.externalLabel}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-8 bg-muted/30 p-6 sm:p-8 lg:col-span-5 lg:p-10">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                {CONTENT.ctaStamp}
              </p>
              <h2 className="mt-3 text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                {CONTENT.ctaHeadline}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {CONTENT.ctaBody}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href={CONTENT.ctaHref}
                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground sm:w-auto sm:justify-start"
              >
                {CONTENT.ctaLabel}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <a
                href={`mailto:${mail}`}
                className="inline-flex h-10 items-center text-sm text-muted-foreground hover:text-foreground"
              >
                {mail}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
