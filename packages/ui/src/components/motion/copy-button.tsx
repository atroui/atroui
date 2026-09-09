"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import type { VariantProps } from "class-variance-authority"

import { layoutTween } from "../../lib/motion"
import { cn } from "../../lib/utils"
import { Button, buttonVariants } from "../ui/button"
import { TextMorph } from "./text-morph"

type ButtonProps = React.ComponentProps<typeof Button> &
  VariantProps<typeof buttonVariants>

export type CopyButtonProps = Omit<ButtonProps, "children" | "onClick"> & {
  /** Clipboard payload. */
  value: string
  idleLabel?: string
  copiedLabel?: string
  idleIcon?: React.ReactNode
  copiedIcon?: React.ReactNode
  /** Hide labels (icon-only). Inferred when `size` is an icon size. */
  iconOnly?: boolean
  /** Reset to idle after this many ms. Default 2000. */
  timeout?: number
  onCopied?: (value: string) => void
  onCopyError?: (error: unknown) => void
}

function isIconSize(size: ButtonProps["size"]) {
  return typeof size === "string" && size.startsWith("icon")
}

/**
 * Copy → check Button recipe (rare-path careful delight).
 * Motion.dev-style icon swap + TextMorph label, AtroUI-eased (layoutTween, no blur).
 * Opt-in — not default on every Button.
 */
export function CopyButton({
  value,
  idleLabel = "Copy",
  copiedLabel = "Copied",
  idleIcon,
  copiedIcon,
  iconOnly: iconOnlyProp,
  timeout = 2000,
  onCopied,
  onCopyError,
  className,
  variant = "outline",
  size = "sm",
  disabled,
  "aria-label": ariaLabel,
  ...props
}: CopyButtonProps) {
  const reduce = useReducedMotion()
  const [copied, setCopied] = React.useState(false)
  const resetTimer = React.useRef<number | null>(null)
  const morphId = React.useId()

  const iconOnly = iconOnlyProp ?? isIconSize(size)
  const idle = idleIcon ?? <Copy aria-hidden />
  const done = copiedIcon ?? <Check className="text-brand" aria-hidden />
  const statusLabel = copied ? copiedLabel : idleLabel

  React.useEffect(
    () => () => {
      if (resetTimer.current !== null) window.clearTimeout(resetTimer.current)
    },
    [],
  )

  async function copy() {
    if (copied) return
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      onCopied?.(value)
      if (resetTimer.current !== null) window.clearTimeout(resetTimer.current)
      resetTimer.current = window.setTimeout(() => setCopied(false), timeout)
    } catch (error) {
      onCopyError?.(error)
    }
  }

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      disabled={disabled}
      aria-label={ariaLabel ?? statusLabel}
      data-copied={copied ? "" : undefined}
      className={cn(copied && "border-brand/40", className)}
      {...props}
      onClick={copy}
    >
      <span className="relative inline-flex size-[1em] shrink-0 items-center justify-center">
        {reduce ? (
          <span className="inline-flex">{copied ? done : idle}</span>
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={copied ? "copied" : "idle"}
              className="inline-flex"
              initial={{ opacity: 0, scale: 0.65, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.65, y: -4 }}
              transition={layoutTween}
            >
              {copied ? done : idle}
            </motion.span>
          </AnimatePresence>
        )}
      </span>
      {iconOnly ? null : (
        <TextMorph morphId={morphId} className="font-medium">
          {statusLabel}
        </TextMorph>
      )}
      <span className="sr-only" aria-live="polite">
        {copied ? copiedLabel : ""}
      </span>
    </Button>
  )
}
