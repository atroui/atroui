import { handleContactPost } from "atroui/api/contact"

export const runtime = "nodejs"

export async function POST(req: Request) {
  return handleContactPost(req)
}
