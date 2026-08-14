import fs from "node:fs"
import path from "node:path"
import type { Metadata } from "next"
import Link from "next/link"
import { docsPageMetadata } from "@/lib/docs-metadata"
import { UpdatesSignup } from "@/components/updates-signup"

export const metadata: Metadata = docsPageMetadata({
  title: "Changelog",
  description:
    "AtroUI release notes - version history for the catalog and docs at atroui.com.",
  path: "/docs/changelog",
})

type ChangelogBlock = {
  version: string
  body: string
}

/** True for Changesets version headings (0.1.0, 1.2.3, Unreleased, …). */
function isVersionHeading(heading: string): boolean {
  const normalized = heading.replace(/^#+\s*/, "").trim()
  if (!normalized) return false
  if (/^unreleased$/i.test(normalized)) return true
  // Semver, optionally with leading "v" or trailing date note.
  return /^v?\d+\.\d+\.\d+\b/i.test(normalized)
}

function resolveChangelogPath(): string {
  // Next/Turbo usually run with cwd = apps/docs; some CI/root invocations use the repo root.
  const candidates = [
    path.join(process.cwd(), "packages/ui/CHANGELOG.md"),
    path.join(process.cwd(), "../../packages/ui/CHANGELOG.md"),
    path.join(process.cwd(), "../packages/ui/CHANGELOG.md"),
  ]
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate
  }
  throw new Error(
    `Could not find packages/ui/CHANGELOG.md relative to the docs app.`,
  )
}

function loadChangelog(): ChangelogBlock[] {
  const raw = fs.readFileSync(resolveChangelogPath(), "utf8")
  // Drop the package H1 (# atroui) before splitting on ## version sections.
  const withoutTitle = raw.replace(/^#\s+[^\n]+\n+/, "")
  const sections = withoutTitle.split(/^## /m).filter(Boolean)

  return sections
    .map((section) => {
      const [headingLine, ...rest] = section.split("\n")
      const version = (headingLine ?? "").replace(/^#+\s*/, "").trim()
      if (!isVersionHeading(version)) return null
      return {
        version,
        body: rest.join("\n").trim(),
      }
    })
    .filter((block): block is ChangelogBlock => Boolean(block))
}

function renderInline(text: string) {
  // Minimal `code` + **bold** for changelog bullets.
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground"
        >
          {part.slice(1, -1)}
        </code>
      )
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-medium text-foreground">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return <span key={i}>{part}</span>
  })
}

function ChangelogBody({ body }: { body: string }) {
  const lines = body.split("\n")
  const nodes: React.ReactNode[] = []
  let list: string[] = []

  const flushList = () => {
    if (!list.length) return
    nodes.push(
      <ul
        key={`ul-${nodes.length}`}
        className="list-disc space-y-2 pl-5 text-[15px] font-light leading-relaxed text-muted-foreground"
      >
        {list.map((item, i) => (
          <li key={i}>{renderInline(item)}</li>
        ))}
      </ul>,
    )
    list = []
  }

  for (const line of lines) {
    const heading = line.match(/^###\s+(.+)/)
    if (heading) {
      flushList()
      nodes.push(
        <h3
          key={`h-${nodes.length}`}
          className="ds-headline pt-2 text-sm text-foreground"
        >
          {heading[1]}
        </h3>,
      )
      continue
    }
    const bullet = line.match(/^[-*]\s+(.+)/)
    if (bullet) {
      list.push(bullet[1] ?? "")
      continue
    }
    if (!line.trim()) {
      flushList()
      continue
    }
    flushList()
    nodes.push(
      <p
        key={`p-${nodes.length}`}
        className="text-[15px] font-light leading-relaxed text-muted-foreground"
      >
        {renderInline(line)}
      </p>,
    )
  }
  flushList()
  return <div className="space-y-3">{nodes}</div>
}

export default function ChangelogPage() {
  const releases = loadChangelog()

  return (
    <article className="mx-auto max-w-3xl space-y-10">
      <header>
        <p className="ms-stamp mb-3">Getting started</p>
        <h1 className="ds-display text-3xl text-foreground sm:text-4xl">
          Change<span className="ds-sketch-accent">log</span>
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] font-light leading-relaxed text-muted-foreground">
          Released versions of{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            atroui
          </code>
          . Entries are written via Changesets on each PR, then published when
          the Version Packages PR merges.
        </p>
        <div className="mt-6 max-w-md">
          <UpdatesSignup source="changelog" compact />
          <p className="mt-2 text-[12px] text-muted-foreground">
            Email for major slices only. Patch notes stay here.{" "}
            <Link href="/updates" className="bam-link">
              What you get
            </Link>
            .
          </p>
        </div>
      </header>

      <div className="space-y-10">
        {releases.map((release) => (
          <section key={release.version} className="space-y-4">
            <h2 className="ds-sketch text-2xl text-foreground sm:text-3xl">
              {release.version}
            </h2>
            <ChangelogBody body={release.body} />
          </section>
        ))}
      </div>
    </article>
  )
}
