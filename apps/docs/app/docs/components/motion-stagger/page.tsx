import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoStagger } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Stagger",
  "/docs/components/motion-stagger"
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/motion-stagger"
      title="Stagger"
      description="Staggered children reveal. Preview plays on mount - use Replay to watch again."
      preview={<DemoStagger />}
      code={'import { Stagger, StaggerChild } from "@/components/motion/stagger"\n\n<Stagger>\n  <StaggerChild>One</StaggerChild>\n</Stagger>\n\n{/* Docs */}\n<Stagger preview>\n  <StaggerChild>One</StaggerChild>\n</Stagger>'}
      fullBleed={false}
    />
  )
}
