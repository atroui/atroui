import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoHomeLab } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Lab",
  "/docs/components/home-lab"
)

export default function Page() {
  return (
    <ComponentDoc
      registryName="home-lab"
      title='Lab'
      description='Lab / experiments section from the homepage.'
      preview={<DemoHomeLab />}
      code={'import { HomeLab } from "atroui"\n\n<HomeLab />'}
      fullBleed={true}
    />
  )
}
