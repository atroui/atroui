import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Social Float",
  "/docs/components/social-float",
  "Fixed social FAB with expandable link tray."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="social-float"
      href="/docs/components/social-float"
      title="Social Float"
      description="Fixed social FAB with expandable link tray."
      usage="Fixed to the viewport corner. Edit CONTENT.links after install."
      code={`import { SocialFloat } from "@/components/blocks/social-float"\n\n<SocialFloat />`}
    />
  )
}
