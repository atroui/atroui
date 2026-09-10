"use client"

import * as React from "react"
import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import { motion, useReducedMotion } from "motion/react"

import { switchLayoutTween } from "@/lib/motion"
import { cn } from "@/lib/utils"

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

/**
 * Soft-rect switch — Motion.dev Base UI pattern:
 * flex `justify-content` flip + thumb `layout` (not raw `x` translate).
 * Family Values: fluidity via seamless travel; soft-rect not capsule.
 */
function Switch({
  className,
  size = "default",
  checked: checkedProp,
  defaultChecked = false,
  onCheckedChange,
  style,
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "default"
}) {
  const reduce = useReducedMotion()
  const [uncontrolled, setUncontrolled] = React.useState(defaultChecked)
  const isControlled = checkedProp !== undefined
  const checked = isControlled ? Boolean(checkedProp) : uncontrolled

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      {...props}
      checked={checkedProp}
      defaultChecked={defaultChecked}
      onCheckedChange={(next, eventDetails) => {
        if (!isControlled) setUncontrolled(next)
        onCheckedChange?.(next, eventDetails)
      }}
      style={
        {
          ...style,
          justifyContent: checked ? "flex-end" : "flex-start",
        } as React.CSSProperties
      }
      className={cn(
        "peer group/switch relative inline-flex shrink-0 items-center border border-transparent outline-none",
        "rounded-[var(--atro-control-radius,var(--radius))] p-0.5",
        "transition-[background-color,box-shadow] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)]",
        "focus-visible:border-ring",
        "data-checked:bg-primary data-unchecked:bg-muted",
        "data-disabled:cursor-not-allowed data-disabled:opacity-50",
        "data-[size=default]:h-6 data-[size=default]:w-10",
        "data-[size=sm]:h-4 data-[size=sm]:w-7",
        "motion-reduce:transition-none",
        className
      )}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block shrink-0 bg-background shadow-sm ring-1 ring-black/5 dark:ring-white/10",
          "rounded-[calc(var(--atro-control-radius,var(--radius))-2px)]",
          "group-data-[size=default]/switch:size-5",
          "group-data-[size=sm]/switch:size-3"
        )}
        render={
          reduce
            ? undefined
            : (htmlProps) => (
                <motion.span
                  {...withoutDomAnimationHandlers(
                    htmlProps as Record<string, unknown>
                  )}
                  layout
                  // borderRadius via style so layout scale-correction stays round
                  style={{
                    ...((htmlProps as { style?: React.CSSProperties }).style ??
                      {}),
                    borderRadius: "calc(var(--atro-control-radius,var(--radius)) - 2px)",
                  }}
                  transition={{ layout: switchLayoutTween }}
                />
              )
        }
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
