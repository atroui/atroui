import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { INTER_BOLD, INTER_MEDIUM } from "./font-data"

/**
 * Load Inter TTFs for Satori.
 *
 * Prefer embedded buffers (font-data.ts) so Vercel / serverless Host APIs
 * never depend on NFT packing TTF files next to rewritten import.meta.url.
 * Filesystem candidates remain for local debugging / consumers who vendor fonts.
 */
export function loadOgFonts(): { bold: Buffer; medium: Buffer } {
  return {
    bold: readFont("Inter-Bold.ttf", INTER_BOLD),
    medium: readFont("Inter-Medium.ttf", INTER_MEDIUM),
  }
}

function readFont(filename: string, embedded: Buffer): Buffer {
  const fromDisk = tryReadFontFromDisk(filename)
  return fromDisk ?? embedded
}

function tryReadFontFromDisk(filename: string): Buffer | null {
  const candidates: string[] = []

  try {
    const here = path.dirname(fileURLToPath(import.meta.url))
    candidates.push(path.join(here, "fonts", filename))
    candidates.push(path.join(here, "../og/fonts", filename))
  } catch {
    // ignore
  }

  const cwd = process.cwd()
  candidates.push(
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

  return null
}
