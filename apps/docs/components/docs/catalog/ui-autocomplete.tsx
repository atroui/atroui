import { ComponentDoc } from "@/components/component-doc"
import { DemoAutocomplete } from "@/components/registry-demos"

export function UiAutocompleteDoc() {
  return (
    <ComponentDoc
      href="/docs/components/ui-autocomplete"
      registryName="autocomplete"
      title="Autocomplete"
      description="Suggest-as-you-type with popup settle, layoutId highlight, and list stagger ≤40ms."
      preview={<DemoAutocomplete />}
      code={`import {
  Autocomplete,
  AutocompleteClear,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteList,
  AutocompleteTrigger,
} from "@/components/ui/autocomplete"

const tags = ["motion", "registry", "scope", "og", "host-api"]

<Autocomplete items={tags}>
  <AutocompleteInputGroup>
    <AutocompleteInput placeholder="Search tags" />
    <AutocompleteClear />
    <AutocompleteTrigger />
  </AutocompleteInputGroup>
  <AutocompleteContent>
    <AutocompleteEmpty>No tags found.</AutocompleteEmpty>
    <AutocompleteList>
      {(item) => (
        <AutocompleteItem key={item} value={item}>
          {item}
        </AutocompleteItem>
      )}
    </AutocompleteList>
  </AutocompleteContent>
</Autocomplete>`}
      fullBleed={false}
      usage="Use for free-text entry with suggestions. Filters as you type; popup settle + list stagger match Combobox."
    />
  )
}
