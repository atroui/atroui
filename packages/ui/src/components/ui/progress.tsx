"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "@base-ui/react/progress"
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

function Progress({
  className,
  children,
  value,
  min = 0,
  max = 100,
  ...props
}: ProgressPrimitive.Root.Props) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      value={value}
      min={min}
      max={max}
      className={cn("flex w-full flex-col gap-1.5", className)}
      {...props}
    >
      {children}
    </ProgressPrimitive.Root>
  )
}

function ProgressLabel({ className, ...props }: ProgressPrimitive.Label.Props) {
  return (
    <ProgressPrimitive.Label
      data-slot="progress-label"
      className={cn("text-sm font-medium text-foreground", className)}
      {...props}
    />
  )
}

function ProgressValue({ className, ...props }: ProgressPrimitive.Value.Props) {
  return (
    <ProgressPrimitive.Value
      data-slot="progress-value"
      className={cn("text-xs tabular-nums text-muted-foreground", className)}
      {...props}
    />
  )
}

function ProgressTrack({ className, ...props }: ProgressPrimitive.Track.Props) {
  return (
    <ProgressPrimitive.Track
      data-slot="progress-track"
      className={cn(
        "relative h-1.5 w-full overflow-hidden rounded-[var(--radius)] bg-muted",
        className
      )}
      {...props}
    />
  )
}

/**
 * Soft-rect fill — width tweens with `fillTween` (easeOutSoft).
 * Indeterminate: quiet pulse via CSS, no spring.
 */
function ProgressIndicator({
  className,
  render,
  ...props
}: ProgressPrimitive.Indicator.Props) {
  const reduce = useReducedMotion()

  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn(
        "h-full rounded-[var(--radius)] bg-primary",
        "data-[status=indeterminate]:w-1/3 data-[status=indeterminate]:animate-pulse",
        "motion-reduce:data-[status=indeterminate]:animate-none",
        className
      )}
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

export {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
}
