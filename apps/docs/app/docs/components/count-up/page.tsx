import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoCountUp } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Count Up",
  "/docs/components/count-up",
  "In-view count-up number with reduced-motion support."
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/count-up"
      registryName="count-up"
      title="Count Up"
      description="In-view count-up number with reduced-motion support."
      preview={<DemoCountUp />}
      code={'import { CountUp } from "@/components/blocks/count-up"\n\n<CountUp value={128} />'}
      fullBleed={false}
      usage="Use for stats on personal home and deadline bands. Respects prefers-reduced-motion."
    />
  )
}
