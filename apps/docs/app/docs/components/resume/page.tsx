import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Resume",
  "/docs/components/resume",
  "Printable resume layout with experience, skills, and projects."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="resume"
      href="/docs/components/resume"
      title="Resume"
      description="Printable resume layout with experience, skills, and projects."
      fullBleed
      usage="Edit CONTENT after install. Print styles hide chrome via .resume-print."
      code={`import { Resume } from "@/components/blocks/resume"\n\n<Resume />`}
    />
  )
}
