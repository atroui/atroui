import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoSocialShare } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Social Share",
  "/docs/components/journal-social-share"
)

export default function Page() {
  return (
    <ComponentDoc
      title='Social Share'
      description='Share actions for articles.'
      preview={<DemoSocialShare />}
      code={'import { SocialShare } from "atroui"\n\n<SocialShare url="…" title="…" />'}
      fullBleed={false}
      installation='import { SocialShare } from "atroui"'
      props={[
    { name: 'url', type: 'string', default: '-', description: 'Share URL.' },
    { name: 'title', type: 'string', default: '-', description: 'Share title.' },
    { name: 'label', type: 'string', default: "'Share'", description: 'Visible label.' },
  ]}
    />
  )
}
