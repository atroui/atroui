import { handleScopePost } from "atroui/api/scope"

export const runtime = "nodejs"

export async function POST(req: Request) {
  return handleScopePost(req)
}
