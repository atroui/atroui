import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoScopeChat } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Scope Chat",
  "/docs/components/scope-scope-chat"
)

export default function Page() {
  return (
    <ComponentDoc
      title="Scope Chat"
      description="Interactive scoping chat. Calls the host /api/scope route for replies."
      preview={<DemoScopeChat />}
      code={'import { ScopeChat } from "atroui"\n\n<ScopeChat />'}
      fullBleed={true}
      installation='import { ScopeChat } from "atroui"'
      usage={
        <>
          Bring your own{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            POST /api/scope
          </code>{" "}
          (and AI keys if you want model replies). The docs app does not burn
          shared LLM tokens - without a host route, the UI still mounts and
          rule-based fallbacks may apply depending on your wiring.
        </>
      }
    />
  )
}
