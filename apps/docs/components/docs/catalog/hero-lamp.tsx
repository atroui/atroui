import { ComponentDoc } from "@/components/component-doc"
import { DemoHeroLamp } from "@/components/registry-demos"

export function HeroLampDoc() {
  return (
    <ComponentDoc
      href="/docs/components/hero-lamp"
      registryName="hero-lamp"
      title="Hero Lamp"
      description="Lamp-glow hero with staggered text reveal. Install as @atroui/hero-lamp."
      preview={<DemoHeroLamp />}
      code={`import { HeroLamp } from "@/components/blocks/hero-lamp"

export function Example() {
  return <HeroLamp />
}`}
      fullBleed={true}
      usage="Mount once at the top of a landing page. After install, edit the CONTENT object at the top of the file. Static glow and text under reduced motion."
    />
  )
}
