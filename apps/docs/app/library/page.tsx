import type { Metadata } from "next"
import { LibraryApp } from "@/components/workbench/library-app"
import { catalogCount } from "@/lib/catalog"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "Components",
  description: `Browse ${catalogCount} AtroUI components. Preview live, then install with the shadcn CLI.`,
  path: "/library",
})

export default function LibraryPage() {
  return (
    <main>
      <LibraryApp />
    </main>
  )
}