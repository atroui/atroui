import { ComponentDoc } from "@/components/component-doc"
import { DemoHeroParallax } from "@/components/registry-demos"

export function HeroParallaxDoc() {
  return (
    <ComponentDoc
      href="/docs/components/hero-parallax"
      registryName="hero-parallax"
      title="Hero Parallax"
      description="Scroll-scrubbed hero with drifting proof rows. Install as @atroui/hero-parallax."
      preview={<DemoHeroParallax />}
      code={`import { HeroParallax } from "@/components/blocks/hero-parallax"

export function Example() {
  return <HeroParallax />
}`}
      fullBleed={true}
      usage="Mount once at the top of a marketing page. After install, edit the CONTENT and ROWS objects at the top of the file. Rows drift on scroll and render static under reduced motion."
    />
  )
}
