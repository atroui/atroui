import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Social Share",
  "/docs/components/journal-social-share",
  "Share actions for articles."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="social-share"
      href="/docs/components/journal-social-share"
      title="Social Share"
      description="Share actions for articles."
      props={[
    { name: 'url', type: 'string', default: '-', description: 'Share URL.' },
    { name: 'title', type: 'string', default: '-', description: 'Share title.' },
    { name: 'label', type: 'string', default: "'Share'", description: 'Visible label.' },
  ]}
      code={`import { SocialShare } from "@/components/blocks/social-share"\n\n<SocialShare url="…" title="…" />`}
    />
  )
}
