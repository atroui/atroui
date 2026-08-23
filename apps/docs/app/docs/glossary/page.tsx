import type { Metadata } from "next"
import Link from "next/link"
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
      <header>
        <p className="ms-stamp mb-3">Definitions</p>
        <h1 className="ds-display text-3xl text-foreground sm:text-4xl">
          Glossary
        </h1>
        <p className="ds-lede mt-3 max-w-2xl">
          Short, citeable answers for search and AI overviews. Not a dump of
          every CSS token.
        </p>
      </header>
      <ul className="md-glass divide-y divide-border-subtle">
        {pseoGlossary.map((term) => (
          <li key={term.slug}>
            <Link
              href={`/docs/glossary/${term.slug}`}
              className="block px-4 py-4 transition-colors hover:bg-white/5"
            >
              <span className="ds-sketch block text-lg text-foreground">
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
