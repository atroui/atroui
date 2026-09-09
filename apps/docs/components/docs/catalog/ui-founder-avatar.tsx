import { ComponentDoc } from "@/components/component-doc"
import { DemoFounderAvatar } from "@/components/registry-demos"


export function UiFounderAvatarDoc() {
  return (
    <ComponentDoc
      registryName="founder-avatar"
      href="/docs/components/ui-founder-avatar"
      title="Founder Avatar"
      description="Circular founder portrait for signature rows and about bands."
      preview={<DemoFounderAvatar />}
      code={'import { FounderAvatar } from "@/components/ui/founder-avatar"\n\n<FounderAvatar size="md" />'}
      fullBleed={false}
      usage="Set CONTENT.src to a path under /public (or an absolute URL) in the installed founder-avatar file. Empty src falls back to NEXT_PUBLIC_FOUNDER_AVATAR, then initials from CONTENT.initials or getBrand().name. Decorative only (aria-hidden); put the name in adjacent copy. Sizes: sm, md, lg."
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
            "Optional override. Else CONTENT.src, then NEXT_PUBLIC_FOUNDER_AVATAR, then initials.",
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
