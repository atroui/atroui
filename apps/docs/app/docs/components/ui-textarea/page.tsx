import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import {
  DemoTextarea,
  DemoTextareaAutoSize,
  DemoTextareaInvalid,
} from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Textarea",
  "/docs/components/ui-textarea",
  "Multi-line text input styled for AtroUI forms."
)

export default function Page() {
  return (
    <ComponentDoc
      registryName="textarea"
      href="/docs/components/ui-textarea"
      title="Textarea"
      description="Multi-line text input."
      preview={<DemoTextarea />}
      code={'import { Textarea } from "@/components/ui/textarea"\n\n<Textarea placeholder="Message" />'}
      fullBleed={false}
      usage="Reach for Textarea whenever the answer can run past one line - notes, feedback, changelog bodies. Pair it with a real label; the placeholder is a hint, not a name."
      examples={[
        {
          title: "Invalid state",
          tip: "aria-invalid is the only switch you need - the destructive border and ring are already in the base styles. Point aria-describedby at the error text so screen readers announce the reason, not just the failure.",
          preview: <DemoTextareaInvalid />,
          code: `import { Textarea } from "@/components/ui/textarea"

<label htmlFor="notes" className="text-sm font-medium">
  Release notes
</label>
<Textarea
  id="notes"
  aria-invalid
  aria-describedby="notes-error"
  defaultValue="Ship it"
/>
<p id="notes-error" className="text-sm text-destructive">
  Add at least 20 characters.
</p>`,
        },
        {
          title: "Auto-sizing height",
          tip: "field-sizing-content is on by default, so the box grows with the text and rows has no effect. Set the ceiling with max-h plus overflow-y-auto; min-h-16 is the floor.",
          preview: <DemoTextareaAutoSize />,
          code: `import { Textarea } from "@/components/ui/textarea"

<Textarea
  className="max-h-40 overflow-y-auto"
  defaultValue={"Review notes\\n\\n- Tighten the empty state copy"}
/>`,
        },
      ]}
      props={[
        {
          name: "placeholder",
          type: "string",
          default: "-",
          description: "Hint text.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disables input.",
        },
        {
          name: "aria-invalid",
          type: "boolean",
          default: "false",
          description: "Applies the destructive border and ring.",
        },
        {
          name: "className",
          type: "string",
          default: "-",
          description: "Extra classes (e.g. max-h-40 to cap auto-growth).",
        },
      ]}
    />
  )
}
