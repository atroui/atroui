"use client"

import * as React from "react"

/** Prevent document/body scroll on docs — only inner columns may scroll. */
export function DocsScrollLock() {
  React.useLayoutEffect(() => {
    const html = document.documentElement
    html.classList.add("docs-scroll-lock")
    return () => html.classList.remove("docs-scroll-lock")
  }, [])
  return null
}

export function getDocsScrollRoot(): HTMLElement | null {
  return document.querySelector<HTMLElement>("[data-slot=docs-scroll]")
}

/** Keep the locked shell pinned — native hash jumps scroll the wrong ancestor. */
export function pinDocsShell() {
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

/** Scroll the middle docs column to a heading id (never the document). */
export function scrollDocsToId(
  id: string,
  behavior: ScrollBehavior = "smooth"
): boolean {
  const scrollRoot = getDocsScrollRoot()
  const heading = document.getElementById(id)
  if (!scrollRoot || !heading || !scrollRoot.contains(heading)) return false

  pinDocsShell()

  const top =
    heading.getBoundingClientRect().top -
    scrollRoot.getBoundingClientRect().top +
    scrollRoot.scrollTop -
    12
  scrollRoot.scrollTo({ top: Math.max(0, top), behavior })
  return true
}

/** Capture in-page hash links anywhere in the docs shell (TOC rail included). */
export function useDocsHashLinks(shellRef: React.RefObject<HTMLElement | null>) {
  React.useEffect(() => {
    const rootEl = shellRef.current
    if (!rootEl) return
    const root: HTMLElement = rootEl

    function onClick(event: MouseEvent) {
      if (event.defaultPrevented) return
      if (event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const target = event.target
      if (!(target instanceof Element)) return
      const anchor = target.closest("a[href^='#']")
      if (!(anchor instanceof HTMLAnchorElement)) return
      if (!root.contains(anchor)) return

      const hash = anchor.getAttribute("href")
      if (!hash || hash === "#") return
      const id = decodeURIComponent(hash.slice(1))
      if (!document.getElementById(id)) return

      event.preventDefault()
      scrollDocsToId(id)
      history.replaceState(null, "", hash)
    }

    function onHashChange() {
      const raw = window.location.hash.slice(1)
      if (!raw) return
      requestAnimationFrame(() => {
        scrollDocsToId(decodeURIComponent(raw), "smooth")
        pinDocsShell()
      })
    }

    function applyInitialHash() {
      const raw = window.location.hash.slice(1)
      if (!raw) {
        pinDocsShell()
        return
      }
      // A few frames — headings may land after the route transition.
      let tries = 0
      const tick = () => {
        const ok = scrollDocsToId(decodeURIComponent(raw), "instant")
        pinDocsShell()
        if (!ok && tries < 30) {
          tries += 1
          requestAnimationFrame(tick)
        }
      }
      requestAnimationFrame(tick)
    }

    root.addEventListener("click", onClick)
    window.addEventListener("hashchange", onHashChange)
    applyInitialHash()

    return () => {
      root.removeEventListener("click", onClick)
      window.removeEventListener("hashchange", onHashChange)
    }
  }, [shellRef])
}

function canScrollY(el: HTMLElement, deltaY: number) {
  if (deltaY === 0) return false
  if (deltaY > 0) {
    return el.scrollTop + el.clientHeight < el.scrollHeight - 1
  }
  return el.scrollTop > 0
}

function isScrollableY(el: HTMLElement) {
  if (el.scrollHeight <= el.clientHeight + 1) return false
  const oy = getComputedStyle(el).overflowY
  return oy === "auto" || oy === "scroll" || oy === "overlay"
}

const COLUMN_SLOTS = new Set(["docs-sidebar", "docs-scroll", "docs-toc"])

/**
 * Wheel over gutters / main padding → route by X:
 * left of article content scrolls the component sidebar,
 * right of content scrolls TOC, only the content box scrolls the article.
 */
export function useDocsWheelRouter(shellRef: React.RefObject<HTMLElement | null>) {
  React.useEffect(() => {
    const shell = shellRef.current
    if (!shell) return

    function pickColumn(clientX: number): HTMLElement | null {
      const root = shellRef.current
      if (!root) return null

      const sidebar = root.querySelector<HTMLElement>("[data-slot=docs-sidebar]")
      const main = root.querySelector<HTMLElement>("[data-slot=docs-scroll]")
      const toc = root.querySelector<HTMLElement>("[data-slot=docs-toc]")

      const sidebarOk = Boolean(sidebar && sidebar.offsetParent !== null)
      const mainOk = Boolean(main && main.offsetParent !== null)
      const tocOk = Boolean(toc && toc.offsetParent !== null)

      if (mainOk && main) {
        const r = main.getBoundingClientRect()
        const style = getComputedStyle(main)
        const contentLeft = r.left + (parseFloat(style.paddingLeft) || 0)
        const contentRight = r.right - (parseFloat(style.paddingRight) || 0)

        // Gutter + main left pad → component sidebar (not the article).
        if (clientX < contentLeft && sidebarOk && sidebar) return sidebar
        if (clientX > contentRight && tocOk && toc) return toc
        if (clientX >= contentLeft && clientX <= contentRight) return main
      }

      if (sidebarOk && sidebar) {
        const r = sidebar.getBoundingClientRect()
        if (clientX <= r.right) return sidebar
      }
      if (tocOk && toc) {
        const r = toc.getBoundingClientRect()
        if (clientX >= r.left) return toc
      }

      return main ?? sidebar ?? toc
    }

    function onWheel(event: WheelEvent) {
      const root = shellRef.current
      if (!root) return

      let node: Element | null =
        event.target instanceof Element ? event.target : null

      // Nested panes (preview, code) keep the wheel; column roots use X routing.
      while (node && node !== root) {
        if (node instanceof HTMLElement && isScrollableY(node)) {
          const slot = node.getAttribute("data-slot")
          if (!slot || !COLUMN_SLOTS.has(slot)) {
            if (canScrollY(node, event.deltaY)) return
          }
        }
        node = node.parentElement
      }

      const column = pickColumn(event.clientX)
      if (!column) return

      event.preventDefault()
      column.scrollTop += event.deltaY
    }

    shell.addEventListener("wheel", onWheel, { passive: false })
    return () => shell.removeEventListener("wheel", onWheel)
  }, [shellRef])
}
