import type { MetadataRoute } from "next"
import { allNavItems } from "@/lib/navigation"
import { blogPosts } from "@/lib/blog"

const siteUrl = "https://www.atroui.com"

const staticPaths = [
  "/",
  "/blog",
  "/docs",
  "/docs/installation",
  "/docs/theming",
  "/docs/changelog",
  "/docs/brand",
  "/docs/compare",
  "/docs/components",
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const docsFromNav = allNavItems.map((item) => ({
    url: `${siteUrl}${item.href}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const blog = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }))

  const staticEntries = staticPaths.map((path) => ({
    url: path === "/" ? siteUrl : `${siteUrl}${path}`,
    lastModified,
    changeFrequency: (path === "/" || path === "/blog"
      ? "weekly"
      : "monthly") as "weekly" | "monthly",
    priority: path === "/" ? 1 : path.startsWith("/blog") ? 0.85 : 0.8,
  }))

  const byUrl = new Map<string, MetadataRoute.Sitemap[number]>()
  for (const entry of [...staticEntries, ...docsFromNav, ...blog]) {
    byUrl.set(entry.url, entry)
  }
  return Array.from(byUrl.values())
}
