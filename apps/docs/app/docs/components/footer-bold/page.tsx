import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoBoldFooter } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Footer Bold",
  "/docs/components/footer-bold"
)

export default function Page() {
  return (
    <ComponentDoc
      title='Footer Bold'
      description='Bold marketing footer with links and brand mark.'
      preview={<DemoBoldFooter />}
      code={'import { BoldFooter } from "atroui"\n\n<BoldFooter />'}
      fullBleed={true}
      installation='import { BoldFooter } from "atroui"'
    />
  )
}
