import Link from "next/link"

import { getBrand } from "@/lib/brand"

/**
 * Edit CONTENT to change headline, nav, and socials.
 * Defaults match the AtroUI docs Footer Bold demo.
 */
const CONTENT = {
  headline: "Own the UI. Borrow the API.",
  studio: [
    { label: "Docs", href: "/docs" },
    { label: "Components", href: "/docs/components" },
    { label: "Host APIs", href: "/docs/host-api" },
    { label: "Registry", href: "/docs/registry" },
    { label: "Theming", href: "/docs/theming" },
  ],
  elsewhere: [
    {
      label: "GitHub",
      href: "https://github.com/atroui/atroui",
      external: true,
    },
    { label: "X / Twitter", href: "https://x.com/iamk", external: true },
    { label: "Blog", href: "/blog", external: false },
    { label: "Brand kit", href: "/docs/brand", external: false },
    { label: "Changelog", href: "/docs/changelog", external: false },
  ],
  location: "atroui.com",
}

export function BoldFooter() {
  const year = new Date().getFullYear()
  const { name, email } = getBrand()

  return (
    <footer className="w-full overflow-hidden border-t border-border-subtle bg-background text-foreground pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto max-w-7xl border-x border-border-subtle">
        <div className="flex flex-col items-center px-6 py-16 sm:px-10 sm:py-20">
          <div className="mb-16 flex w-full flex-col items-start justify-between gap-12 md:mb-20 md:flex-row">
            <div className="max-w-md">
              <h2 className="mb-6 text-3xl font-medium tracking-tight text-pretty text-foreground">
                {CONTENT.headline}
              </h2>
              <a
                href={`mailto:${email}`}
                className="border-b-2 border-foreground pb-1 text-lg font-medium transition-colors hover:border-[var(--color-brand,#0b7bff)] hover:text-[var(--color-brand,#0b7bff)]"
              >
                {email}
              </a>
            </div>

            <div className="grid grid-cols-2 gap-12 sm:gap-16">
              <div>
                <p className="mb-4 text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                  Product
                </p>
                <nav className="flex flex-col gap-1 text-sm">
                  {CONTENT.studio.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="inline-flex min-h-10 items-center font-medium hover:text-[var(--color-brand,#0b7bff)]"
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
                        className="inline-flex min-h-10 items-center font-medium hover:text-[var(--color-brand,#0b7bff)]"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="inline-flex min-h-10 items-center font-medium hover:text-[var(--color-brand,#0b7bff)]"
                      >
                        {item.label}
                      </Link>
                    )
                  )}
                </nav>
              </div>
            </div>
          </div>

          <div className="relative w-full">
            <p
              aria-hidden
              className="pointer-events-none -mb-[2vw] select-none text-[12vw] leading-none font-black tracking-tighter text-foreground opacity-5"
            >
              {name}
            </p>
            <div className="relative z-10 flex flex-col gap-4 border-t border-border-subtle pt-8 pb-2 sm:flex-row sm:items-end sm:justify-between">
              <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
                © {year} {name}
              </span>
              <div className="flex items-center gap-6 sm:gap-8">
                <span className="hidden text-xs text-muted-foreground sm:inline">
                  {CONTENT.location}
                </span>
                <a
                  href="#main"
                  className="inline-flex min-h-10 items-center text-xs font-bold tracking-widest uppercase transition-colors hover:text-[var(--color-brand,#0b7bff)]"
                >
                  Back to top ↑
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
