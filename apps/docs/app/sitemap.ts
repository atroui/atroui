import type { MetadataRoute } from "next"

const siteUrl = "https://atroui.com"

/** High-value docs URLs for crawl discovery. Expand as pages ship. */
const paths = [
  "/",
  "/docs",
  "/docs/installation",
  "/docs/theming",
  "/docs/changelog",
  "/docs/components",
  "/docs/components/ui-button",
  "/docs/components/ui-card",
  "/docs/components/brand-logo",
  "/docs/components/site-header",
  "/docs/components/seo-json-ld",
  "/docs/components/og-og-workspace",
  "/docs/components/home-who",
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return paths.map((path) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/docs/components") ? 0.7 : 0.8,
  }))
}
