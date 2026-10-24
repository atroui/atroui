import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import path from "node:path"
import * as p from "@clack/prompts"
import type { RegistryFile, RegistryItem } from "./types.js"

export type WriteResult = {
  written: string[]
  skipped: string[]
}

/**
 * Resolve a registry file target under writeRoot.
 * Rejects absolute paths and any target that escapes writeRoot (path traversal).
 */
export function resolveTargetPath(
  file: RegistryFile,
  writeRoot: string
): string {
  const target = file.target || path.basename(file.path)

  if (path.isAbsolute(target)) {
    throw new Error(
      `Refusing absolute registry target "${target}" — targets must be relative to the project write root.`
    )
  }

  const root = path.resolve(writeRoot)
  const dest = path.resolve(root, target)
  const rel = path.relative(root, dest)

  if (rel.startsWith("..") || path.isAbsolute(rel)) {
    throw new Error(
      `Refusing registry target "${target}" — path escapes write root.`
    )
  }

  return dest
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

    let dest: string
    try {
      dest = resolveTargetPath(file, writeRoot)
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      throw new Error(`${item.name}: ${message}`)
    }
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
