import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Breadcrumbs",
  "/docs/components/ui-breadcrumbs",
  "Path navigation trail for docs and product pages."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="breadcrumbs"
      href="/docs/components/ui-breadcrumbs"
      title="Breadcrumbs"
      description="Hierarchical navigation trail."
      props={[
    { name: 'items', type: 'BreadcrumbItem[]', default: '-', description: 'Trail items with optional href.' },
  ]}
      code={`import { Breadcrumbs } from "@/components/ui/breadcrumbs"\n\n<Breadcrumbs items={[…]} />`}
    />
  )
}
