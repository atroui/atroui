"use client"

import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

/**
 * Soft-rect control — Careful delight: ring caret (`.atro-field-type`) +
 * CSS focus/invalid settle. Motion earns on FieldError — not float-label
 * or per-keystroke chrome.
 */
function Input({ className, type, ...props }: InputPrimitive.Props) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "atro-field-type flex h-[var(--atro-control-height,2.25rem)] w-full min-w-0 rounded-[var(--atro-control-radius,var(--radius))] border border-border-subtle bg-background px-3 text-base text-foreground outline-none transition-[border-color,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] sm:text-sm",
        "file:inline-flex file:h-full file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        "placeholder:text-muted-foreground",
        "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
        "motion-reduce:transition-none",
        className
      )}
      {...props}
    />
  )
}

export { Input }
