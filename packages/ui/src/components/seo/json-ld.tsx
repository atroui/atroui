import type { FaqItem } from "../../content/faq";
import { SITE_DOMAIN } from "../../lib/seo";
import { getSiteUrl } from "../../lib/site-url";

type OrgJsonLdProps = {
  /** Optional override */
  name?: string;
};

/**
 * Combined Organization + WebSite graph. Prefer this on the homepage so
 * Google gets a single linked entity graph (brand + domain disambiguation).
 */
export function SiteGraphJsonLd({ name = "Makershot" }: OrgJsonLdProps = {}) {
  const siteUrl = getSiteUrl();
  const orgId = `${siteUrl}#organization`;
  const webId = `${siteUrl}#website`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name,
        alternateName: [SITE_DOMAIN, "Makershot.tech"],
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/icon`,
        },
        sameAs: [
          "https://www.iamk.xyz",
          "https://x.com/iamk",
          "https://github.com/KOUSTAV2409",
        ],
        founder: {
          "@type": "Person",
          name: "Koustav",
          url: "https://www.iamk.xyz",
        },
        description:
          "A tech studio for indie makers and SaaS founders. Quick AI tools, fast MVPs, and custom full-stack builds.",
      },
      {
        "@type": "WebSite",
        "@id": webId,
        name,
        alternateName: [SITE_DOMAIN],
        url: siteUrl,
        inLanguage: "en-US",
        publisher: { "@id": orgId },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  slug,
  date,
  dateModified,
  author = "Koustav",
  image,
}: {
  title: string;
  description: string;
  slug: string;
  date: string;
  dateModified?: string;
  author?: string;
  image?: string;
}) {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/journal/${slug}`;
  const imageUrl =
    image?.startsWith("http")
      ? image
      : image
        ? `${siteUrl}${image.startsWith("/") ? image : `/${image}`}`
        : `${siteUrl}/journal/${slug}/opengraph-image`;

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
      "@type": "Person",
      name: author,
      url: "https://www.iamk.xyz",
    },
    publisher: {
      "@type": "Organization",
      name: "Makershot",
      logo: { "@type": "ImageObject", url: `${siteUrl}/icon` },
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FaqJsonLd({
  items,
  pagePath = "/services",
}: {
  items: Array<Pick<FaqItem, "question" | "answer"> | { q: string; a: string }>;
  pagePath?: string;
}) {
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}${pagePath.startsWith("/") ? pagePath : `/${pagePath}`}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntityOfPage: pageUrl,
    mainEntity: items.map((item) => {
      const question = "question" in item ? item.question : item.q;
      const answer = "answer" in item ? item.answer : item.a;
      return {
        "@type": "Question",
        name: question,
        acceptedAnswer: {
          "@type": "Answer",
          text: answer,
        },
      };
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  const siteUrl = getSiteUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path.startsWith("/") ? item.path : `/${item.path}`}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ServiceOfferJsonLd({
  name,
  description,
  path,
  price,
  priceCurrency = "USD",
}: {
  name: string;
  description: string;
  path: string;
  /** Numeric price string without currency symbol, e.g. "4800" */
  price: string;
  priceCurrency?: string;
}) {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;

  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: {
      "@type": "Organization",
      name: "Makershot",
      url: siteUrl,
    },
    areaServed: "Worldwide",
    offers: {
      "@type": "Offer",
      url,
      price,
      priceCurrency,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Rich result hint for the OG Image Generator tool page.
 */
export function OgGeneratorJsonLd() {
  const siteUrl = getSiteUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Makershot OG Image Generator",
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: `${siteUrl}/og`,
    description:
      "Generate 1200×630 Open Graph images. Quick mode with title and style plus crisp typography, or a free-form prompt. Built by Makershot.",
    provider: {
      "@type": "Organization",
      name: "Makershot",
      url: siteUrl,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * SoftwareApplication schema for the thumbnail generator.
 */
export function ThumbnailGeneratorJsonLd() {
  const siteUrl = getSiteUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Makershot Thumbnail Generator",
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: `${siteUrl}/thumbnail`,
    description:
      "Create free YouTube (1280×720) and LinkedIn thumbnails with AI backgrounds and sharp typography. Built by Makershot.",
    provider: {
      "@type": "Organization",
      name: "Makershot",
      url: siteUrl,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** CollectionPage hint for /journal index. */
export function BlogJsonLd() {
  const siteUrl = getSiteUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Makershot Journal",
    description:
      "Practical essays on shipping AI MVPs, Next.js, design systems, and OG images that convert.",
    url: `${siteUrl}/journal`,
    publisher: {
      "@type": "Organization",
      name: "Makershot",
      url: siteUrl,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
