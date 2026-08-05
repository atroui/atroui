/**
 * Canonical public site URL for metadata, sitemap, and JSON-LD.
 */

import { getBrand } from "./brand";

export function getSiteUrl(): string {
  const brand = getBrand();

  // Prefer explicit public URL, then brand default. Only use Vercel deployment
  // host on preview builds so production JSON-LD / OG never point at *.vercel.app.
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : brand.siteUrl);

  // Prefer www for apex hosts when crawlers are picky about og:image redirects.
  try {
    const url = new URL(raw);
    const apex = brand.domain.replace(/^www\./, "");
    if (url.hostname === apex) {
      url.hostname = `www.${apex}`;
      return url.toString().replace(/\/$/, "");
    }
  } catch {
    // fall through
  }
  return raw.replace(/\/$/, "");
}
