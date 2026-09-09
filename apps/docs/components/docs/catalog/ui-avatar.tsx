import { ComponentDoc } from "@/components/component-doc"
import { DemoAvatar } from "@/components/registry-demos"

export function UiAvatarDoc() {
  return (
    <ComponentDoc
      href="/docs/components/ui-avatar"
      registryName="avatar"
      title="Avatar"
      description="Soft-rect avatar with image fade-in and fallback crossfade."
      preview={<DemoAvatar />}
      code={`import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

<Avatar>
  <AvatarImage src="/images/founder-portrait.png" alt="" />
  <AvatarFallback>AK</AvatarFallback>
</Avatar>`}
      fullBleed={false}
      usage="Soft-rect Mira (not capsule). Image fades in when loaded; fallback crossfades underneath. Prefer FounderAvatar when you need the bundled portrait kit."
    />
  )
}
