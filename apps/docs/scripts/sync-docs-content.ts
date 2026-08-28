import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import {
  navigation,
  type NavSection,
} from "../lib/navigation-data"
import { pseoCollections, pseoGlossary } from "../lib/pseo"

const ROOT = path.dirname(fileURLToPath(import.meta.url))
const APP = path.join(ROOT, "..")
const CONTENT = path.join(APP, "content/docs")
const COMPONENTS_APP = path.join(APP, "app/docs/components")

function slugFromHref(href: string): string {
  if (href === "/docs") return "(root)/index"
  const rest = href.replace(/^\/docs\/?/, "")
  if (!rest) return "(root)/index"
  if (rest.startsWith("components/")) {
    return `components/${rest.replace("components/", "")}`
  }
  return rest.includes("/") ? rest : `${rest}/index`
}

function outPath(slug: string): string {
  if (slug.endsWith("/index")) {
    const dir = slug.slice(0, -"/index".length)
    return path.join(CONTENT, dir, "index.mdx")
  }
  return path.join(CONTENT, `${slug}.mdx`)
}

function write(file: string, body: string) {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, body)
}

function frontmatter(meta: Record<string, string | boolean | undefined>) {
  const lines = Object.entries(meta)
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) => `${k}: ${JSON.stringify(v)}`)
  return `---\n${lines.join("\n")}\n---\n\n`
}

/** Map nav sections → fumadocs meta folders. */
function buildMetaTree() {
  const rootPages: string[] = []

  for (const section of navigation) {
    const folderSlug = section.title.toLowerCase().replace(/\s+/g, "-")
    const isComponents = section.title === "Primitives" || section.title === "Blocks" || section.title === "Indie" || section.title === "Tools" || section.title === "Headless"

    if (isComponents) {
      continue
    }

    for (const item of section.items) {
      if (item.href.startsWith("http") || item.href === "/blog" || item.href === "/updates") {
        continue
      }
      const slug = slugFromHref(item.href)
      const pageKey = slug.replace("(root)/index", "(root)").replace(/\/index$/, "")
      if (pageKey === "(root)") {
        if (!rootPages.includes("(root)")) rootPages.push("(root)")
      } else if (!rootPages.includes(pageKey)) {
        rootPages.push(pageKey)
      }
    }
  }

  if (!rootPages.includes("components")) rootPages.push("components")
  if (!rootPages.includes("collections")) rootPages.push("collections")
  if (!rootPages.includes("glossary")) rootPages.push("glossary")

  write(
    path.join(CONTENT, "meta.json"),
    `${JSON.stringify({ title: "Documentation", root: true, pages: rootPages }, null, 2)}\n`
  )

  // Components folder merges catalog sections.
  const componentSections = navigation.filter((s) =>
    ["Primitives", "Blocks", "Indie", "Tools", "Headless"].includes(s.title)
  )
  const componentPages = ["index", ...flattenComponentSlugs(componentSections)]
  write(
    path.join(CONTENT, "components/meta.json"),
    `${JSON.stringify({ title: "Components", pages: componentPages }, null, 2)}\n`
  )

  if (fs.existsSync(path.join(CONTENT, "collections"))) {
    const colPages = [
      "index",
      ...pseoCollections.map((c) => c.slug),
    ]
    write(
      path.join(CONTENT, "collections/meta.json"),
      `${JSON.stringify({ title: "Collections", pages: colPages }, null, 2)}\n`
    )
  }

  if (fs.existsSync(path.join(CONTENT, "glossary"))) {
    const glossPages = ["index", ...pseoGlossary.map((t) => t.slug)]
    write(
      path.join(CONTENT, "glossary/meta.json"),
      `${JSON.stringify({ title: "Glossary", pages: glossPages }, null, 2)}\n`
    )
  }
}

function flattenComponentSlugs(sections: NavSection[]): string[] {
  return sections.flatMap((s) =>
    s.items
      .filter((i) => i.href.startsWith("/docs/components/") && i.href !== "/docs/components")
      .map((i) => i.href.replace("/docs/components/", ""))
  )
}

function extractRegistryFromPage(file: string): {
  registryName: string
  title?: string
  description?: string
  usage?: string
  fullBleed?: boolean
} | null {
  const src = fs.readFileSync(file, "utf8")
  const registryMatch = src.match(/registryName="([^"]+)"/)
  if (!registryMatch) return null
  const title = src.match(/componentPageMetadata\(\s*\n?\s*"([^"]+)"/)?.[1]
  const description = src.match(/description:\s*\n?\s*"([^"]+)"/)?.[1]
  const usage = src.match(/usage="([^"]+)"/)?.[1]
  const fullBleed = /fullBleed(?:\s*=\s*\{?\s*true)?/.test(src)
  return {
    registryName: registryMatch[1]!,
    title,
    description,
    usage,
    fullBleed: fullBleed || undefined,
  }
}

function generateComponentMdx() {
  const entries = fs.readdirSync(COMPONENTS_APP, { withFileTypes: true })
  for (const entry of entries) {
    if (!entry.isDirectory()) continue
    const pageFile = path.join(COMPONENTS_APP, entry.name, "page.tsx")
    if (!entry.name || entry.name === "page.tsx" || !fs.existsSync(pageFile)) continue
    const meta = extractRegistryFromPage(pageFile)
    if (!meta) continue

    const href = `/docs/components/${entry.name}`
    const fm = frontmatter({
      title: meta.title ?? entry.name,
      description: meta.description ?? "",
      registry: meta.registryName,
      docHref: href,
      ...(meta.fullBleed ? { fullBleed: true } : {}),
    })

    const usageAttr = meta.usage
      ? ` usage=${JSON.stringify(meta.usage)}`
      : ""

    const body = `${fm}<DocsRegistryPage registry="${meta.registryName}" href="${href}"${usageAttr} />\n`
    write(outPath(`components/${entry.name}`), body)
  }

  // Components index
  write(
    path.join(CONTENT, "components/index.mdx"),
    `${frontmatter({
      title: "Components",
      description:
        "Live previews of the AtroUI catalog. Install with npx shadcn add @atroui/…",
    })}<DocsComponentsIndex />\n`
  )
}

function migrateGuideMdx() {
  const moves: [string, string][] = [
    ["index.mdx", "(root)/index.mdx"],
    ["installation.mdx", "installation/index.mdx"],
    ["host-api.mdx", "host-api/index.mdx"],
    ["registry.mdx", "registry/index.mdx"],
    ["theming.mdx", "theming/index.mdx"],
    ["brand.mdx", "brand/index.mdx"],
    ["identity.mdx", "identity/index.mdx"],
    ["compare.mdx", "compare/index.mdx"],
    ["guides/launch-workflow.mdx", "launch-workflow/index.mdx"],
  ]

  for (const [from, to] of moves) {
    const src = path.join(CONTENT, from)
    if (!fs.existsSync(src)) continue
    let body = fs.readFileSync(src, "utf8")
    if (!body.startsWith("---")) {
      const titleMatch = body.match(/title="([^"]+)"/) ?? body.match(/<h1[^>]*>([^<]+)/)
      body = frontmatter({
        title: titleMatch?.[1] ?? path.basename(to, ".mdx"),
        description: "",
      }) + body
    }
    write(path.join(CONTENT, to), body)
    if (from !== to) fs.unlinkSync(src)
  }

  // Cleanup old guides dir
  const guidesDir = path.join(CONTENT, "guides")
  if (fs.existsSync(guidesDir)) {
    fs.rmSync(guidesDir, { recursive: true, force: true })
  }

  // Flat files at root → remove after migrate
  for (const f of fs.readdirSync(CONTENT)) {
    if (f.endsWith(".mdx") && f !== "meta.mdx") {
      fs.unlinkSync(path.join(CONTENT, f))
    }
  }
}

function generateHubMdx() {
  write(
    path.join(CONTENT, "collections/index.mdx"),
    `${frontmatter({
      title: "Component collections",
      description:
        "AtroUI grouped by job: Next.js forms with Host APIs, OG images, indie launch workflow.",
    })}<DocsCollectionsIndex />\n`
  )

  for (const c of pseoCollections) {
    write(
      path.join(CONTENT, "collections", c.slug, "index.mdx"),
      `${frontmatter({
        title: c.title,
        description: c.description,
        collection: c.slug,
      })}<DocsCollectionPage slug="${c.slug}" />\n`
    )
  }

  write(
    path.join(CONTENT, "glossary/index.mdx"),
    `${frontmatter({
      title: "Glossary",
      description: "Host API, BYOK, shadcn registry — terms we use in the catalog.",
    })}<DocsGlossaryIndex />\n`
  )

  for (const t of pseoGlossary) {
    write(
      path.join(CONTENT, "glossary", t.slug, "index.mdx"),
      `${frontmatter({
        title: t.title,
        description: t.description,
        term: t.slug,
      })}<DocsGlossaryTerm slug="${t.slug}" />\n`
    )
  }

  write(
    path.join(CONTENT, "changelog/index.mdx"),
    `${frontmatter({
      title: "Changelog",
      description: "AtroUI release notes — Changesets on each PR.",
    })}<DocsChangelog />\n`
  )
}

function patchGuideTitlesFromNav() {
  const titleByHref = new Map<string, { title: string; description?: string }>()
  for (const section of navigation) {
    for (const item of section.items) {
      if (item.href.startsWith("/docs")) {
        titleByHref.set(item.href, {
          title: item.title,
          description: item.description,
        })
      }
    }
  }

  for (const [href, meta] of titleByHref) {
    const slug = slugFromHref(href)
    const file = outPath(slug)
    if (!fs.existsSync(file)) continue
    let body = fs.readFileSync(file, "utf8")
    if (!body.startsWith("---")) continue
    const end = body.indexOf("\n---", 4)
    if (end < 0) continue
    const rest = body.slice(end + 4)
    body =
      frontmatter({
        title: meta.title,
        description: meta.description ?? "",
      }) + rest.replace(/^\n+/, "")
    write(file, body)
  }
}

function ensureRootMeta() {
  buildMetaTree()
}

console.log("Syncing docs content → fumadocs structure…")
migrateGuideMdx()
generateHubMdx()
generateComponentMdx()
patchGuideTitlesFromNav()
ensureRootMeta()
console.log("Done.")
