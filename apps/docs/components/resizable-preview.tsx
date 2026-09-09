"use client"

import * as React from "react"
import { GripVertical } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Drag-to-resize preview canvas (shadcn/Aceternity-style). Left-anchored; the
 * right handle sets the viewport width so you can sanity-check responsive
 * breakpoints without leaving the page. Pointer-driven, keyboard-accessible,
 * and inert under reduced-motion (still resizable, just no transition).
 */
const MIN_WIDTH = 320

export function ResizablePreview({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const trackRef = React.useRef<HTMLDivElement>(null)
  const [width, setWidth] = React.useState<number | null>(null)
  const [dragging, setDragging] = React.useState(false)

  const maxWidth = () => trackRef.current?.offsetWidth ?? 0

  const clamp = React.useCallback((value: number) => {
    const max = maxWidth()
    return Math.max(MIN_WIDTH, Math.min(value, max))
  }, [])

  function onPointerDown(e: React.PointerEvent) {
    e.preventDefault()
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    setDragging(true)
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragging || !trackRef.current) return
    const left = trackRef.current.getBoundingClientRect().left
    setWidth(clamp(e.clientX - left))
  }

  function onPointerUp(e: React.PointerEvent) {
    if (!dragging) return
    ;(e.target as HTMLElement).releasePointerCapture?.(e.pointerId)
    setDragging(false)
  }

  function onKeyDown(e: React.KeyboardEvent) {
    const step = e.shiftKey ? 100 : 24
    if (e.key === "ArrowLeft") {
      e.preventDefault()
      setWidth((w) => clamp((w ?? maxWidth()) - step))
    } else if (e.key === "ArrowRight") {
      e.preventDefault()
      setWidth((w) => clamp((w ?? maxWidth()) + step))
    }
  }

  return (
    <div ref={trackRef} className="relative w-full">
      <div
        className={cn(
          "relative mx-auto",
          !dragging && "transition-[width] duration-150 ease-out",
          className
        )}
        style={{ width: width ? `${width}px` : "100%" }}
      >
        <div className="flex min-h-56 items-center justify-center overflow-x-auto p-4 sm:min-h-72 sm:p-8">
          <div className="flex w-full min-w-0 justify-center">{children}</div>
        </div>

        <button
          type="button"
          aria-label="Resize preview width"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onKeyDown={onKeyDown}
          className="group absolute -right-1 top-1/2 z-10 hidden h-16 -translate-y-1/2 cursor-ew-resize touch-none select-none items-center justify-center md:flex"
        >
          <span className="flex h-16 w-3 items-center justify-center rounded-full border border-border-subtle bg-card text-muted-foreground transition-colors group-hover:border-brand/50 group-hover:text-foreground">
            <GripVertical className="size-3" aria-hidden />
          </span>
        </button>
      </div>
    </div>
  )
}
