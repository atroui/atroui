"use client"

/**
 * Soft brand install chip — Family Values: see the tool → get the install line
 * in the same frame (gradual revelation, one primary copy action).
 */

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import posthog from "posthog-js"
import { easeOutExpo } from "@/lib/motion"
import { cn } from "@/lib/utils"

/** First copy of a session is the earned moment; later ones stay quiet. */
const EARNED_STORAGE_KEY = "atro-install-copied"

function claimFirstCopyOfSession() {
  try {
    if (sessionStorage.getItem(EARNED_STORAGE_KEY) === "1") return false
    sessionStorage.setItem(EARNED_STORAGE_KEY, "1")
    return true
  } catch {
    // Private mode / storage disabled — treat every copy as a repeat.
    return false
  }
}

export function InstallCommandChip({
  command,
  className,
}: {
  command: string
  className?: string
}) {
  const [copied, setCopied] = React.useState(false)
  const [pulse, setPulse] = React.useState(false)
  const reduce = useReducedMotion()
  const timers = React.useRef<number[]>([])

  React.useEffect(
    () => () => {
      for (const id of timers.current) window.clearTimeout(id)
    },
    [],
  )

  function later(fn: () => void, ms: number) {
    timers.current.push(window.setTimeout(fn, ms))
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(command)
      posthog.capture("documentation_code_copied", {
        language: "bash",
        embedded: true,
        kind: "install",
      })
      setCopied(true)
      later(() => setCopied(false), 1600)
      if (!reduce && claimFirstCopyOfSession()) {
        setPulse(true)
        later(() => setPulse(false), 200)
      }
    } catch {
      /* ignore */
    }
  }

  return (
    <div
      className={cn(
        "relative flex min-w-0 max-w-full items-center gap-1.5 rounded-lg border bg-white/[0.03] py-1 pr-1 pl-2.5 transition-colors duration-200 sm:gap-2 sm:pl-3",
        pulse
          ? "border-brand/60"
          : copied
            ? "border-brand/40"
            : "border-border-subtle",
        className,
      )}
    >
      {pulse ? (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-brand/45"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.2, times: [0, 0.4, 1], ease: easeOutExpo }}
        />
      ) : null}
      <span
        className="hidden shrink-0 font-mono text-[12px] font-medium text-brand sm:inline"
        aria-hidden
      >
        $
      </span>
      <code className="min-w-0 truncate font-mono text-[11px] text-foreground sm:text-[12px]">
        {command}
      </code>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy install command"}
        className="inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-brand transition-colors hover:bg-brand/15 hover:text-foreground"
      >
        {copied ? (
          <motion.span
            className="inline-flex"
            initial={reduce ? false : { scale: 0.65, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.14, ease: easeOutExpo }}
          >
            <Check className="size-3.5 text-brand" aria-hidden />
          </motion.span>
        ) : (
          <Copy className="size-3.5" aria-hidden />
        )}
      </button>
    </div>
  )
}
