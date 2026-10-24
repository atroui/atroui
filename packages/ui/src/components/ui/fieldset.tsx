"use client"

import { Fieldset as FieldsetPrimitive } from "@base-ui/react/fieldset"

import { cn } from "../../lib/utils"

/**
 * Fieldset — legend + soft-rect group chrome.
 * Gradual revelation: group related controls under one quiet surface.
 */
function Fieldset({
  className,
  ...props
}: FieldsetPrimitive.Root.Props) {
  return (
    <FieldsetPrimitive.Root
      data-slot="fieldset"
      className={cn(
        "flex w-full min-w-0 flex-col gap-3 rounded-[var(--atro-control-radius,var(--radius))] border border-border-subtle bg-background/60 p-4 data-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function FieldsetLegend({
  className,
  ...props
}: FieldsetPrimitive.Legend.Props) {
  return (
    <FieldsetPrimitive.Legend
      data-slot="fieldset-legend"
      className={cn(
        "px-0.5 text-[0.8125rem] leading-none font-medium text-foreground/90 data-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Fieldset, FieldsetLegend }
