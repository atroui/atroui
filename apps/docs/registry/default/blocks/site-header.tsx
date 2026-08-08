"use client"

import { ArrowRight, Menu, X } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

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

const panelEase = [0.32, 0.72, 0, 1] as const

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

/** iOS-safe lock — overflow:hidden alone fights fixed drawers. */
function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    const y = window.scrollY
    const { style } = document.body
    const prev = {
      overflow: style.overflow,
      position: style.position,
      top: style.top,
      width: style.width,
      left: style.left,
      right: style.right,
    }
    style.overflow = "hidden"
    style.position = "fixed"
    style.top = `-${y}px`
    style.left = "0"
    style.right = "0"
    style.width = "100%"
    return () => {
      style.overflow = prev.overflow
      style.position = prev.position
      style.top = prev.top
      style.width = prev.width
      style.left = prev.left
      style.right = prev.right
      window.scrollTo(0, y)
    }
  }, [locked])
}

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const reduce = useReducedMotion()
  const brandName = getBrand().name

  useEffect(() => {
    setMounted(true)
  }, [])

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
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  useBodyScrollLock(open)

  const drawer =
    mounted &&
    createPortal(
      <AnimatePresence>
        {open ? (
          <motion.div
            key="site-header-drawer"
            className="fixed inset-0 z-[200] flex md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            />
            <motion.div
              id="mobile-nav"
              className="relative ml-auto flex h-full w-[min(100%,20rem)] flex-col border-l border-border-subtle bg-background shadow-[-20px_0_40px_rgba(0,0,0,0.25)]"
              initial={reduce ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: panelEase }}
            >
              <div className="flex items-center justify-between gap-3 border-b border-border-subtle px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
                <LogoWordmark />
                <button
                  type="button"
                  className="inline-flex size-9 items-center justify-center border border-border-subtle text-foreground"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <X className="size-4" aria-hidden />
                </button>
              </div>
              <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto overscroll-contain px-2 py-3 pb-[env(safe-area-inset-bottom)]">
                {NAV.map((item) => {
                  const active = isActive(pathname, item.href)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "rounded-lg px-3 py-3 text-[15px] transition-colors",
                        active
                          ? "bg-muted font-medium text-foreground"
                          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  )
                })}
                <Link
                  href={CTA.href}
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground"
                >
                  {CTA.label}
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </nav>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>,
      document.body
    )

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

      {drawer}
    </header>
  )
}
