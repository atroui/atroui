import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

/**
 * Docs-app OG fonts live next to this module so Node File Trace can see:
 *   path.join(dirname(import.meta.url), "og-fonts", "*.ttf")
 * That is what gets the TTFs into the Vercel serverless bundle.
 */
const FONT_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), "og-fonts")

export function docsOgFontPath(filename: "Inter-Bold.ttf" | "Inter-Medium.ttf"): string {
  return path.join(FONT_DIR, filename)
}

export function readDocsOgFont(
  filename: "Inter-Bold.ttf" | "Inter-Medium.ttf",
): Buffer {
  return fs.readFileSync(docsOgFontPath(filename))
}

/** Call once from /api/generate so the route graph includes the font reads. */
export function assertDocsOgFontsPresent(): void {
  readDocsOgFont("Inter-Bold.ttf")
  readDocsOgFont("Inter-Medium.ttf")
}
