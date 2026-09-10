"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { X } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import {
  backdropMotion,
  dialogContentMotion,
} from "@/lib/motion"
import { cn } from "@/lib/utils"
import { Button } from "./button"

/** Panel lift — mode-aware via `--dialog-shadow` (globals). */
const dialogElevation = "shadow-[var(--dialog-shadow)]"

type DialogOpenContextValue = {
  open: boolean
}

const DialogOpenContext = React.createContext<DialogOpenContextValue | null>(
  null
)

function useDialogOpen() {
  const ctx = React.useContext(DialogOpenContext)
  if (!ctx) {
    throw new Error("Dialog parts must be used within <Dialog>")
  }
  return ctx.open
}

function Dialog({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  ...props
}: DialogPrimitive.Root.Props) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isControlled = openProp !== undefined
  const open = isControlled ? openProp : uncontrolledOpen

  const handleOpenChange = React.useCallback<
    NonNullable<DialogPrimitive.Root.Props["onOpenChange"]>
  >(
    (next, eventDetails) => {
      if (!isControlled) setUncontrolledOpen(next)
      onOpenChange?.(next, eventDetails)
    },
    [isControlled, onOpenChange]
  )

  return (
    <DialogOpenContext.Provider value={{ open }}>
      <DialogPrimitive.Root
        data-slot="dialog"
        open={open}
        onOpenChange={handleOpenChange}
        {...props}
      />
    </DialogOpenContext.Provider>
  )
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  render,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  const reduce = useReducedMotion()
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn("dialog-overlay fixed inset-0 isolate z-50", className)}
      render={render ?? <motion.div {...backdropMotion(reduce)} />}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  render,
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean
}) {
  const open = useDialogOpen()
  const reduce = useReducedMotion()

  return (
    <AnimatePresence>
      {open ? (
        <DialogPortal keepMounted key="dialog-portal">
          <DialogOverlay />
          <DialogPrimitive.Popup
            data-slot="dialog-content"
            className={cn(
              "fixed top-1/2 left-1/2 z-50 flex w-full max-w-[calc(100%-2rem)] flex-col gap-4 overflow-hidden rounded-[var(--atro-panel-radius,var(--radius))] border border-border-subtle bg-popover p-5 text-sm text-popover-foreground outline-none sm:max-w-md",
              dialogElevation,
              className
            )}
            render={render ?? <motion.div {...dialogContentMotion(reduce)} />}
            {...props}
          >
            {children}
            {showCloseButton ? (
              <DialogPrimitive.Close
                data-slot="dialog-close"
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
              </DialogPrimitive.Close>
            ) : null}
          </DialogPrimitive.Popup>
        </DialogPortal>
      ) : null}
    </AnimatePresence>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 pr-9", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "mt-1 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton ? (
        <DialogPrimitive.Close render={<Button variant="outline" />}>
          Close
        </DialogPrimitive.Close>
      ) : null}
    </div>
  )
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "text-[0.9375rem] font-medium leading-snug tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-sm leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
