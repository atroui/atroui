import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoChangelog } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Changelog",
  "/docs/components/changelog",
  "Filterable month-grouped changelog list."
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/changelog"
      registryName="changelog"
      title="Changelog"
      description="Filterable month-grouped changelog list."
      preview={<DemoChangelog />}
      code={'import { Changelog } from "@/components/blocks/changelog"\n\n<Changelog />'}
      fullBleed={true}
      usage="Pass entries and optional tags. Client filter chips included."
    />
  )
}
