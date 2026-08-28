import type { Metadata } from "next"
import Content from "@/content/docs/host-api.mdx"
import { DocsMdxPage } from "@/components/docs-mdx"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "Host APIs",
  description:
    "Own the UI in your repo. Borrow the boring API security. Bring your own keys. AtroUI Host APIs for forms, OG, thumbnail, and scope.",
  path: "/docs/host-api",
})

export default function HostApiPage() {
  return (
    <DocsMdxPage href="/docs/host-api" tocRootId="host-api-doc">
      <Content />
    </DocsMdxPage>
  )
}
