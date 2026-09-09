"use client"

import type * as React from "react"
import { OTPField as OTPFieldPrimitive } from "@base-ui/react/otp-field"
import { motion, useReducedMotion } from "motion/react"

import { easeOutExpo } from "@/lib/motion"
import { cn } from "@/lib/utils"

/** Drop DOM animation handlers that clash with Motion's identically named props. */
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

/** Active digit settle — ~160ms easeOutExpo, no spring. */
const digitFocusTween = {
  duration: 0.16,
  ease: easeOutExpo,
} as const

/**
 * OTP field — soft-rect digit slots + focus settle (Family Values: careful delight).
 * Motion only on the focused slot; peers stay still.
 */
function OTPField({ className, ...props }: OTPFieldPrimitive.Root.Props) {
  return (
    <OTPFieldPrimitive.Root
      data-slot="otp-field"
      className={cn(
        "flex w-full items-center justify-center gap-2 data-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function OTPFieldInput({
  className,
  ...props
}: OTPFieldPrimitive.Input.Props) {
  const reduce = useReducedMotion()

  return (
    <OTPFieldPrimitive.Input
      data-slot="otp-field-input"
      className={cn(
        "h-[var(--atro-control-height,2.25rem)] w-[var(--atro-control-height,2.25rem)] shrink-0 rounded-[var(--atro-control-radius,var(--radius))] border border-border-subtle bg-background text-center text-base text-foreground tabular-nums outline-none transition-[border-color,box-shadow,background-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] sm:text-sm",
        "placeholder:text-muted-foreground",
        "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20",
        "data-filled:border-border",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
        "data-invalid:border-destructive data-invalid:ring-2 data-invalid:ring-destructive/20",
        "motion-reduce:transition-none",
        className
      )}
      render={
        reduce
          ? undefined
          : (htmlProps) => (
              <motion.input
                {...withoutDomAnimationHandlers(
                  htmlProps as Record<string, unknown>
                )}
                whileFocus={{ scale: 1.04 }}
                transition={digitFocusTween}
              />
            )
      }
      {...props}
    />
  )
}

function OTPFieldSeparator({
  className,
  ...props
}: React.ComponentProps<typeof OTPFieldPrimitive.Separator>) {
  return (
    <OTPFieldPrimitive.Separator
      data-slot="otp-field-separator"
      className={cn(
        "h-px w-2 shrink-0 bg-border-subtle data-[orientation=vertical]:h-4 data-[orientation=vertical]:w-px",
        className
      )}
      orientation="vertical"
      {...props}
    />
  )
}

export { OTPField, OTPFieldInput, OTPFieldSeparator }
