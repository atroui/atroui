"use client"

import Link from "next/link"

import { getBrand } from "@/lib/brand"

/**
 * Edit CONTENT to change headline, nav, and socials.
 * Defaults match the AtroUI docs Footer Bold demo.
 */
const CONTENT = {
  headline: "Have a project in mind? Let's ship something this week.",
  studio: [
    { label: "Work", href: "/work" },
    { label: "Tools", href: "/tools" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  elsewhere: [
    {
      label: "GitHub",
      href: "https://github.com/KOUSTAV2409",
      external: true,
    },
    { label: "X / Twitter", href: "https://x.com/iamk", external: true },
    { label: "iamk.xyz", href: "https://www.iamk.xyz", external: true },
    { label: "Journal", href: "/journal", external: false },
    { label: "Resources", href: "/resources", external: false },
    { label: "Brand & links", href: "/brand", external: false },
  ],
  location: "West Bengal · Remote",
}

export function BoldFooter() {
  const year = new Date().getFullYear()
  const { name, email } = getBrand()

  return (
    <footer className="w-full overflow-hidden border-t border-border-subtle bg-background text-foreground pb-[env(safe-area-inset-bottom)]">
      <div className="@container mx-auto max-w-7xl border-x border-border-subtle">
        <div className="flex flex-col items-center px-6 py-12 @min-[40rem]:px-10 @min-[40rem]:py-20">
          <div className="mb-12 flex w-full min-w-0 flex-col items-start justify-between gap-10 @min-[48rem]:mb-20 @min-[48rem]:flex-row @min-[48rem]:gap-12">
            <div className="w-full min-w-0 max-w-md">
              <h2 className="mb-6 text-3xl font-medium tracking-tight text-pretty text-foreground">
                {CONTENT.headline}
              </h2>
              <a
                href={`mailto:${email}`}
                className="inline-block max-w-full border-b-2 border-foreground pb-1 text-lg font-medium break-words transition-colors hover:border-brand hover:text-brand"
              >
                {email}
              </a>
            </div>

            <div className="grid w-full min-w-0 grid-cols-1 gap-8 @min-[28rem]:grid-cols-2 @min-[28rem]:gap-10 @min-[40rem]:gap-16">
              <div>
                <p className="mb-4 text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                  Studio
                </p>
                <nav className="flex flex-col gap-1 text-sm">
                  {CONTENT.studio.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="inline-flex min-h-10 items-center font-medium hover:text-brand"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
              <div>
                <p className="mb-4 text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                  Elsewhere
                </p>
                <nav className="flex flex-col gap-1 text-sm">
                  {CONTENT.elsewhere.map((item) =>
                    item.external ? (
                      <a
                        key={item.href}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-10 items-center font-medium hover:text-brand"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="inline-flex min-h-10 items-center font-medium hover:text-brand"
                      >
                        {item.label}
                      </Link>
                    )
                  )}
                </nav>
              </div>
            </div>
          </div>

          <div className="@container relative w-full min-w-0 overflow-hidden">
            <p
              aria-hidden
              className="pointer-events-none select-none pb-[0.08em] text-[clamp(2.75rem,22cqi,10rem)] leading-[0.85] font-black tracking-tighter text-foreground opacity-5"
            >
              {name}
            </p>
            <div className="relative z-10 flex flex-col gap-4 border-t border-border-subtle pt-8 pb-2 @min-[36rem]:flex-row @min-[36rem]:items-end @min-[36rem]:justify-between">
              <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
                © {year} {name}
              </span>
              <div className="flex items-center gap-6 @min-[36rem]:gap-8">
                <span className="hidden text-xs text-muted-foreground @min-[36rem]:inline">
                  {CONTENT.location}
                </span>
                <button
                  type="button"
                  aria-label="Back to top"
                  onClick={() =>
                    window.scrollTo({
                      top: 0,
                      behavior: window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                      ).matches
                        ? "auto"
                        : "smooth",
                    })
                  }
                  className="inline-flex min-h-10 cursor-pointer items-center text-xs font-bold tracking-widest uppercase transition-colors hover:text-brand"
                >
                  Back to top ↑
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
