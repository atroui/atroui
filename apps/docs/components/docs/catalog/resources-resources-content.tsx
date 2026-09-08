import { ComponentDoc } from "@/components/component-doc"
import { DemoResourcesContent } from "@/components/registry-demos"


export function ResourcesResourcesContentDoc() {
  return (
    <ComponentDoc
      registryName="resources-content"
      href="/docs/components/resources-resources-content"
      title="Resources Content"
      description="Resources library content."
      preview={<DemoResourcesContent />}
      code={'import { ResourcesContent } from "@/components/blocks/resources-content"\n\n<ResourcesContent />'}
      fullBleed={true}
    />
  )
}
