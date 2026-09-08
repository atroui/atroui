import { ComponentDoc } from "@/components/component-doc"
import { DemoSocialShare } from "@/components/registry-demos"


export function JournalSocialShareDoc() {
  return (
    <ComponentDoc
      registryName="social-share"
      href="/docs/components/journal-social-share"
      title="Social Share"
      description="Share actions for articles."
      preview={<DemoSocialShare />}
      code={'import { SocialShare } from "@/components/blocks/social-share"\n\n<SocialShare url="…" title="…" />'}
      fullBleed={false}
      props={[
    { name: 'url', type: 'string', default: '-', description: 'Share URL.' },
    { name: 'title', type: 'string', default: '-', description: 'Share title.' },
    { name: 'label', type: 'string', default: "'Share'", description: 'Visible label.' },
  ]}
    />
  )
}
