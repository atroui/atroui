import { ComponentDoc } from "@/components/component-doc"
import { DemoChangelog } from "@/components/registry-demos"


export function ChangelogDoc() {
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
