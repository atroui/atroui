import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import {
  DemoButton,
  DemoButtonIconOnly,
  DemoButtonWithIcon,
} from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Button",
  "/docs/components/ui-button",
  "Primary action control with variants and sizes."
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/ui-button"
      registryName="button"
      title="Button"
      description="Primary action control with variants and sizes."
      preview={<DemoButton />}
      code={'import { Button } from "@/components/ui/button"\n\n<Button>Continue</Button>\n<Button variant="outline" size="sm">Cancel</Button>'}
      fullBleed={false}
      usage="Prefer one primary button per view. Use outline/ghost for secondary actions; destructive sparingly."
      examples={[
        {
          title: "With icon",
          tip: "Mark the icon with data-icon=\"inline-start\" or \"inline-end\" so the button tightens the padding on that side.",
          preview: <DemoButtonWithIcon />,
          code: `import { ArrowRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

<Button>
  <Plus data-icon="inline-start" />
  New project
</Button>
<Button variant="outline">
  Continue
  <ArrowRight data-icon="inline-end" />
</Button>`,
        },
        {
          title: "Icon only",
          tip: "Square icon sizes drop the label, so always pass an aria-label.",
          preview: <DemoButtonIconOnly />,
          code: `import { Settings2 } from "lucide-react"
import { Button } from "@/components/ui/button"

<Button size="icon-sm" variant="outline" aria-label="Settings">
  <Settings2 />
</Button>
<Button size="icon" variant="secondary" aria-label="Settings">
  <Settings2 />
</Button>`,
        },
      ]}
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
    />
  )
}
