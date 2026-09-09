"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "@base-ui/react/slider"
import { motion, useReducedMotion } from "motion/react"

import { pressTween } from "@/lib/motion"
import { cn } from "@/lib/utils"

function withoutDomAnimationHandlers<T extends Record<string, unknown>>(
  props: T
) {
  const {
    onAnimationStart: _onAnimationStart,
    onDrag: _onDrag,
    onDragStart: _onDragStart,
    onDragEnd: _onDragEnd,
    ...rest
  } = props
  return rest
}

function Slider({
  className,
  children,
  defaultValue = 50,
  ...props
}: SliderPrimitive.Root.Props) {
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      className={cn(
        "flex w-full touch-none flex-col gap-2 select-none data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </SliderPrimitive.Root>
  )
}

function SliderLabel({ className, ...props }: SliderPrimitive.Label.Props) {
  return (
    <SliderPrimitive.Label
      data-slot="slider-label"
      className={cn("text-sm font-medium text-foreground", className)}
      {...props}
    />
  )
}

function SliderValue({ className, ...props }: SliderPrimitive.Value.Props) {
  return (
    <SliderPrimitive.Value
      data-slot="slider-value"
      className={cn("text-xs tabular-nums text-muted-foreground", className)}
      {...props}
    />
  )
}

function SliderControl({ className, ...props }: SliderPrimitive.Control.Props) {
  return (
    <SliderPrimitive.Control
      data-slot="slider-control"
      className={cn(
        "flex w-full touch-none items-center py-1 select-none",
        className
      )}
      {...props}
    />
  )
}

function SliderTrack({ className, ...props }: SliderPrimitive.Track.Props) {
  return (
    <SliderPrimitive.Track
      data-slot="slider-track"
      className={cn(
        "relative h-1.5 w-full grow overflow-hidden rounded-[var(--radius)] bg-muted",
        className
      )}
      {...props}
    />
  )
}

/**
 * Track fill follows the thumb 1:1 — no width ease while dragging
 * (Base UI CSS vars; do not wrap in fillTween).
 */
function SliderIndicator({
  className,
  ...props
}: SliderPrimitive.Indicator.Props) {
  return (
    <SliderPrimitive.Indicator
      data-slot="slider-indicator"
      className={cn("absolute h-full rounded-[var(--radius)] bg-primary", className)}
      {...props}
    />
  )
}

/**
 * Soft-rect thumb — press scale via `pressTween` only.
 * Position is owned by Base UI; Motion never eases drag travel.
 */
function SliderThumb({
  className,
  render,
  ...props
}: SliderPrimitive.Thumb.Props) {
  const reduce = useReducedMotion()

  return (
    <SliderPrimitive.Thumb
      data-slot="slider-thumb"
      className={cn(
        "block size-4 shrink-0 rounded-[calc(var(--radius)-2px)] border border-border-subtle bg-background shadow-sm outline-none",
        "ring-1 ring-black/5 dark:ring-white/10",
        "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20",
        "data-dragging:border-primary",
        className
      )}
      render={
        render ??
        (reduce
          ? undefined
          : (htmlProps) => (
              <motion.div
                {...withoutDomAnimationHandlers(
                  htmlProps as Record<string, unknown>
                )}
                style={{
                  ...((htmlProps as { style?: React.CSSProperties }).style ??
                    {}),
                  borderRadius: "calc(var(--radius) - 2px)",
                }}
                whileTap={{ scale: 0.96 }}
                transition={pressTween}
              />
            ))
      }
      {...props}
    />
  )
}

export {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderLabel,
  SliderThumb,
  SliderTrack,
  SliderValue,
}
