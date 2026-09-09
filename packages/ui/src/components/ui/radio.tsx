"use client"

import { Radio as RadioPrimitive } from "@base-ui/react/radio"
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"
import { motion, useReducedMotion } from "motion/react"

import { easeOutExpo } from "../../lib/motion"
import { cn } from "../../lib/utils"

/** Fill scale — ~160ms easeOutExpo, no spring overshoot. */
const fillTween = {
  duration: 0.16,
  ease: easeOutExpo,
} as const

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

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function Radio({ className, ...props }: RadioPrimitive.Root.Props) {
  const reduce = useReducedMotion()

  return (
    <RadioPrimitive.Root
      data-slot="radio"
      className={cn(
        "peer group/radio relative inline-flex size-4 shrink-0 items-center justify-center rounded-full border border-border-subtle bg-background outline-none transition-[border-color,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20",
        "data-checked:border-primary",
        "data-disabled:cursor-not-allowed data-disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
        "motion-reduce:transition-none",
        className
      )}
      {...props}
    >
      <RadioPrimitive.Indicator
        data-slot="radio-indicator"
        keepMounted
        className="flex size-full items-center justify-center"
        render={
          reduce
            ? (htmlProps, state) => (
                <span
                  {...htmlProps}
                  className={cn(
                    htmlProps.className,
                    "flex items-center justify-center",
                    !state.checked && "opacity-0"
                  )}
                >
                  <span className="size-2 rounded-full bg-primary" />
                </span>
              )
            : (htmlProps, state) => (
                <motion.span
                  {...withoutDomAnimationHandlers(
                    htmlProps as Record<string, unknown>
                  )}
                  initial={false}
                  animate={{
                    opacity: state.checked ? 1 : 0,
                    scale: state.checked ? 1 : 0.5,
                  }}
                  transition={fillTween}
                  className={cn(
                    htmlProps.className,
                    "flex items-center justify-center"
                  )}
                >
                  <span className="size-2 rounded-full bg-primary" />
                </motion.span>
              )
        }
      />
    </RadioPrimitive.Root>
  )
}

export { Radio, RadioGroup }
