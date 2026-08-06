import { handleWaitlistPost } from "atroui/api/waitlist"

export const runtime = "nodejs"

export async function POST(req: Request) {
  return handleWaitlistPost(req)
}
