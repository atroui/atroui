import type { FaqItem } from "../../content/faq";
import { getBrand } from "../../lib/brand";
import { getSiteDomain } from "../../lib/seo";
import { serializeJsonLd } from "../../lib/serialize-json-ld";
import { getSiteUrl } from "../../lib/site-url";

type OrgJsonLdProps = {
  /** Optional override */
  name?: string;
};

/**
 * Combined Organization + WebSite graph. Prefer this on the homepage so
 * Google gets a single linked entity graph (brand + domain disambiguation).
 */
export function SiteGraphJsonLd({ name }: OrgJsonLdProps = {}) {
  const brand = getBrand();
  const orgName = name ?? brand.name;
  const siteUrl = getSiteUrl();
  const domain = getSiteDomain();
  const orgId = `${siteUrl}#organization`;
  const webId = `${siteUrl}#website`;
  const appId = `${siteUrl}#software`;

  const entityDescription =
    "AtroUI is an MIT-licensed React and Next.js component catalog. Install blocks with the shadcn CLI and own the source in your repo; optional Host APIs stay on your keys.";

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: orgName,
        legalName: "AtroUI",
        alternateName: ["atroui", "@atroui", "Atro UI"],
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/favicon-192.png`,
          width: 192,
          height: 192,
        },
        sameAs: [
          "https://github.com/atroui/atroui",
          "https://www.npmjs.com/package/atroui",
          "https://ui.shadcn.com/docs/directory?q=atroui",
          "https://www.iamk.xyz",
          "https://www.makershot.tech",
          "https://x.com/iamk",
        ],
        description: entityDescription,
        disambiguatingDescription:
          "Open-source React / Next.js UI component library and shadcn registry catalog at atroui.com",
        knowsAbout: [
          "React",
          "Next.js",
          "shadcn/ui",
          "design systems",
          "component libraries",
        ],
        brand: {
          "@type": "Brand",
          name: orgName,
          alternateName: ["atroui", "@atroui"],
          url: siteUrl,
          logo: `${siteUrl}/brand/atroui-mark.svg`,
        },
      },
      {
        "@type": "WebSite",
        "@id": webId,
        name: orgName,
        alternateName: ["atroui", domain, "@atroui"],
        url: siteUrl,
        inLanguage: "en-US",
        description: entityDescription,
        publisher: { "@id": orgId },
        about: { "@id": appId },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  slug,
  date,
  dateModified,
  author,
  image,
  /** URL segment before the slug. Docs site uses `/blog`; studio hosts often use `/journal`. */
  basePath = "/journal",
}: {
  title: string;
  description: string;
  slug: string;
  date: string;
  dateModified?: string;
  /** Defaults to brand organization name (not a personal byline). */
  author?: string;
  image?: string;
  basePath?: string;
}) {
  const siteUrl = getSiteUrl();
  const brandName = getBrand().name;
  const authorName = author ?? brandName;
  const segment = basePath.startsWith("/") ? basePath : `/${basePath}`;
  const pageUrl = `${siteUrl}${segment}/${slug}`;
  const imageUrl =
    image?.startsWith("http")
      ? image
      : image
        ? `${siteUrl}${image.startsWith("/") ? image : `/${image}`}`
        : `${siteUrl}${segment}/${slug}/opengraph-image`;

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
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
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
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
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
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
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
  const brandName = getBrand().name;
  const url = `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;

  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: {
      "@type": "Organization",
      name: brandName,
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
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}

/**
 * Rich result hint for the OG Image Generator tool page.
 */
export function OgGeneratorJsonLd() {
  const siteUrl = getSiteUrl();
  const brandName = getBrand().name;
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${brandName} OG Image Generator`,
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: `${siteUrl}/og`,
    description: `Generate 1200×630 Open Graph images. Quick mode with title and style plus crisp typography, or a free-form prompt. Built by ${brandName}.`,
    provider: {
      "@type": "Organization",
      name: brandName,
      url: siteUrl,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}

/**
 * SoftwareApplication schema for the thumbnail generator.
 */
export function ThumbnailGeneratorJsonLd() {
  const siteUrl = getSiteUrl();
  const brandName = getBrand().name;
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${brandName} Thumbnail Generator`,
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: `${siteUrl}/thumbnail`,
    description: `Create free YouTube (1280×720) and LinkedIn thumbnails with AI backgrounds and sharp typography. Built by ${brandName}.`,
    provider: {
      "@type": "Organization",
      name: brandName,
      url: siteUrl,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}

/**
 * SoftwareApplication + download link for the published `atroui` npm package.
 * Mount on the AtroUI marketing homepage for entity clarity.
 */
export function SoftwareAppJsonLd() {
  const siteUrl = getSiteUrl();
  const brand = getBrand();
  const orgId = `${siteUrl}#organization`;
  const appId = `${siteUrl}#software`;
  const entityDescription =
    "AtroUI is an MIT-licensed React and Next.js component catalog. Install blocks with the shadcn CLI and own the source in your repo; optional Host APIs stay on your keys.";

  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": appId,
    name: brand.name,
    alternateName: ["atroui", "@atroui", "Atro UI"],
    applicationCategory: "DeveloperApplication",
    applicationSubCategory: "UI component library",
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript",
    license: "https://opensource.org/licenses/MIT",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: siteUrl,
    downloadUrl: "https://www.npmjs.com/package/atroui",
    codeRepository: "https://github.com/atroui/atroui",
    description: entityDescription,
    disambiguatingDescription:
      "Open-source React / Next.js UI component library and shadcn registry catalog at atroui.com",
    keywords:
      "AtroUI, atroui, React component library, Next.js, shadcn registry, design system, Host APIs",
    provider: { "@id": orgId },
    author: { "@id": orgId },
    publisher: { "@id": orgId },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}

/** CollectionPage hint for the blog / journal index. */
export function BlogJsonLd({
  path = "/journal",
  name,
  description,
}: {
  path?: string;
  name?: string;
  description?: string;
} = {}) {
  const siteUrl = getSiteUrl();
  const brandName = getBrand().name;
  const pagePath = path.startsWith("/") ? path : `/${path}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: name ?? `${brandName} Blog`,
    description:
      description ??
      "Guides on the shadcn registry, dark-first tokens, and Next.js components.",
    url: `${siteUrl}${pagePath}`,
    publisher: {
      "@type": "Organization",
      name: brandName,
      url: siteUrl,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
