import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  findCatalogNeighbors,
  findGuideNeighbors,
  findMoreNeighbors,
} from "@/lib/navigation"

/** Chapter prev/next — Zed nav-chapters energy. */
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

  return (
    <nav
      aria-label={
        kind === "guides"
          ? "Adjacent guides"
          : kind === "more"
            ? "Adjacent pages"
            : "Adjacent components"
      }
      className="docs-book-pager"
    >
      {prev ? (
        <Link
          href={prev.href}
          className="group flex min-w-0 items-center gap-2 text-left"
        >
          <ChevronLeft
            className="size-4 shrink-0 text-muted-foreground group-hover:text-foreground"
            aria-hidden
          />
          <span className="min-w-0">
            <span className="block font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
              Previous
            </span>
            <span className="mt-0.5 block truncate text-[14px] text-foreground">
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
          className="group flex min-w-0 items-center justify-end gap-2 text-right sm:col-start-2"
        >
          <span className="min-w-0">
            <span className="block font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
              Next
            </span>
            <span className="mt-0.5 block truncate text-[14px] text-foreground">
              {next.title}
            </span>
          </span>
          <ChevronRight
            className="size-4 shrink-0 text-muted-foreground group-hover:text-foreground"
            aria-hidden
          />
        </Link>
      ) : null}
    </nav>
  )
}
