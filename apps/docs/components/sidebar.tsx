"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { LogoMark } from "@/components/logo-mark"
import { OverlayShell } from "@/components/overlay-shell"
import { badgeLabel, navigation, type NavItem } from "@/lib/navigation"

function NavBadge({ badge }: { badge: NonNullable<NavItem["badge"]> }) {
  return (
    <span
      className={cn(
        "docs-book-badge",
        badge === "host-api" || badge === "registry"
          ? "docs-book-badge-accent"
          : undefined
      )}
    >
      {badgeLabel[badge]}
    </span>
  )
}

/** Chapter nav — always expanded, Zed/mdBook calm. */
export function DocsSidebar({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <nav className={cn("docs-book-nav", className)}>
      {navigation.map((section) => (
        <div key={section.title} className="docs-book-nav-section">
          <p className="docs-book-nav-heading">{section.title}</p>
          <ul className="docs-book-nav-list">
            {section.items.map((item) => {
              const active = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "docs-book-nav-link",
                      active && "docs-book-nav-link-active"
                    )}
                  >
                    <span className="truncate">{item.title}</span>
                    {item.badge ? <NavBadge badge={item.badge} /> : null}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
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
        aria-label="Open documentation menu"
        onClick={() => setOpen(true)}
        className="inline-flex size-9 items-center justify-center rounded-md border border-border-subtle text-foreground"
      >
        <Menu className="h-4 w-4" aria-hidden />
      </button>

      <OverlayShell
        open={open}
        onClose={() => setOpen(false)}
        side="left"
        label="Documentation menu"
      >
        <div className="flex h-full flex-col bg-background">
          <div className="flex h-14 items-center justify-between border-b border-border-subtle px-4">
            <div className="flex items-center gap-2">
              <LogoMark className="size-5 text-foreground" />
              <span id="docs-mobile-nav-title" className="text-sm font-medium">
                Docs
              </span>
            </div>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="inline-flex size-9 items-center justify-center rounded-md border border-border-subtle"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-3 py-6">
            <DocsSidebar />
          </div>
        </div>
      </OverlayShell>
    </div>
  )
}
