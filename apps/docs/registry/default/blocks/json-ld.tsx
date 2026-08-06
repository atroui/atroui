import { getBrand } from "@/lib/brand"
import { getSiteDomain } from "@/lib/seo"
import { getSiteUrl } from "@/lib/site-url"

type OrgJsonLdProps = {
  name?: string
}

export function SiteGraphJsonLd({ name }: OrgJsonLdProps = {}) {
  const brand = getBrand()
  const orgName = name ?? brand.name
  const siteUrl = getSiteUrl()
  const domain = getSiteDomain()
  const orgId = `${siteUrl}#organization`
  const webId = `${siteUrl}#website`

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: orgName,
        alternateName: [domain],
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/favicon-192.png`,
          width: 192,
          height: 192,
        },
        description: brand.tagline,
      },
      {
        "@type": "WebSite",
        "@id": webId,
        name: orgName,
        alternateName: [domain],
        url: siteUrl,
        inLanguage: "en-US",
        publisher: { "@id": orgId },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function ArticleJsonLd({
  title,
  description,
  slug,
  date,
  dateModified,
  author,
  image,
  basePath = "/blog",
}: {
  title: string
  description: string
  slug: string
  date: string
  dateModified?: string
  author?: string
  image?: string
  basePath?: string
}) {
  const siteUrl = getSiteUrl()
  const brandName = getBrand().name
  const authorName = author ?? brandName
  const segment = basePath.startsWith("/") ? basePath : `/${basePath}`
  const pageUrl = `${siteUrl}${segment}/${slug}`
  const imageUrl = image?.startsWith("http")
    ? image
    : image
      ? `${siteUrl}${image.startsWith("/") ? image : `/${image}`}`
      : `${siteUrl}${segment}/${slug}/opengraph-image`

  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: date,
    dateModified: dateModified ?? date,
    image: imageUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    author: {
      "@type": "Organization",
      name: authorName,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: brandName,
      logo: { "@type": "ImageObject", url: `${siteUrl}/icon` },
    },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: Array<{ name: string; href: string }>
}) {
  const siteUrl = getSiteUrl()
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.href.startsWith("http")
        ? item.href
        : `${siteUrl}${item.href.startsWith("/") ? item.href : `/${item.href}`}`,
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function FaqJsonLd({
  items,
  pagePath = "/",
}: {
  items: Array<{ question: string; answer: string } | { q: string; a: string }>
  pagePath?: string
}) {
  const siteUrl = getSiteUrl()
  const pageUrl = `${siteUrl}${pagePath.startsWith("/") ? pagePath : `/${pagePath}`}`
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntityOfPage: pageUrl,
    mainEntity: items.map((item) => {
      const question = "question" in item ? item.question : item.q
      const answer = "answer" in item ? item.answer : item.a
      return {
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      }
    }),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
