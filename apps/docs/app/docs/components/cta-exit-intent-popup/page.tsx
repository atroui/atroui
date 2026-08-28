import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Exit Intent Popup",
  "/docs/components/cta-exit-intent-popup",
  "Exit-intent dialog (opens when the cursor leaves the top of the viewport). Preview below forces it open inline."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="exit-intent-popup"
      href="/docs/components/cta-exit-intent-popup"
      title="Exit Intent Popup"
      description="Exit-intent dialog (opens when the cursor leaves the top of the viewport). Preview below forces it open inline."
      usage="Mount once near the root on live pages. Use preview in docs."
      code={`import { ExitIntentPopup } from "@/components/blocks/exit-intent-popup"\n\n{/* Production: mount near root; triggers on exit intent */}\n<ExitIntentPopup />\n\n{/* Docs */}\n<ExitIntentPopup preview />`}
    />
  )
}
