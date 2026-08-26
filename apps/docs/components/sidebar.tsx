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
        "shrink-0 font-mono text-[9px] tracking-[0.1em] uppercase",
        badge === "host-api" ? "text-[var(--brand)]" : "text-muted-foreground/70"
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
              className="spec-label mb-2.5 flex w-full items-center justify-between px-2 text-left transition-colors hover:text-foreground"
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
                  "h-3.5 w-3.5 shrink-0 text-muted-foreground/70 transition-transform duration-200",
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
                            "relative flex items-center justify-between gap-2 rounded-[var(--radius-sm)] px-3 py-1.5 text-[13px] tracking-[-0.01em] transition-colors",
                            active
                              ? "bg-muted font-medium text-foreground before:absolute before:top-1.5 before:bottom-1.5 before:left-0 before:w-px before:bg-[var(--brand)]"
                              : "text-muted-foreground hover:text-foreground"
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
        className="inline-flex size-8 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--line)] text-foreground"
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
        panelClassName="w-[min(18rem,calc(100vw-2.5rem))] border-[var(--line)] bg-background p-4 pt-[max(1.25rem,env(safe-area-inset-top))] sm:p-5"
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
