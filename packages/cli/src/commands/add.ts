import path from "node:path"
import * as p from "@clack/prompts"
import pc from "picocolors"
import { fetchCatalog } from "../lib/registry.js"
import { installMissingDeps } from "../lib/install-deps.js"
import { resolveWriteRoot } from "../lib/project.js"
import {
  collectNpmDependencies,
  resolveTree,
} from "../lib/resolve-tree.js"
import { DEFAULT_REGISTRY_BASE, normalizeItemName } from "../lib/types.js"
import { writeItemFiles } from "../lib/write-files.js"

export type AddOptions = {
  path?: string
  yes?: boolean
  overwrite?: boolean
  registry?: string
}

export async function addCommand(
  names: string[],
  options: AddOptions
): Promise<void> {
  const baseUrl = options.registry ?? DEFAULT_REGISTRY_BASE
  const cwd = process.cwd()

  p.intro(pc.bgCyan(pc.black(" AtroUI ")))

  let selected = names.map(normalizeItemName).filter(Boolean)

  if (selected.length === 0) {
    const spinner = p.spinner()
    spinner.start("Loading catalog…")
    let catalog
    try {
      catalog = await fetchCatalog(baseUrl)
      spinner.stop(`Catalog: ${catalog.items.length} items`)
    } catch (err) {
      spinner.stop("Failed to load catalog")
      throw err
    }

    const picks = await p.multiselect({
      message: "Select components to add",
      options: catalog.items.map((item) => ({
        value: item.name,
        label: item.title ? `${item.name} · ${item.title}` : item.name,
        hint: item.description,
      })),
      required: true,
    })

    if (p.isCancel(picks)) {
      p.cancel("Cancelled.")
      process.exit(0)
    }
    selected = picks as string[]
  }

  const spinner = p.spinner()
  spinner.start("Resolving registry tree…")

  let items
  try {
    items = await resolveTree(selected, baseUrl)
    spinner.stop(
      `Resolved ${items.length} item(s): ${items.map((i) => i.name).join(", ")}`
    )
  } catch (err) {
    spinner.stop("Resolve failed")
    throw err
  }

  const root = options.path
    ? path.resolve(cwd, options.path)
    : resolveWriteRoot(cwd)

  for (const item of items) {
    const result = await writeItemFiles(item, root, cwd, {
      overwrite: options.overwrite,
      yes: options.yes,
    })
    for (const file of result.written) {
      p.log.success(`Wrote ${pc.green(file)}`)
    }
    for (const file of result.skipped) {
      p.log.warn(`Skipped ${pc.dim(file)}`)
    }
  }

  const npmDeps = collectNpmDependencies(items)
  await installMissingDeps(npmDeps, cwd, { yes: options.yes })

  p.outro(
    pc.cyan("Done. Edit CONTENT (or the source) in your repo. You own the files.")
  )
}
