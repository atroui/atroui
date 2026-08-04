import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoFadeIn } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Fade In',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Fade In'
      description='Scroll-triggered fade + rise. Preview animates on mount — use Replay to watch again.'
      preview={<DemoFadeIn />}
      code={'import { FadeIn } from "atroui"\n\n<FadeIn>Content</FadeIn>\n\n{/* Docs */}\n<FadeIn preview>Content</FadeIn>'}
      fullBleed={false}
      installation='import { FadeIn } from "atroui"'
      props={[
    { name: 'y', type: 'number', default: '14', description: 'Initial translateY.' },
    { name: 'delay', type: 'number', default: '0', description: 'Delay in seconds.' },
    { name: 'duration', type: 'number', default: '0.28', description: 'Spring duration.' },
  ]}
    />
  )
}
