import { allNavItems } from "@/lib/navigation"
import { pseoCollections, pseoGlossary } from "@/lib/pseo"

export function GET() {
  const lines = [
    "# AtroUI — full catalog",
    "",
    "> MIT-licensed React / Next.js component catalog. shadcn CLI. Host APIs are BYOK.",
    "> https://www.atroui.com",
    "",
    "## Collections",
    ...pseoCollections.map(
      (c) => `- ${c.title}: https://www.atroui.com/docs/collections/${c.slug}`
    ),
    "",
    "## Glossary",
    ...pseoGlossary.map(
      (t) => `- ${t.title}: https://www.atroui.com/docs/glossary/${t.slug}`
    ),
    "",
    "## Docs nav",
    ...allNavItems.map((item) => `- ${item.title}: https://www.atroui.com${item.href}`),
    "",
  ]
  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
