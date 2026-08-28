import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Founder Avatar",
  "/docs/components/ui-founder-avatar",
  "Circular founder portrait for signature rows and about bands."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="founder-avatar"
      href="/docs/components/ui-founder-avatar"
      title="Founder Avatar"
      description="Circular founder portrait for signature rows and about bands."
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
      code={`import { FounderAvatar } from "@/components/ui/founder-avatar"\n\n<FounderAvatar size="md" />`}
    />
  )
}
