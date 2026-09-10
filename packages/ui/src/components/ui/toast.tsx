"use client"

import * as React from "react"
import { Toast as ToastPrimitive } from "@base-ui/react/toast"
import { X } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

import { toastMotion, toastTween, exitTween, enterTween } from "../../lib/motion"
import { cn } from "../../lib/utils"
import { Button } from "./button"

/** Layered pop elevation — ring-as-border + cast stack + top light. */
const toastElevation = "ds-elev-pop"

function ToastProvider({ ...props }: ToastPrimitive.Provider.Props) {
  return <ToastPrimitive.Provider data-slot="toast-provider" {...props} />
}

function ToastPortal({ ...props }: ToastPrimitive.Portal.Props) {
  return <ToastPrimitive.Portal data-slot="toast-portal" {...props} />
}

function ToastViewport({
  className,
  ...props
}: ToastPrimitive.Viewport.Props) {
  return (
    <ToastPrimitive.Viewport
      data-slot="toast-viewport"
      className={cn(
        "fixed right-4 bottom-4 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col outline-none sm:right-6 sm:bottom-6",
        className
      )}
      {...props}
    />
  )
}

/**
 * Soft-rect toast — edge enter/exit opacity + y (`toastTween`).
 *
 * Stack carefully: Root owns CSS-var stack (`--toast-index`, `--toast-offset-y`)
 * without Motion `y` on the same node. An inner surface runs opacity+y so enter
 * travel does not fight the stack transform. Root still animates opacity so
 * Base UI `getAnimations()` can await leave.
 */
function Toast({
  className,
  toast,
  children,
  ...props
}: ToastPrimitive.Root.Props) {
  const reduce = useReducedMotion()
  const ending = toast.transitionStatus === "ending"

  return (
    <ToastPrimitive.Root
      data-slot="toast"
      toast={toast}
      className={cn(
        "pointer-events-auto absolute right-0 bottom-0 z-[calc(1000-var(--toast-index))] w-full origin-bottom-right",
        /* Stack: CSS vars only — do not put Motion y on this node */
        "[transform:translateX(var(--toast-swipe-movement-x,0px))_translateY(calc(var(--toast-swipe-movement-y,0px)+var(--toast-offset-y,0px)-var(--toast-index)*12px))_scale(calc(1-var(--toast-index)*0.04))]",
        "data-expanded:[transform:translateX(var(--toast-swipe-movement-x,0px))_translateY(calc(var(--toast-swipe-movement-y,0px)+var(--toast-offset-y,0px)))_scale(1)]",
        "data-limited:pointer-events-none data-limited:opacity-0",
        "transition-[transform] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none",
        className
      )}
      render={
        <motion.div
          initial={false}
          animate={{ opacity: ending || toast.limited ? 0 : 1 }}
          transition={
            reduce
              ? { duration: 0 }
              : ending || toast.limited
                ? exitTween(toastTween.duration, toastTween.ease)
                : enterTween(toastTween.duration, toastTween.ease)
          }
        />
      }
      {...props}
    >
      <motion.div
        className={cn(
          "rounded-[var(--radius)] bg-popover text-popover-foreground outline-none",
          toastElevation
        )}
        {...toastMotion(reduce, ending)}
      >
        {children}
      </motion.div>
    </ToastPrimitive.Root>
  )
}

function ToastContent({
  className,
  ...props
}: ToastPrimitive.Content.Props) {
  return (
    <ToastPrimitive.Content
      data-slot="toast-content"
      className={cn(
        "flex flex-col gap-0.5 overflow-hidden p-3 pr-9",
        "data-behind:opacity-0 data-expanded:data-behind:opacity-100",
        "transition-opacity duration-200 motion-reduce:transition-none",
        className
      )}
      {...props}
    />
  )
}

function ToastTitle({ className, ...props }: ToastPrimitive.Title.Props) {
  return (
    <ToastPrimitive.Title
      data-slot="toast-title"
      className={cn(
        "text-[0.875rem] font-medium leading-snug tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function ToastDescription({
  className,
  ...props
}: ToastPrimitive.Description.Props) {
  return (
    <ToastPrimitive.Description
      data-slot="toast-description"
      className={cn("text-sm leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  )
}

function ToastAction({ className, ...props }: ToastPrimitive.Action.Props) {
  return (
    <ToastPrimitive.Action
      data-slot="toast-action"
      className={cn("mt-2 self-start", className)}
      {...props}
    />
  )
}

function ToastClose({
  className,
  render,
  ...props
}: ToastPrimitive.Close.Props) {
  return (
    <ToastPrimitive.Close
      data-slot="toast-close"
      className={cn(className)}
      render={
        render ?? (
          <Button
            variant="ghost"
            size="icon-sm"
            className="absolute top-2.5 right-2.5 text-muted-foreground hover:text-foreground"
          />
        )
      }
      {...props}
    >
      <X className="size-3.5" strokeWidth={1.75} />
      <span className="sr-only">Close</span>
    </ToastPrimitive.Close>
  )
}

/**
 * Opinionated stack renderer — maps `useToastManager().toasts`.
 * Place once under `ToastProvider` (usually near app root / demo stage).
 */
function Toaster({ className }: { className?: string }) {
  const { toasts } = ToastPrimitive.useToastManager()

  return (
    <ToastPortal>
      <ToastViewport className={className}>
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast}>
            <ToastContent>
              {toast.title ? <ToastTitle>{toast.title}</ToastTitle> : null}
              {toast.description ? (
                <ToastDescription>{toast.description}</ToastDescription>
              ) : null}
              {toast.actionProps ? (
                <ToastAction {...toast.actionProps} />
              ) : null}
            </ToastContent>
            <ToastClose />
          </Toast>
        ))}
      </ToastViewport>
    </ToastPortal>
  )
}

const useToastManager = ToastPrimitive.useToastManager
const createToastManager = ToastPrimitive.createToastManager

export {
  Toast,
  ToastAction,
  ToastClose,
  ToastContent,
  ToastDescription,
  Toaster,
  ToastPortal,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  createToastManager,
  useToastManager,
}
