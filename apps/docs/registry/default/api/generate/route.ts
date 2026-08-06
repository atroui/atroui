import { handleGeneratePost } from "atroui/api/generate"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const maxDuration = 60

export async function POST(req: Request) {
  return handleGeneratePost(req)
}
