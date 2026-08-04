import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoFounderAvatar } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: "Founder Avatar",
}

export default function Page() {
  return (
    <ComponentDoc
      title="Founder Avatar"
      description="Circular founder portrait for signature rows and about bands."
      preview={<DemoFounderAvatar />}
      code={'import { FounderAvatar } from "@meridian/ui"\n\n<FounderAvatar size="md" />'}
      fullBleed={false}
      installation='import { FounderAvatar } from "@meridian/ui"'
      usage="Place the portrait at public /images/founder-portrait.png — the path is fixed in the component. Decorative only (aria-hidden); put the founder name in adjacent copy. Sizes: sm, md, lg."
      props={[
        {
          name: "size",
          type: "'sm' | 'md' | 'lg'",
          default: "'sm'",
          description: "Avatar size.",
        },
      ]}
    />
  )
}
