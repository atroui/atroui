import {
  buildDocsOgPreviewResponse,
  parseDocsQuickPreview,
} from "@/lib/docs-og-preview"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const maxDuration = 60

export async function POST(req: Request) {
  try {
    let raw: unknown
    try {
      raw = await req.json()
    } catch {
      return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 })
    }

    if (
      raw &&
      typeof raw === "object" &&
      (raw as { previewOnly?: unknown }).previewOnly === true
    ) {
      const parsed = parseDocsQuickPreview(raw)
      if (!parsed.ok) {
        return Response.json(
          { ok: false, error: parsed.error },
          { status: parsed.status },
        )
      }
      return await buildDocsOgPreviewResponse(parsed)
    }

    // AI / full compose path — load Host API lazily so preview never pays
    // for sharp/satori module init (that was HTML-500ing on Vercel).
    const { handleGeneratePost } = await import("atroui/api/generate")
    return await handleGeneratePost(
      new Request(req.url, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(raw),
      }),
    )
  } catch (err) {
    console.error("[docs/api/generate]", err)
    const message =
      err instanceof Error ? err.message : "Failed to generate image"
    return Response.json({ ok: false, error: message }, { status: 500 })
  }
}
