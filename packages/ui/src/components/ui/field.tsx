"use client"

import { Field as FieldPrimitive } from "@base-ui/react/field"
import { motion, useReducedMotion } from "motion/react"

import { revealTween } from "../../lib/motion"
import { cn } from "../../lib/utils"

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

function Field({ className, ...props }: FieldPrimitive.Root.Props) {
  return (
    <FieldPrimitive.Root
      data-slot="field"
      className={cn("flex w-full flex-col gap-1", className)}
      {...props}
    />
  )
}

function FieldLabel({ className, ...props }: FieldPrimitive.Label.Props) {
  return (
    <FieldPrimitive.Label
      data-slot="field-label"
      className={cn(
        "text-[0.8125rem] leading-none font-medium text-foreground/90 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function FieldDescription({
  className,
  ...props
}: FieldPrimitive.Description.Props) {
  return (
    <FieldPrimitive.Description
      data-slot="field-description"
      className={cn("text-xs leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  )
}

/**
 * Error reveal — height:auto settle (Family Values: careful delight on rare path).
 * Presence is owned by Base UI transitionStatus; Motion only animates chrome.
 */
function FieldError({ className, ...props }: FieldPrimitive.Error.Props) {
  const reduce = useReducedMotion()

  return (
    <FieldPrimitive.Error
      data-slot="field-error"
      {...props}
      className={cn(
        "overflow-hidden text-xs leading-relaxed text-destructive",
        className
      )}
      render={
        reduce
          ? undefined
          : (htmlProps, state) => (
              <motion.div
                {...withoutDomAnimationHandlers(
                  htmlProps as Record<string, unknown>
                )}
                initial={{ opacity: 0, height: 0, y: -2 }}
                animate={
                  state.transitionStatus === "ending"
                    ? { opacity: 0, height: 0, y: -2 }
                    : { opacity: 1, height: "auto", y: 0 }
                }
                transition={revealTween}
              />
            )
      }
    />
  )
}

function FieldControl({ className, ...props }: FieldPrimitive.Control.Props) {
  return (
    <FieldPrimitive.Control
      data-slot="field-control"
      className={cn(
        "atro-field-type flex h-[var(--atro-control-height,2.25rem)] w-full min-w-0 rounded-[var(--atro-control-radius,var(--radius))] border border-border-subtle bg-background px-3 text-base text-foreground outline-none transition-[border-color,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] sm:text-sm",
        "placeholder:text-muted-foreground",
        "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
        "data-invalid:border-destructive data-invalid:ring-2 data-invalid:ring-destructive/20",
        "motion-reduce:transition-none",
        className
      )}
      {...props}
    />
  )
}

function FieldValidity({ ...props }: FieldPrimitive.Validity.Props) {
  return <FieldPrimitive.Validity data-slot="field-validity" {...props} />
}

export {
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldValidity,
}
