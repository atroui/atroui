import { NextResponse } from "next/server"
import { submitToIndexNow } from "atroui/lib/indexnow"
import { getSiteUrl } from "atroui/lib/site-url"
import { allNavItems } from "@/lib/navigation"
import { blogPosts } from "@/lib/blog"

export async function POST(req: Request) {
  // Authorization is optional. When INDEXNOW_PING_TOKEN is set, the endpoint
  // requires a matching Bearer token. When it is not set, the endpoint accepts
  // unauthenticated requests. Set INDEXNOW_PING_TOKEN in production.
  const token = req.headers.get("Authorization")
  const expectedToken = process.env.INDEXNOW_PING_TOKEN
  if (expectedToken && token !== `Bearer ${expectedToken}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const siteUrl = getSiteUrl()
  const urls = [
    siteUrl,
    `${siteUrl}/blog`,
    `${siteUrl}/docs`,
    `${siteUrl}/docs/installation`,
    `${siteUrl}/docs/host-api`,
    `${siteUrl}/docs/registry`,
    `${siteUrl}/docs/theming`,
    `${siteUrl}/docs/brand`,
    `${siteUrl}/docs/identity`,
    `${siteUrl}/docs/compare`,
    `${siteUrl}/docs/components`,
    ...allNavItems.map((item) => `${siteUrl}${item.href}`),
    ...blogPosts.map((post) => `${siteUrl}/blog/${post.slug}`),
  ]

  try {
    const result = await submitToIndexNow(urls)
    return NextResponse.json(result)
  } catch (err: any) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to submit URLs to IndexNow" },
      { status: 500 }
    )
  }
}
export async function GET() {
  return NextResponse.json({
    message: "Use POST with Auth header to trigger IndexNow sync.",
    endpointUrl: "https://api.indexnow.org/indexnow"
  })
}
