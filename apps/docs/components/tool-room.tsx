import type { ReactNode } from "react"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { cn } from "@/lib/utils"

/**
 * Tool room — Zed feature-page energy: short header + framed product stage.
 * Used by /og and /planner.
 */
export function ToolRoom({
  eyebrow = "Tool",
  title,
  lede,
  meta,
  children,
  exit,
  className,
}: {
  eyebrow?: string
  title: ReactNode
  lede: ReactNode
  meta?: ReactNode
  children: ReactNode
  exit?: ReactNode
  className?: string
}) {
  return (
    <>
      <SiteHeader />
      <main
        className={cn(
          "mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8",
          className
        )}
      >
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div className="max-w-2xl space-y-2">
            <p className="docs-book-eyebrow !mb-0">{eyebrow}</p>
            <h1 className="ds-headline text-2xl tracking-tight text-foreground sm:text-3xl">
              {title}
            </h1>
            <div className="text-[14px] leading-relaxed text-muted-foreground sm:text-[15px]">
              {lede}
            </div>
          </div>
          {meta ? (
            <div className="flex min-w-0 flex-col gap-1.5 sm:items-end">
              {meta}
            </div>
          ) : null}
        </header>
        <div className="overflow-hidden rounded-lg border border-border-subtle">
          {children}
        </div>
        {exit}
      </main>
      <SiteFooter />
    </>
  )
}
