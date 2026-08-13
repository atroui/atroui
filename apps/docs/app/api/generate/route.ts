import { handleGeneratePost } from "atroui/api/generate"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const maxDuration = 60

export async function POST(req: Request) {
  try {
    return await handleGeneratePost(req)
  } catch (err) {
    console.error("[docs/api/generate]", err)
    const message =
      err instanceof Error ? err.message : "Failed to generate image"
    return Response.json({ ok: false, error: message }, { status: 500 })
  }
}
