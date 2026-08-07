"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { LogoMark } from "@/components/logo-mark"
import { badgeLabel, navigation, type NavItem } from "@/lib/navigation"
import { useFocusTrap } from "@/lib/use-focus-trap"

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
                  "h-3.5 w-3.5 shrink-0 text-brand/70 transition-transform",
                  isCollapsed && "-rotate-90"
                )}
              />
            </button>
            {!isCollapsed ? (
              <ul id={panelId} className="space-y-0.5">
                {section.items.map((item) => {
                  const active = pathname === item.href
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center justify-between gap-2 rounded-full px-3 py-1.5 text-[13px] font-medium tracking-wide transition-colors",
                          active
                            ? "bg-white/10 text-foreground shadow-[0_0_20px_color-mix(in_oklch,var(--color-brand)_25%,transparent)]"
                            : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                        )}
                      >
                        <span className="truncate">{item.title}</span>
                        {item.badge ? <NavBadge badge={item.badge} /> : null}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            ) : null}
          </div>
        )
      })}
    </nav>
  )
}

function MobileDrawer({ onClose }: { onClose: () => void }) {
  const panelRef = React.useRef<HTMLDivElement>(null)
  useFocusTrap(true, panelRef)

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Documentation menu"
      tabIndex={-1}
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close menu backdrop"
        onClick={onClose}
      />
      <div className="relative flex h-full w-[min(18rem,calc(100vw-2.5rem))] flex-col border-r border-border-subtle bg-background p-4 pt-[max(1.25rem,env(safe-area-inset-top))] shadow-[0_0_40px_color-mix(in_oklch,var(--color-brand)_20%,transparent)] sm:p-5">
        <div className="mb-5 flex items-center justify-between gap-3">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2"
            onClick={onClose}
          >
            <LogoMark />
            <span className="truncate text-[15px] font-medium text-foreground">
              AtroUI
            </span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-full text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-[env(safe-area-inset-bottom)]">
          <DocsSidebar />
        </div>
      </div>
    </div>
  )
}

export function MobileSidebar() {
  const [open, setOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    setOpen(false)
  }, [pathname])

  React.useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        aria-haspopup="dialog"
        className="inline-flex size-9 items-center justify-center rounded-full border border-border-subtle bg-white/5 text-foreground"
      >
        <Menu className="h-4 w-4" />
      </button>
      {open && mounted
        ? createPortal(
            <MobileDrawer onClose={() => setOpen(false)} />,
            document.body
          )
        : null}
    </div>
  )
}
