import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import path from "node:path"
import * as p from "@clack/prompts"
import type { RegistryFile, RegistryItem } from "./types.js"

export type WriteResult = {
  written: string[]
  skipped: string[]
}

function resolveTargetPath(
  file: RegistryFile,
  writeRoot: string,
  cwd: string
): string {
  const target = file.target || path.basename(file.path)
  // Absolute-ish targets from registry are relative to writeRoot (src/ or project root)
  return path.join(writeRoot, target)
}

export async function writeItemFiles(
  item: RegistryItem,
  writeRoot: string,
  cwd: string,
  opts: { overwrite?: boolean; yes?: boolean } = {}
): Promise<WriteResult> {
  const written: string[] = []
  const skipped: string[] = []

  for (const file of item.files ?? []) {
    if (!file.content) {
      p.log.warn(`Skipping ${file.path}: no content in registry item`)
      continue
    }

    const dest = resolveTargetPath(file, writeRoot, cwd)
    const rel = path.relative(cwd, dest)

    if (existsSync(dest) && !opts.overwrite) {
      if (opts.yes) {
        skipped.push(rel)
        continue
      }
      const action = await p.select({
        message: `${rel} already exists`,
        options: [
          { value: "skip", label: "Skip" },
          { value: "overwrite", label: "Overwrite" },
        ],
      })
      if (p.isCancel(action) || action === "skip") {
        skipped.push(rel)
        continue
      }
    }

    mkdirSync(path.dirname(dest), { recursive: true })
    writeFileSync(dest, file.content, "utf8")
    written.push(rel)
  }

  return { written, skipped }
}
