import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Project List",
  "/docs/components/project-list",
  "Hairline project list with tags and optional view-all."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="project-list"
      href="/docs/components/project-list"
      title="Project List"
      description="Hairline project list with tags and optional view-all."
      fullBleed
      usage="Edit PROJECTS after install. Limit controls how many show."
      code={`import { ProjectList } from "@/components/blocks/project-list"\n\n<ProjectList />`}
    />
  )
}
