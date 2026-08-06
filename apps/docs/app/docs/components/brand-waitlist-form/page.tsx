import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoWaitlistForm } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Waitlist Form",
  "/docs/components/brand-waitlist-form",
  "Brand waitlist signup."
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/brand-waitlist-form"
      registryName="waitlist-form"
      title="Waitlist Form"
      description="Brand waitlist signup."
      preview={<DemoWaitlistForm />}
      code={'import { WaitlistForm } from "@/components/blocks/waitlist-form"\n\n<WaitlistForm />'}
      fullBleed={false}
      usage="Posts to CONTENT.endpoint (default /api/waitlist). Host API."
    />
  )
}
