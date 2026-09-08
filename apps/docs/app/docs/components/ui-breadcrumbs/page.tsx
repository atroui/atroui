import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import {
  DemoBreadcrumbs,
  DemoBreadcrumbsPlain,
} from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Breadcrumbs",
  "/docs/components/ui-breadcrumbs",
  "Path navigation trail for docs and product pages."
)

export default function Page() {
  return (
    <ComponentDoc
      registryName="breadcrumbs"
      href="/docs/components/ui-breadcrumbs"
      title="Breadcrumbs"
      description="Hierarchical navigation trail."
      preview={<DemoBreadcrumbs />}
      code={`import { Breadcrumbs } from "@/components/ui/breadcrumbs"

<Breadcrumbs
  items={[
    { label: "Docs", href: "/docs" },
    { label: "Components", href: "/docs/components" },
    { label: "Breadcrumbs" },
  ]}
/>`}
      fullBleed={false}
      usage="Order items from the root down to the current page. Labels double as React keys, so keep them unique within one trail."
      examples={[
        {
          title: "Steps without a page",
          tip: "Leave href off any step that has no page of its own and it renders as plain text instead of a dead link. The trailing item is always plain text carrying aria-current=\"page\" - an href there is ignored, since linking to the page you are already on is noise.",
          preview: <DemoBreadcrumbsPlain />,
          code: `import { Breadcrumbs } from "@/components/ui/breadcrumbs"

<Breadcrumbs
  items={[
    { label: "Docs", href: "/docs" },
    // No page behind this grouping - renders as text.
    { label: "Primitives" },
    { label: "Breadcrumbs", href: "/docs/components/ui-breadcrumbs" },
  ]}
/>`,
        },
      ]}
      props={[
        {
          name: "items",
          type: "BreadcrumbItem[]",
          default: "-",
          description: "Trail items with optional href.",
        },
        {
          name: "className",
          type: "string",
          default: "-",
          description: "Extra classes on the nav element.",
        },
      ]}
    />
  )
}
