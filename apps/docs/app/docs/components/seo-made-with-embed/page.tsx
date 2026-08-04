import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoMadeWithEmbed } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Made With Embed',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Made With Embed'
      description='Credit badge + copyable HTML embed.'
      preview={<DemoMadeWithEmbed />}
      code={'import { MadeWithEmbed } from "atroui"\n\n<MadeWithEmbed />'}
      fullBleed={false}
      installation='import { MadeWithEmbed } from "atroui"'
      props={[
    { name: 'href', type: 'string', default: "'/og'", description: 'Badge link target.' },
  ]}
    />
  )
}
