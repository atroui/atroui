import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import {
  DemoLocalClock,
  DemoLocalClockLondon,
} from "@/components/registry-demos"

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
      code={`import { LocalClock } from "@/components/blocks/local-clock"

<LocalClock timezone="America/New_York" timezoneLabel="NYC" />`}
      fullBleed={false}
      usage="Pass an IANA timezone and a short label. Fits in PersonalHero meta."
      examples={[
        {
          title: "Another city",
          tip: "timezoneLabel is display chrome — keep it short; the full IANA id stays in the title tooltip.",
          preview: <DemoLocalClockLondon />,
          code: `import { LocalClock } from "@/components/blocks/local-clock"

<LocalClock timezone="Europe/London" timezoneLabel="LON" />`,
        },
      ]}
      props={[
        {
          name: "timezone",
          type: "string",
          default: "-",
          description: "IANA timezone id (e.g. America/New_York).",
        },
        {
          name: "timezoneLabel",
          type: "string",
          default: "-",
          description: "Short label shown beside the time.",
        },
        {
          name: "className",
          type: "string",
          default: "-",
          description: "Optional class on the chip root.",
        },
      ]}
    />
  )
}
