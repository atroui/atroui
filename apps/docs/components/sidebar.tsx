"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ChevronDown, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { LogoMark } from "@/components/logo-mark"
import { OverlayShell } from "@/components/overlay-shell"
import { badgeLabel, navigation, type NavItem } from "@/lib/navigation"
import { revealTween } from "@/lib/motion"

function NavBadge({ badge }: { badge: NonNullable<NavItem["badge"]> }) {
  return (
    <span
      className={cn(
        "ds-sketch shrink-0 text-[13px] leading-none",
        badge === "host-api" || badge === "registry"
          ? "text-brand"
          : "text-muted-foreground"
      )}
    >
      {badgeLabel[badge]}
    </span>
  )
}

export function DocsSidebar({ className }: { className?: string }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = React.useState<Record<string, boolean>>({})
  const reduce = useReducedMotion()

  return (
    <nav className={cn("space-y-6", className)}>
      {navigation.map((section) => {
        const isCollapsed = collapsed[section.title]
        const panelId = `docs-nav-${section.title.toLowerCase().replace(/\s+/g, "-")}`
        return (
          <div key={section.title}>
            <button
              type="button"
              className="ds-nav-section mb-2 flex w-full items-center justify-between px-2 transition-[color,text-shadow] duration-150"
              aria-expanded={!isCollapsed}
              aria-controls={panelId}
              onClick={() =>
                setCollapsed((prev) => ({
                  ...prev,
                  [section.title]: !prev[section.title],
                }))
              }
            >
              {section.title}
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 shrink-0 text-brand/70 transition-transform duration-200",
                  isCollapsed && "-rotate-90"
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {!isCollapsed ? (
                <motion.ul
                  id={panelId}
                  className="space-y-0.5 overflow-hidden"
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={revealTween}
                >
                  {section.items.map((item) => {
                    const active = pathname === item.href
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center justify-between gap-2 rounded-md px-3 py-1.5 text-[13px] font-medium tracking-wide transition-colors",
                            active
                              ? "bg-white/10 text-foreground"
                              : "text-muted-foreground hover:bg-white/4 hover:text-foreground"
                          )}
                        >
                          <span className="truncate">{item.title}</span>
                          {item.badge ? <NavBadge badge={item.badge} /> : null}
                        </Link>
                      </li>
                    )
                  })}
                </motion.ul>
              ) : null}
            </AnimatePresence>
          </div>
        )
      })}
    </nav>
  )
}

export function MobileSidebar() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="inline-flex size-9 items-center justify-center rounded-lg border border-border-subtle bg-white/5 text-foreground"
      >
        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>
      <OverlayShell
        open={open}
        onClose={() => setOpen(false)}
        side="left"
        label="Documentation menu"
        trapFocus
        className="lg:hidden"
        panelClassName="w-[min(18rem,calc(100vw-2.5rem))] border-border-subtle bg-background p-4 pt-[max(1.25rem,env(safe-area-inset-top))] shadow-[0_0_40px_color-mix(in_oklch,var(--color-brand)_20%,transparent)] sm:p-5"
      >
        <div className="mb-5 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2"
            onClick={() => setOpen(false)}
          >
            <LogoMark />
            <span className="truncate text-[15px] font-medium text-foreground">
              AtroUI
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-[env(safe-area-inset-bottom)]">
          <DocsSidebar />
        </div>
      </OverlayShell>
    </div>
  )
}
