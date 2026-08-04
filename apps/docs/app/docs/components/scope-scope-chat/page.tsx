import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoScopeChat } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: "Scope Chat",
}

export default function Page() {
  return (
    <ComponentDoc
      title="Scope Chat"
      description="Interactive scoping chat. Calls the host /api/scope route for replies."
      preview={<DemoScopeChat />}
      code={'import { ScopeChat } from "atroui"\n\n<ScopeChat />'}
      fullBleed={true}
      installation='import { ScopeChat } from "atroui"'
      usage="Needs host POST /api/scope (and typically Gemini / AI env). UI mounts without it; messages will error until the API exists."
    />
  )
}
