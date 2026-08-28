import { promises as fs } from "node:fs"
import path from "node:path"

export type RegistryItemFile = {
  path: string
  content?: string
  type?: string
  target?: string
}

export type RegistryItem = {
  name: string
  title?: string
  description?: string
  type?: string
  files: RegistryItemFile[]
}

function docsRoot() {
  // Prefer cwd = apps/docs (Next / turbo); fall back to monorepo layout.
  const here = process.cwd()
  if (here.endsWith("apps/docs") || here.endsWith("apps\\docs")) return here
  return path.join(here, "apps/docs")
}

/**
 * Load a built registry item from public/r/{name}.json
 * (shadcn ComponentPreview data path).
 */
export async function getRegistryItem(
  name: string
): Promise<RegistryItem | null> {
  const file = path.join(docsRoot(), "public", "r", `${name}.json`)
  try {
    const raw = await fs.readFile(file, "utf8")
    const data = JSON.parse(raw) as RegistryItem
    if (!data?.name) return null
    return {
      name: data.name,
      title: data.title,
      description: data.description,
      type: data.type,
      files: data.files ?? [],
    }
  } catch {
    return null
  }
}

export function registryInstallCommand(name: string) {
  return `npx shadcn@latest add @atroui/${name}`
}

/** Primary source file content (for Code tab). */
export function registryPrimarySource(item: RegistryItem): string | null {
  const withContent = item.files.find((f) => f.content?.trim())
  return withContent?.content ?? null
}

/**
 * Short import example for the Code tab when we prefer a snippet over the
 * full file. Falls back to full source.
 */
export function registryImportSnippet(item: RegistryItem): string {
  const file = item.files.find((f) => f.target || f.content) ?? item.files[0]
  const target = file?.target ?? file?.path ?? `components/${item.name}.tsx`
  const importPath = target.startsWith("@/")
    ? target
    : `@/${target.replace(/^\//, "")}`

  // Guess export from file basename (SiteHeader from site-header.tsx).
  const base = path.basename(target).replace(/\.(tsx|ts|jsx|js)$/, "")
  const exportName = base
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")

  return `import { ${exportName} } from "${importPath.replace(/\.(tsx|ts|jsx|js)$/, "")}"\n\n<${exportName} />`
}

export async function resolveRegistryDoc(name: string) {
  const item = await getRegistryItem(name)
  if (!item) {
    return {
      title: name,
      description: undefined as string | undefined,
      installCommand: registryInstallCommand(name),
      code: `npx shadcn@latest add @atroui/${name}`,
      source: null as string | null,
    }
  }

  const source = registryPrimarySource(item)
  return {
    title: item.title ?? name,
    description: item.description,
    installCommand: registryInstallCommand(item.name),
    code: registryImportSnippet(item),
    source,
  }
}
