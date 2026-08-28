"use client"

import * as React from "react"
import { DocsSidebar } from "@/components/sidebar"
import { useSidebarOptional } from "@/components/sidebar-provider"
import {
  DOCS_SIDEBAR_SCROLL_STORAGE_KEY,
} from "@/lib/docs-sidebar-scroll"
import { cn } from "@/lib/utils"

/** Left rail — own overflow; collapses via SidebarProvider (cookie + ⌘B). */
export function DocsSidebarRail() {
  const ref = React.useRef<HTMLElement>(null)
  const sidebar = useSidebarOptional()
  const expanded = sidebar?.open ?? true

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    try {
      const raw = sessionStorage.getItem(DOCS_SIDEBAR_SCROLL_STORAGE_KEY)
      if (raw) {
        const saved = JSON.parse(raw) as {
          pathname?: string
          scrollTop?: number
        }
        if (
          saved.pathname === location.pathname &&
          typeof saved.scrollTop === "number"
        ) {
          el.scrollTop = saved.scrollTop
        }
      }
    } catch {
      /* ignore */
    }

    const onScroll = () => {
      try {
        sessionStorage.setItem(
          DOCS_SIDEBAR_SCROLL_STORAGE_KEY,
          JSON.stringify({
            pathname: location.pathname,
            scrollTop: el.scrollTop,
          })
        )
      } catch {
        /* ignore */
      }
    }

    el.addEventListener("scroll", onScroll, { passive: true })
    return () => el.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <aside
      ref={ref}
      data-slot="docs-sidebar"
      data-state={expanded ? "expanded" : "collapsed"}
      className={cn(
        "hidden h-full min-h-0 shrink-0 overflow-y-auto overscroll-contain border-r border-border-subtle transition-[width,padding,opacity] duration-200 ease-out lg:block",
        expanded
          ? "w-(--sidebar-width) px-2 py-6 opacity-100 xl:px-3 xl:py-8"
          : "w-0 overflow-hidden border-r-0 p-0 opacity-0 pointer-events-none"
      )}
    >
      <DocsSidebar />
    </aside>
  )
}
