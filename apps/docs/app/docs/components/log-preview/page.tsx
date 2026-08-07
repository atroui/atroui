import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoLogPreview } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Log Preview",
  "/docs/components/log-preview",
  "Recent log entries band with view-all link."
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/log-preview"
      registryName="log-preview"
      title="Log Preview"
      description="Recent log entries band with view-all link."
      preview={<DemoLogPreview />}
      code={'import { LogPreview } from "@/components/blocks/log-preview"\n\n<LogPreview />'}
      fullBleed={true}
      usage="Pair with Changelog for the full log page."
    />
  )
}
