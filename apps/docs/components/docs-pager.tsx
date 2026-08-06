import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { findCatalogNeighbors } from "@/lib/navigation"

export function DocsPager({ href }: { href: string }) {
  const { prev, next } = findCatalogNeighbors(href)
  if (!prev && !next) return null

  return (
    <nav
      aria-label="Adjacent components"
      className="grid gap-3 border-t border-border-subtle pt-8 sm:grid-cols-2 sm:gap-4"
    >
      {prev ? (
        <Link
          href={prev.href}
          className="group flex min-h-16 items-center gap-3 rounded-2xl border border-border-subtle bg-white/[0.02] px-4 py-3 transition-colors hover:border-brand/35 hover:bg-white/[0.05]"
        >
          <ChevronLeft
            className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-brand"
            aria-hidden
          />
          <span className="min-w-0 text-left">
            <span className="block text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
              Previous
            </span>
            <span className="mt-0.5 block truncate text-[14px] font-medium text-foreground transition-colors group-hover:text-brand">
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
          className="group flex min-h-16 items-center justify-end gap-3 rounded-2xl border border-border-subtle bg-white/[0.02] px-4 py-3 transition-colors hover:border-brand/35 hover:bg-white/[0.05]"
        >
          <span className="min-w-0 text-right">
            <span className="block text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
              Next
            </span>
            <span className="mt-0.5 block truncate text-[14px] font-medium text-foreground transition-colors group-hover:text-brand">
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
