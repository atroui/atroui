"use client"

import { Toolbar as ToolbarPrimitive } from "@base-ui/react/toolbar"
import { motion, useReducedMotion } from "motion/react"

import { controlGestures, pressTween } from "../../lib/motion"
import { cn } from "../../lib/utils"

/**
 * Dense soft-rect toolbar chrome — Mira muted track, press ≤100ms.
 * Family Values: one chrome surface; pressed states stay quiet (no shared
 * layoutId — toolbars often allow multiple pressed peers).
 */
function Toolbar({
  className,
  style,
  ...props
}: ToolbarPrimitive.Root.Props) {
  return (
    <ToolbarPrimitive.Root
      data-slot="toolbar"
      className={cn(
        "group/toolbar inline-flex w-fit items-center gap-0.5 rounded-[var(--radius)] border border-border-subtle bg-muted/40 p-0.5",
        "data-[orientation=vertical]:flex-col",
        className
      )}
      style={{ borderRadius: "var(--radius)", ...style }}
      {...props}
    />
  )
}

function ToolbarGroup({ className, ...props }: ToolbarPrimitive.Group.Props) {
  return (
    <ToolbarPrimitive.Group
      data-slot="toolbar-group"
      className={cn(
        "flex items-center gap-0.5 group-data-[orientation=vertical]/toolbar:flex-col",
        className
      )}
      {...props}
    />
  )
}

const toolbarControlClass =
  "inline-flex h-7 shrink-0 items-center justify-center gap-1 rounded-[calc(var(--radius)-2px)] px-2 text-[0.8rem] font-medium tracking-[-0.01em] text-muted-foreground outline-none transition-[background-color,color,box-shadow] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-background hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/20 data-disabled:pointer-events-none data-disabled:opacity-50 data-pressed:bg-background data-pressed:text-foreground aria-pressed:bg-background aria-pressed:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5 motion-reduce:transition-none"

function ToolbarButton({
  className,
  render,
  ...props
}: ToolbarPrimitive.Button.Props) {
  const reduce = useReducedMotion()
  const gestures = controlGestures(reduce)

  return (
    <ToolbarPrimitive.Button
      data-slot="toolbar-button"
      className={cn(toolbarControlClass, className)}
      render={
        render ?? (
          <motion.button
            whileHover={gestures.whileHover}
            whileFocus={gestures.whileFocus}
            whileTap={
              reduce ? undefined : { scale: 0.97, y: 0.5, transition: pressTween }
            }
          />
        )
      }
      {...props}
    />
  )
}

function ToolbarLink({ className, ...props }: ToolbarPrimitive.Link.Props) {
  return (
    <ToolbarPrimitive.Link
      data-slot="toolbar-link"
      className={cn(toolbarControlClass, "underline-offset-4 hover:underline", className)}
      {...props}
    />
  )
}

function ToolbarInput({ className, ...props }: ToolbarPrimitive.Input.Props) {
  return (
    <ToolbarPrimitive.Input
      data-slot="toolbar-input"
      className={cn(
        "h-7 min-w-24 rounded-[calc(var(--radius)-2px)] border border-transparent bg-background px-2 text-[0.8rem] text-foreground outline-none",
        "placeholder:text-muted-foreground",
        "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function ToolbarSeparator({
  className,
  ...props
}: ToolbarPrimitive.Separator.Props) {
  return (
    <ToolbarPrimitive.Separator
      data-slot="toolbar-separator"
      className={cn(
        "bg-border-subtle",
        "data-[orientation=vertical]:mx-0.5 data-[orientation=vertical]:h-4 data-[orientation=vertical]:w-px",
        "data-[orientation=horizontal]:my-0.5 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full",
        className
      )}
      {...props}
    />
  )
}

export {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarInput,
  ToolbarLink,
  ToolbarSeparator,
}
