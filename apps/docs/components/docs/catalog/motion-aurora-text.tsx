import { ComponentDoc } from "@/components/component-doc"
import { DemoAuroraText } from "@/components/registry-demos"

export function MotionAuroraTextDoc() {
  return (
    <ComponentDoc
      registryName="aurora-text"
      href="/docs/components/motion-aurora-text"
      title="Aurora Text"
      description="Slow brand gradient sweep on display words."
      preview={<DemoAuroraText />}
      code={`import { AuroraText } from "@/components/ui/aurora-text"

<h2 className="text-3xl font-medium tracking-tight">
  Ship <AuroraText>calm interfaces</AuroraText>
</h2>`}
      fullBleed={false}
      usage="Accent words inside a heading, not whole paragraphs. One sweep per viewport. Reduced motion holds static brand text."
      props={[
        {
          name: "duration",
          type: "number",
          default: "8",
          description: "Loop duration in seconds.",
        },
      ]}
    />
  )
}
