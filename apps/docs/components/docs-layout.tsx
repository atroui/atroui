"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { DocsChromeProvider, useDocsChrome } from "@/components/docs-chrome"
import { DocsSidebarRail } from "@/components/docs-sidebar-rail"
import {
  DocsScrollLock,
  useDocsHashLinks,
  useDocsWheelRouter,
  scrollDocsToId,
  pinDocsShell,
} from "@/components/docs-scroll-lock"
import { DocsToc } from "@/components/docs-toc"
import { DocsRouteTransition } from "@/components/view-transitions"
import { PRODUCT_MAIN_PAD, PRODUCT_OUTER } from "@/lib/product-layout"

function DocsTocRail() {
  const chrome = useDocsChrome()
  const toc = chrome?.toc ?? []

  // Always reserve the column on xl so publishing TOC doesn't shift the article.
  return (
    <aside
      data-slot="docs-toc"
      className="hidden h-full min-h-0 w-44 shrink-0 overflow-y-auto overscroll-contain border-l border-border-subtle xl:block 2xl:w-52"
      aria-hidden={toc.length === 0}
    >
      {toc.length > 0 ? <DocsToc items={toc} /> : null}
    </aside>
  )
}

function DocsTocRouteReset() {
  const pathname = usePathname()
  const setToc = useDocsChrome()?.setToc

  // Runs before page publishers (sibling order) so stale TOC is cleared,
  // then the new page’s DocsTocPublisher fills it in the same commit.
  React.useLayoutEffect(() => {
    setToc?.([])
  }, [pathname, setToc])

  return null
}

function DocsScrollMain({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const ref = React.useRef<HTMLElement>(null)

  React.useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const raw = window.location.hash.slice(1)
    if (raw) {
      // Defer to hash helper after paint; don't wipe to 0 first.
      requestAnimationFrame(() => {
        scrollDocsToId(decodeURIComponent(raw), "instant")
        pinDocsShell()
      })
      return
    }

    el.scrollTop = 0
    pinDocsShell()
  }, [pathname])

  return (
    <main
      ref={ref}
      data-slot="docs-scroll"
      className={`product-main min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-contain [overflow-anchor:none] ${PRODUCT_MAIN_PAD}`}
    >
      <DocsTocRouteReset />
      <DocsRouteTransition>{children}</DocsRouteTransition>
    </main>
  )
}

/**
 * Locked 3-column docs room:
 *   [sidebar | scrollable article | toc]
 * Only the center column scrolls. Rails stay put and keep width.
 */
export function DocsLayoutShell({ children }: { children: React.ReactNode }) {
  const shellRef = React.useRef<HTMLDivElement>(null)
  useDocsWheelRouter(shellRef)
  useDocsHashLinks(shellRef)

  return (
    <DocsChromeProvider>
      <DocsScrollLock />
      <div
        ref={shellRef}
        className="product-shell product-shell-docs h-full"
        data-slot="docs"
      >
        <div
          className={`${PRODUCT_OUTER} flex h-full min-h-0 w-full`}
          style={
            {
              "--sidebar-width": "var(--sidebar-width-docs)",
            } as React.CSSProperties
          }
        >
          <DocsSidebarRail />
          <DocsScrollMain>{children}</DocsScrollMain>
          <DocsTocRail />
        </div>
      </div>
    </DocsChromeProvider>
  )
}
