import { resolveOgCopyForPath } from "@/lib/share-og-copy"
import { renderShareOgImage } from "@/lib/share-og"

export const runtime = "nodejs"
export const revalidate = 86400

type RouteContext = { params: Promise<{ path?: string[] }> }

export async function GET(_request: Request, context: RouteContext) {
  const { path: segments } = await context.params
  const pagePath =
    segments && segments.length > 0 ? `/${segments.join("/")}` : "/"
  const copy = resolveOgCopyForPath(pagePath)
  const image = await renderShareOgImage(copy)

  const headers = new Headers(image.headers)
  headers.set("Content-Type", "image/png")
  headers.set(
    "Cache-Control",
    "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800"
  )
  return new Response(image.body, { status: 200, headers })
}
