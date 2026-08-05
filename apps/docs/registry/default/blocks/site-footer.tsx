import Link from "next/link"

import { getBrand } from "@/lib/brand"

/**
 * Lighter site footer. Edit CONTENT / LINKS after install.
 * For a louder CTA footer, use @atroui/footer-bold instead.
 */
const CONTENT = {
  blurb: "Dark-first UI you own in your repo.",
  copyrightSuffix: "All rights reserved.",
}

const LINKS = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
]

const LEGAL = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
]

export function SiteFooter() {
  const year = new Date().getFullYear()
  const { name, email } = getBrand()

  return (
    <footer className="border-t border-border-subtle pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto max-w-7xl border-x border-border-subtle px-6 py-12 sm:px-10 sm:py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="text-lg font-medium tracking-tight text-foreground">
              {name}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {CONTENT.blurb}
            </p>
            <a
              href={`mailto:${email}`}
              className="mt-4 inline-flex text-sm font-medium text-foreground underline-offset-4 hover:underline"
            >
              {email}
            </a>
          </div>

          <div className="flex flex-wrap gap-12 sm:gap-16">
            <nav aria-label="Site" className="flex flex-col gap-2">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                Site
              </p>
              {LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <nav aria-label="Legal" className="flex flex-col gap-2">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                Legal
              </p>
              {LEGAL.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <p className="mt-12 border-t border-border-subtle pt-6 font-mono text-[11px] text-muted-foreground">
          © {year} {name}. {CONTENT.copyrightSuffix}
        </p>
      </div>
    </footer>
  )
}
