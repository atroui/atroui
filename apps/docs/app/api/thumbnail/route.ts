import { handleThumbnailPost } from "atroui/api/thumbnail"
import { assertDocsOgFontsPresent } from "@/lib/assert-docs-og-fonts"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const maxDuration = 60

export async function POST(req: Request) {
  try {
    assertDocsOgFontsPresent()
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "OG fonts missing from server bundle"
    return Response.json({ ok: false, error: message }, { status: 503 })
  }
  return handleThumbnailPost(req)
}
