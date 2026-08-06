import { getBrand } from "@/lib/brand"
import { getSiteUrl } from "@/lib/site-url"

/** Edit CONTENT to set the reviews emitted as JSON-LD. */
const CONTENT = {
  reviews: [
    {
      name: "Alex R.",
      title: "Founder",
      company: "Dev tools startup",
      rating: 5,
      quote:
        "Shipped what would have taken two months in a week. Daily updates, no handoffs.",
    },
    {
      name: "Priya M.",
      title: "Head of Product",
      company: "Legal tech",
      rating: 5,
      quote:
        "The AI feature fits our workflow - not a chatbot bolted on the side.",
    },
  ],
}

type TestimonialSchemaProps = {
  pageUrl?: string
}

/**
 * Individual Review JSON-LD only - no AggregateRating.
 */
export function TestimonialSchema({ pageUrl }: TestimonialSchemaProps = {}) {
  const siteUrl = getSiteUrl()
  const url = pageUrl ?? siteUrl

  const data = {
    "@context": "https://schema.org",
    "@graph": CONTENT.reviews.map((t) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: t.name,
        jobTitle: t.title,
        worksFor: { "@type": "Organization", name: t.company },
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(t.rating),
        bestRating: "5",
        worstRating: "1",
      },
      reviewBody: t.quote,
      itemReviewed: {
        "@type": "ProfessionalService",
        name: getBrand().name,
        url,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
