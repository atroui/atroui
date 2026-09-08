import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type LandingSectionHeaderProps = {
  /** Brand sketch stamp — use sparingly on marketing sections. */
  stamp?: string
  /** Product eyebrow — mono uppercase, Zed-style section label. */
  eyebrow?: string
  title: ReactNode
  lede?: string
  variant?: "brand" | "product"
  align?: "left" | "center"
  action?: ReactNode
  className?: string
}

/**
 * Shared section header for the marketing surface.
 * `product` (default): quiet eyebrow + Merriweather headline — Zed discipline.
 * `brand`: sketch stamp for moments that earn the voice.
 */
export function LandingSectionHeader({
  stamp,
  eyebrow,
  title,
  lede,
  variant = "product",
  align = "left",
  action,
  className,
}: LandingSectionHeaderProps) {
  const centered = align === "center"
  const showStamp = variant === "brand" && stamp
  const showEyebrow = variant === "product" && eyebrow

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        action && !centered && "w-full sm:flex-row sm:items-start sm:justify-between",
        action && centered && "sm:flex-row sm:items-end sm:justify-between",
        centered && "mx-auto max-w-2xl text-center",
        !centered && !action && "max-w-2xl",
        className
      )}
    >
      <div className={cn(centered && "mx-auto", !centered && "max-w-2xl")}>
        {showStamp ? (
          <p className={cn("ms-stamp", centered && "mx-auto w-fit")}>{stamp}</p>
        ) : null}
        {showEyebrow ? (
          <p className={cn("ds-eyebrow", centered && "mx-auto w-fit")}>{eyebrow}</p>
        ) : null}
        <h2
          className={cn(
            "atro-section-title",
            showStamp || showEyebrow ? "mt-3" : "mt-0"
          )}
        >
          {title}
        </h2>
        {lede ? (
          <p
            className={cn(
              "ds-lede mt-2 !text-[0.9375rem] leading-relaxed",
              centered ? "mx-auto max-w-xl" : "max-w-xl"
            )}
          >
            {lede}
          </p>
        ) : null}
      </div>
      {action ? (
        <div
          className={cn(
            "shrink-0",
            centered ? "mx-auto" : "self-start sm:self-auto"
          )}
        >
          {action}
        </div>
      ) : null}
    </div>
  )
}
