import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoPersonalHero } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Personal Hero - Shadcn Portfolio Kit",
  "/docs/components/personal-hero",
  "A narrow personal homepage portfolio hero section built as a shadcn registry component with profile portrait and status tags."
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/personal-hero"
      registryName="personal-hero"
      title="Personal Hero - Shadcn Portfolio Kit"
      description="A narrow personal homepage portfolio hero section built as a shadcn registry component with profile portrait and status tags."
      preview={<DemoPersonalHero />}
      code={'import { PersonalHero } from "@/components/blocks/personal-hero"\n\n<PersonalHero />'}
      fullBleed={true}
      usage="Optional circular portrait via imageSrc (same layout as iamk.xyz). Set CONTENT.imageSrc to your photo after install. Compose LocalClock / WeatherChip via the meta slot."
    />
  )
}
