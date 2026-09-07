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
 * `product` (default): quiet eyebrow + Outfit headline — Zed discipline.
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
        "flex flex-col gap-4",
        action && "sm:flex-row sm:items-end sm:justify-between",
        centered && "mx-auto max-w-2xl text-center",
        !centered && "max-w-2xl",
        className
      )}
    >
      <div className={cn(centered && "mx-auto")}>
        {showStamp ? (
          <p className={cn("ms-stamp", centered && "mx-auto w-fit")}>{stamp}</p>
        ) : null}
        {showEyebrow ? (
          <p className={cn("ds-eyebrow", centered && "mx-auto w-fit")}>{eyebrow}</p>
        ) : null}
        <h2
          className={cn(
            "ds-headline text-foreground",
            showStamp || showEyebrow ? "mt-5" : "mt-0",
            centered
              ? "text-3xl sm:text-4xl md:text-[2.75rem]"
              : "text-3xl sm:text-4xl md:text-[2.75rem]"
          )}
        >
          {title}
        </h2>
        {lede ? (
          <p className={cn("ds-lede mt-4", centered ? "mx-auto max-w-xl" : "max-w-xl")}>
            {lede}
          </p>
        ) : null}
      </div>
      {action ? (
        <div className={cn("shrink-0", centered ? "mx-auto" : "self-start sm:self-auto")}>
          {action}
        </div>
      ) : null}
    </div>
  )
}
