"use client"

import * as React from "react"
import { GripVertical } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Drag-to-resize preview canvas (shadcn/Aceternity-style). Left-anchored; the
 * right handle sets the viewport width so you can sanity-check responsive
 * breakpoints without leaving the page. Pointer-driven, keyboard-accessible,
 * and inert under reduced-motion (still resizable, just no transition).
 *
 * `bleed` — section/block stages: edge-to-edge inside the frame (no padded
 * compact canvas). Compact (default) keeps the centered primitive stage.
 */
const MIN_WIDTH = 320

const PRESETS = [
  { label: "Monitor", hint: "100%", value: null },
  { label: "Tablet", hint: "768", value: 768 },
  { label: "Mobile", hint: "390", value: 390 },
] as const

export function ResizablePreview({
  children,
  className,
  bleed = false,
}: {
  children: React.ReactNode
  className?: string
  /** Edge-to-edge block/section stage (no padded compact canvas). */
  bleed?: boolean
}) {
  const trackRef = React.useRef<HTMLDivElement>(null)
  const [width, setWidth] = React.useState<number | null>(null)
  const [dragging, setDragging] = React.useState(false)

  const maxWidth = () => trackRef.current?.offsetWidth ?? 0

  const clamp = React.useCallback((value: number) => {
    const max = maxWidth()
    return Math.max(MIN_WIDTH, Math.min(value, max || value))
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
          "flex items-center",
          bleed
            ? "border-b border-border-subtle bg-muted/40 px-3 py-2"
            : "px-0 pb-0"
        )}
      >
        <div
          role="group"
          aria-label="Preview width presets"
          className="flex w-fit items-center gap-0.5 rounded-md border border-border-subtle bg-muted p-0.5"
        >
          {PRESETS.map((preset) => {
            const active =
              preset.value === null ? width === null : width === preset.value
            return (
              <button
                key={preset.label}
                type="button"
                aria-pressed={active}
                onClick={() =>
                  setWidth(preset.value === null ? null : clamp(preset.value))
                }
                className={cn(
                  "rounded px-2 py-1 text-[11px] font-medium transition-colors",
                  active
                    ? "bg-foreground/10 text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {preset.label}
                <span className="ml-1 text-muted-foreground/70">
                  {preset.hint}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div
        className={cn(
          "relative mx-auto",
          !dragging && "transition-[width] duration-150 ease-out",
          className
        )}
        style={{ width: width ? `${width}px` : "100%" }}
      >
        {bleed ? (
          <div className="w-full min-w-0 overflow-x-auto">{children}</div>
        ) : (
          <div className="flex min-h-56 items-center justify-center overflow-x-auto p-4 sm:min-h-72 sm:p-8">
            <div className="flex w-full min-w-0 justify-center">{children}</div>
          </div>
        )}

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
