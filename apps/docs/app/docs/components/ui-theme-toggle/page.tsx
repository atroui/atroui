import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoThemeToggle } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Theme Toggle',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Theme Toggle'
      description='Light / dark theme switch.'
      preview={<DemoThemeToggle />}
      code={'import { ThemeToggle } from "atroui"\n\n<ThemeToggle />'}
      fullBleed={false}
      installation='import { ThemeToggle } from "atroui"'
      usage='Requires next-themes ThemeProvider.'
      props={[
    { name: 'className', type: 'string', default: '—', description: 'Extra classes.' },
  ]}
    />
  )
}
