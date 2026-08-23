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
    <div className="space-y-8">
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
        <section className="space-y-3">
          <h2 className="ds-headline text-base text-foreground">
            {overlay.job}
          </h2>
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            {overlay.body}
          </p>
        </section>
      ) : null}

      {faqs.length > 0 ? (
        <section className="space-y-4">
          <h2 className="ds-headline text-base text-foreground">FAQ</h2>
          <dl className="space-y-4">
            {faqs.map((faq) => (
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

      {collections.length > 0 ? (
        <p className="text-[13px] text-muted-foreground">
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
        <nav aria-label="Related components" className="space-y-2">
          <h2 className="ds-headline text-base text-foreground">Related</h2>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[14px]">
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
    </div>
  )
}
