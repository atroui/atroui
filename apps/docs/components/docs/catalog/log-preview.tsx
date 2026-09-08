import { ComponentDoc } from "@/components/component-doc"
import { DemoLogPreview } from "@/components/registry-demos"


export function LogPreviewDoc() {
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
