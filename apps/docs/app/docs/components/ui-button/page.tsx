import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Button",
  "/docs/components/ui-button",
  "Primary action control with variants and sizes."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="button"
      href="/docs/components/ui-button"
      title="Button"
      description="Primary action control with variants and sizes."
      usage="Prefer one primary button per view. Use outline/ghost for secondary actions; destructive sparingly."
      props={[
        {
          name: "variant",
          type: "'default' | 'outline' | 'secondary' | 'ghost' | 'destructive' | 'link'",
          default: "'default'",
          description: "Visual style.",
        },
        {
          name: "size",
          type: "'default' | 'xs' | 'sm' | 'lg' | 'icon' | …",
          default: "'default'",
          description: "Control size.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disables the button.",
        },
      ]}
      code={`import { Button } from "@/components/ui/button"\n\n<Button>Continue</Button>\n<Button variant="outline" size="sm">Cancel</Button>`}
    />
  )
}
