import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoPersonalHero } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Personal Hero",
  "/docs/components/personal-hero",
  "Narrow personal intro with status, lede links, and meta."
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/personal-hero"
      registryName="personal-hero"
      title="Personal Hero"
      description="Narrow personal intro with status, lede links, and meta."
      preview={<DemoPersonalHero />}
      code={'import { PersonalHero } from "@/components/blocks/personal-hero"\n\n<PersonalHero />'}
      fullBleed={true}
      usage="Optional circular portrait via imageSrc (same layout as iamk.xyz). Set CONTENT.imageSrc to your photo after install. Compose LocalClock / WeatherChip via the meta slot."
    />
  )
}
