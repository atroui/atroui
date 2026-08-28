import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Stagger",
  "/docs/components/motion-stagger",
  "Stagger children on scroll with StaggerChild."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="stagger"
      href="/docs/components/motion-stagger"
      title="Stagger"
      description="Staggered children reveal. Preview plays on mount - use Replay to watch again."
      code={`import { Stagger, StaggerChild } from "@/components/motion/stagger"\n\n<Stagger>\n  <StaggerChild>One</StaggerChild>\n</Stagger>\n\n{/* Docs */}\n<Stagger preview>\n  <StaggerChild>One</StaggerChild>\n</Stagger>`}
    />
  )
}
