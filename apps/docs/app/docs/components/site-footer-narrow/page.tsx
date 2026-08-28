import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Site Footer Narrow",
  "/docs/components/site-footer-narrow",
  "Quiet personal footer with tagline and link grid."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="site-footer-narrow"
      href="/docs/components/site-footer-narrow"
      title="Site Footer Narrow"
      description="Quiet personal footer with tagline and link grid."
      fullBleed
      usage="Pair with SiteHeaderNarrow. For marketing footers, see @atroui/site-footer or @atroui/footer-bold."
      code={`import { SiteFooterNarrow } from "@/components/blocks/site-footer-narrow"\n\n<SiteFooterNarrow />`}
    />
  )
}
