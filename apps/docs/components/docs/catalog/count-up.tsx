import { ComponentDoc } from "@/components/component-doc"
import { DemoCountUp, DemoCountUpSlow } from "@/components/registry-demos"


export function CountUpDoc() {
  return (
    <ComponentDoc
      href="/docs/components/count-up"
      registryName="count-up"
      title="Count Up"
      description="In-view count-up number with reduced-motion support."
      preview={<DemoCountUp />}
      code={`import { CountUp } from "@/components/blocks/count-up"

<CountUp value={128} />`}
      fullBleed={false}
      usage="Use for stats bands. Passes prefers-reduced-motion by jumping to the final value."
      examples={[
        {
          title: "Custom duration",
          tip: "duration is milliseconds. Default is 1200 — stretch it when the number is the hero of the band.",
          preview: <DemoCountUpSlow />,
          code: `import { CountUp } from "@/components/blocks/count-up"

<CountUp value={42} duration={2400} />`,
        },
      ]}
      props={[
        {
          name: "value",
          type: "number",
          default: "-",
          description: "Target number.",
        },
        {
          name: "duration",
          type: "number",
          default: "1200",
          description: "Animation length in ms.",
        },
        {
          name: "ariaLabel",
          type: "string",
          default: "-",
          description: "Accessible name for the final value.",
        },
      ]}
    />
  )
}
