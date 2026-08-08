"use client"

/**
 * Shared overlay shell — Family fluidity.
 * Backdrop fades; panel slides. Parent does not opacity-fade (that glitches the slide).
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
  className?: string
  trapFocus?: boolean
}) {
  const [mounted, setMounted] = React.useState(false)
  const panelRef = React.useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const from = side === "left" ? "-100%" : "100%"
  const onCloseRef = React.useRef(onClose)
  onCloseRef.current = onClose

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCloseRef.current()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  useBodyScrollLock(open)
  useFocusTrap(trapFocus && open, panelRef)

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          key={`overlay-${side}`}
          className={cn(
            "fixed inset-0 z-[200] flex overflow-hidden",
            className
          )}
          role="dialog"
          aria-modal="true"
          aria-label={label}
          initial="closed"
          animate="open"
          exit="closed"
          variants={{
            open: {
              transition: { when: "beforeChildren" },
            },
            closed: {
              transition: { when: "afterChildren" },
            },
          }}
        >
          <motion.button
            type="button"
            className="absolute inset-0 cursor-default bg-black/75"
            aria-label="Close menu"
            variants={{
              closed: { opacity: 0 },
              open: { opacity: 1 },
            }}
            transition={reduce ? { duration: 0 } : fadeTween}
            onClick={() => onCloseRef.current()}
          />
          <motion.div
            ref={panelRef}
            id={panelId}
            tabIndex={trapFocus ? -1 : undefined}
            className={cn(
              "relative z-[1] flex h-dvh max-h-dvh flex-col outline-none will-change-transform",
              side === "left" ? "mr-auto border-r" : "ml-auto border-l",
              panelClassName
            )}
            variants={{
              closed: { x: from },
              open: { x: 0 },
            }}
            transition={reduce ? { duration: 0 } : panelTween}
          >
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  )
}
