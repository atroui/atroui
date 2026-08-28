import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Local Clock",
  "/docs/components/local-clock",
  "Timezone-aware local time chip."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="local-clock"
      href="/docs/components/local-clock"
      title="Local Clock"
      description="Timezone-aware local time chip."
      usage="Pass timezone (IANA) and timezoneLabel. Fits in PersonalHero meta."
      code={`import { LocalClock } from "@/components/blocks/local-clock"\n\n<LocalClock timezone="America/New_York" timezoneLabel="NYC" />`}
    />
  )
}
