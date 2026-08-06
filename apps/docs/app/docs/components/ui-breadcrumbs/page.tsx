import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoBreadcrumbs } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Breadcrumbs",
  "/docs/components/ui-breadcrumbs"
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/ui-breadcrumbs"
      title="Breadcrumbs"
      description="Hierarchical navigation trail."
      preview={<DemoBreadcrumbs />}
      code={'import { Breadcrumbs } from "@/components/ui/breadcrumbs"\n\n<Breadcrumbs items={[…]} />'}
      fullBleed={false}
      props={[
    { name: 'items', type: 'BreadcrumbItem[]', default: '-', description: 'Trail items with optional href.' },
  ]}
    />
  )
}
