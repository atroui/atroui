"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import type { VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import { Button, buttonVariants } from "../ui/button"
import { CopyStatusIcon } from "./copy-status-icon"
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

  React.useEffect(() => {
    setCopied(false)
    if (resetTimer.current !== null) {
      window.clearTimeout(resetTimer.current)
      resetTimer.current = null
    }
  }, [value])

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
      <CopyStatusIcon copied={copied} idle={idle} done={done} />
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
