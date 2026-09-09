"use client"

import * as React from "react"
import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { popupMotion } from "@/lib/motion"
import { cn } from "@/lib/utils"

/** Quiet Mira elevation — soft lift; border carries the edge. */
const overlayElevation =
  "shadow-[0_8px_24px_-18px_color-mix(in_oklch,var(--foreground)_16%,transparent)]"

type PreviewCardOpenContextValue = {
  open: boolean
}

const PreviewCardOpenContext =
  React.createContext<PreviewCardOpenContextValue | null>(null)

function usePreviewCardOpen() {
  const ctx = React.useContext(PreviewCardOpenContext)
  if (!ctx) {
    throw new Error("PreviewCard parts must be used within <PreviewCard>")
  }
  return ctx.open
}

function PreviewCard({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  ...props
}: PreviewCardPrimitive.Root.Props) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isControlled = openProp !== undefined
  const open = isControlled ? openProp : uncontrolledOpen

  const handleOpenChange = React.useCallback<
    NonNullable<PreviewCardPrimitive.Root.Props["onOpenChange"]>
  >(
    (next, eventDetails) => {
      if (!isControlled) setUncontrolledOpen(next)
      onOpenChange?.(next, eventDetails)
    },
    [isControlled, onOpenChange]
  )

  return (
    <PreviewCardOpenContext.Provider value={{ open }}>
      <PreviewCardPrimitive.Root
        data-slot="preview-card"
        open={open}
        onOpenChange={handleOpenChange}
        {...props}
      />
    </PreviewCardOpenContext.Provider>
  )
}

function PreviewCardTrigger({ ...props }: PreviewCardPrimitive.Trigger.Props) {
  return (
    <PreviewCardPrimitive.Trigger data-slot="preview-card-trigger" {...props} />
  )
}

function PreviewCardContent({
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 8,
  render,
  ...props
}: PreviewCardPrimitive.Popup.Props &
  Pick<
    PreviewCardPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  const open = usePreviewCardOpen()
  const reduce = useReducedMotion()

  return (
    <AnimatePresence>
      {open ? (
        <PreviewCardPrimitive.Portal keepMounted key="preview-card-portal">
          <PreviewCardPrimitive.Positioner
            align={align}
            alignOffset={alignOffset}
            side={side}
            sideOffset={sideOffset}
            className="isolate z-50"
          >
            <PreviewCardPrimitive.Popup
              data-slot="preview-card-content"
              className={cn(
                "z-50 w-72 origin-(--transform-origin) rounded-[var(--radius)] border border-border-subtle bg-popover p-3.5 text-sm text-popover-foreground outline-none",
                overlayElevation,
                className
              )}
              render={render ?? <motion.div {...popupMotion(reduce)} />}
              {...props}
            />
          </PreviewCardPrimitive.Positioner>
        </PreviewCardPrimitive.Portal>
      ) : null}
    </AnimatePresence>
  )
}

function PreviewCardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="preview-card-header"
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  )
}

function PreviewCardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="preview-card-title"
      className={cn(
        "text-[0.8125rem] font-medium leading-snug tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function PreviewCardDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="preview-card-description"
      className={cn("text-sm leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  PreviewCard,
  PreviewCardContent,
  PreviewCardDescription,
  PreviewCardHeader,
  PreviewCardTitle,
  PreviewCardTrigger,
}
