import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { BreadcrumbJsonLd, FaqJsonLd } from "atroui"
import { docsPageMetadata } from "@/lib/docs-metadata"
import { allNavItems } from "@/lib/navigation"
import { getPseoCollection, getPseoPage, pseoCollections } from "@/lib/pseo"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return pseoCollections.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const collection = getPseoCollection(slug)
  if (!collection) return {}
  return docsPageMetadata({
    title: collection.title,
    description: collection.description,
    path: `/docs/collections/${collection.slug}`,
  })
}

function labelFor(path: string) {
  return (
    getPseoPage(path)?.title ??
    allNavItems.find((item) => item.href === path)?.title ??
    path
  )
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params
  const collection = getPseoCollection(slug)
  if (!collection) notFound()

  const path = `/docs/collections/${collection.slug}`

  return (
    <article className="mx-auto max-w-3xl space-y-10">
      <BreadcrumbJsonLd
        items={[
          { name: "Docs", path: "/docs" },
          { name: "Collections", path: "/docs/collections" },
          { name: collection.title, path },
        ]}
      />
      <FaqJsonLd items={collection.faqs} pagePath={path} />

      <header>
        <p className="ms-stamp mb-3">Collection</p>
        <h1 className="ds-display text-3xl text-foreground sm:text-4xl">
          {collection.title}
        </h1>
        <p className="ds-lede mt-3 max-w-2xl">{collection.intro}</p>
      </header>

      <section className="space-y-3">
        <h2 className="ds-headline text-base text-foreground">
          Why this grouping
        </h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          {collection.why}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="ds-headline text-base text-foreground">Install these</h2>
        <ul className="md-glass divide-y divide-border-subtle">
          {collection.paths.map((href) => (
            <li key={href}>
              <Link
                href={href}
                className="block px-4 py-3.5 text-[15px] text-foreground transition-colors hover:bg-white/5"
              >
                {labelFor(href)}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {collection.faqs.length > 0 ? (
        <section className="space-y-4">
          <h2 className="ds-headline text-base text-foreground">FAQ</h2>
          <dl className="space-y-4">
            {collection.faqs.map((faq) => (
              <div key={faq.q}>
                <dt className="text-[14px] font-medium text-foreground">
                  {faq.q}
                </dt>
                <dd className="mt-1 text-[14px] leading-relaxed text-muted-foreground">
                  {faq.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      <p className="text-[13px] text-muted-foreground">
        More jobs:{" "}
        <Link href="/docs/collections" className="bam-link">
          all collections
        </Link>
        {" · "}
        <Link href="/docs/glossary" className="bam-link">
          glossary
        </Link>
      </p>
    </article>
  )
}
