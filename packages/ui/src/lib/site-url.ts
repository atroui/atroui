/**
 * Canonical public site URL for metadata, sitemap, and JSON-LD.
 */
export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  // Normalize production canonical host. Social crawlers are often picky about
  // redirects for `og:image` / `twitter:image`, so prefer the `www` hostname.
  try {
    const url = new URL(raw);
    if (url.hostname === "makershot.tech") {
      url.hostname = "www.makershot.tech";
      return url.toString().replace(/\/$/, "");
    }
  } catch {
    // fall through
  }
  return raw.replace(/\/$/, "");
}
