import { ComponentDoc } from "@/components/component-doc"
import { DemoProjectList } from "@/components/registry-demos"


export function ProjectListDoc() {
  return (
    <ComponentDoc
      href="/docs/components/project-list"
      registryName="project-list"
      title="Project List"
      description="Hairline project list with tags and optional view-all."
      preview={<DemoProjectList />}
      code={'import { ProjectList } from "@/components/blocks/project-list"\n\n<ProjectList />'}
      fullBleed={true}
      usage="Edit PROJECTS after install. Limit controls how many show."
    />
  )
}
