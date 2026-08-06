import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoHomeWork } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Work",
  "/docs/components/home-work",
  "Selected work section."
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/home-work"
      registryName="home-work"
      title="Work"
      description="Selected work section."
      preview={<DemoHomeWork />}
      code={'import { HomeWork } from "@/components/blocks/home-work"\n\n<HomeWork />'}
      fullBleed={true}
    />
  )
}
