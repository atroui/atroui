import { ComponentDoc } from "@/components/component-doc"
import { DemoAnimateNumber } from "@/components/registry-demos"

export function MotionAnimateNumberDoc() {
  return (
    <ComponentDoc
      registryName="animate-number"
      href="/docs/components/motion-animate-number"
      title="Animate Number"
      description="Pricing and stats counter — digits tween as numbers with easeOutSoft."
      preview={<DemoAnimateNumber />}
      code={`import { AnimateNumber } from "@/components/ui/animate-number"

<AnimateNumber value={1280} from={0} prefix="$" />`}
      fullBleed={false}
      usage={
        <>
          Use for pricing tiers and KPI stats. Pass{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px]">
            from
          </code>{" "}
          for an enter count; omit it to only tween when{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px]">
            value
          </code>{" "}
          changes. Reduced motion jumps to the final formatted value.
        </>
      }
      props={[
        {
          name: "value",
          type: "number",
          description: "Target number.",
        },
        {
          name: "from",
          type: "number",
          description: "Start value on mount. Defaults to value (no enter tween).",
        },
        {
          name: "duration",
          type: "number",
          default: "0.7",
          description: "Tween duration in seconds (Soft settle).",
        },
        {
          name: "format",
          type: "Intl.NumberFormatOptions | (n) => string",
          description: "Locale formatting or custom formatter.",
        },
        {
          name: "locale",
          type: "string",
          description: "BCP 47 locale for Intl formatting.",
        },
        {
          name: "prefix",
          type: "string",
          description: "String before the formatted number.",
        },
        {
          name: "suffix",
          type: "string",
          description: "String after the formatted number.",
        },
      ]}
    />
  )
}
