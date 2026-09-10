"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer"
import { X } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import {
  backdropMotion,
  drawerPanelMotion,
  type DrawerPanelSide,
} from "@/lib/motion"
import { cn } from "@/lib/utils"
import { Button } from "./button"

/** Panel lift — mode-aware via `--dialog-shadow` (globals). */
const dialogElevation = "shadow-[var(--dialog-shadow)]"

type DrawerOpenContextValue = {
  open: boolean
  side: DrawerPanelSide
}

const DrawerOpenContext = React.createContext<DrawerOpenContextValue | null>(
  null
)

function useDrawerContext() {
  const ctx = React.useContext(DrawerOpenContext)
  if (!ctx) {
    throw new Error("Drawer parts must be used within <Drawer>")
  }
  return ctx
}

function sideToSwipeDirection(
  side: DrawerPanelSide
): NonNullable<DrawerPrimitive.Root.Props["swipeDirection"]> {
  if (side === "bottom") return "down"
  if (side === "top") return "up"
  return side
}

function Drawer({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  side = "right",
  swipeDirection,
  ...props
}: DrawerPrimitive.Root.Props & {
  side?: DrawerPanelSide
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isControlled = openProp !== undefined
  const open = isControlled ? openProp : uncontrolledOpen

  const handleOpenChange = React.useCallback<
    NonNullable<DrawerPrimitive.Root.Props["onOpenChange"]>
  >(
    (next, eventDetails) => {
      if (!isControlled) setUncontrolledOpen(next)
      onOpenChange?.(next, eventDetails)
    },
    [isControlled, onOpenChange]
  )

  return (
    <DrawerOpenContext.Provider value={{ open, side }}>
      <DrawerPrimitive.Root
        data-slot="drawer"
        open={open}
        onOpenChange={handleOpenChange}
        swipeDirection={swipeDirection ?? sideToSwipeDirection(side)}
        {...props}
      />
    </DrawerOpenContext.Provider>
  )
}

function DrawerTrigger({ ...props }: DrawerPrimitive.Trigger.Props) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}

function DrawerPortal({ ...props }: DrawerPrimitive.Portal.Props) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}

function DrawerClose({ ...props }: DrawerPrimitive.Close.Props) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}

function DrawerOverlay({
  className,
  render,
  ...props
}: DrawerPrimitive.Backdrop.Props) {
  const reduce = useReducedMotion()
  return (
    <DrawerPrimitive.Backdrop
      data-slot="drawer-overlay"
      className={cn("dialog-overlay fixed inset-0 isolate z-50", className)}
      render={render ?? <motion.div {...backdropMotion(reduce)} />}
      {...props}
    />
  )
}

const sideViewportClass: Record<DrawerPanelSide, string> = {
  right: "items-stretch justify-end",
  left: "items-stretch justify-start",
  bottom: "items-end justify-center",
  top: "items-start justify-center",
}

const sidePopupClass: Record<DrawerPanelSide, string> = {
  right:
    "h-full w-full max-w-sm border-l border-border-subtle sm:max-w-md",
  left: "h-full w-full max-w-sm border-r border-border-subtle sm:max-w-md",
  bottom:
    "max-h-[min(92dvh,40rem)] w-full border-t border-border-subtle rounded-t-[var(--radius)]",
  top: "max-h-[min(92dvh,40rem)] w-full border-b border-border-subtle rounded-b-[var(--radius)]",
}

function DrawerContent({
  className,
  children,
  showCloseButton = true,
  render,
  ...props
}: DrawerPrimitive.Popup.Props & {
  showCloseButton?: boolean
}) {
  const { open, side } = useDrawerContext()
  const reduce = useReducedMotion()

  return (
    <AnimatePresence>
      {open ? (
        <DrawerPortal keepMounted key="drawer-portal">
          <DrawerOverlay />
          <DrawerPrimitive.Viewport
            data-slot="drawer-viewport"
            className={cn(
              "fixed inset-0 z-50 flex outline-none",
              sideViewportClass[side]
            )}
          >
            <DrawerPrimitive.Popup
              data-slot="drawer-content"
              className={cn(
                "relative z-50 flex flex-col gap-4 overflow-hidden bg-popover p-5 text-sm text-popover-foreground outline-none",
                dialogElevation,
                sidePopupClass[side],
                className
              )}
              render={
                render ?? <motion.div {...drawerPanelMotion(side, reduce)} />
              }
              {...props}
            >
              <DrawerPrimitive.Content
                data-slot="drawer-body"
                className="flex min-h-0 flex-1 flex-col gap-4"
              >
                {children}
              </DrawerPrimitive.Content>
              {showCloseButton ? (
                <DrawerPrimitive.Close
                  data-slot="drawer-close"
                  render={
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      className="absolute top-3.5 right-3.5 text-muted-foreground hover:text-foreground"
                    />
                  }
                >
                  <X className="size-3.5" strokeWidth={1.75} />
                  <span className="sr-only">Close</span>
                </DrawerPrimitive.Close>
              ) : null}
            </DrawerPrimitive.Popup>
          </DrawerPrimitive.Viewport>
        </DrawerPortal>
      ) : null}
    </AnimatePresence>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn("flex flex-col gap-2 pr-9", className)}
      {...props}
    />
  )
}

function DrawerFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn(
        "mt-auto flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton ? (
        <DrawerPrimitive.Close render={<Button variant="outline" />}>
          Close
        </DrawerPrimitive.Close>
      ) : null}
    </div>
  )
}

function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn(
        "text-[0.9375rem] font-medium leading-snug tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: DrawerPrimitive.Description.Props) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-sm leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
}
