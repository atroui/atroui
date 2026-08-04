import { TESTIMONIALS } from "../../content/testimonials";
import { SITE_BRAND } from "../../lib/seo";
import { getSiteUrl } from "../../lib/site-url";

type TestimonialSchemaProps = {
  /** Defaults to homepage org reviews */
  pageUrl?: string;
};

/**
 * Individual Review JSON-LD only — no AggregateRating.
 * Self-published star aggregates are a spam / manual-action risk when
 * they aren't from a third-party review platform Google trusts.
 */
export function TestimonialSchema({ pageUrl }: TestimonialSchemaProps = {}) {
  const siteUrl = getSiteUrl();
  const url = pageUrl ?? siteUrl;

  const data = {
    "@context": "https://schema.org",
    "@graph": TESTIMONIALS.map((t) => ({
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
        name: SITE_BRAND,
        url,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
