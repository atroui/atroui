import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { ComponentPreview } from "@/components/component-preview"
import { ButtonDemo, ButtonSizesDemo } from "@/components/demos"

export const metadata: Metadata = {
  title: "Button",
}

export default function Page() {
  return (
    <ComponentDoc
      title="Button"
      description="Triggers actions and navigations with multiple visual variants and sizes."
      preview={<ButtonDemo />}
      code={"import { Button } from \"@meridian/ui\"\n\nexport function Example() {\n  return <Button>Click me</Button>\n}"}
      usage="Use the default variant for primary actions. Prefer outline or ghost for secondary actions to reduce visual noise. Avoid multiple primary buttons in the same view."
      props={[
    { name: "variant", type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'", default: "'default'", description: "Visual style of the button." },
    { name: "size", type: "'default' | 'sm' | 'lg' | 'icon'", default: "'default'", description: "Controls height and padding." },
    { name: "asChild", type: "boolean", default: "false", description: "Merge props onto the child element via Slot." },
    { name: "disabled", type: "boolean", default: "false", description: "Disables interaction and dims the control." },
      ]}
      extra={
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Sizes</h2>
          <ComponentPreview>
            <ButtonSizesDemo />
          </ComponentPreview>
        </section>
      }
    />
  )
}
