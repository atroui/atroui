"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { LogoMark } from "@/components/logo-mark"
import { badgeLabel, navigation, type NavItem } from "@/lib/navigation"

function NavBadge({ badge }: { badge: NonNullable<NavItem["badge"]> }) {
  return (
    <span
      className={cn(
        "shrink-0 text-[9px] font-semibold uppercase tracking-[0.06em]",
        badge === "host-api" ? "text-brand" : "text-muted-foreground"
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
        return (
          <div key={section.title}>
            <button
              type="button"
              className="mb-2 flex w-full items-center justify-between px-2 text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground"
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
                  "h-3.5 w-3.5 transition-transform",
                  isCollapsed && "-rotate-90"
                )}
              />
            </button>
            {!isCollapsed ? (
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const active = pathname === item.href
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center justify-between gap-2 rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors",
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
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-white/5 text-foreground"
      >
        <Menu className="h-4 w-4" />
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
          <div className="fixed inset-y-0 left-0 flex w-[18rem] flex-col border-r border-border-subtle bg-background p-5 shadow-[0_0_40px_color-mix(in_oklch,var(--color-brand)_20%,transparent)]">
            <div className="mb-6 flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={() => setOpen(false)}
              >
                <LogoMark />
                <span className="text-[15px] font-medium text-foreground">Meridian</span>
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="overflow-y-auto">
              <DocsSidebar />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
