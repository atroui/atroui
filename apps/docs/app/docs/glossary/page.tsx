import type { Metadata } from "next"
import Link from "next/link"
import { DocsArticleHeader } from "@/components/docs/docs-article-header"
import { DocsPager } from "@/components/docs-pager"
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
    <article className="space-y-10">
      <DocsArticleHeader
        eyebrow="Definitions"
        title="Glossary"
        lede={
          <>
            Short, citeable answers for search and AI overviews. Not a dump of
            every CSS token.
          </>
        }
      />
      <ul className="divide-y divide-border-subtle border-y border-border-subtle">
        {pseoGlossary.map((term) => (
          <li key={term.slug}>
            <Link
              href={`/docs/glossary/${term.slug}`}
              className="block py-4 transition-colors hover:bg-muted/30"
            >
              <span className="ds-headline block text-lg text-foreground">
                {term.title}
              </span>
              <span className="ds-meta mt-1 block">{term.description}</span>
            </Link>
          </li>
        ))}
      </ul>
      <DocsPager href="/docs/glossary" kind="guides" />
    </article>
  )
}
