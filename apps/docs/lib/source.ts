import { docs } from "@/.source"
import { loader, type Source } from "fumadocs-core/source"

const raw = docs.toFumadocsSource() as Source & {
  files: Source["files"] | (() => Source["files"])
}
const files = typeof raw.files === "function" ? raw.files() : raw.files

export const source = loader({
  baseUrl: "/docs",
  source: { files },
})
