import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

/**
 * Load Inter TTFs for Satori.
 *
 * On Vercel, fonts must be in the serverless file trace. Prefer:
 * 1) fonts next to this module (package / traced chunk)
 * 2) apps/docs/lib/og-fonts (docs Host API, NFT-friendly cwd path)
 * 3) monorepo / node_modules fallbacks for local dev
 */
export function loadOgFonts(): { bold: Buffer; medium: Buffer } {
  const bold = readFont("Inter-Bold.ttf")
  const medium = readFont("Inter-Medium.ttf")
  return { bold, medium }
}

function readFont(filename: string): Buffer {
  const candidates: string[] = []

  // Static relative joins help Node File Trace include the files.
  try {
    const here = path.dirname(fileURLToPath(import.meta.url))
    candidates.push(path.join(here, "fonts", filename))
    candidates.push(path.join(here, "../og/fonts", filename))
  } catch {
    // ignore
  }

  const cwd = process.cwd()
  candidates.push(
    // Docs Host API: apps/docs/lib/og-fonts (traced via assert-docs-og-fonts)
    path.join(cwd, "lib/og-fonts", filename),
    path.join(cwd, "apps/docs/lib/og-fonts", filename),
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
