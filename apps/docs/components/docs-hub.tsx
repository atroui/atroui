import Link from "next/link"
import { DocsCollectionsIndexView } from "@/components/docs-collections-index"
import { DocsCollectionPageView } from "@/components/docs-collection-page"
import { DocsComponentsIndexView } from "@/components/docs-components-index"
import { DocsGlossaryIndexView } from "@/components/docs-glossary-index"
import { DocsGlossaryTermView } from "@/components/docs-glossary-term"
import { DocsChangelogView } from "@/components/docs-changelog-view"
import { DocsRegistryPageView } from "@/components/docs-registry-page"

export function DocsComponentsIndex() {
  return <DocsComponentsIndexView />
}

export function DocsCollectionsIndex() {
  return <DocsCollectionsIndexView />
}

export function DocsCollectionPage({ slug }: { slug: string }) {
  return <DocsCollectionPageView slug={slug} />
}

export function DocsGlossaryIndex() {
  return <DocsGlossaryIndexView />
}

export function DocsGlossaryTerm({ slug }: { slug: string }) {
  return <DocsGlossaryTermView slug={slug} />
}

export function DocsChangelog() {
  return <DocsChangelogView />
}

export function DocsRegistryPage({
  registry,
  href,
  usage,
}: {
  registry: string
  href: string
  usage?: string
}) {
  return (
    <DocsRegistryPageView registry={registry} href={href} usage={usage} />
  )
}

export function DocsFooterLinks({
  links,
}: {
  links: { href: string; label: string; variant?: "primary" | "ghost" }[]
}) {
  return (
    <div className="flex flex-wrap gap-3 border-t border-border-subtle pt-6">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={link.variant === "primary" ? "ms-cta" : "ms-cta-ghost"}
        >
          {link.label}
        </Link>
      ))}
    </div>
  )
}
