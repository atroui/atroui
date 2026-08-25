import { allNavItems } from "@/lib/navigation"
import { pseoCollections, pseoGlossary } from "@/lib/pseo"

export function GET() {
  const lines = [
    "# AtroUI — full catalog",
    "",
    "> Dark-first React / Next.js catalog. Official shadcn namespace @atroui (public directory, no GitHub token).",
    "> npx shadcn@latest add @atroui/…  Tailwind CSS v4. Own the copied files. MIT.",
    "> Optional Host APIs (npm i atroui): contact, waitlist, newsletter, OG, thumbnail, scope. BYOK. Not hosted AI. 503 without keys.",
    "> Host APIs: https://www.atroui.com/docs/host-api",
    "> Compare: https://www.atroui.com/docs/compare",
    "> Short index: https://www.atroui.com/llms.txt",
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
