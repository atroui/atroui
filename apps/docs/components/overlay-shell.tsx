"use client"

/**
 * Shared overlay shell — Family fluidity.
 * One portal + scroll lock + tween stack for drawers (landing + docs).
 * Content differs; chrome motion must not.
 */

import * as React from "react"
import { createPortal } from "react-dom"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock"
import { useFocusTrap } from "@/lib/use-focus-trap"
import { fadeTween, panelTween } from "@/lib/motion"
import { cn } from "@/lib/utils"

type Side = "left" | "right"

export function OverlayShell({
  open,
  onClose,
  side = "right",
  label,
  panelId,
  panelClassName,
  children,
  className,
  trapFocus = false,
}: {
  open: boolean
  onClose: () => void
  side?: Side
  label: string
  panelId?: string
  panelClassName?: string
  children: React.ReactNode
  /** Extra classes on the fixed root (e.g. md:hidden) */
  className?: string
  trapFocus?: boolean
}) {
  const [mounted, setMounted] = React.useState(false)
  const panelRef = React.useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const from = side === "left" ? "-100%" : "100%"

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, onClose])

  useBodyScrollLock(open)
  useFocusTrap(trapFocus && open, panelRef)

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          key={`overlay-${side}`}
          className={cn("fixed inset-0 z-[200] flex", className)}
          role="dialog"
          aria-modal="true"
          aria-label={label}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={fadeTween}
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default bg-black/75"
            aria-label="Close menu"
            onClick={onClose}
          />
          <motion.div
            ref={panelRef}
            id={panelId}
            tabIndex={trapFocus ? -1 : undefined}
            className={cn(
              "relative flex h-full flex-col outline-none",
              side === "left" ? "mr-auto border-r" : "ml-auto border-l",
              panelClassName
            )}
            initial={reduce ? false : { x: from }}
            animate={{ x: 0 }}
            exit={{ x: from }}
            transition={panelTween}
          >
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  )
}
