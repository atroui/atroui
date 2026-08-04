import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoScrollProgress } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Scroll Progress',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Scroll Progress'
      description='Top-of-page reading progress.'
      preview={<DemoScrollProgress />}
      code={'import { ScrollProgress } from "@meridian/ui"\n\n<ScrollProgress />'}
      fullBleed={false}
      installation='import { ScrollProgress } from "@meridian/ui"'
      usage='Usually fixed to the top of the viewport.'
      props={[
    { name: 'className', type: 'string', default: '—', description: 'Positioning classes.' },
  ]}
    />
  )
}
