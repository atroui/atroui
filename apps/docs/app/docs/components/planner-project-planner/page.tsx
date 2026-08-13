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
      registryName="project-planner"
      href="/docs/components/planner-project-planner"
      title="Project Planner"
      description="Client-side project planner. Routes into /contact with query params - no generation API."
      preview={<DemoProjectPlanner />}
      code={'import { ProjectPlanner } from "@/components/blocks/project-planner"\n\n<ProjectPlanner />'}
      fullBleed={true}
      usage={
        <>
          Fully client-side. On the estimate step,{" "}
          <strong className="font-medium text-foreground">Preview social card</strong>{" "}
          opens the OG workspace with the recommendation prefilled (
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            @atroui/project-brief
          </code>
          ). Guide:{" "}
          <a href="/docs/guides/launch-workflow" className="bam-link">
            From scope to social card
          </a>
          .
        </>
      }
  )
}
