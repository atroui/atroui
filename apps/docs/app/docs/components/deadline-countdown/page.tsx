import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoDeadlineCountdown } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Deadline Countdown",
  "/docs/components/deadline-countdown",
  "Days-to-deadline band with segmented progress."
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/deadline-countdown"
      registryName="deadline-countdown"
      title="Deadline Countdown"
      description="Days-to-deadline band with segmented progress."
      preview={<DemoDeadlineCountdown />}
      code={'import { DeadlineCountdown } from "@/components/blocks/deadline-countdown"\n\n<DeadlineCountdown />'}
      fullBleed={true}
      usage="Edit CONTENT dates after install, or pass title / targetDate / startDate as props for a one-off band. Built on CountUp — reduced-motion jumps to the final day count."
    />
  )
}
