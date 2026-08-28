"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { pageTreeToNavSections } from "@/lib/docs-page-tree"
import { badgeLabel, type NavItem } from "@/lib/navigation"
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
  const navigation = pageTreeToNavSections()

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
                          aria-current={active ? "page" : undefined}
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

/** @deprecated Prefer `@/components/mobile-nav`. */
export { MobileNav as MobileSidebar } from "@/components/mobile-nav"
