import type { Metadata } from "next"
import Content from "@/content/docs/guides/launch-workflow.mdx"
import { DocsMdxPage } from "@/components/docs-mdx"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "From scope to social card",
  description:
    "AtroUI launch workflow: Scope Chat → Project Planner → OG / Thumbnail with a shared ProjectBrief. BYOK Host APIs; preview works without keys.",
  path: "/docs/guides/launch-workflow",
})

export default function LaunchWorkflowGuidePage() {
  return (
    <DocsMdxPage href="/docs/guides/launch-workflow" tocRootId="guides-launch-workflow-doc">
      <Content />
    </DocsMdxPage>
  )
}
