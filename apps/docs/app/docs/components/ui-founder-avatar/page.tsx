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
      code={'import { FounderAvatar } from "atroui"\n\n<FounderAvatar size="md" />'}
      fullBleed={false}
      installation='import { FounderAvatar } from "atroui"'
      usage="Portrait ships inside the atroui package (no /public copy needed). Override with src or NEXT_PUBLIC_FOUNDER_AVATAR. Decorative only (aria-hidden); put the name in adjacent copy. Sizes: sm, md, lg."
      props={[
        {
          name: "size",
          type: "'sm' | 'md' | 'lg'",
          default: "'sm'",
          description: "Avatar size.",
        },
        {
          name: "src",
          type: "string | StaticImageData",
          description:
            "Optional override. Defaults to the bundled founder portrait.",
        },
        {
          name: "initials",
          type: "string",
          description: "Initials used only if no image can be resolved.",
        },
      ]}
    />
  )
}
