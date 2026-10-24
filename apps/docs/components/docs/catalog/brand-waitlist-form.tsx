import { ComponentDoc } from "@/components/component-doc"
import { DemoWaitlistForm } from "@/components/registry-demos"


export function BrandWaitlistFormDoc() {
  return (
    <ComponentDoc
      href="/docs/components/brand-waitlist-form"
      registryName="waitlist-form"
      title="Waitlist Form"
      description="Brand waitlist signup."
      preview={<DemoWaitlistForm />}
      code={'import { WaitlistForm } from "@/components/blocks/waitlist-form"\n\n<WaitlistForm />'}
      fullBleed={false}
      usage="Posts to /api/waitlist. Install @atroui/api-waitlist (Resend audience or SMTP). See Installation."
    />
  )
}
