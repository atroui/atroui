import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  findCatalogNeighbors,
  findGuideNeighbors,
  findMoreNeighbors,
} from "@/lib/navigation"

/**
 * Quiet hairline prev/next — catalog, Getting Started, or More (docs-only).
 */
export function DocsPager({
  href,
  kind = "catalog",
}: {
  href: string
  kind?: "catalog" | "guides" | "more"
}) {
  const { prev, next } =
    kind === "guides"
      ? findGuideNeighbors(href)
      : kind === "more"
        ? findMoreNeighbors(href)
        : findCatalogNeighbors(href)
  if (!prev && !next) return null

  const aria =
    kind === "guides"
      ? "Adjacent guides"
      : kind === "more"
        ? "Adjacent pages"
        : "Adjacent components"

  return (
    <nav
      aria-label={aria}
      className="mt-12 grid gap-6 border-t border-border-subtle pt-8 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          href={prev.href}
          className="group flex min-w-0 items-center gap-2 text-left transition-colors"
        >
          <ChevronLeft
            className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
            aria-hidden
          />
          <span className="min-w-0">
            <span className="ds-meta block">Previous</span>
            <span className="mt-0.5 block truncate text-[15px] font-medium tracking-[-0.01em] text-foreground">
              {prev.title}
            </span>
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block" aria-hidden />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group flex min-w-0 items-center justify-end gap-2 text-right transition-colors sm:col-start-2"
        >
          <span className="min-w-0">
            <span className="ds-meta block">Next</span>
            <span className="mt-0.5 block truncate text-[15px] font-medium tracking-[-0.01em] text-foreground">
              {next.title}
            </span>
          </span>
          <ChevronRight
            className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
            aria-hidden
          />
        </Link>
      ) : null}
    </nav>
  )
}
