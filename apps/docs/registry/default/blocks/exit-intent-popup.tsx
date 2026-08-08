"use client"

import { X } from "lucide-react"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"

/**
 * Edit CONTENT to change exit-intent copy and storage keys.
 */
const CONTENT = {
  stamp: "Before you go",
  title: "Free 7-day MVP scoping",
  body: "Not sure what to build first? Book a no-pressure scoping call - we'll map scope, timeline, and budget in one session.",
  primaryLabel: "Start free scoping",
  primaryHref: "/scope",
  secondaryLabel: "Maybe later",
  storageKey: "atroui_exit_intent_v1",
  sessionKey: "atroui_exit_intent_session",
}

function shouldShowPopup(): boolean {
  if (typeof window === "undefined") return false
  if (localStorage.getItem(CONTENT.storageKey)) return false
  if (sessionStorage.getItem(CONTENT.sessionKey)) return false
  return true
}

function markShown() {
  sessionStorage.setItem(CONTENT.sessionKey, "1")
}

function markDismissed() {
  localStorage.setItem(CONTENT.storageKey, "dismissed")
  sessionStorage.setItem(CONTENT.sessionKey, "1")
}

export type ExitIntentPopupProps = {
  /** Docs / demos: open immediately and render inline. */
  preview?: boolean
}

export function ExitIntentPopup({ preview = false }: ExitIntentPopupProps) {
  const [open, setOpen] = useState(preview)
  const dialogRef = useRef<HTMLDivElement>(null)
  const triggered = useRef(false)

  const close = useCallback(() => {
    setOpen(false)
    if (!preview) markDismissed()
  }, [preview])

  useEffect(() => {
    if (preview) return
    if (!shouldShowPopup()) return

    const onMouseLeave = (e: MouseEvent) => {
      if (triggered.current) return
      if (e.clientY > 12) return
      if (!shouldShowPopup()) return
      triggered.current = true
      markShown()
      setOpen(true)
    }

    document.documentElement.addEventListener("mouseleave", onMouseLeave)
    return () =>
      document.documentElement.removeEventListener("mouseleave", onMouseLeave)
  }, [preview])

  useEffect(() => {
    if (!open || preview) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }

    document.addEventListener("keydown", onKeyDown)
    dialogRef.current?.focus()

    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )
    const first = focusable?.[0]
    const last = focusable?.[focusable.length - 1]

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !first || !last) return
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", trapFocus)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("keydown", trapFocus)
    }
  }, [open, close, preview])

  if (!open) return null

  return (
    <div
      className={
        preview
          ? "relative flex w-full items-center justify-center p-2"
          : "fixed inset-0 z-90 flex items-center justify-center p-4"
      }
      role="presentation"
    >
      {!preview ? (
        <button
          type="button"
          aria-label="Close dialog"
          className="absolute inset-0 bg-background/70 backdrop-blur-sm"
          onClick={close}
        />
      ) : (
        <div aria-hidden className="absolute inset-0 rounded-lg bg-muted/40" />
      )}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal={!preview}
        aria-labelledby="exit-intent-title"
        tabIndex={-1}
        className="relative z-10 w-full max-w-md border border-border-subtle bg-background p-6 shadow-[0_24px_64px_-28px_rgba(0,0,0,0.4)] sm:p-7"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Dismiss"
          className="absolute top-4 right-4 inline-flex size-9 items-center justify-center border border-border-subtle text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <X className="size-4" />
        </button>
        <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
          {CONTENT.stamp}
        </p>
        <h2
          id="exit-intent-title"
          className="mt-4 text-2xl font-medium text-foreground"
        >
          {CONTENT.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {CONTENT.body}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href={CONTENT.primaryHref}
            onClick={() => {
              if (preview) return
              localStorage.setItem(CONTENT.storageKey, "converted")
              sessionStorage.setItem(CONTENT.sessionKey, "1")
            }}
            className="inline-flex h-11 flex-1 items-center justify-center rounded-lg bg-foreground px-4 text-sm font-medium text-background"
          >
            {CONTENT.primaryLabel}
          </Link>
          <button
            type="button"
            onClick={close}
            className="inline-flex h-11 flex-1 items-center justify-center rounded-lg border border-border-subtle px-4 text-sm font-medium"
          >
            {CONTENT.secondaryLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
