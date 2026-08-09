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

export function installCommand(
  pm: PackageManager,
  packages: string[]
): string {
  const list = packages.join(" ")
  switch (pm) {
    case "pnpm":
      return `pnpm add ${list}`
    case "yarn":
      return `yarn add ${list}`
    case "bun":
      return `bun add ${list}`
    default:
      return `npm install ${list}`
  }
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
