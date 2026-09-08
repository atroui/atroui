import { ComponentDoc } from "@/components/component-doc"
import { DemoSocialFloat } from "@/components/registry-demos"


export function SocialFloatDoc() {
  return (
    <ComponentDoc
      href="/docs/components/social-float"
      registryName="social-float"
      title="Social Float"
      description="Fixed social FAB with expandable link tray."
      preview={<DemoSocialFloat />}
      code={'import { SocialFloat } from "@/components/blocks/social-float"\n\n<SocialFloat />'}
      fullBleed={false}
      usage="Mount once near the root layout — it is position:fixed to a corner. Edit CONTENT.links after install; keep the tray to a handful of destinations."
    />
  )
}
