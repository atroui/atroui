import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoResume } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Resume",
  "/docs/components/resume",
  "Printable resume layout with experience, skills, and projects."
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/resume"
      registryName="resume"
      title="Resume"
      description="Printable resume layout with experience, skills, and projects."
      preview={<DemoResume />}
      code={'import { Resume } from "@/components/blocks/resume"\n\n<Resume />'}
      fullBleed={true}
      usage="Edit CONTENT after install. Print styles hide chrome via .resume-print."
    />
  )
}
