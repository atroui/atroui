import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { findDocsNeighbors } from "@/lib/navigation"

export function DocsPager({ href }: { href: string }) {
  const { prev, next } = findDocsNeighbors(href)
  if (!prev && !next) return null

  return (
    <nav
      aria-label="Adjacent docs"
      className="grid gap-3 border-t border-border-subtle pt-8 sm:grid-cols-2 sm:gap-4"
    >
      {prev ? (
        <Link
          href={prev.href}
          className="group flex min-h-16 items-center gap-3 rounded-xl border border-border-subtle bg-white/2 px-4 py-3 transition-colors hover:border-brand/35 hover:bg-white/5"
        >
          <ChevronLeft
            className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-brand"
            aria-hidden
          />
          <span className="min-w-0 text-left">
            <span className="ds-meta block">Previous</span>
            <span className="mt-0.5 block truncate font-medium text-foreground transition-colors group-hover:text-brand">
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
          className="group flex min-h-16 items-center justify-end gap-3 rounded-xl border border-border-subtle bg-white/2 px-4 py-3 transition-colors hover:border-brand/35 hover:bg-white/5"
        >
          <span className="min-w-0 text-right">
            <span className="ds-meta block">Next</span>
            <span className="mt-0.5 block truncate font-medium text-foreground transition-colors group-hover:text-brand">
              {next.title}
            </span>
          </span>
          <ChevronRight
            className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-brand"
            aria-hidden
          />
        </Link>
      ) : null}
    </nav>
  )
}
