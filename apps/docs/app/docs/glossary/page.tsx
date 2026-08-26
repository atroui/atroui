import type { Metadata } from "next"
import Link from "next/link"
import { DocsPageHeader } from "@/components/docs-page-header"
import { docsPageMetadata } from "@/lib/docs-metadata"
import { pseoGlossary } from "@/lib/pseo"

export const metadata: Metadata = docsPageMetadata({
  title: "AtroUI glossary",
  description:
    "Host API, BYOK, and shadcn registry — the terms that make AtroUI different from a primitives kit.",
  path: "/docs/glossary",
})

export default function GlossaryIndexPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-10">
      <DocsPageHeader
        eyebrow="Definitions"
        title="Glossary"
        description={
          <>
            Short, citeable answers for search and AI overviews. Not a dump of
            every CSS token.
          </>
        }
      />
      <ul className="divide-y divide-border-subtle overflow-hidden rounded-lg border border-border-subtle">
        {pseoGlossary.map((term) => (
          <li key={term.slug}>
            <Link
              href={`/docs/glossary/${term.slug}`}
              className="block px-4 py-4 transition-colors hover:bg-muted/60"
            >
              <span className="block text-[15px] font-medium tracking-tight text-foreground">
                {term.title}
              </span>
              <span className="ds-meta mt-1 block">{term.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  )
}
