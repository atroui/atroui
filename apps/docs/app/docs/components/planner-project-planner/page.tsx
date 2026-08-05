import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoProjectPlanner } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Project Planner",
  "/docs/components/planner-project-planner"
)

export default function Page() {
  return (
    <ComponentDoc
      title="Project Planner"
      description="Client-side project planner. Routes into /contact with query params - no generation API."
      preview={<DemoProjectPlanner />}
      code={'import { ProjectPlanner } from "atroui"\n\n<ProjectPlanner />'}
      fullBleed={true}
      installation='import { ProjectPlanner } from "atroui"'
      usage="Fully client-side. Expect host routes like /contact (and /planner) to exist when CTAs navigate."
    />
  )
}
