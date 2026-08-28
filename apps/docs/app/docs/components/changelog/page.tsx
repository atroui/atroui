import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Changelog",
  "/docs/components/changelog",
  "Filterable month-grouped changelog list."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="changelog"
      href="/docs/components/changelog"
      title="Changelog"
      description="Filterable month-grouped changelog list."
      fullBleed
      usage="Pass entries and optional tags. Client filter chips included."
      code={`import { Changelog } from "@/components/blocks/changelog"\n\n<Changelog />`}
    />
  )
}
