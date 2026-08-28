import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Project Planner",
  "/docs/components/planner-project-planner",
  "Client-side project planner. Routes into /contact with query params - no generation API."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="project-planner"
      href="/docs/components/planner-project-planner"
      title="Project Planner"
      description="Client-side project planner. Routes into /contact with query params - no generation API."
      fullBleed
      code={`import { ProjectPlanner } from "@/components/blocks/project-planner"\n\n<ProjectPlanner />`}
    />
  )
}
