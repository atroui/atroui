import * as React from "react"

import { cn } from "../../lib/utils"

/**
 * Soft-rect multi-line control — matches Input height tokens + focus settle.
 * Motion stays on FieldError; chrome is CSS only.
 */
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-20 w-full rounded-[var(--atro-control-radius,var(--radius))] border border-border-subtle bg-background px-3 py-2 text-base text-foreground outline-none transition-[border-color,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] sm:text-sm",
        "placeholder:text-muted-foreground",
        "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
        "motion-reduce:transition-none",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
