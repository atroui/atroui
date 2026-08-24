import { NextRequest } from "next/server"
import { resolveOgCopyForPath } from "@/lib/share-og-copy"
import { eyebrowForPath, renderShareOgImage } from "@/lib/share-og"

export const runtime = "nodejs"
export const revalidate = 86400

function readParam(request: NextRequest, key: string): string {
  return request.nextUrl.searchParams.get(key)?.trim() ?? ""
}

export async function GET(request: NextRequest) {
  const pathRaw = readParam(request, "path") || "/"
  const path = pathRaw.startsWith("/")
    ? pathRaw.slice(0, 180)
    : `/${pathRaw.slice(0, 179)}`
  const resolved = resolveOgCopyForPath(path)
  const title = readParam(request, "title") || resolved.title
  const description = readParam(request, "description") || resolved.description
  const kicker = readParam(request, "kicker") || eyebrowForPath(path)

  const image = await renderShareOgImage({
    eyebrow: kicker,
    title,
    description,
    path,
  })

  const headers = new Headers(image.headers)
  headers.set("Content-Type", "image/png")
  headers.set(
    "Cache-Control",
    "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800"
  )
  return new Response(image.body, { status: 200, headers })
}
