"use client"

import { CheckboxGroup as CheckboxGroupPrimitive } from "@base-ui/react/checkbox-group"

import { cn } from "../../lib/utils"

/**
 * Soft-rect checkbox group — compose with `Checkbox` (`value` / `parent`).
 * Gradual revelation: parent + children stay one list surface.
 */
function CheckboxGroup({
  className,
  ...props
}: CheckboxGroupPrimitive.Props) {
  return (
    <CheckboxGroupPrimitive
      data-slot="checkbox-group"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

export { CheckboxGroup }
