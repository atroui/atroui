import { ComponentDoc } from "@/components/component-doc"
import { DemoReadingShelf } from "@/components/registry-demos"


export function ReadingShelfDoc() {
  return (
    <ComponentDoc
      href="/docs/components/reading-shelf"
      registryName="reading-shelf"
      title="Reading Shelf"
      description="Horizontal book-cover shelf for currently reading."
      preview={<DemoReadingShelf />}
      code={'import { ReadingShelf } from "@/components/blocks/reading-shelf"\n\n<ReadingShelf />'}
      fullBleed={true}
      usage="Replace BOOKS covers after install. Uses .no-scrollbar for mobile scroll."
    />
  )
}
