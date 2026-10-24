"use client"

import * as React from "react"
import { motion, useMotionValue, useReducedMotion, useTransform } from "motion/react"

import { cn } from "@/lib/utils"

function DockIcon({
  mouseX,
  children,
  className,
}: {
  mouseX: ReturnType<typeof useMotionValue<number>>
  children: React.ReactNode
  className?: string
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const distance = useTransform(mouseX, (x) => {
    const el = ref.current
    if (!el) return 150
    const rect = el.getBoundingClientRect()
    return x - (rect.left + rect.width / 2)
  })
  const size = useTransform(distance, [-120, 0, 120], [40, 64, 40])
  const reduce = useReducedMotion()

  if (reduce) {
    return (
      <div
        ref={ref}
        className={cn(
          "flex size-10 items-center justify-center rounded-[var(--atro-control-radius,var(--radius))] border border-border-subtle bg-card",
          "has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring",
          className
        )}
      >
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      className={cn(
        "flex items-center justify-center rounded-[var(--atro-control-radius,var(--radius))] border border-border-subtle bg-card transition-colors hover:border-[color-mix(in_oklch,var(--brand)_35%,var(--border-subtle))] has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ring",
        className
      )}
    >
      {children}
    </motion.div>
  )
}

export type DockItemProps = {
  children: React.ReactNode
  className?: string
  /** Accessible label for icon-only items. */
  label?: string
  /** Renders a link when set. */
  href?: string
  /** Renders a button when set (ignored when href is present). */
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
}

/**
 * Clickable dock item — link when `href` is set, button when `onClick`
 * is set, plain tile otherwise. Always pass `label` for icon-only items.
 */
export function DockItem({
  children,
  className,
  label,
  href,
  onClick,
}: DockItemProps) {
  const cls = cn(
    "flex size-full items-center justify-center rounded-[inherit] text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    className
  )
  if (href) {
    return (
      <a href={href} aria-label={label} className={cls}>
        {children}
      </a>
    )
  }
  if (onClick) {
    return (
      <button
        type="button"
        aria-label={label}
        onClick={onClick}
        className={cn(cls, "cursor-pointer")}
      >
        {children}
      </button>
    )
  }
  return (
    <span role="img" aria-label={label} className={cls}>
      {children}
    </span>
  )
}

export function Dock({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const mouseX = useMotionValue(Infinity)
  const reduce = useReducedMotion()

  return (
    <div
      data-slot="dock"
      className={cn(
        "inline-flex items-end gap-2 rounded-[var(--atro-panel-radius,var(--radius))] border border-border-subtle bg-card/80 px-3 pt-3 pb-2 backdrop-blur-md",
        className
      )}
      onPointerMove={(e) => {
        if (!reduce) mouseX.set(e.pageX)
      }}
      onPointerLeave={() => mouseX.set(Infinity)}
    >
      {React.Children.map(children, (child) => (
        <DockIcon mouseX={mouseX}>{child}</DockIcon>
      ))}
    </div>
  )
}
