import { ComponentDoc } from "@/components/component-doc"
import { DemoHomeHero } from "@/components/registry-demos"

export function HomeHeroDoc() {
  return (
    <ComponentDoc
      href="/docs/components/home-hero"
      registryName="home-hero"
      title="Hero"
      description="CONTENT-driven homepage hero. Install as @atroui/home-hero."
      preview={<DemoHomeHero />}
      code={`import { HomeHero } from "@/components/blocks/home-hero"

export function Example() {
  return <HomeHero />
}`}
      fullBleed={true}
      usage="Mount once at the top of a marketing homepage. After install, edit the CONTENT object at the top of the file — do not fork props for every string. Full-bleed section; pair with site header chrome above it."
    />
  )
}
