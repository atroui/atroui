import type { ReactNode } from "react"
import { DocsArticleHeader } from "@/components/docs/docs-article-header"
import { DocsHeader } from "@/components/docs/docs-header"
import { SiteFooter } from "@/components/site-footer"
import { cn } from "@/lib/utils"

/**
 * Tool room — same arrival as a docs page (quiet eyebrow, Outfit title + rule)
 * followed by the framed product stage. Used by /og and /planner.
 *
 * Wears the docs bar without the chapter nav so the room reads as one app; the
 * marketing megas would make the header and the article header look like two.
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
      <DocsHeader showChapterNav={false} />
      <main
        className={cn(
          "mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8",
          className
        )}
      >
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <DocsArticleHeader
            className="!mb-0 min-w-0 max-w-2xl flex-1"
            eyebrow={eyebrow}
            title={title}
            lede={lede}
          />
          {meta ? (
            <div className="flex min-w-0 flex-col gap-1.5 sm:items-end">
              {meta}
            </div>
          ) : null}
        </div>
        <div className="overflow-hidden rounded-[var(--atro-panel-radius)] border border-border-subtle">
          {children}
        </div>
        {exit}
      </main>
      <SiteFooter />
    </>
  )
}
