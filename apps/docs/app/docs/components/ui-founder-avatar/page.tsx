import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoFounderAvatar } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Founder Avatar",
  "/docs/components/ui-founder-avatar"
)

export default function Page() {
  return (
    <ComponentDoc
      title="Founder Avatar"
      description="Circular founder portrait for signature rows and about bands."
      preview={<DemoFounderAvatar />}
      code={'import { FounderAvatar } from "atroui"\n\n<FounderAvatar size="md" />\n<FounderAvatar size="md" src="/images/founder-portrait.png" />'}
      fullBleed={false}
      installation='import { FounderAvatar } from "atroui"'
      usage="Optional src (or NEXT_PUBLIC_FOUNDER_AVATAR). When omitted, shows brand initials — no hardcoded /images path, so consumer apps do not 404. Decorative only (aria-hidden); put the name in adjacent copy. Sizes: sm, md, lg."
      props={[
        {
          name: "size",
          type: "'sm' | 'md' | 'lg'",
          default: "'sm'",
          description: "Avatar size.",
        },
        {
          name: "src",
          type: "string",
          description:
            "Portrait URL. Falls back to NEXT_PUBLIC_FOUNDER_AVATAR, then initials.",
        },
        {
          name: "initials",
          type: "string",
          description: "Override initials when no image is set.",
        },
      ]}
    />
  )
}
