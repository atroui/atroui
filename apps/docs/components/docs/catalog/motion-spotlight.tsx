import { ComponentDoc } from "@/components/component-doc"
import { DemoSpotlight } from "@/components/registry-demos"

export function MotionSpotlightDoc() {
  return (
    <ComponentDoc
      registryName="spotlight"
      href="/docs/components/motion-spotlight"
      title="Spotlight"
      description="Low-opacity cursor wash for dark Mira media cards."
      preview={<DemoSpotlight />}
      code={`import { Spotlight } from "atroui"
import { IMAGEORY } from "@/lib/imageory"

<Spotlight opacity={0.12}>
  <img src={IMAGEORY.darkVoid} alt="" />
</Spotlight>`}
      fullBleed={false}
      usage="Pair with dark media surfaces. Keep opacity low. Reduced motion skips the wash."
      props={[
        {
          name: "size",
          type: "number",
          default: "240",
          description: "Spotlight diameter in px.",
        },
        {
          name: "opacity",
          type: "number",
          default: "0.12",
          description: "Wash opacity.",
        },
        {
          name: "color",
          type: "string",
          default: '"#ffffff"',
          description: "Spotlight color.",
        },
      ]}
    />
  )
}
