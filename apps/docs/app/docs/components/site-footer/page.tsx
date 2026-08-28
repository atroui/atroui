import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Site Footer",
  "/docs/components/site-footer",
  "Lighter marketing footer with brand blurb, link columns, and legal row."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="site-footer"
      href="/docs/components/site-footer"
      title="Site Footer"
      description="Lighter marketing footer with brand blurb, link columns, and legal row."
      fullBleed
      usage="Quiet chrome for docs and product pages. For a loud CTA + giant wordmark footer, use @atroui/footer-bold instead. For narrow personal chrome, use @atroui/site-footer-narrow."
      code={`import { SiteFooter } from "@/components/blocks/site-footer"\n\n<SiteFooter />`}
    />
  )
}
