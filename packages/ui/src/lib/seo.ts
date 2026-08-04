/**
 * Central SEO / brand strings for metadata and JSON-LD.
 * Chrome defaults to AtroUI; override via NEXT_PUBLIC_SITE_* (see lib/brand.ts).
 */

import type { Metadata } from "next";

import { getBrand } from "./brand";
import { getSiteUrl } from "./site-url";

/** Current brand name (AtroUI by default). Resolved at call time from env. */
export function getSiteBrand(): string {
  return getBrand().name;
}

/** Current public hostname. Resolved at call time from env. */
export function getSiteDomain(): string {
  return getBrand().domain;
}

export function getDefaultTitle(): string {
  const { name, tagline } = getBrand();
  return `${name} — ${tagline}`;
}

export function getDefaultDescription(): string {
  const { name, domain, tagline } = getBrand();
  return `${name} (${domain}) — ${tagline}.`;
}

export function absoluteUrl(path = ""): string {
  const brand = getBrand();
  const base = getSiteUrl().replace(/\/$/, "");
  if (!path || path === "/") return base || brand.siteUrl;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Absolute or site-relative OG image. Defaults to site opengraph-image. */
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
};

/**
 * Consistent Metadata object: canonical + OG + Twitter for every money page.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  noIndex = false,
}: PageMetaInput): Metadata {
  const brandName = getBrand().name;
  const url = absoluteUrl(path);
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : absoluteUrl(image)
    : absoluteUrl("/opengraph-image");
  const socialTitle = title.includes(brandName)
    ? title
    : `${title} — ${brandName}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: brandName,
      locale: "en_US",
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: socialTitle,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [imageUrl],
      creator: "@iamk",
    },
  };
}

/** Keyword-aligned copy for primary landing pages (host apps). */
export function getPageSeo() {
  const { name, domain } = getBrand();
  return {
    home: {
      title: getDefaultTitle(),
      description: getDefaultDescription(),
      path: "/",
    },
    og: {
      title: "Free OG Image Generator — 1200×630 Social Cards",
      description: `Generate free Open Graph images (1200×630) for Twitter, LinkedIn, and blogs. Title + style with crisp type, or free-form AI prompt. No signup. By ${name}.`,
      path: "/og",
      image: "/og/opengraph-image",
    },
    thumbnail: {
      title: "Free YouTube & LinkedIn Thumbnail Generator",
      description: `Create click-worthy YouTube (1280×720) and LinkedIn thumbnails with AI backgrounds and sharp typography. Free, no signup. Built by ${name}.`,
      path: "/thumbnail",
      image: "/thumbnail/opengraph-image",
    },
    tools: {
      title: "Free AI Tools for Indie Makers",
      description: `Free AI utilities from ${name}: OG image generator, thumbnail maker, and more — built for indie makers and SaaS founders who ship fast.`,
      path: "/tools",
    },
    services: {
      title: "MVP Sprint & AI Development Services — Fixed Price",
      description: `Fixed-price packages from ${name}: 7-day MVP sprint ($4,800), AI feature integration, design systems, and full-stack builds. No hourly theater.`,
      path: "/services",
    },
    journal: {
      title: "Journal — Indie SaaS & AI MVP Playbooks",
      description: `Practical essays from ${name} on shipping AI MVPs, Next.js, design systems, and OG images that convert — written for indie makers.`,
      path: "/journal",
    },
    work: {
      title: "Work & Case Studies",
      description: `Selected ${name} projects: free OG tools, 7-day MVP sprints, and AI features shipped for indie founders and SaaS teams.`,
      path: "/work",
    },
    about: {
      title: "About the Studio",
      description: `${name} (${domain}) is a one-person studio — fixed-scope MVP sprints, AI tools, and full-stack builds for indie makers.`,
      path: "/about",
    },
    contact: {
      title: "Contact & Hire Us",
      description: `Start a project with ${name}. Book a free 15-minute intro or send a brief — we reply within one business day.`,
      path: "/contact",
    },
  } as const;
}
