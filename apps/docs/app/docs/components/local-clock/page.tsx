import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoLocalClock } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Local Clock",
  "/docs/components/local-clock",
  "Timezone-aware local time chip."
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/local-clock"
      registryName="local-clock"
      title="Local Clock"
      description="Timezone-aware local time chip."
      preview={<DemoLocalClock />}
      code={'import { LocalClock } from "@/components/blocks/local-clock"\n\n<LocalClock timezone="America/New_York" timezoneLabel="NYC" />'}
      fullBleed={false}
      usage="Pass timezone (IANA) and timezoneLabel. Fits in PersonalHero meta."
    />
  )
}
