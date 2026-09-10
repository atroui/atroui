import { ComponentDoc } from "@/components/component-doc"
import { DemoNumberTicker } from "@/components/registry-demos"

export function MotionNumberTickerDoc() {
  return (
    <ComponentDoc
      registryName="number-ticker"
      href="/docs/components/motion-number-ticker"
      title="Number Ticker"
      description="Counts up when scrolled into view. Tabular numerals."
      preview={<DemoNumberTicker />}
      code={`import { NumberTicker } from "@/components/ui/number-ticker"

<p className="text-4xl font-medium tracking-tight">
  <NumberTicker value={1280} prefix="$" />
</p>`}
      fullBleed={false}
      usage="One ticker per stat; it runs once when 60% visible. Keep tabular-nums so digits don't jitter. Reduced motion jumps to the final value."
      props={[
        {
          name: "value",
          type: "number",
          default: "100",
          description: "Target value.",
        },
        {
          name: "from",
          type: "number",
          default: "0",
          description: "Start value.",
        },
        {
          name: "duration",
          type: "number",
          default: "1.6",
          description: "Count duration in seconds.",
        },
        {
          name: "prefix",
          type: "string",
          default: '""',
          description: 'Prefix, e.g. "$".',
        },
        {
          name: "suffix",
          type: "string",
          default: '""',
          description: 'Suffix, e.g. "+".',
        },
        {
          name: "grouped",
          type: "boolean",
          default: "true",
          description: "Group thousands with locale separators.",
        },
      ]}
    />
  )
}
