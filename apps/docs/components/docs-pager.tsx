import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { findCatalogNeighbors } from "@/lib/navigation"

export function DocsPager({ href }: { href: string }) {
  const { prev, next } = findCatalogNeighbors(href)
  if (!prev && !next) return null

  return (
    <nav
      aria-label="Adjacent components"
      className="grid gap-3 border-t border-border-subtle pt-10 sm:grid-cols-2 sm:gap-4"
    >
      {prev ? (
        <Link
          href={prev.href}
          className="group flex min-h-14 items-center gap-3 rounded-lg border border-border-subtle bg-transparent px-4 py-3 transition-colors hover:border-border hover:bg-white/[0.03]"
        >
          <ChevronLeft
            className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
            aria-hidden
          />
          <span className="min-w-0 text-left">
            <span className="ds-meta block">Previous</span>
            <span className="mt-0.5 block truncate text-[15px] font-medium tracking-tight text-foreground">
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
          className="group flex min-h-14 items-center justify-end gap-3 rounded-lg border border-border-subtle bg-transparent px-4 py-3 transition-colors hover:border-border hover:bg-white/[0.03]"
        >
          <span className="min-w-0 text-right">
            <span className="ds-meta block">Next</span>
            <span className="mt-0.5 block truncate text-[15px] font-medium tracking-tight text-foreground">
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
