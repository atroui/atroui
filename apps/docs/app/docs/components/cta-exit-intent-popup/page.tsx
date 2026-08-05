import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoExitIntentPopup } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Exit Intent Popup",
  "/docs/components/cta-exit-intent-popup"
)

export default function Page() {
  return (
    <ComponentDoc
      title='Exit Intent Popup'
      description='Exit-intent dialog (opens when the cursor leaves the top of the viewport). Preview below forces it open inline.'
      preview={<DemoExitIntentPopup />}
      code={'import { ExitIntentPopup } from "atroui"\n\n{/* Production: mount near root; triggers on exit intent */}\n<ExitIntentPopup />\n\n{/* Docs */}\n<ExitIntentPopup preview />'}
      fullBleed={false}
      installation='import { ExitIntentPopup } from "atroui"'
      usage='Mount once near the root on live pages. Use preview in docs.'
    />
  )
}
