import { source } from "@/lib/source"

type Hit = {
  id: string
  url: string
  type: "page"
  content: string
}

export function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("query")?.trim() ?? ""
  if (!query) return Response.json([])

  const q = query.toLowerCase()
  const hits: Hit[] = []

  for (const page of source.getPages()) {
    const title = page.data.title ?? ""
    const description = page.data.description ?? ""
    const haystack = `${title} ${description} ${page.url}`.toLowerCase()
    if (!haystack.includes(q)) continue
    hits.push({
      id: page.url,
      url: page.url,
      type: "page",
      content: title,
    })
  }

  return Response.json(hits.slice(0, 24))
}
