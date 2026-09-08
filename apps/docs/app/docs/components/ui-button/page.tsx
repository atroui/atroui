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
      code={`import { Button } from "@/components/ui/button"

<Button>Continue</Button>
<Button variant="outline" size="sm">Cancel</Button>`}
      fullBleed={false}
      usage="Use for the primary action in a view. Keep one default (filled) button per surface; put secondary actions on outline or ghost. Reach for destructive only when the click removes data."
      examples={[
        {
          title: "With icon",
          tip: 'Mark the icon with data-icon="inline-start" or "inline-end" so the button tightens padding on that side.',
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
          type: "'default' | 'xs' | 'sm' | 'lg' | 'icon' | 'icon-xs' | 'icon-sm' | 'icon-lg'",
          default: "'default'",
          description: "Control size, including square icon sizes.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disables the button.",
        },
        {
          name: "asChild",
          type: "boolean",
          default: "false",
          description: "Render as child (e.g. Next.js Link) via Slot.",
        },
      ]}
    />
  )
}
