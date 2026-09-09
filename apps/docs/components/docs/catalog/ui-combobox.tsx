import { ComponentDoc } from "@/components/component-doc"
import { DemoCombobox } from "@/components/registry-demos"

export function UiComboboxDoc() {
  return (
    <ComponentDoc
      href="/docs/components/ui-combobox"
      registryName="combobox"
      title="Combobox"
      description="Filterable select on Base UI with Mira soft-rect, popup settle, and list stagger ≤40ms."
      preview={<DemoCombobox />}
      code={`import {
  Combobox,
  ComboboxClear,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
  ComboboxTrigger,
} from "@/components/ui/combobox"

const fruits = ["Apple", "Banana", "Blueberry", "Cherry", "Mango"]

<Combobox items={fruits}>
  <ComboboxInputGroup>
    <ComboboxInput placeholder="Choose a fruit" />
    <ComboboxClear />
    <ComboboxTrigger />
  </ComboboxInputGroup>
  <ComboboxContent>
    <ComboboxEmpty>No fruits found.</ComboboxEmpty>
    <ComboboxList>
      {(item) => (
        <ComboboxItem key={item} value={item}>
          {item}
          <ComboboxItemIndicator />
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>`}
      fullBleed={false}
      usage="Use when the user must pick from a known set and may filter by typing. Popup settles with menuPopupMotion; rows stagger ≤40ms; item highlight morphs with layoutTween."
    />
  )
}
