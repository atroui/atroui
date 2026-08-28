import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Personal Hero - Shadcn Portfolio Kit",
  "/docs/components/personal-hero",
  "A narrow personal homepage portfolio hero section built as a shadcn registry component with profile portrait and status tags."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="personal-hero"
      href="/docs/components/personal-hero"
      title="Personal Hero - Shadcn Portfolio Kit"
      description="A narrow personal homepage portfolio hero section built as a shadcn registry component with profile portrait and status tags."
      fullBleed
      usage="Optional circular portrait via imageSrc (same layout as iamk.xyz). Set CONTENT.imageSrc to your photo after install. Compose LocalClock / WeatherChip via the meta slot."
      code={`import { PersonalHero } from "@/components/blocks/personal-hero"\n\n<PersonalHero />`}
    />
  )
}
