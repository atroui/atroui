import { ComponentDoc } from "@/components/component-doc"
import { DemoSeparator } from "@/components/registry-demos"

export function UiSeparatorDoc() {
  return (
    <ComponentDoc
      href="/docs/components/ui-separator"
      registryName="separator"
      title="Separator"
      description="Soft-rect hairline divider — static, no decorative motion."
      preview={<DemoSeparator />}
      code={`import { Separator } from "@/components/ui/separator"

<div className="flex w-full max-w-xs flex-col gap-3">
  <p className="text-sm">Above</p>
  <Separator />
  <p className="text-sm text-muted-foreground">Below</p>
</div>`}
      fullBleed={false}
      usage={
        'Use a hairline to group peers. Prefer horizontal in stacks; set orientation="vertical" in toolbars. No motion.'
      }
    />
  )
}
