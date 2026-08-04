import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoProjectPlanner } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Project Planner',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Project Planner'
      description='Project planning workspace.'
      preview={<DemoProjectPlanner />}
      code={'import { ProjectPlanner } from "@meridian/ui"\n\n<ProjectPlanner />'}
      fullBleed={true}
      installation='import { ProjectPlanner } from "@meridian/ui"'
    />
  )
}
