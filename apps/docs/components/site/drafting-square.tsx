"use client"

import * as React from "react"

/**
 * Landing hairlines plot on first paint; a crosshair tracks the pointer
 * (desktop + fine pointer). Overlay is pointer-events none — listen on window.
 */
export function DraftingSquare() {
  const rootRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const frame = root.closest<HTMLElement>(".wf-frame")
    const h = root.querySelector<HTMLElement>(".wf-tsquare")
    const v = root.querySelector<HTMLElement>(".wf-tsquare-v")
    if (!frame || frame.hasAttribute("data-wide") || !h || !v) return

    const desktop = window.matchMedia("(min-width: 640px)")
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)")
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    const studio = () =>
      document.documentElement.hasAttribute("data-wf-studio") || desktop.matches

    let x = 0
    let y = 0
    let raf = 0
    let pending = false

    const paint = () => {
      pending = false
      h.style.opacity = "1"
      v.style.opacity = "1"
      h.style.transform = `translate3d(0, ${y}px, 0)`
      v.style.transform = `translate3d(${x}px, 0, 0)`
    }

    const hide = () => {
      if (raf) cancelAnimationFrame(raf)
      pending = false
      h.style.opacity = "0"
      v.style.opacity = "0"
    }

    const onMove = (event: PointerEvent) => {
      if (reduce.matches || !studio() || !fine.matches) {
        hide()
        return
      }
      const box = frame.getBoundingClientRect()
      const inside =
        event.clientX >= box.left &&
        event.clientX <= box.right &&
        event.clientY >= box.top &&
        event.clientY <= box.bottom
      if (!inside) {
        hide()
        return
      }
      x = Math.min(Math.max(event.clientX - box.left, 0), box.width)
      y = Math.min(Math.max(event.clientY - box.top, 0), box.height)
      if (pending) return
      pending = true
      raf = requestAnimationFrame(paint)
    }

    const onMedia = () => {
      if (reduce.matches || !studio() || !fine.matches) hide()
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    desktop.addEventListener("change", onMedia)
    fine.addEventListener("change", onMedia)
    reduce.addEventListener("change", onMedia)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", onMove)
      desktop.removeEventListener("change", onMedia)
      fine.removeEventListener("change", onMedia)
      reduce.removeEventListener("change", onMedia)
    }
  }, [])

  return (
    <div ref={rootRef} className="wf-board-fx" aria-hidden>
      <span className="wf-plot-col wf-plot-rail" />
      <span className="wf-plot-col" />
      <span className="wf-plot-col" />
      <span className="wf-plot-h wf-plot-h-top" />
      <span className="wf-plot-h wf-plot-h-bot" />
      <div className="wf-tsquare" />
      <div className="wf-tsquare-v" />
    </div>
  )
}
