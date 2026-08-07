import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoSiteHeaderNarrow } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Site Header Narrow",
  "/docs/components/site-header-narrow",
  "Sticky 640px personal header with mono nav and theme icon."
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/site-header-narrow"
      registryName="site-header-narrow"
      title="Site Header Narrow"
      description="Sticky 640px personal header with mono nav and theme icon."
      preview={<DemoSiteHeaderNarrow />}
      code={'import { SiteHeaderNarrow } from "@/components/blocks/site-header-narrow"\n\n<SiteHeaderNarrow />'}
      fullBleed={true}
      usage="Mount once in the personal layout. Uses ThemeToggleIcon. For studio chrome, see @atroui/site-header."
    />
  )
}
