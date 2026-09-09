import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  findCatalogNeighbors,
  findGuideNeighbors,
  findMoreNeighbors,
} from "@/lib/navigation"
import { pseoCollections, pseoGlossary } from "@/lib/pseo"

type PagerKind = "catalog" | "guides" | "more" | "glossary" | "collections"

function neighborsFor(href: string, kind: PagerKind) {
  if (kind === "guides") return findGuideNeighbors(href)
  if (kind === "more") return findMoreNeighbors(href)
  if (kind === "catalog") return findCatalogNeighbors(href)

  const items =
    kind === "glossary"
      ? [
          { title: "Glossary", href: "/docs/glossary" },
          ...pseoGlossary.map((t) => ({
            title: t.title,
            href: `/docs/glossary/${t.slug}`,
          })),
        ]
      : [
          { title: "Collections", href: "/docs/collections" },
          ...pseoCollections.map((c) => ({
            title: c.title,
            href: `/docs/collections/${c.slug}`,
          })),
        ]

  const index = items.findIndex((item) => item.href === href)
  if (index < 0) return { prev: undefined, next: undefined }
  return {
    prev: index > 0 ? items[index - 1] : undefined,
    next: index < items.length - 1 ? items[index + 1] : undefined,
  }
}

/** Chapter prev/next — Zed nav-chapters energy. */
export function DocsPager({
  href,
  kind = "catalog",
}: {
  href: string
  kind?: PagerKind
}) {
  const { prev, next } = neighborsFor(href, kind)
  if (!prev && !next) return null

  const label =
    kind === "guides"
      ? "Adjacent guides"
      : kind === "more"
        ? "Adjacent pages"
        : kind === "glossary"
          ? "Adjacent glossary pages"
          : kind === "collections"
            ? "Adjacent collections"
            : "Adjacent components"

  return (
    <nav aria-label={label} className="docs-book-pager">
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
