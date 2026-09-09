"use client"

import * as React from "react"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"
import { LayoutGroup } from "motion/react"

import { cn } from "../../lib/utils"
import { ToggleGroupMotionContext } from "./toggle"

/**
 * Toggle group — Motion.dev Base UI pattern:
 * LayoutGroup + layoutId highlight morph between pressed peers (single-select).
 * Multiple mode keeps per-toggle pressed morph (no shared pill).
 */
function ToggleGroup({
  className,
  orientation = "horizontal",
  multiple = false,
  ...props
}: ToggleGroupPrimitive.Props) {
  const layoutId = React.useId()

  return (
    <ToggleGroupMotionContext.Provider
      value={{ layoutId: `${layoutId}-pill`, multiple }}
    >
      <LayoutGroup id={layoutId}>
        <ToggleGroupPrimitive
          data-slot="toggle-group"
          data-orientation={orientation}
          multiple={multiple}
          orientation={orientation}
          className={cn(
            "group/toggle-group inline-flex w-fit items-center justify-center gap-0.5 rounded-[var(--radius)] bg-muted/50 p-0.5",
            "data-[orientation=vertical]:flex-col",
            className
          )}
          {...props}
        />
      </LayoutGroup>
    </ToggleGroupMotionContext.Provider>
  )
}

export { ToggleGroup }
