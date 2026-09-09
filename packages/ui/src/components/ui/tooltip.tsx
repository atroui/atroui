"use client"

import * as React from "react"
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { tooltipMotion } from "../../lib/motion"
import { cn } from "../../lib/utils"

/** Quiet Mira elevation — lighter than menus; still one soft lift. */
const tooltipElevation =
  "shadow-[0_6px_16px_-12px_color-mix(in_oklch,var(--foreground)_14%,transparent)]"

type TooltipOpenContextValue = {
  open: boolean
}

const TooltipOpenContext = React.createContext<TooltipOpenContextValue | null>(
  null
)

function useTooltipOpen() {
  const ctx = React.useContext(TooltipOpenContext)
  if (!ctx) {
    throw new Error("Tooltip parts must be used within <Tooltip>")
  }
  return ctx.open
}

function TooltipProvider({
  delay = 400,
  ...props
}: TooltipPrimitive.Provider.Props) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delay={delay}
      {...props}
    />
  )
}

function Tooltip({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  ...props
}: TooltipPrimitive.Root.Props) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isControlled = openProp !== undefined
  const open = isControlled ? openProp : uncontrolledOpen

  const handleOpenChange = React.useCallback<
    NonNullable<TooltipPrimitive.Root.Props["onOpenChange"]>
  >(
    (next, eventDetails) => {
      if (!isControlled) setUncontrolledOpen(next)
      onOpenChange?.(next, eventDetails)
    },
    [isControlled, onOpenChange]
  )

  return (
    <TooltipOpenContext.Provider value={{ open }}>
      <TooltipPrimitive.Root
        data-slot="tooltip"
        open={open}
        onOpenChange={handleOpenChange}
        {...props}
      />
    </TooltipOpenContext.Provider>
  )
}

function TooltipTrigger({ ...props }: TooltipPrimitive.Trigger.Props) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  side = "top",
  sideOffset = 6,
  align = "center",
  alignOffset = 0,
  children,
  render,
  ...props
}: TooltipPrimitive.Popup.Props &
  Pick<
    TooltipPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  const open = useTooltipOpen()
  const reduce = useReducedMotion()

  return (
    <AnimatePresence>
      {open ? (
        <TooltipPrimitive.Portal keepMounted key="tooltip-portal">
          <TooltipPrimitive.Positioner
            align={align}
            alignOffset={alignOffset}
            side={side}
            sideOffset={sideOffset}
            className="isolate z-50"
          >
            <TooltipPrimitive.Popup
              data-slot="tooltip-content"
              className={cn(
                "z-50 w-fit max-w-xs origin-(--transform-origin) rounded-[calc(var(--radius)-2px)] border border-border-subtle bg-popover px-2 py-0.5 font-mono text-[11px] leading-snug tracking-tight text-popover-foreground",
                tooltipElevation,
                className
              )}
              render={render ?? <motion.div {...tooltipMotion(reduce)} />}
              {...props}
            >
              {children}
            </TooltipPrimitive.Popup>
          </TooltipPrimitive.Positioner>
        </TooltipPrimitive.Portal>
      ) : null}
    </AnimatePresence>
  )
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
