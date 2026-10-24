"use client"

import * as React from "react"
import { Popover as PopoverPrimitive } from "@base-ui/react/popover"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { popupMotion } from "../../lib/motion"
import { cn } from "../../lib/utils"

/** Layered pop elevation — ring-as-border + cast stack + top light. */
const overlayElevation = "ds-elev-pop"

type PopoverOpenContextValue = {
  open: boolean
}

const PopoverOpenContext = React.createContext<PopoverOpenContextValue | null>(
  null
)

function usePopoverOpen() {
  const ctx = React.useContext(PopoverOpenContext)
  if (!ctx) {
    throw new Error("Popover parts must be used within <Popover>")
  }
  return ctx.open
}

function Popover({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  ...props
}: PopoverPrimitive.Root.Props) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isControlled = openProp !== undefined
  const open = isControlled ? openProp : uncontrolledOpen

  const handleOpenChange = React.useCallback<
    NonNullable<PopoverPrimitive.Root.Props["onOpenChange"]>
  >(
    (next, eventDetails) => {
      if (!isControlled) setUncontrolledOpen(next)
      onOpenChange?.(next, eventDetails)
    },
    [isControlled, onOpenChange]
  )

  return (
    <PopoverOpenContext.Provider value={{ open }}>
      <PopoverPrimitive.Root
        data-slot="popover"
        open={open}
        onOpenChange={handleOpenChange}
        {...props}
      />
    </PopoverOpenContext.Provider>
  )
}

function PopoverTrigger({ ...props }: PopoverPrimitive.Trigger.Props) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverContent({
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 6,
  render,
  ...props
}: PopoverPrimitive.Popup.Props &
  Pick<
    PopoverPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  const open = usePopoverOpen()
  const reduce = useReducedMotion()

  return (
    <AnimatePresence>
      {open ? (
        <PopoverPrimitive.Portal keepMounted key="popover-portal">
          <PopoverPrimitive.Positioner
            align={align}
            alignOffset={alignOffset}
            side={side}
            sideOffset={sideOffset}
            className="isolate z-50"
          >
            <PopoverPrimitive.Popup
              data-slot="popover-content"
              className={cn(
                "z-50 w-72 origin-(--transform-origin) rounded-[var(--radius)] bg-popover p-3.5 text-sm text-popover-foreground outline-none",
                overlayElevation,
                className
              )}
              render={render ?? <motion.div {...popupMotion(reduce)} />}
              {...props}
            />
          </PopoverPrimitive.Positioner>
        </PopoverPrimitive.Portal>
      ) : null}
    </AnimatePresence>
  )
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-header"
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  )
}

function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      className={cn(
        "text-[0.8125rem] font-medium leading-snug tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function PopoverDescription({
  className,
  ...props
}: PopoverPrimitive.Description.Props) {
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      className={cn("text-sm leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  )
}

function PopoverClose({ ...props }: PopoverPrimitive.Close.Props) {
  return <PopoverPrimitive.Close data-slot="popover-close" {...props} />
}

export {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
}
