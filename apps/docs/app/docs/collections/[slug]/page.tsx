import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { BreadcrumbJsonLd, FaqJsonLd } from "atroui"
import { DocsPageShell } from "@/components/docs-page-shell"
import {
  ProductPageHeader,
  ProductPanel,
  ProductPanelLink,
  docSectionHeading,
  productArticle,
} from "@/components/product-page"
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
    <DocsPageShell autoTocRootId="collection-doc">
      <article id="collection-doc" className={productArticle}>
        <BreadcrumbJsonLd
          items={[
            { name: "Docs", path: "/docs" },
            { name: "Collections", path: "/docs/collections" },
            { name: collection.title, path },
          ]}
        />
        <FaqJsonLd items={collection.faqs} pagePath={path} />

        <ProductPageHeader
          stamp="Collection"
          title={collection.title}
          lede={collection.intro}
        />

        <section className="space-y-3">
          <h2 id="why-this-grouping" className={docSectionHeading}>
            Why this grouping
          </h2>
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            {collection.why}
          </p>
        </section>

        <section className="space-y-3">
          <h2 id="install-these" className={docSectionHeading}>
            Install these
          </h2>
          <ProductPanel>
            {collection.paths.map((href) => (
              <ProductPanelLink
                key={href}
                href={href}
                title={labelFor(href)}
              />
            ))}
          </ProductPanel>
        </section>

        {collection.faqs.length > 0 ? (
          <section className="space-y-4">
            <h2 id="faq" className={docSectionHeading}>
              FAQ
            </h2>
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
    </DocsPageShell>
  )
}
