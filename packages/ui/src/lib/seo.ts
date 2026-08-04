/**
 * Central SEO / brand strings for metadata and JSON-LD.
 * Keyword map targets studio conversion + free-tool acquisition.
 */

import type { Metadata } from "next";

import { getSiteUrl } from "./site-url";

export const SITE_BRAND = "Makershot";
/** Public hostname — used in copy so Google can associate queries with this domain. */
export const SITE_DOMAIN = "makershot.tech";

export const DEFAULT_TITLE =
  "Makershot — 7-Day MVP Studio & Free OG Image Generator";

/**
 * Root meta description. Mentions domain + primary commercial + tool intents.
 */
export const DEFAULT_DESCRIPTION =
  "Makershot (makershot.tech) ships fixed-price MVP sprints in 7 days for indie makers and SaaS founders — plus free AI tools: OG image generator and YouTube thumbnail maker.";

export function absoluteUrl(path = ""): string {
  const base = getSiteUrl().replace(/\/$/, "");
  if (!path || path === "/") return base || "https://www.makershot.tech";
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
  const url = absoluteUrl(path);
  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : absoluteUrl(image)
    : absoluteUrl("/opengraph-image");
  const socialTitle = title.includes(SITE_BRAND)
    ? title
    : `${title} — ${SITE_BRAND}`;

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
      siteName: SITE_BRAND,
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

/** Keyword-aligned copy for primary landing pages */
export const PAGE_SEO = {
  home: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    path: "/",
  },
  og: {
    title: "Free OG Image Generator — 1200×630 Social Cards",
    description:
      "Generate free Open Graph images (1200×630) for Twitter, LinkedIn, and blogs. Title + style with crisp type, or free-form AI prompt. No signup. By Makershot.",
    path: "/og",
    image: "/og/opengraph-image",
  },
  thumbnail: {
    title: "Free YouTube & LinkedIn Thumbnail Generator",
    description:
      "Create click-worthy YouTube (1280×720) and LinkedIn thumbnails with AI backgrounds and sharp typography. Free, no signup. Built by Makershot.",
    path: "/thumbnail",
    image: "/thumbnail/opengraph-image",
  },
  tools: {
    title: "Free AI Tools for Indie Makers",
    description:
      "Free AI utilities from Makershot: OG image generator, thumbnail maker, and more — built for indie makers and SaaS founders who ship fast.",
    path: "/tools",
  },
  services: {
    title: "MVP Sprint & AI Development Services — Fixed Price",
    description:
      "Fixed-price packages from Makershot: 7-day MVP sprint ($4,800), AI feature integration, design systems, and full-stack builds. No hourly theater.",
    path: "/services",
  },
  journal: {
    title: "Journal — Indie SaaS & AI MVP Playbooks",
    description:
      "Practical essays from Makershot on shipping AI MVPs, Next.js, design systems, and OG images that convert — written for indie makers.",
    path: "/journal",
  },
  work: {
    title: "Work & Case Studies",
    description:
      "Selected Makershot projects: free OG tools, 7-day MVP sprints, and AI features shipped for indie founders and SaaS teams.",
    path: "/work",
  },
  about: {
    title: "About the Studio",
    description:
      "Makershot is a one-person studio run by Koustav — fixed-scope MVP sprints, AI tools, and full-stack builds for indie makers.",
    path: "/about",
  },
  contact: {
    title: "Contact & Hire Us",
    description:
      "Start a project with Makershot. Book a free 15-minute intro or send a brief — we reply within one business day.",
    path: "/contact",
  },
} as const;
