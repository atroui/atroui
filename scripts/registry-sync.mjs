#!/usr/bin/env node
/**
 * Mirror rule: packages/ui owns theme/UI sources; apps/docs/registry/default is a Mirror.
 * Edit the package, then `pnpm registry:sync`. CI runs `pnpm registry:sync:check`.
 *
 * After copy, package-relative `../lib` / `../components` imports are rewritten to
 * consumer `@/` style so installables match the rest of the catalog.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join, relative } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")

/**
 * PAIRS: package source → registry mirror.
 *
 * theme.ts — Host/docs mirror only (docs demos / host facade sync). Not a catalog
 * SKU: do not add a registry.json item for it.
 *
 * Registry-owned exceptions (not mirrored; keep `@/` imports for consumers):
 *   - theme-toggle.tsx
 *   - radius-theme-picker.tsx
 *
 * Unguarded dual trees (exist under packages/ui and registry/default with the
 * same intent, but not in PAIRS — maintainers must sync by hand until promoted):
 *   - lib/motion.ts
 *   - lib/adaptive-theme.ts
 *   - lib/project-brief.ts
 *
 * @type {Array<[string, string]>} package-relative → registry-relative
 */
const PAIRS = [
  ["packages/ui/src/lib/utils.ts", "apps/docs/registry/default/lib/utils.ts"],
  ["packages/ui/src/lib/color-themes.ts", "apps/docs/registry/default/lib/color-themes.ts"],
  ["packages/ui/src/lib/surface-themes.ts", "apps/docs/registry/default/lib/surface-themes.ts"],
  ["packages/ui/src/lib/radius-themes.ts", "apps/docs/registry/default/lib/radius-themes.ts"],
  ["packages/ui/src/lib/type-themes.ts", "apps/docs/registry/default/lib/type-themes.ts"],
  ["packages/ui/src/lib/theme-boot.ts", "apps/docs/registry/default/lib/theme-boot.ts"],
  ["packages/ui/src/lib/theme-export.ts", "apps/docs/registry/default/lib/theme-export.ts"],
  ["packages/ui/src/lib/theme.ts", "apps/docs/registry/default/lib/theme.ts"],
  [
    "packages/ui/src/components/ui/color-theme-picker.tsx",
    "apps/docs/registry/default/ui/color-theme-picker.tsx",
  ],
]

const check = process.argv.includes("--check")

/**
 * Rewrite package-relative lib/components imports to consumer `@/` style.
 * Same-directory `./foo` and other relatives are left alone.
 *
 *   from "../../lib/X" | from "../lib/X"  → from "@/lib/X"
 *   from "../../components/…"            → from "@/components/…"
 * Also covers `export … from` and dynamic `import("…")`.
 *
 * @param {string} source
 * @returns {string}
 */
function rewriteConsumerImports(source) {
  return source.replace(
    /((?:from\s+|import\s*\(\s*)["'])(?:\.\.\/)+(lib|components)\//g,
    "$1@/$2/",
  )
}

/**
 * Expected mirror content: package source with consumer import rewrite applied.
 * @param {string} absSrc
 */
function expectedMirrorContent(absSrc) {
  const raw = readFileSync(absSrc, "utf8")
  if (/\.[cm]?tsx?$/.test(absSrc)) {
    return rewriteConsumerImports(raw)
  }
  return raw
}

function fail(message) {
  console.error(message)
  process.exit(1)
}

let drifted = 0
let synced = 0

for (const [srcRel, destRel] of PAIRS) {
  const src = join(root, srcRel)
  const dest = join(root, destRel)
  const label = `${relative(root, srcRel)} → ${relative(root, destRel)}`

  if (!existsSync(src)) {
    fail(`Mirror source missing: ${srcRel}`)
  }

  const expected = expectedMirrorContent(src)

  if (check) {
    if (!existsSync(dest)) {
      console.error(`drift: missing mirror ${destRel}`)
      drifted++
      continue
    }
    const actual = readFileSync(dest, "utf8")
    if (actual !== expected) {
      console.error(`drift: ${label}`)
      drifted++
    }
    continue
  }

  mkdirSync(dirname(dest), { recursive: true })
  writeFileSync(dest, expected, "utf8")
  synced++
  console.log(`synced ${label}`)
}

if (check) {
  if (drifted > 0) {
    fail(
      `${drifted} mirror file(s) out of sync. Run \`pnpm registry:sync\` and commit.`,
    )
  }
  console.log(`ok: ${PAIRS.length} mirror file(s) in sync`)
  process.exit(0)
}

console.log(`ok: synced ${synced} file(s)`)
