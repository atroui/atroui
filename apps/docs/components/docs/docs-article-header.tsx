import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * Shared arrival header — docs, essays, and tool rooms all land the same way:
 * large Outfit H1 + light rule + lede. No marketing stamp.
 * Optional eyebrow for section path only.
 */
export function DocsArticleHeader({
  title,
  lede,
  className,
  eyebrow,
}: {
  title: ReactNode
  lede?: ReactNode
  className?: string
  /** Quiet path label above the title (e.g. Primitives) — not a badge. */
  eyebrow?: ReactNode
}) {
  return (
    <header className={cn("docs-book-header", className)}>
      {eyebrow ? <p className="docs-book-eyebrow">{eyebrow}</p> : null}
      <h1 className="docs-book-title">{title}</h1>
      {lede ? <div className="docs-book-lede">{lede}</div> : null}
    </header>
  )
}
