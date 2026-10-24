import { ComponentDoc } from "@/components/component-doc"
import { DemoHomePrinciple } from "@/components/registry-demos"


export function HomePrincipleDoc() {
  return (
    <ComponentDoc
      href="/docs/components/home-principle"
      registryName="home-principle"
      title="Principle"
      description="Studio principles section."
      preview={<DemoHomePrinciple />}
      code={'import { HomePrinciple } from "@/components/blocks/home-principle"\n\n<HomePrinciple />'}
      fullBleed={true}
    />
  )
}
