import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

/**
 * Load Inter TTFs for Satori. Supports unbundled Node (import.meta.url) and
 * Next.js monorepo builds where webpack rewrites import.meta.url.
 */
export function loadOgFonts(): { bold: Buffer; medium: Buffer } {
  const bold = readFont("Inter-Bold.ttf")
  const medium = readFont("Inter-Medium.ttf")
  return { bold, medium }
}

function readFont(filename: string): Buffer {
  const candidates: string[] = []

  try {
    candidates.push(
      fileURLToPath(new URL(`./fonts/${filename}`, import.meta.url)),
    )
  } catch {
    // ignore
  }

  try {
    candidates.push(
      fileURLToPath(new URL(`../og/fonts/${filename}`, import.meta.url)),
    )
  } catch {
    // ignore
  }

  const cwd = process.cwd()
  candidates.push(
    path.join(cwd, "packages/ui/src/lib/og/fonts", filename),
    path.join(cwd, "../../packages/ui/src/lib/og/fonts", filename),
    path.join(cwd, "../packages/ui/src/lib/og/fonts", filename),
    path.join(cwd, "node_modules/atroui/src/lib/og/fonts", filename),
    path.join(cwd, "../../node_modules/atroui/src/lib/og/fonts", filename),
  )

  for (const candidate of candidates) {
    try {
      if (fs.existsSync(candidate)) {
        return fs.readFileSync(candidate)
      }
    } catch {
      // try next
    }
  }

  throw new Error(
    `AtroUI font not found: ${filename}. Tried:\n${candidates.join("\n")}`,
  )
}
