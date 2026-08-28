import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Site Header Narrow",
  "/docs/components/site-header-narrow",
  "Sticky 640px personal header with mono nav and theme icon."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="site-header-narrow"
      href="/docs/components/site-header-narrow"
      title="Site Header Narrow"
      description="Sticky 640px personal header with mono nav and theme icon."
      fullBleed
      usage="Mount once in the personal layout. Uses ThemeToggleIcon. For studio chrome, see @atroui/site-header."
      code={`import { SiteHeaderNarrow } from "@/components/blocks/site-header-narrow"\n\n<SiteHeaderNarrow />`}
    />
  )
}
