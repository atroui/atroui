/**
 * Two targeted Context.dev calls: page markdown + styleguide.
 * Default target is wireframe.co (studio craft reference — not their product).
 *
 *   pnpm --filter @atroui/docs context:studio
 *   pnpm --filter @atroui/docs context:studio -- https://example.com
 */
import { writeFileSync } from "node:fs"
import { extractStyleguide, scrapeMarkdown } from "../lib/context-dev.ts"

const input = process.argv.slice(2).find((arg) => !arg.startsWith("-")) ?? "https://wireframe.co"
const url = input.startsWith("http") ? input : `https://${input}`
const domain = new URL(url).hostname.replace(/^www\./, "")

const markdown = await scrapeMarkdown({
  url,
  useMainContentOnly: true,
  includeLinks: true,
  includeImages: false,
})

const styleguide = await extractStyleguide({
  domain,
  colorScheme: "light",
  tags: ["atroui", "studio-ref"],
})

const md =
  typeof markdown === "object" && markdown && "markdown" in markdown
    ? String((markdown as { markdown?: string }).markdown ?? "")
    : ""

const out = {
  url,
  domain,
  markdownCredits:
    markdown && typeof markdown === "object" && "key_metadata" in markdown
      ? (markdown as { key_metadata?: unknown }).key_metadata
      : null,
  styleguideCredits: styleguide.key_metadata ?? null,
  markdown: md.slice(0, 12000),
  styleguide: styleguide.styleguide ?? null,
}

const dest = `/tmp/context-studio-${domain}.json`
writeFileSync(dest, JSON.stringify(out, null, 2))
console.log(
  JSON.stringify(
    {
      wrote: dest,
      markdownChars: md.length,
      markdownCredits: out.markdownCredits,
      styleguideCredits: out.styleguideCredits,
      colors: out.styleguide?.colors ?? null,
      mode: out.styleguide?.mode ?? null,
    },
    null,
    2
  )
)
