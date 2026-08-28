import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Logo Cloud",
  "/docs/components/logo-cloud",
  "Partner / client name strip. Replace placeholder names when you have real marks."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="logo-cloud"
      href="/docs/components/logo-cloud"
      title="Logo Cloud"
      description="Partner / client name strip. Replace placeholder names when you have real marks."
      fullBleed
      usage="Social-proof strip for landings that have real clients or partners. Not mounted on atroui.com until you have logos worth showing."
      code={`import { LogoCloud } from "@/components/blocks/logo-cloud"\n\n<LogoCloud />`}
    />
  )
}
