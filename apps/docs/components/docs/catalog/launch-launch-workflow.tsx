import Link from "next/link"
import { ComponentDoc } from "@/components/component-doc"
import { DemoLaunchWorkflow } from "@/components/registry-demos"

export function LaunchLaunchWorkflowDoc() {
  return (
    <ComponentDoc
      registryName="launch-workflow"
      href="/docs/components/launch-launch-workflow"
      title="Launch Workflow"
      description="One room for Scope → Planner → Social. Shared ProjectBrief. Preview without keys; AI needs your Host API env."
      preview={<DemoLaunchWorkflow />}
      code={`import { LaunchRoom } from "@/components/blocks/launch-room"

<LaunchRoom />`}
      fullBleed={true}
      usage={
        <>
          Live demo:{" "}
          <Link href="/launch" className="bam-link">
            /launch
          </Link>
          . Guide:{" "}
          <Link href="/docs/guides/launch-workflow" className="bam-link">
            From scope to social card
          </Link>
          . Install pulls Scope, Planner, OG workspace, brief helpers, and Host
          API stubs.
        </>
      }
    />
  )
}
