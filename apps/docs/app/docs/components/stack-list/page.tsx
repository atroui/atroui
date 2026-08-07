import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoStackList } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Stack List",
  "/docs/components/stack-list",
  "Sectioned tools/stack definition list."
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/stack-list"
      registryName="stack-list"
      title="Stack List"
      description="Sectioned tools/stack definition list."
      preview={<DemoStackList />}
      code={'import { StackList } from "@/components/blocks/stack-list"\n\n<StackList />'}
      fullBleed={true}
      usage="Edit SECTIONS after install for everyday / ship tools."
    />
  )
}
