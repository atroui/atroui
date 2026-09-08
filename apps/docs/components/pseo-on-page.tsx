import Link from "next/link"
import { BreadcrumbJsonLd, FaqJsonLd } from "atroui"
import { allNavItems, relatedNavItems } from "@/lib/navigation"
import {
  collectionsForPath,
  getPseoPage,
  type PseoFaq,
} from "@/lib/pseo"

function HowToInstallJsonLd({
  name,
  registryName,
  path,
}: {
  name: string
  registryName: string
  path: string
}) {
  const url = `https://www.atroui.com${path}`
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `Install ${name} with the shadcn CLI`,
    description: `Copy ${name} into a Next.js repo with the AtroUI registry.`,
    url,
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Init shadcn",
        text: "npx shadcn@latest init",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Add the item",
        text: `npx shadcn@latest add @atroui/${registryName}`,
      },
    ],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  )
}

function navTitle(href: string) {
  return allNavItems.find((item) => item.href === href)?.title ?? href
}

/**
 * Appendix under the real doc. Structured data stays whole; the visible layer
 * is a footnote — hairline rule, mono labels, FAQ behind one disclosure — so
 * the page reads finished after the API reference.
 */
export function PseoOnPage({
  path,
  title,
  registryName,
}: {
  path: string
  title: string
  registryName?: string
}) {
  const overlay = getPseoPage(path)
  const related = relatedNavItems(path, 4)
  const collections = collectionsForPath(path)
  const faqs: PseoFaq[] = overlay?.faqs ?? []

  const crumbs = [
    { name: "Docs", path: "/docs" },
    { name: "Components", path: "/docs/components" },
    { name: title, path },
  ]

  return (
    <section
      aria-label={`More about ${title}`}
      data-toc-skip
      className="pseo-appendix"
    >
      <BreadcrumbJsonLd items={crumbs} />
      {faqs.length > 0 ? (
        <FaqJsonLd items={faqs} pagePath={path} />
      ) : null}
      {registryName ? (
        <HowToInstallJsonLd
          name={title}
          registryName={registryName}
          path={path}
        />
      ) : null}

      {overlay ? (
        <div className="pseo-appendix-note">
          <h3 data-toc-boilerplate className="pseo-appendix-note-title">
            {overlay.job}
          </h3>
          <p className="pseo-appendix-note-body">{overlay.body}</p>
        </div>
      ) : null}

      {faqs.length > 0 ? (
        <details className="pseo-appendix-faq">
          <summary>
            FAQ
            <span className="pseo-appendix-faq-count">{faqs.length}</span>
            <span className="pseo-appendix-faq-chevron" aria-hidden />
          </summary>
          <dl className="pseo-appendix-faq-list">
            {faqs.map((faq) => (
              <div key={faq.q}>
                <dt>{faq.q}</dt>
                <dd>{faq.a}</dd>
              </div>
            ))}
          </dl>
        </details>
      ) : null}

      {collections.length > 0 ? (
        <p className="pseo-appendix-collections">
          Part of{" "}
          {collections.map((c, i) => (
            <span key={c.slug}>
              {i > 0 ? ", " : null}
              <Link
                href={`/docs/collections/${c.slug}`}
                className="bam-link"
              >
                {c.title}
              </Link>
            </span>
          ))}
          .
        </p>
      ) : null}

      {related.length > 0 ? (
        <nav aria-label="Related components" className="pseo-appendix-row">
          <span className="pseo-appendix-label">Related</span>
          <ul>
            {related.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="bam-link">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}

      <p className="sr-only">{navTitle(path)}</p>
    </section>
  )
}
