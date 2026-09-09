import { ComponentDoc } from "@/components/component-doc"
import { DemoScrollArea } from "@/components/registry-demos"

export function UiScrollAreaDoc() {
  return (
    <ComponentDoc
      href="/docs/components/ui-scroll-area"
      registryName="scroll-area"
      title="Scroll Area"
      description="Bounded scroll region with soft-rect thumb that fades when idle."
      preview={<DemoScrollArea />}
      code={`import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

<ScrollArea className="h-48 w-56 rounded-[var(--radius)] border border-border-subtle">
  <div className="p-3">
    {tags.map((tag) => (
      <div key={tag}>
        <div className="text-sm">{tag}</div>
        <Separator className="my-2" />
      </div>
    ))}
  </div>
</ScrollArea>`}
      fullBleed={false}
      usage="Give the root a fixed height (or max-height) so content can overflow. Thumb fades when idle; soft-rect, not a capsule."
    />
  )
}
