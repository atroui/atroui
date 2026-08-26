/**
 * One live Context.dev call — OSS research search. Costs 1 credit (10 results).
 *
 *   pnpm --filter @atroui/docs context:search
 */
import { searchWeb } from "../lib/context-dev.ts"

const query =
  process.argv.slice(2).join(" ").trim() ||
  "open source shadcn ui component registry"

const response = await searchWeb({
  query,
  numResults: 10,
  tags: ["atroui", "smoke"],
})

const results = response.results.map((hit) => ({
  title: hit.title,
  url: hit.url,
  relevance: hit.relevance,
  description: hit.description.slice(0, 160),
}))

console.log(
  JSON.stringify(
    {
      query: response.query,
      count: results.length,
      credits: response.key_metadata ?? null,
      results,
    },
    null,
    2
  )
)
