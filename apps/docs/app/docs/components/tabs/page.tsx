import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { TabsDemo } from "@/components/demos"

export const metadata: Metadata = {
  title: "Tabs",
}

export default function Page() {
  return (
    <ComponentDoc
      title="Tabs"
      description="Switch between related views in the same context."
      preview={<TabsDemo />}
      code={"import { Tabs, TabsList, TabsTrigger, TabsContent } from \"@meridian/ui\"\n\nexport function Example() {\n  return (\n    <Tabs defaultValue=\"one\">\n      <TabsList>\n        <TabsTrigger value=\"one\">One</TabsTrigger>\n        <TabsTrigger value=\"two\">Two</TabsTrigger>\n      </TabsList>\n      <TabsContent value=\"one\">First panel</TabsContent>\n      <TabsContent value=\"two\">Second panel</TabsContent>\n    </Tabs>\n  )\n}"}
      usage="Keep tab labels short. Prefer tabs for peer content, not for multi-step workflows."
      props={[
    { name: "value", type: "string", default: "—", description: "Controlled active tab." },
    { name: "defaultValue", type: "string", default: "—", description: "Uncontrolled initial tab." },
    { name: "onValueChange", type: "(value) => void", default: "—", description: "Called when the active tab changes." },
      ]}
    />
  )
}
