import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { catalogCount } from "@/lib/catalog"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "Components",
  description: `Browse ${catalogCount} AtroUI components. The live library lives at /library.`,
  path: "/docs/components",
})

/** Old catalog index — the library is the product now. */
export default function ComponentsIndexPage() {
  redirect("/library")
}
