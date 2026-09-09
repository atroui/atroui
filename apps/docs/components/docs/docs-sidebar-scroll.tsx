"use client"

import * as React from "react"
import { usePathname } from "next/navigation"

const SCROLL_STORAGE_KEY = "docs-sidebar-scroll"

type ScrollState = {
  pathname: string
  scrollTop: number
}

function readScrollState(): ScrollState | null {
  try {
    const raw = sessionStorage.getItem(SCROLL_STORAGE_KEY)
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    if (
      !parsed ||
      typeof parsed !== "object" ||
      !("pathname" in parsed) ||
      !("scrollTop" in parsed)
    ) {
      return null
    }
    const { pathname, scrollTop } = parsed as Record<string, unknown>
    if (typeof pathname !== "string" || typeof scrollTop !== "number") {
      return null
    }
    return { pathname, scrollTop }
  } catch {
    return null
  }
}

function saveScrollState(container: HTMLElement) {
  try {
    sessionStorage.setItem(
      SCROLL_STORAGE_KEY,
      JSON.stringify({
        pathname: location.pathname,
        scrollTop: container.scrollTop,
      } satisfies ScrollState)
    )
  } catch {
    // Private mode / storage disabled.
  }
}

function getActiveNavLink(container: HTMLElement) {
  return (
    container.querySelector<HTMLElement>(
      ".docs-book-nav-link-active, a[aria-current='page']"
    ) ?? null
  )
}

/**
 * Quiet scroll rail for the docs chapter nav.
 * Restores scroll across navigations; otherwise centers the active link.
 */
export function DocsSidebarScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const ref = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(() => {
    const container = ref.current
    if (!container) return

    const stored = readScrollState()
    if (stored?.pathname === pathname) {
      container.scrollTop = stored.scrollTop
    } else {
      const active = getActiveNavLink(container)
      if (active) {
        const containerRect = container.getBoundingClientRect()
        const activeRect = active.getBoundingClientRect()
        if (
          activeRect.top < containerRect.top ||
          activeRect.bottom > containerRect.bottom
        ) {
          container.scrollTop +=
            activeRect.top -
            containerRect.top -
            (container.clientHeight - activeRect.height) / 2
        }
      }
    }

    saveScrollState(container)
  }, [pathname])

  React.useEffect(() => {
    const container = ref.current
    if (!container) return
    const onScroll = () => saveScrollState(container)
    container.addEventListener("scroll", onScroll, { passive: true })
    return () => container.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      ref={ref}
      className="docs-book-sidebar-scroll docs-scroll-quiet docs-scroll-fade"
    >
      {children}
    </div>
  )
}
