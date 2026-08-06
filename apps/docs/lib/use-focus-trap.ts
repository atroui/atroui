"use client"

import { useEffect, useRef } from "react"

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Trap Tab focus inside `containerRef` while `active`, restore focus on exit.
 */
export function useFocusTrap(
  active: boolean,
  containerRef: React.RefObject<HTMLElement | null>
) {
  const previousFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!active) return

    previousFocus.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null

    const root = containerRef.current
    if (!root) return

    const focusables = () =>
      Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => !el.hasAttribute("disabled") && el.tabIndex !== -1
      )

    const list = focusables()
    ;(list[0] ?? root).focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return
      const items = focusables()
      if (items.length === 0) {
        e.preventDefault()
        root.focus()
        return
      }
      const first = items[0]!
      const last = items[items.length - 1]!
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      previousFocus.current?.focus()
    }
  }, [active, containerRef])
}
