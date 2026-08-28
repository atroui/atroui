import { docs } from "@/.source"
import { loader } from "fumadocs-core/source"

const mdxSource = docs.toFumadocsSource()
// fumadocs-mdx 11 exposes files as a getter fn; fumadocs-core 15 loader expects an array.
const files =
  typeof mdxSource.files === "function"
    ? mdxSource.files()
    : mdxSource.files

export const source = loader({
  baseUrl: "/docs",
  source: { files },
})
