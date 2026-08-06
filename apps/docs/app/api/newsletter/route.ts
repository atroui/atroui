import { handleNewsletterPost } from "atroui/api/newsletter"

export const runtime = "nodejs"

export async function POST(req: Request) {
  return handleNewsletterPost(req)
}
