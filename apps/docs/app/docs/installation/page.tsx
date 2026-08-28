import type { Metadata } from "next"
import Content from "@/content/docs/installation.mdx"
import { DocsMdxPage } from "@/components/docs-mdx"
import { docsPageMetadata } from "@/lib/docs-metadata"
import { getPseoPage } from "@/lib/pseo"

export const metadata: Metadata = docsPageMetadata({
  title: "Installation",
  description:
    "Add AtroUI with the shadcn CLI. You own the copied files. Tailwind v4. Public @atroui. Host APIs optional and BYOK.",
  path: "/docs/installation",
})

export default function InstallationPage() {
  const pseo = getPseoPage("/docs/installation")

  return (
    <DocsMdxPage href="/docs/installation" tocRootId="installation-doc">
      <Content pseo={pseo} />
    </DocsMdxPage>
  )
}
