import * as React from "react"

import { getBrand } from "@/lib/brand"
import { cn } from "@/lib/utils"

/** Interrupted-A mark. Edit the SVG paths to change the logo. */
export function LogoMark({
  className,
  title,
}: {
  className?: string
  title?: string
}) {
  const label = title ?? getBrand().name
  return (
    <svg
      viewBox="0 0 48 48"
      width="24"
      height="24"
      fill="none"
      role="img"
      aria-label={label}
      className={cn("text-foreground", className)}
    >
      <title>{label}</title>
      <path
        d="M14 36 L24 10 L34 36"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="17.5"
        y="24.3"
        width="13"
        height="3.6"
        rx="1.8"
        fill="var(--color-brand, #0b7bff)"
      />
    </svg>
  )
}

export function LogoWordmark({
  className,
  markClassName,
  name,
}: {
  className?: string
  markClassName?: string
  name?: string
}) {
  const label = name ?? getBrand().name
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark
        className={cn("h-7 w-7 shrink-0", markClassName)}
        title={label}
      />
      <span className="text-[19px] leading-none font-medium tracking-[-0.01em] text-foreground">
        {label}
      </span>
    </span>
  )
}
