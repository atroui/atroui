import { ComponentDoc } from "@/components/component-doc"
import { DemoTabs } from "@/components/registry-demos"


export function UiTabsDoc() {
  return (
    <ComponentDoc
      href="/docs/components/ui-tabs"
      registryName="tabs"
      title="Tabs"
      description="Tabs with morphing indicator — Family Values continuity signature."
      preview={<DemoTabs />}
      code={`import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="activity">Activity</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview panel</TabsContent>
  <TabsContent value="activity">Activity panel</TabsContent>
</Tabs>`}
      fullBleed={false}
      usage="The active pill lives on TabsTrigger via layoutId — it morphs between peers. Prefer tabs for peer views, not deep hierarchy."
    />
  )
}
