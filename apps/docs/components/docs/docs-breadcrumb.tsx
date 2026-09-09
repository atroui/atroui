"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { findNavContext } from "@/lib/navigation"

/** Docs breadcrumb: Docs / <Section> / <Page>. Derived from the nav config. */
export function DocsBreadcrumb() {
  const pathname = usePathname()
  if (!pathname || pathname === "/docs") {
    return (
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-1.5 font-mono text-[11px] tracking-wide text-muted-foreground">
          <li className="text-foreground/80">Docs</li>
        </ol>
      </nav>
    )
  }

  const ctx = findNavContext(pathname)
  const section = ctx?.section.title
  const title = ctx?.item.title

  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] tracking-wide text-muted-foreground">
        <li>
          <Link href="/docs" className="transition-colors hover:text-foreground">
            Docs
          </Link>
        </li>
        {section ? (
          <>
            <ChevronRight className="size-3 opacity-50" aria-hidden />
            <li>{section}</li>
          </>
        ) : null}
        {title ? (
          <>
            <ChevronRight className="size-3 opacity-50" aria-hidden />
            <li className="text-foreground/80">{title}</li>
          </>
        ) : null}
      </ol>
    </nav>
  )
}
