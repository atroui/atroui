import { ComponentDoc } from "@/components/component-doc"
import { DemoShowcaseCarousel } from "@/components/registry-demos"

export function ShowcaseCarouselDoc() {
  return (
    <ComponentDoc
      href="/docs/components/showcase-carousel"
      registryName="showcase-carousel"
      title="Showcase Carousel"
      description="Snap-scroll customer showcase with scroll controls. Install as @atroui/showcase-carousel."
      preview={<DemoShowcaseCarousel />}
      code={`import { ShowcaseCarousel } from "@/components/blocks/showcase-carousel"

export function Example() {
  return <ShowcaseCarousel />
}`}
      fullBleed={true}
      usage="Customer proof section below features. Replace CARDS with your launches — buttons scroll by 320px with snap."
    />
  )
}
