import { ComponentDoc } from "@/components/component-doc"
import { DemoMarquee } from "@/components/registry-demos"

export function MotionMarqueeDoc() {
  return (
    <ComponentDoc
      registryName="marquee"
      href="/docs/components/motion-marquee"
      title="Marquee"
      description="Infinite logo / testimonial strip. CSS loop, pause on hover."
      preview={<DemoMarquee />}
      code={`import { Marquee } from "@/components/ui/marquee"

<Marquee duration={40}>
  <span>Acme</span>
  <span>Globex</span>
  <span>Initech</span>
</Marquee>`}
      fullBleed={false}
      usage="Drop logo or quote rows inside. Keep the loop slow and leave pause-on-hover on. Reduced motion renders a static row."
      props={[
        {
          name: "reverse",
          type: "boolean",
          default: "false",
          description: "Reverse scroll direction.",
        },
        {
          name: "pauseOnHover",
          type: "boolean",
          default: "true",
          description: "Pause the loop on hover.",
        },
        {
          name: "vertical",
          type: "boolean",
          default: "false",
          description: "Scroll vertically instead of horizontally.",
        },
        {
          name: "repeat",
          type: "number",
          default: "2",
          description: "Repeat count for a seamless loop.",
        },
        {
          name: "duration",
          type: "number",
          default: "40",
          description: "Seconds for one loop.",
        },
      ]}
    />
  )
}
