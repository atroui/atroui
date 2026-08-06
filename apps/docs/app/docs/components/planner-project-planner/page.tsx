import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoProjectPlanner } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Project Planner",
  "/docs/components/planner-project-planner",
  "Client-side project planner. Routes into /contact with query params - no generation API."
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/planner-project-planner"
      title="Project Planner"
      description="Client-side project planner. Routes into /contact with query params - no generation API."
      preview={<DemoProjectPlanner />}
      code={'import { ProjectPlanner } from "@/components/planner/project-planner"\n\n<ProjectPlanner />'}
      fullBleed={true}
      usage="Fully client-side. Expect host routes like /contact (and /planner) to exist when CTAs navigate."
    />
  )
}
