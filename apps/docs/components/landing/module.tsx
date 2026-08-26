/**
 * Landing module shell — one chrome for every homepage band.
 * Family Values: soft-rect, quiet labels, shared padding. Content varies; chrome does not.
 */

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/** Shared horizontal rhythm for PresenceHero siblings. */
export const landingShellClass =
  "mx-auto w-full max-w-7xl px-4 py-12 sm:px-8 sm:py-16 md:px-12 lg:px-20 lg:py-20 xl:px-24"

export function LandingSection({
  children,
  className,
  labelledBy,
}: {
  children: ReactNode
  className?: string
  labelledBy?: string
}) {
  return (
    <section
      className={cn("border-t border-white/10", className)}
      aria-labelledby={labelledBy}
    >
      <div className={landingShellClass}>{children}</div>
    </section>
  )
}

export function LandingModuleHeader({
  stamp,
  title,
  titleId,
  lede,
  action,
}: {
  stamp: string
  title: ReactNode
  titleId?: string
  lede?: ReactNode
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-xl">
        <p className="font-mono text-[10px] tracking-[0.14em] text-white/40 uppercase">
          {stamp}
        </p>
        <h2
          id={titleId}
          className="ds-display mt-4 text-2xl leading-snug text-white sm:mt-5 sm:text-3xl md:text-4xl"
        >
          {title}
        </h2>
        {lede ? (
          <p className="ds-lede mt-3 max-w-md text-neutral-400 sm:mt-4">{lede}</p>
        ) : null}
      </div>
      {action ? (
        <div className="shrink-0 self-start sm:self-auto">{action}</div>
      ) : null}
    </div>
  )
}

/** Bordered panel — catalog stage, inside list, signup frame. */
export function LandingPanel({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]",
        className
      )}
    >
      {children}
    </div>
  )
}

export function LandingPanelToolbar({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-3 border-b border-white/10 px-3 py-2.5 sm:flex-row sm:items-center sm:gap-4 sm:px-4",
        className
      )}
    >
      {children}
    </div>
  )
}
