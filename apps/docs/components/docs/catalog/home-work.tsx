import { ComponentDoc } from "@/components/component-doc"
import { DemoHomeWork } from "@/components/registry-demos"


export function HomeWorkDoc() {
  return (
    <ComponentDoc
      href="/docs/components/home-work"
      registryName="home-work"
      title="Work"
      description="Selected work section."
      preview={<DemoHomeWork />}
      code={'import { HomeWork } from "@/components/blocks/home-work"\n\n<HomeWork />'}
      fullBleed={true}
    />
  )
}
