import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoCard } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Card',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Card'
      description='Elevated surface for grouped content.'
      preview={<DemoCard />}
      code={'import { Card, CardHeader, CardTitle, CardContent } from "@meridian/ui"\n\n<Card>\n  <CardHeader><CardTitle>Title</CardTitle></CardHeader>\n  <CardContent>Body</CardContent>\n</Card>'}
      fullBleed={false}
      installation='import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@meridian/ui"'
      props={[
    { name: 'size', type: "'default' | 'sm'", default: "'default'", description: 'Density.' },
    { name: 'className', type: 'string', default: '—', description: 'Extra classes.' },
  ]}
    />
  )
}
