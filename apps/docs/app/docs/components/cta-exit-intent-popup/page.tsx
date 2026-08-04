import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoExitIntentPopup } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Exit Intent Popup',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Exit Intent Popup'
      description='Popup triggered on exit intent.'
      preview={<DemoExitIntentPopup />}
      code={'import { ExitIntentPopup } from "@meridian/ui"\n\n<ExitIntentPopup />'}
      fullBleed={false}
      installation='import { ExitIntentPopup } from "@meridian/ui"'
      usage='Mount once near the root.'
    />
  )
}
