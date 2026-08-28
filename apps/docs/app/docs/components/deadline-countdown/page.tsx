import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Deadline Countdown",
  "/docs/components/deadline-countdown",
  "Days-to-deadline band with segmented progress."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="deadline-countdown"
      href="/docs/components/deadline-countdown"
      title="Deadline Countdown"
      description="Days-to-deadline band with segmented progress."
      fullBleed
      usage="Edit CONTENT dates after install. Built on CountUp."
      code={`import { DeadlineCountdown } from "@/components/blocks/deadline-countdown"\n\n<DeadlineCountdown />`}
    />
  )
}
