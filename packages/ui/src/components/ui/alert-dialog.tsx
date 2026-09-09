"use client"

import * as React from "react"
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import {
  backdropMotion,
  dialogContentMotion,
} from "../../lib/motion"
import { cn } from "../../lib/utils"
import { Button } from "./button"

/** Quiet Mira elevation — soft lift; border carries the edge. */
const overlayElevation =
  "shadow-[0_8px_24px_-18px_color-mix(in_oklch,var(--foreground)_16%,transparent)]"

type AlertDialogOpenContextValue = {
  open: boolean
}

const AlertDialogOpenContext =
  React.createContext<AlertDialogOpenContextValue | null>(null)

function useAlertDialogOpen() {
  const ctx = React.useContext(AlertDialogOpenContext)
  if (!ctx) {
    throw new Error("AlertDialog parts must be used within <AlertDialog>")
  }
  return ctx.open
}

function AlertDialog({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  ...props
}: AlertDialogPrimitive.Root.Props) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isControlled = openProp !== undefined
  const open = isControlled ? openProp : uncontrolledOpen

  const handleOpenChange = React.useCallback<
    NonNullable<AlertDialogPrimitive.Root.Props["onOpenChange"]>
  >(
    (next, eventDetails) => {
      if (!isControlled) setUncontrolledOpen(next)
      onOpenChange?.(next, eventDetails)
    },
    [isControlled, onOpenChange]
  )

  return (
    <AlertDialogOpenContext.Provider value={{ open }}>
      <AlertDialogPrimitive.Root
        data-slot="alert-dialog"
        open={open}
        onOpenChange={handleOpenChange}
        {...props}
      />
    </AlertDialogOpenContext.Provider>
  )
}

function AlertDialogTrigger({ ...props }: AlertDialogPrimitive.Trigger.Props) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  )
}

function AlertDialogPortal({ ...props }: AlertDialogPrimitive.Portal.Props) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  )
}

function AlertDialogOverlay({
  className,
  render,
  ...props
}: AlertDialogPrimitive.Backdrop.Props) {
  const reduce = useReducedMotion()
  return (
    <AlertDialogPrimitive.Backdrop
      data-slot="alert-dialog-overlay"
      className={cn("fixed inset-0 isolate z-50 bg-black/40", className)}
      render={render ?? <motion.div {...backdropMotion(reduce)} />}
      {...props}
    />
  )
}

function AlertDialogContent({
  className,
  size = "default",
  render,
  ...props
}: AlertDialogPrimitive.Popup.Props & {
  size?: "default" | "sm"
}) {
  const open = useAlertDialogOpen()
  const reduce = useReducedMotion()

  return (
    <AnimatePresence>
      {open ? (
        <AlertDialogPortal keepMounted key="alert-dialog-portal">
          <AlertDialogOverlay />
          <AlertDialogPrimitive.Popup
            data-slot="alert-dialog-content"
            data-size={size}
            className={cn(
              "group/alert-dialog-content fixed top-1/2 left-1/2 z-50 flex w-full max-w-[calc(100%-2rem)] flex-col gap-4 overflow-hidden rounded-[var(--radius)] border border-border-subtle bg-popover p-5 text-sm text-popover-foreground outline-none",
              "data-[size=default]:sm:max-w-md data-[size=sm]:sm:max-w-sm",
              overlayElevation,
              className
            )}
            render={render ?? <motion.div {...dialogContentMotion(reduce)} />}
            {...props}
          />
        </AlertDialogPortal>
      ) : null}
    </AnimatePresence>
  )
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "mt-1 flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogTitle({
  className,
  ...props
}: AlertDialogPrimitive.Title.Props) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn(
        "text-[0.9375rem] font-medium leading-snug tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogDescription({
  className,
  ...props
}: AlertDialogPrimitive.Description.Props) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn("text-sm leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  )
}

function AlertDialogAction({
  className,
  variant = "default",
  size = "default",
  ...props
}: AlertDialogPrimitive.Close.Props &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  return (
    <AlertDialogPrimitive.Close
      data-slot="alert-dialog-action"
      className={cn(className)}
      render={<Button variant={variant} size={size} />}
      {...props}
    />
  )
}

function AlertDialogCancel({
  className,
  variant = "outline",
  size = "default",
  ...props
}: AlertDialogPrimitive.Close.Props &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  return (
    <AlertDialogPrimitive.Close
      data-slot="alert-dialog-cancel"
      className={cn(className)}
      render={<Button variant={variant} size={size} />}
      {...props}
    />
  )
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
}
