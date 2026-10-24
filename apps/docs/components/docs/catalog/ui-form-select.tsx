import { ComponentDoc } from "@/components/component-doc"
import {
  DemoFormSelect,
  DemoFormSelectLabelled,
} from "@/components/registry-demos"


export function UiFormSelectDoc() {
  return (
    <ComponentDoc
      registryName="form-select"
      href="/docs/components/ui-form-select"
      title="Form Select"
      description="Soft-rect select on Base UI with caret rotate, popup settle, and list stagger ≤40ms."
      preview={<DemoFormSelect />}
      code={`import { FormSelect } from "@/components/ui/form-select"

const [stack, setStack] = useState("")

<FormSelect
  value={stack}
  onValueChange={setStack}
  placeholder="Pick a stack"
  options={[
    { value: "next", label: "Next.js" },
    { value: "remix", label: "Remix" },
    { value: "astro", label: "Astro" },
  ]}
/>`}
      fullBleed={false}
      usage="Use for a short list of known options — roughly three to a dozen. Popup settles with menuPopupMotion; rows stagger ≤40ms; highlight morphs via layoutId. Value is fully controlled."
      examples={[
        {
          title: "Label and disabled state",
          tip: "id lands on the trigger button, so htmlFor on a real label points at it. The placeholder is a hint, never a name - a field with only a placeholder is unlabelled for screen readers. disabled dims the trigger and blocks the popup; keep value at \"\" so the placeholder still explains why.",
          preview: <DemoFormSelectLabelled />,
          code: `import { FormSelect } from "@/components/ui/form-select"

<label htmlFor="plan" className="text-sm font-medium">
  Plan
</label>
<FormSelect
  id="plan"
  value={plan}
  onValueChange={setPlan}
  options={[
    { value: "free", label: "Free" },
    { value: "pro", label: "Pro" },
    { value: "team", label: "Team" },
  ]}
/>

<label htmlFor="region" className="text-sm font-medium">
  Region
</label>
<FormSelect
  id="region"
  disabled
  value=""
  onValueChange={() => {}}
  placeholder="Chosen by your plan"
  options={[{ value: "iad", label: "Washington, D.C." }]}
/>`,
        },
      ]}
      props={[
        {
          name: "value",
          type: "string",
          default: "-",
          description: 'Controlled value. "" shows the placeholder.',
        },
        {
          name: "onValueChange",
          type: "(value: string) => void",
          default: "-",
          description: "Change handler.",
        },
        {
          name: "options",
          type: "{ value, label }[]",
          default: "-",
          description: "Selectable options.",
        },
        {
          name: "placeholder",
          type: "string",
          default: '"Choose…"',
          description: "Shown while no option is selected.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Dims the trigger and blocks the popup.",
        },
        {
          name: "id",
          type: "string",
          default: "-",
          description: "Forwarded to the trigger so a label can target it.",
        },
        {
          name: "className",
          type: "string",
          default: "-",
          description: "Extra classes on the trigger.",
        },
      ]}
    />
  )
}
