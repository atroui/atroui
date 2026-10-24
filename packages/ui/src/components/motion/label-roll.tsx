"use client"

import { cn } from "../../lib/utils"

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
  /**
   * Stagger between letters (ms). Only applies when both labels are strings.
   * Default 18 — readable cascade without feeling sluggish.
   */
  staggerMs?: number
  /**
   * Roll duration (ms). Default 320 — easeOutExpo settle, not a snap.
   */
  durationMs?: number
}

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)" // easeOutExpo

function toChars(value: string) {
  return Array.from(value)
}

/**
 * Full literals so Tailwind JIT can see every variant.
 * Triggers: own `group/roll`, parent `group` (hover + focus), focus-within when interactive.
 */
const delayActive =
  "group-hover:[transition-delay:calc(var(--i)*var(--stagger))] group-focus:[transition-delay:calc(var(--i)*var(--stagger))] group-hover/roll:[transition-delay:calc(var(--i)*var(--stagger))] group-focus-within/roll:[transition-delay:calc(var(--i)*var(--stagger))]"

const primaryExit =
  "group-hover:-translate-y-full group-hover:opacity-0 group-focus:-translate-y-full group-focus:opacity-0 group-hover/roll:-translate-y-full group-hover/roll:opacity-0 group-focus-within/roll:-translate-y-full group-focus-within/roll:opacity-0"

const secondaryEnter =
  "group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100 group-hover/roll:translate-y-0 group-hover/roll:opacity-100 group-focus-within/roll:translate-y-0 group-focus-within/roll:opacity-100"

/**
 * Letter columns: primary exits up, secondary enters from below.
 * Unequal lengths share one width via an invisible sizer.
 * Hover delay staggers in; leave resets delay → chars settle together.
 */
function LabelRollChars({
  primary,
  secondary,
  className,
  interactive,
  staggerMs,
  durationMs,
}: {
  primary: string
  secondary: string
  className?: string
  interactive: boolean
  staggerMs: number
  durationMs: number
}) {
  const primaryChars = toChars(primary)
  const secondaryChars = toChars(secondary)
  const sizer = primary.length >= secondary.length ? primary : secondary

  const glyph = cn(
    "block leading-[1.15] will-change-transform",
    "transition-[transform,opacity] ease-[var(--ease)] [transition-duration:var(--dur)] [transition-delay:0ms]",
    "motion-reduce:transition-none",
    delayActive
  )

  return (
    <span
      className={cn(
        "group/roll relative inline-grid align-bottom outline-none",
        className
      )}
      tabIndex={interactive ? 0 : undefined}
      aria-label={primary}
      style={
        {
          "--stagger": `${staggerMs}ms`,
          "--dur": `${durationMs}ms`,
          "--ease": EASE,
        } as React.CSSProperties
      }
    >
      <span
        className="invisible col-start-1 row-start-1 whitespace-pre leading-[1.15]"
        aria-hidden
      >
        {sizer}
      </span>

      <span
        className="col-start-1 row-start-1 inline-flex h-[1.15em] overflow-hidden whitespace-pre motion-reduce:relative"
        aria-hidden
      >
        {primaryChars.map((char, i) => (
          <span key={`a-${i}`} className="inline-block overflow-hidden">
            <span
              className={cn(
                glyph,
                "translate-y-0 opacity-100 motion-reduce:!translate-y-0 motion-reduce:!opacity-100",
                primaryExit
              )}
              style={{ "--i": i } as React.CSSProperties}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          </span>
        ))}
      </span>

      <span
        className="col-start-1 row-start-1 inline-flex h-[1.15em] overflow-hidden whitespace-pre motion-reduce:hidden"
        aria-hidden
      >
        {secondaryChars.map((char, i) => (
          <span key={`b-${i}`} className="inline-block overflow-hidden">
            <span
              className={cn(glyph, "translate-y-full opacity-0", secondaryEnter)}
              style={{ "--i": i } as React.CSSProperties}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          </span>
        ))}
      </span>
    </span>
  )
}

/**
 * Fallback when labels aren't plain strings — one clipped stack, same easing.
 */
function LabelRollBlock({
  children,
  secondary,
  className,
  interactive,
  durationMs,
}: {
  children: React.ReactNode
  secondary: React.ReactNode
  className?: string
  interactive: boolean
  durationMs: number
}) {
  return (
    <span
      className={cn(
        "group/roll relative inline-flex h-[1.15em] overflow-hidden align-bottom outline-none",
        className
      )}
      tabIndex={interactive ? 0 : undefined}
      style={
        {
          "--dur": `${durationMs}ms`,
          "--ease": EASE,
        } as React.CSSProperties
      }
    >
      <span
        className={cn(
          "inline-flex flex-col will-change-transform",
          "transition-transform ease-[var(--ease)] [transition-duration:var(--dur)]",
          "motion-reduce:transition-none",
          "group-hover:-translate-y-1/2 group-focus:-translate-y-1/2 group-hover/roll:-translate-y-1/2 group-focus-within/roll:-translate-y-1/2"
        )}
      >
        <span className="inline-block leading-[1.15]">{children}</span>
        <span className="inline-block leading-[1.15]" aria-hidden>
          {secondary}
        </span>
      </span>
    </span>
  )
}

/**
 * Clipped label swap on hover / focus — frequent-path delight.
 * Strings → letter-staggered dual layer (primary out, secondary in).
 * Other nodes → whole-line roll. CSS only; reduced motion stays static.
 */
export function LabelRoll({
  children,
  secondary,
  className,
  interactive = false,
  staggerMs = 18,
  durationMs = 320,
}: LabelRollProps) {
  const second = secondary ?? children

  if (typeof children === "string" && typeof second === "string") {
    return (
      <LabelRollChars
        primary={children}
        secondary={second}
        className={className}
        interactive={interactive}
        staggerMs={staggerMs}
        durationMs={durationMs}
      />
    )
  }

  return (
    <LabelRollBlock
      className={className}
      interactive={interactive}
      durationMs={durationMs}
      secondary={second}
    >
      {children}
    </LabelRollBlock>
  )
}
