import { ComponentDoc } from "@/components/component-doc"
import { DemoHomeLab } from "@/components/registry-demos"


export function HomeLabDoc() {
  return (
    <ComponentDoc
      href="/docs/components/home-lab"
      registryName="home-lab"
      title="Lab"
      description="Lab / experiments section from the homepage."
      preview={<DemoHomeLab />}
      code={'import { HomeLab } from "@/components/blocks/home-lab"\n\n<HomeLab />'}
      fullBleed={true}
    />
  )
}
