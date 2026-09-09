"use client"

import type * as React from "react"
import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field"
import { motion, useReducedMotion } from "motion/react"

import { pressTween } from "@/lib/motion"
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

/** Soft-rect group chrome shared by stepper shell. */
const groupChrome =
  "flex h-[var(--atro-control-height,2.25rem)] w-full min-w-0 items-stretch overflow-hidden rounded-[var(--atro-control-radius,var(--radius))] border border-border-subtle bg-background transition-[border-color,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20 has-aria-invalid:border-destructive has-aria-invalid:ring-2 has-aria-invalid:ring-destructive/20 has-data-invalid:border-destructive has-data-invalid:ring-2 has-data-invalid:ring-destructive/20 motion-reduce:transition-none"

const stepperBtn =
  "inline-flex aspect-square h-full shrink-0 items-center justify-center border-0 bg-transparent text-muted-foreground outline-none transition-[background-color,color,opacity] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none"

/**
 * Number field — Mira soft-rect + stepper press.
 * Scrub feedback stays careful: cursor presence + data-scrubbing opacity only.
 */
function NumberField({
  className,
  ...props
}: NumberFieldPrimitive.Root.Props) {
  return (
    <NumberFieldPrimitive.Root
      data-slot="number-field"
      className={cn(
        "flex w-full flex-col gap-1 data-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function NumberFieldScrubArea({
  className,
  ...props
}: NumberFieldPrimitive.ScrubArea.Props) {
  return (
    <NumberFieldPrimitive.ScrubArea
      data-slot="number-field-scrub-area"
      className={cn(
        "inline-flex cursor-ew-resize select-none items-center gap-1.5 text-[0.8125rem] font-medium text-foreground/90",
        "data-disabled:cursor-not-allowed data-disabled:opacity-50",
        "[[data-scrubbing]_&]:opacity-80",
        className
      )}
      {...props}
    />
  )
}

/**
 * Scrub cursor — opacity settle only (Family Values: careful delight).
 * No scale fireworks while dragging numbers.
 */
function NumberFieldScrubAreaCursor({
  className,
  ...props
}: NumberFieldPrimitive.ScrubAreaCursor.Props) {
  const reduce = useReducedMotion()

  return (
    <NumberFieldPrimitive.ScrubAreaCursor
      data-slot="number-field-scrub-area-cursor"
      {...props}
      className={cn("pointer-events-none", className)}
      render={
        reduce
          ? undefined
          : (htmlProps) => (
              <motion.span
                {...withoutDomAnimationHandlers(
                  htmlProps as Record<string, unknown>
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={pressTween}
              />
            )
      }
    />
  )
}

function NumberFieldGroup({
  className,
  ...props
}: NumberFieldPrimitive.Group.Props) {
  return (
    <NumberFieldPrimitive.Group
      data-slot="number-field-group"
      className={cn(groupChrome, className)}
      {...props}
    />
  )
}

function NumberFieldInput({
  className,
  ...props
}: NumberFieldPrimitive.Input.Props) {
  return (
    <NumberFieldPrimitive.Input
      data-slot="number-field-input"
      className={cn(
        "h-full min-w-0 flex-1 border-0 bg-transparent px-3 text-center text-base text-foreground outline-none sm:text-sm",
        "placeholder:text-muted-foreground",
        "disabled:cursor-not-allowed",
        "tabular-nums",
        className
      )}
      {...props}
    />
  )
}

function NumberFieldDecrement({
  className,
  children,
  ...props
}: NumberFieldPrimitive.Decrement.Props) {
  const reduce = useReducedMotion()

  return (
    <NumberFieldPrimitive.Decrement
      data-slot="number-field-decrement"
      className={cn(stepperBtn, "border-r border-border-subtle", className)}
      render={
        <motion.button
          whileTap={reduce ? undefined : { scale: 0.94 }}
          transition={pressTween}
        />
      }
      {...props}
    >
      {children ?? <MinusIcon />}
    </NumberFieldPrimitive.Decrement>
  )
}

function NumberFieldIncrement({
  className,
  children,
  ...props
}: NumberFieldPrimitive.Increment.Props) {
  const reduce = useReducedMotion()

  return (
    <NumberFieldPrimitive.Increment
      data-slot="number-field-increment"
      className={cn(stepperBtn, "border-l border-border-subtle", className)}
      render={
        <motion.button
          whileTap={reduce ? undefined : { scale: 0.94 }}
          transition={pressTween}
        />
      }
      {...props}
    >
      {children ?? <PlusIcon />}
    </NumberFieldPrimitive.Increment>
  )
}

function MinusIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="size-3.5"
      aria-hidden
      {...props}
    >
      <path d="M3.5 8h9" strokeLinecap="round" />
    </svg>
  )
}

function PlusIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="size-3.5"
      aria-hidden
      {...props}
    >
      <path d="M8 3.5v9M3.5 8h9" strokeLinecap="round" />
    </svg>
  )
}

export {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
  NumberFieldScrubAreaCursor,
}
