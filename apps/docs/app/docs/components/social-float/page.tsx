import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoSocialFloat } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Social Float",
  "/docs/components/social-float",
  "Fixed social FAB with expandable link tray."
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/social-float"
      registryName="social-float"
      title="Social Float"
      description="Fixed social FAB with expandable link tray."
      preview={<DemoSocialFloat />}
      code={'import { SocialFloat } from "@/components/blocks/social-float"\n\n<SocialFloat />'}
      fullBleed={false}
      usage="Fixed to the viewport corner. Edit CONTENT.links after install."
    />
  )
}
