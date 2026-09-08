import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * Shared floating chrome for SiteHeader + DocsHeader.
 * Soft-rect pill over the page — brand · nav/search · tools.
 */
export function SiteChrome({
  leading,
  children,
  center,
  trailing,
  className,
}: {
  leading?: ReactNode
  children?: ReactNode
  /** Center slot — docs search. Takes remaining width and centers the control. */
  center?: ReactNode
  trailing?: ReactNode
  className?: string
}) {
  return (
    <header
      className={cn("atro-site-chrome", center && "atro-site-chrome--docs", className)}
      style={{ viewTransitionName: "site-header" }}
    >
      <div className="atro-shell atro-site-chrome-inner">
        {leading ? (
          <div className="flex min-w-0 shrink-0 items-center gap-2">
            {leading}
          </div>
        ) : null}
        {children}
        {center ? (
          <div className="atro-site-chrome-center">{center}</div>
        ) : null}
        {trailing ? (
          <div
            className={cn(
              "flex min-w-0 shrink-0 items-center gap-1.5",
              !center && "ml-auto"
            )}
          >
            {trailing}
          </div>
        ) : null}
      </div>
    </header>
  )
}
