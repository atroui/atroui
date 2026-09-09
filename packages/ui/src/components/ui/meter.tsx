"use client"

import * as React from "react"
import { Meter as MeterPrimitive } from "@base-ui/react/meter"
import { motion, useReducedMotion } from "motion/react"

import { fillTween } from "../../lib/motion"
import { cn } from "../../lib/utils"

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

function Meter({
  className,
  children,
  ...props
}: MeterPrimitive.Root.Props) {
  return (
    <MeterPrimitive.Root
      data-slot="meter"
      className={cn("flex w-full flex-col gap-1.5", className)}
      {...props}
    >
      {children}
    </MeterPrimitive.Root>
  )
}

function MeterLabel({ className, ...props }: MeterPrimitive.Label.Props) {
  return (
    <MeterPrimitive.Label
      data-slot="meter-label"
      className={cn("text-sm font-medium text-foreground", className)}
      {...props}
    />
  )
}

function MeterValue({ className, ...props }: MeterPrimitive.Value.Props) {
  return (
    <MeterPrimitive.Value
      data-slot="meter-value"
      className={cn("text-xs tabular-nums text-muted-foreground", className)}
      {...props}
    />
  )
}

function MeterTrack({ className, ...props }: MeterPrimitive.Track.Props) {
  return (
    <MeterPrimitive.Track
      data-slot="meter-track"
      className={cn(
        "relative h-1.5 w-full overflow-hidden rounded-[var(--radius)] bg-muted",
        className
      )}
      {...props}
    />
  )
}

/**
 * Soft-rect meter fill — value width tweens with `fillTween`.
 * Read-only gauge (not task progress); no spring bounce.
 */
function MeterIndicator({
  className,
  render,
  ...props
}: MeterPrimitive.Indicator.Props) {
  const reduce = useReducedMotion()

  return (
    <MeterPrimitive.Indicator
      data-slot="meter-indicator"
      className={cn("h-full rounded-[var(--radius)] bg-primary", className)}
      render={
        render ??
        ((htmlProps) => {
          const width = (htmlProps.style as React.CSSProperties | undefined)
            ?.width
          if (reduce || typeof width !== "string") {
            return <div {...htmlProps} />
          }
          return (
            <motion.div
              {...withoutDomAnimationHandlers(
                htmlProps as Record<string, unknown>
              )}
              initial={false}
              animate={{ width }}
              transition={fillTween}
            />
          )
        })
      }
      {...props}
    />
  )
}

export { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue }
