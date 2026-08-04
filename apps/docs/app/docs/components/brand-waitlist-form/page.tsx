import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoWaitlistForm } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Waitlist Form',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Waitlist Form'
      description='Brand waitlist signup.'
      preview={<DemoWaitlistForm />}
      code={'import { WaitlistForm } from "atroui"\n\n<WaitlistForm />'}
      fullBleed={false}
      installation='import { WaitlistForm } from "atroui"'
      usage='Posts to your /api/waitlist route.'
    />
  )
}
