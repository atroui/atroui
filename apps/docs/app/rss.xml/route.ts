import { blogPosts } from "@/lib/blog"

const SITE_URL = "https://www.atroui.com"

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

/** RFC 822 date from ISO `YYYY-MM-DD` (noon UTC for stable pubDate). */
function toRfc822(iso: string): string {
  const d = new Date(`${iso}T12:00:00.000Z`)
  if (Number.isNaN(d.getTime())) return iso
  return d.toUTCString()
}

export function GET() {
  const posts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date))
  const lastBuild = posts[0] ? toRfc822(posts[0].date) : new Date().toUTCString()

  const items = posts
    .map((post) => {
      const link = `${SITE_URL}/blog/${post.slug}`
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${toRfc822(post.date)}</pubDate>
      <description>${escapeXml(post.description)}</description>
    </item>`
    })
    .join("\n")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>AtroUI Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Host APIs, shadcn registry guides, dark-first tokens, and Next.js essays from AtroUI.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
${items}
  </channel>
</rss>
`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
