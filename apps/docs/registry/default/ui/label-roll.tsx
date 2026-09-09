"use client"

import { cn } from "@/lib/utils"

type LabelRollProps = {
  children: React.ReactNode
  className?: string
  /** Second line — defaults to the same children (hover roll). */
  secondary?: React.ReactNode
  /**
   * When true, the roll surface is focusable (standalone control).
   * Keep false when wrapping with `<a>` / `<button>` so you don't nest tab stops.
   */
  interactive?: boolean
}

/**
 * Clipped dual-copy roll on hover / focus — tiny frequent delight for links & secondary CTAs.
 * CSS transform (not Motion variants) so the frequent path stays snappy ≤100ms.
 * Reduced motion: static label.
 */
export function LabelRoll({
  children,
  secondary,
  className,
  interactive = false,
}: LabelRollProps) {
  const second = secondary ?? children

  return (
    <span
      className={cn(
        "group/roll relative inline-flex h-[1.15em] overflow-hidden align-bottom outline-none",
        className
      )}
      tabIndex={interactive ? 0 : undefined}
    >
      <span
        className={cn(
          "inline-flex flex-col will-change-transform",
          "transition-transform duration-100 ease-[cubic-bezier(0.16,1,0.3,1)]",
          "motion-reduce:transition-none",
          "group-hover/roll:-translate-y-1/2",
          interactive && "group-focus-within/roll:-translate-y-1/2"
        )}
      >
        <span className="inline-block leading-[1.15]">{children}</span>
        <span className="inline-block leading-[1.15]" aria-hidden>
          {second}
        </span>
      </span>
    </span>
  )
}
