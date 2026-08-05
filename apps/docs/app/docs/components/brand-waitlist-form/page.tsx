import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoWaitlistForm } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Waitlist Form",
  "/docs/components/brand-waitlist-form"
)

export default function Page() {
  return (
    <ComponentDoc
      title='Waitlist Form'
      description='Brand waitlist signup.'
      preview={<DemoWaitlistForm />}
      code={'import { WaitlistForm } from "atroui"\n\n<WaitlistForm />'}
      fullBleed={false}
      usage='Posts to your /api/waitlist route.'
    />
  )
}
