import { existsSync, readFileSync } from "node:fs"
import path from "node:path"

export type PackageManager = "pnpm" | "npm" | "yarn" | "bun"

export function detectPackageManager(cwd = process.cwd()): PackageManager {
  if (existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm"
  if (existsSync(path.join(cwd, "yarn.lock"))) return "yarn"
  if (existsSync(path.join(cwd, "bun.lockb")) || existsSync(path.join(cwd, "bun.lock"))) {
    return "bun"
  }
  return "npm"
}

/** npm package name (optional scope) with optional @version / @tag suffix. */
const PACKAGE_SPEC_RE =
  /^(?:@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*(?:@[^\s\\/;|&$<>()]+)?$/i

/**
 * Validate a registry dependency string before passing to a package manager.
 * Rejects shell metacharacters and non-package specs.
 */
export function assertSafePackageSpec(spec: string): string {
  const trimmed = spec.trim()
  if (!trimmed || trimmed !== spec || /\s/.test(trimmed)) {
    throw new Error(`Invalid package spec: ${JSON.stringify(spec)}`)
  }
  if (!PACKAGE_SPEC_RE.test(trimmed)) {
    throw new Error(`Invalid package spec: ${JSON.stringify(spec)}`)
  }
  return trimmed
}

/** Argv for package install — never pass through a shell. */
export function installArgv(
  pm: PackageManager,
  packages: string[]
): string[] {
  const safe = packages.map(assertSafePackageSpec)
  switch (pm) {
    case "pnpm":
      return ["pnpm", "add", ...safe]
    case "yarn":
      return ["yarn", "add", ...safe]
    case "bun":
      return ["bun", "add", ...safe]
    default:
      return ["npm", "install", ...safe]
  }
}

/** Human-readable install command (logging only). */
export function installCommand(
  pm: PackageManager,
  packages: string[]
): string {
  return installArgv(pm, packages).join(" ")
}

type TsConfigLike = {
  compilerOptions?: {
    paths?: Record<string, string[]>
  }
  extends?: string
}

function readJsonSafe(filePath: string): TsConfigLike | null {
  try {
    const raw = readFileSync(filePath, "utf8")
    // Strip trailing commas / comments lightly for tsconfig
    const stripped = raw
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/^\s*\/\/.*$/gm, "")
      .replace(/,\s*([\]}])/g, "$1")
    return JSON.parse(stripped) as TsConfigLike
  } catch {
    return null
  }
}

/**
 * Resolve the project root for writing registry targets.
 * If `@/*` maps under `./src/...` or a `src/` folder exists, prefix targets with `src/`.
 */
export function resolveWriteRoot(cwd = process.cwd()): string {
  const tsPath = path.join(cwd, "tsconfig.json")
  const jsPath = path.join(cwd, "jsconfig.json")
  const configPath = existsSync(tsPath) ? tsPath : existsSync(jsPath) ? jsPath : null

  if (configPath) {
    const config = readJsonSafe(configPath)
    const paths = config?.compilerOptions?.paths ?? {}
    const alias = paths["@/*"]?.[0]
    if (alias) {
      const normalized = alias.replace(/^\.\//, "")
      if (normalized.startsWith("src/") || normalized === "src/*") {
        return path.join(cwd, "src")
      }
    }
  }

  if (existsSync(path.join(cwd, "src"))) {
    return path.join(cwd, "src")
  }

  return cwd
}

/**
 * Walk up from a write root to the nearest package.json (handles `-p` and `src/`).
 */
export function findPackageRoot(startDir: string): string {
  let dir = path.resolve(startDir)
  for (;;) {
    if (existsSync(path.join(dir, "package.json"))) return dir
    const parent = path.dirname(dir)
    if (parent === dir) return path.resolve(startDir)
    dir = parent
  }
}

export function readInstalledPackages(
  cwd = process.cwd()
): Record<string, string> {
  const pkgPath = path.join(cwd, "package.json")
  if (!existsSync(pkgPath)) return {}
  try {
    const pkg = JSON.parse(readFileSync(pkgPath, "utf8")) as {
      dependencies?: Record<string, string>
      devDependencies?: Record<string, string>
    }
    return { ...pkg.dependencies, ...pkg.devDependencies }
  } catch {
    return {}
  }
}

export function missingPackages(
  wanted: string[],
  installed: Record<string, string>
): string[] {
  return wanted.filter((name) => {
    // Scoped and bare package names as listed in registry
    const bare = name.startsWith("@")
      ? name
      : name.split("/")[0] ?? name
    return !installed[bare] && !installed[name]
  })
}
