import Link from "next/link"
import { findCatalogNeighbors } from "@/lib/navigation"

export function DocsPager({ href }: { href: string }) {
  const { prev, next } = findCatalogNeighbors(href)
  if (!prev && !next) return null

  return (
    <nav
      aria-label="Adjacent components"
      className="grid gap-3 border-t border-border-subtle pt-8 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          href={prev.href}
          className="group rounded-2xl border border-border-subtle bg-white/[0.02] px-4 py-3 transition-colors hover:bg-white/[0.05]"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
            Previous
          </p>
          <p className="mt-1 text-[14px] font-medium text-foreground group-hover:text-brand">
            {prev.title}
          </p>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group rounded-2xl border border-border-subtle bg-white/[0.02] px-4 py-3 text-right transition-colors hover:bg-white/[0.05] sm:justify-self-end sm:text-right"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
            Next
          </p>
          <p className="mt-1 text-[14px] font-medium text-foreground group-hover:text-brand">
            {next.title}
          </p>
        </Link>
      ) : null}
    </nav>
  )
}
