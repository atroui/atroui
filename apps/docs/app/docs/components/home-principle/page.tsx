import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoHomePrinciple } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Principle",
  "/docs/components/home-principle"
)

export default function Page() {
  return (
    <ComponentDoc
      title='Principle'
      description='Studio principles section.'
      preview={<DemoHomePrinciple />}
      code={'import { HomePrinciple } from "atroui"\n\n<HomePrinciple />'}
      fullBleed={true}
      installation='import { HomePrinciple } from "atroui"'
    />
  )
}
