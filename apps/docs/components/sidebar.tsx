"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { LogoMark } from "@/components/logo-mark"
import { OverlayShell } from "@/components/overlay-shell"
import { badgeLabel, navigation, type NavItem } from "@/lib/navigation"

const COLLAPSE_STORAGE_KEY = "docs-sidebar-collapsed"

type CollapsedMap = Record<string, boolean>

/** Section owning the current route — longest matching item href wins over /docs. */
function activeSectionTitle(pathname: string) {
  let best: { title: string; length: number } | null = null
  for (const section of navigation) {
    for (const item of section.items) {
      const match =
        pathname === item.href || pathname.startsWith(`${item.href}/`)
      if (match && (!best || item.href.length > best.length)) {
        best = { title: section.title, length: item.href.length }
      }
    }
  }
  return best?.title ?? navigation[0]!.title
}

function readCollapsed(): CollapsedMap | null {
  try {
    const raw = sessionStorage.getItem(COLLAPSE_STORAGE_KEY)
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== "object") return null
    const map: CollapsedMap = {}
    for (const [key, value] of Object.entries(parsed)) {
      if (typeof value === "boolean") map[key] = value
    }
    return map
  } catch {
    return null
  }
}

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

/** Chapter nav — active chapter open, the rest folded away. Zed/mdBook calm. */
export function DocsSidebar({ className }: { className?: string }) {
  const pathname = usePathname()
  const activeTitle = activeSectionTitle(pathname)
  const listIdPrefix = React.useId()
  const [collapsed, setCollapsed] = React.useState<CollapsedMap>({})

  React.useEffect(() => {
    const stored = readCollapsed()
    if (stored) setCollapsed(stored)
  }, [])

  // The chapter you are reading is never folded shut.
  React.useEffect(() => {
    setCollapsed((prev) =>
      prev[activeTitle] ? { ...prev, [activeTitle]: false } : prev
    )
  }, [activeTitle])

  const isOpen = (title: string) =>
    title in collapsed ? !collapsed[title] : title === activeTitle

  const toggleSection = (title: string) => {
    const next = { ...collapsed, [title]: isOpen(title) }
    setCollapsed(next)
    try {
      sessionStorage.setItem(COLLAPSE_STORAGE_KEY, JSON.stringify(next))
    } catch {
      // Private mode / storage disabled — in-memory state still works.
    }
  }

  return (
    <nav className={cn("docs-book-nav", className)}>
      {navigation.map((section) => {
        const open = isOpen(section.title)
        const listId = `${listIdPrefix}-${section.title.replace(/\s+/g, "-")}`

        return (
          <div key={section.title} className="docs-book-nav-section">
            <button
              type="button"
              onClick={() => toggleSection(section.title)}
              aria-expanded={open}
              aria-controls={listId}
              className="docs-book-nav-heading docs-book-nav-toggle"
            >
              <span className="truncate">{section.title}</span>
              <ChevronRight
                aria-hidden
                className={cn(
                  "size-3 shrink-0 transition-transform duration-150 motion-reduce:transition-none",
                  open && "rotate-90"
                )}
              />
            </button>
            <ul id={listId} hidden={!open} className="docs-book-nav-list">
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
