import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoBreadcrumbs } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Breadcrumbs',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Breadcrumbs'
      description='Hierarchical navigation trail.'
      preview={<DemoBreadcrumbs />}
      code={'import { Breadcrumbs } from "@meridian/ui"\n\n<Breadcrumbs items={[…]} />'}
      fullBleed={false}
      installation='import { Breadcrumbs } from "@meridian/ui"'
      props={[
    { name: 'items', type: 'BreadcrumbItem[]', default: '—', description: 'Trail items with optional href.' },
  ]}
    />
  )
}
