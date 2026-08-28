import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Log Preview",
  "/docs/components/log-preview",
  "Recent log entries band with view-all link."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="log-preview"
      href="/docs/components/log-preview"
      title="Log Preview"
      description="Recent log entries band with view-all link."
      fullBleed
      usage="Pair with Changelog for the full log page."
      code={`import { LogPreview } from "@/components/blocks/log-preview"\n\n<LogPreview />`}
    />
  )
}
