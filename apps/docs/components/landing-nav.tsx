"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { LogoMark } from "@/components/logo-mark"

const links = [
  { label: "Catalog", href: "/docs/components" },
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "/blog" },
  { label: "Install", href: "/docs/installation" },
] as const

export function LandingNav() {
  const [open, setOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-background/85 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
      <div className="mx-auto max-w-7xl border-x border-border-subtle">
        <div className="flex h-14 items-center justify-between gap-4 ms-shell-pad">
          <Link
            href="/"
            className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
            aria-label="AtroUI home"
          >
            <LogoMark />
            <span className="ds-display text-[19px] leading-none tracking-[-0.01em] text-foreground">
              AtroUI
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-0.5 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex h-14 items-center px-3.5 text-[13px] font-medium tracking-tight text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="https://www.npmjs.com/package/atroui"
              target="_blank"
              rel="noopener noreferrer"
              className="bam-link hidden text-sm sm:inline"
            >
              npm
            </a>
            <Link href="/docs/components" className="ms-cta hidden h-9 px-3.5 text-sm md:inline-flex">
              Browse
            </Link>
            <button
              type="button"
              className="inline-flex size-9 items-center justify-center border border-border-subtle text-foreground transition-colors hover:bg-muted md:hidden"
              aria-expanded={open}
              aria-controls="landing-mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-4" aria-hidden /> : <Menu className="size-4" aria-hidden />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="landing-mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            className="border-t border-border-subtle bg-background md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          >
            <nav className="mx-auto flex max-w-7xl flex-col divide-y divide-border-subtle border-x border-border-subtle">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="ms-shell-pad flex min-h-12 items-center py-3 text-base text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <div className="ms-shell-pad py-4">
                <Link
                  href="/docs/components"
                  onClick={() => setOpen(false)}
                  className="ms-cta w-full justify-center"
                >
                  Browse catalog
                </Link>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
