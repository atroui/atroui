"use client"

import { usePathname } from "next/navigation"
import { toolApps } from "@/lib/navigation"
import { TransitionLink } from "@/components/view-transitions"
import { cn } from "@/lib/utils"

/**
 * Short marketing spine — plain links only.
 * Depth lives in docs sidebar + command menu (gradual revelation).
 */
const items = [
  { href: "/docs", label: "Docs" },
  { href: "/docs/components", label: "Components" },
  { href: "/blog", label: "Blog" },
] as const

function isActive(pathname: string, label: (typeof items)[number]["label"]) {
  if (label === "Components") {
    return (
      pathname.startsWith("/docs/components") ||
      toolApps.some(
        (tool) =>
          pathname === tool.href || pathname.startsWith(`${tool.href}/`)
      )
    )
  }
  if (label === "Docs") {
    return (
      pathname === "/docs" ||
      (pathname.startsWith("/docs/") &&
        !pathname.startsWith("/docs/components"))
    )
  }
  return pathname.startsWith("/blog") || pathname.startsWith("/updates")
}

export function SiteNav() {
  const pathname = usePathname()

  return (
    <nav
      className="atro-site-nav ml-1 hidden items-center gap-0.5 md:flex"
      aria-label="Primary"
    >
      {items.map((item) => {
        const active = isActive(pathname, item.label)
        return (
          <TransitionLink
            key={item.href}
            href={item.href}
            transitionTypes={[]}
            className={cn(
              "rounded-[var(--atro-control-radius)] px-2.5 py-1.5 text-[13px] font-medium tracking-[-0.01em] transition-colors",
              active
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
            aria-current={active ? "page" : undefined}
          >
            {item.label}
          </TransitionLink>
        )
      })}
    </nav>
  )
}
