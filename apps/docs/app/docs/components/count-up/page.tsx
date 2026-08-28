import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Count Up",
  "/docs/components/count-up",
  "In-view count-up number with reduced-motion support."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="count-up"
      href="/docs/components/count-up"
      title="Count Up"
      description="In-view count-up number with reduced-motion support."
      usage="Use for stats on personal home and deadline bands. Respects prefers-reduced-motion."
      code={`import { CountUp } from "@/components/blocks/count-up"\n\n<CountUp value={128} />`}
    />
  )
}
