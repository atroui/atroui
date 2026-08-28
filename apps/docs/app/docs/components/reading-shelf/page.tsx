import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Reading Shelf",
  "/docs/components/reading-shelf",
  "Horizontal book-cover shelf for currently reading."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="reading-shelf"
      href="/docs/components/reading-shelf"
      title="Reading Shelf"
      description="Horizontal book-cover shelf for currently reading."
      fullBleed
      usage="Replace BOOKS covers after install. Uses .no-scrollbar for mobile scroll."
      code={`import { ReadingShelf } from "@/components/blocks/reading-shelf"\n\n<ReadingShelf />`}
    />
  )
}
