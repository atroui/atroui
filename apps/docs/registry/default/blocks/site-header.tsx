"use client"

import { ArrowRight, Menu, X } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { LogoWordmark } from "@/components/brand/logo"
import { getBrand } from "@/lib/brand"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/ui/theme-toggle"

/** Edit nav labels and hrefs freely after install. */
const NAV = [
  { label: "Work", href: "/work" },
  { label: "Tools", href: "/tools" },
  { label: "Services", href: "/services" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
] as const

const CTA = { label: "Hire us", href: "/contact" }

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const reduce = useReducedMotion()
  const brandName = getBrand().name

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 pt-[env(safe-area-inset-top)] transition-[background-color,border-color] duration-200",
        scrolled || open
          ? "border-b border-border-subtle bg-background/85 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-border-subtle/60 bg-background/50 backdrop-blur-md"
      )}
    >
      <div className="mx-auto max-w-7xl border-x border-border-subtle">
        <div className="flex h-14 items-center justify-between gap-4 px-4 sm:px-6">
          <Link
            href="/"
            aria-label={`${brandName} home`}
            className="shrink-0 transition-opacity hover:opacity-80"
          >
            <LogoWordmark />
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-0.5">
              {NAV.map((item) => {
                const active = isActive(pathname, item.href)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative inline-flex h-14 items-center px-3.5 text-[13px] font-medium tracking-tight transition-colors",
                        active
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {item.label}
                      {active ? (
                        <motion.span
                          layoutId="nav-rule"
                          className="absolute inset-x-3.5 bottom-0 h-0.5 bg-[var(--color-brand,#0b7bff)]"
                          transition={
                            reduce
                              ? { duration: 0 }
                              : { type: "spring", bounce: 0, duration: 0.35 }
                          }
                          aria-hidden
                        />
                      ) : null}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href={CTA.href}
              className="hidden h-9 items-center gap-1.5 rounded-full bg-primary px-3.5 text-sm font-medium text-primary-foreground md:inline-flex"
            >
              {CTA.label}
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
            <button
              type="button"
              className="inline-flex size-9 items-center justify-center border border-border-subtle text-foreground transition-colors hover:bg-muted md:hidden active:scale-[0.97]"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? (
                <X className="size-4" aria-hidden />
              ) : (
                <Menu className="size-4" aria-hidden />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            className="border-t border-border-subtle bg-background/95 backdrop-blur-xl md:hidden"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="mx-auto max-w-7xl border-x border-border-subtle">
              <nav className="flex flex-col divide-y divide-border-subtle">
                {NAV.map((item) => {
                  const active = isActive(pathname, item.href)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex min-h-12 items-center justify-between gap-3 px-4 py-3 text-base sm:px-6",
                        active
                          ? "font-medium text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  )
                })}
                <div className="px-4 py-4 sm:px-6">
                  <Link
                    href={CTA.href}
                    onClick={() => setOpen(false)}
                    className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-medium text-primary-foreground"
                  >
                    {CTA.label}
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </div>
              </nav>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
