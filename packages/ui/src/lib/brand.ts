/**
 * Central brand identity for AtroUI chrome (logo, SEO, mail defaults).
 * Override via NEXT_PUBLIC_SITE_* in the host app.
 *
 * Demo / portfolio content under `content/` may still reference Makershot —
 * that is intentional and independent of this chrome brand.
 */

export type Brand = {
  name: string;
  domain: string;
  email: string;
  /** Canonical origin without trailing slash, e.g. https://atroui.com */
  siteUrl: string;
  tagline: string;
};

export const DEFAULT_BRAND: Brand = {
  name: "AtroUI",
  domain: "atroui.com",
  email: "hello@atroui.com",
  siteUrl: "https://atroui.com",
  tagline:
    "Dark-first React and Next.js component library for production UI",
};

function readEnv(key: string): string | undefined {
  if (typeof process === "undefined" || !process.env) return undefined;
  const value = process.env[key]?.trim();
  return value || undefined;
}

/** Resolved brand — safe on server and client (NEXT_PUBLIC_* only). */
export function getBrand(): Brand {
  return {
    name: readEnv("NEXT_PUBLIC_SITE_NAME") ?? DEFAULT_BRAND.name,
    domain: readEnv("NEXT_PUBLIC_SITE_DOMAIN") ?? DEFAULT_BRAND.domain,
    email: readEnv("NEXT_PUBLIC_SITE_EMAIL") ?? DEFAULT_BRAND.email,
    siteUrl: (
      readEnv("NEXT_PUBLIC_SITE_URL") ?? DEFAULT_BRAND.siteUrl
    ).replace(/\/$/, ""),
    tagline: readEnv("NEXT_PUBLIC_SITE_TAGLINE") ?? DEFAULT_BRAND.tagline,
  };
}

export function getBrandMailto(subject?: string): string {
  const { email } = getBrand();
  if (!subject) return `mailto:${email}`;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}
