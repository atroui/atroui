"use client"

import * as React from "react"
import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, useReducedMotion } from "motion/react"

import {
  controlGestures,
  easeOutExpo,
  layoutTween,
} from "../../lib/motion"
import { cn } from "../../lib/utils"

/** Pressed fill settle — ~160ms easeOutExpo, no spring. */
const pressedMorph = {
  duration: 0.16,
  ease: easeOutExpo,
} as const

const PRESSED_FILL =
  "absolute z-0 inset-0 bg-muted shadow-sm ring-1 ring-border-subtle/60"

/** Soft-rect via style — layoutId scale-corrects borderRadius during morph. */
const PRESSED_FILL_STYLE = {
  borderRadius: "calc(var(--atro-control-radius, var(--radius)) - 2px)",
} as const

export type ToggleGroupMotionValue = {
  layoutId: string
  multiple: boolean
}

/** Set by ToggleGroup so peer toggles share one layoutId highlight. */
export const ToggleGroupMotionContext =
  React.createContext<ToggleGroupMotionValue | null>(null)

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

const toggleVariants = cva(
  [
    "group/toggle relative inline-flex shrink-0 items-center justify-center gap-1.5 border border-transparent",
    "bg-clip-padding text-[0.8125rem] font-medium tracking-[-0.01em] whitespace-nowrap outline-none select-none",
    "text-muted-foreground transition-[color,background-color,border-color,box-shadow] duration-150",
    "ease-[cubic-bezier(0.16,1,0.3,1)]",
    "hover:text-foreground",
    "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20",
    "data-disabled:pointer-events-none data-disabled:opacity-50",
    "data-pressed:text-foreground",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    "motion-reduce:transition-none",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "hover:bg-muted/60",
        outline:
          "border-border-subtle bg-background hover:bg-muted/40 data-pressed:border-border-subtle",
      },
      size: {
        default:
          "h-[var(--atro-control-height,2.25rem)] min-w-[var(--atro-control-height,2.25rem)] rounded-[var(--atro-control-radius,var(--radius))] px-3",
        sm: "h-7 min-w-7 rounded-[calc(var(--atro-control-radius,var(--radius))-1px)] px-2.5 text-[0.8rem] [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-10 min-w-10 rounded-[var(--atro-control-radius,var(--radius))] px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * Soft-rect toggle — pressed fill morphs in (standalone) or travels via
 * layoutId when inside ToggleGroup (single-select). No spring bounce.
 */
function Toggle({
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  const reduce = useReducedMotion()
  const group = React.useContext(ToggleGroupMotionContext)
  const useSharedHighlight = Boolean(group && !group.multiple)
  const gestures = controlGestures(reduce)

  return (
    <TogglePrimitive
      data-slot="toggle"
      {...props}
      className={cn(toggleVariants({ variant, size }), className)}
      render={(htmlProps, state) => {
        const showFill = state.pressed
        const shared = useSharedHighlight && showFill

        return (
          <motion.button
            {...withoutDomAnimationHandlers(
              htmlProps as Record<string, unknown>
            )}
            whileHover={gestures.whileHover}
            whileFocus={gestures.whileFocus}
            whileTap={gestures.whileTap}
          >
            {shared ? (
              reduce ? (
                <span
                  className={PRESSED_FILL}
                  style={PRESSED_FILL_STYLE}
                  aria-hidden
                />
              ) : (
                <motion.span
                  layoutId={group!.layoutId}
                  className={PRESSED_FILL}
                  style={PRESSED_FILL_STYLE}
                  transition={layoutTween}
                  aria-hidden
                />
              )
            ) : showFill ? (
              reduce ? (
                <span
                  className={PRESSED_FILL}
                  style={PRESSED_FILL_STYLE}
                  aria-hidden
                />
              ) : (
                <motion.span
                  className={PRESSED_FILL}
                  style={PRESSED_FILL_STYLE}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={pressedMorph}
                  aria-hidden
                />
              )
            ) : null}
            <span className="relative z-[1] inline-flex items-center justify-center gap-1.5">
              {children}
            </span>
          </motion.button>
        )
      }}
    />
  )
}

export { Toggle, toggleVariants }
