import { ComponentDoc } from "@/components/component-doc"
import { DemoResume } from "@/components/registry-demos"


export function ResumeDoc() {
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
