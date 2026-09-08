import type { Metadata } from "next"
import Link from "next/link"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoPersonalHero } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Personal Hero",
  "/docs/components/personal-hero",
  "Narrow personal homepage hero with portrait slot and status tags."
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/personal-hero"
      registryName="personal-hero"
      title="Personal Hero"
      description="Narrow personal homepage hero with portrait slot and status tags."
      preview={<DemoPersonalHero />}
      code={`import { PersonalHero } from "@/components/blocks/personal-hero"

<PersonalHero />`}
      fullBleed={true}
      usage={
        <>
          Use on a personal / portfolio home — not a marketing SaaS hero. After
          install, set{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            CONTENT.imageSrc
          </code>{" "}
          for the circular portrait. Compose{" "}
          <Link href="/docs/components/local-clock" className="bam-link">
            LocalClock
          </Link>{" "}
          /{" "}
          <Link href="/docs/components/weather-chip" className="bam-link">
            WeatherChip
          </Link>{" "}
          in the meta slot.
        </>
      }
    />
  )
}
