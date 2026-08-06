import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoScopeChat } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Scope Chat",
  "/docs/components/scope-scope-chat",
  "Interactive scoping chat. Calls the host /api/scope route for replies."
)

export default function Page() {
  return (
    <ComponentDoc
      registryName="scope-chat"
      href="/docs/components/scope-scope-chat"
      title="Scope Chat"
      description="Interactive scoping chat. Calls the host /api/scope route for replies."
      preview={<DemoScopeChat />}
      code={'import { ScopeChat } from "@/components/blocks/scope-chat"\n\n<ScopeChat />'}
      fullBleed={true}
      usage={
        <>
          Install{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            @atroui/api-scope
          </code>
          . Rule-based replies work with no keys. Optional{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            XAI_API_KEY
          </code>{" "}
          enables LLM replies in your app - AtroUI never ships keys.
        </>
      }
    />
  )
}
