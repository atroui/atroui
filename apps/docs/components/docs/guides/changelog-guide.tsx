import fs from "node:fs"
import path from "node:path"
import Link from "next/link"
import { AlertCircle, Bug, Sparkles } from "lucide-react"
import { NewsletterForm } from "atroui"
import { DocsArticleHeader } from "@/components/docs/docs-article-header"
import { DocsPager } from "@/components/docs-pager"

function XMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      fill="currentColor"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

type ChangeKind = "feature" | "fix" | "breaking"

type ChangeEntry = {
  hash?: string
  hashUrl?: string
  pr?: string
  prUrl?: string
  description: string
}

type ChangeCategory = {
  kind: ChangeKind
  label: string
  entries: ChangeEntry[]
}

type ChangelogRelease = {
  version: string
  categories: ChangeCategory[]
}

const KIND_META: Record<
  ChangeKind,
  { label: string; Icon: typeof Sparkles }
> = {
  feature: { label: "New Features", Icon: Sparkles },
  fix: { label: "Bug Fixes / Improvements", Icon: Bug },
  breaking: { label: "Breaking Changes", Icon: AlertCircle },
}

function kindFromHeading(heading: string): ChangeKind | null {
  const h = heading.trim().toLowerCase()
  if (h.startsWith("major")) return "breaking"
  if (h.startsWith("minor")) return "feature"
  if (h.startsWith("patch")) return "fix"
  return null
}

/** True for Changesets version headings (0.1.0, 1.2.3, Unreleased, …). */
function isVersionHeading(heading: string): boolean {
  const normalized = heading.replace(/^#+\s*/, "").trim()
  if (!normalized) return false
  if (/^unreleased$/i.test(normalized)) return true
  return /^v?\d+\.\d+\.\d+\b/i.test(normalized)
}

function resolveChangelogPath(): string {
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

function parseEntry(raw: string): ChangeEntry {
  const pr = raw.match(/\[#(\d+)\]\(([^)\s]+)\)/)
  const hash = raw.match(/\[`([a-f0-9]+)`\]\(([^)\s]+)\)/i)

  let description = raw
    .replace(/\[#\d+\]\([^)]+\)\s*/g, "")
    .replace(/\[`[a-f0-9]+`\]\([^)]+\)\s*/gi, "")
    .replace(/Thanks\s+\[@[^\]]+\]\([^)]+\)!\s*-?\s*/gi, "")
    .replace(/^[-*]\s+/, "")
    .trim()

  // Changesets often leave a leading em-dash residue after "Thanks …! - "
  description = description.replace(/^[-–—]\s*/, "").trim()

  return {
    hash: hash?.[1],
    hashUrl: hash?.[2],
    pr: pr?.[1],
    prUrl: pr?.[2],
    description: description || raw.trim(),
  }
}

function parseReleaseBody(body: string): ChangeCategory[] {
  const lines = body.split("\n")
  const categories: ChangeCategory[] = []
  let current: ChangeCategory | null = null

  const push = () => {
    if (current && current.entries.length) categories.push(current)
    current = null
  }

  for (const line of lines) {
    const heading = line.match(/^###\s+(.+)/)
    if (heading) {
      push()
      const kind = kindFromHeading(heading[1] ?? "")
      if (!kind) continue
      current = {
        kind,
        label: KIND_META[kind].label,
        entries: [],
      }
      continue
    }

    const bullet = line.match(/^[-*]\s+(.+)/)
    if (bullet && current) {
      current.entries.push(parseEntry(bullet[1] ?? ""))
    }
  }
  push()
  return categories
}

function loadChangelog(): ChangelogRelease[] {
  const raw = fs.readFileSync(resolveChangelogPath(), "utf8")
  const withoutTitle = raw.replace(/^#\s+[^\n]+\n+/, "")
  const sections = withoutTitle.split(/^## /m).filter(Boolean)

  return sections
    .map((section) => {
      const [headingLine, ...rest] = section.split("\n")
      const version = (headingLine ?? "").replace(/^#+\s*/, "").trim()
      if (!isVersionHeading(version)) return null
      return {
        version,
        categories: parseReleaseBody(rest.join("\n").trim()),
      }
    })
    .filter((block): block is ChangelogRelease => Boolean(block))
}

function renderInline(text: string) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="docs-changelog-inline-code">
          {part.slice(1, -1)}
        </code>
      )
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-medium text-[color:var(--docs-fg-strong)]">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return <span key={i}>{part}</span>
  })
}

function ChangelogEntryRow({ entry }: { entry: ChangeEntry }) {
  return (
    <li className="docs-changelog-entry">
      {entry.hash ? (
        entry.hashUrl ? (
          <a
            href={entry.hashUrl}
            className="docs-changelog-hash"
            target="_blank"
            rel="noopener noreferrer"
          >
            [{entry.hash}]
          </a>
        ) : (
          <span className="docs-changelog-hash">[{entry.hash}]</span>
        )
      ) : null}
      {entry.hash ? <span className="docs-changelog-sep"> — </span> : null}
      <span className="docs-changelog-desc">
        {renderInline(entry.description)}
      </span>
      {entry.pr ? (
        <>
          {" "}
          <span className="docs-changelog-ref">
            (
            {entry.prUrl ? (
              <a
                href={entry.prUrl}
                className="docs-changelog-pr"
                target="_blank"
                rel="noopener noreferrer"
              >
                #{entry.pr}
              </a>
            ) : (
              <>#{entry.pr}</>
            )}
            )
          </span>
        </>
      ) : null}
    </li>
  )
}

function ChangelogCategory({ category }: { category: ChangeCategory }) {
  const { Icon } = KIND_META[category.kind]
  return (
    <div className="docs-changelog-category" data-kind={category.kind}>
      <div className="docs-changelog-rail" aria-hidden>
        <span className={`docs-changelog-badge docs-changelog-badge--${category.kind}`}>
          <Icon className="size-3.5" strokeWidth={2.25} />
        </span>
      </div>
      <div className="docs-changelog-category-body">
        <h3 className="docs-changelog-category-title">{category.label}</h3>
        <ul className="docs-changelog-entries">
          {category.entries.map((entry, i) => (
            <ChangelogEntryRow
              key={`${entry.hash ?? "e"}-${entry.pr ?? i}`}
              entry={entry}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export function ChangelogGuide() {
  const releases = loadChangelog()

  return (
    <article className="space-y-10">
      <DocsArticleHeader
        eyebrow="Reference"
        title="Changelog"
        lede={
          <>
            Patch notes for <code>atroui</code>. Major slices go to the list —
            patches stay here.
          </>
        }
      />

      <div className="docs-changelog-follow">
        <div className="docs-changelog-follow-actions">
          <NewsletterForm
            source="changelog"
            submitLabel="Get updates"
            successMessage="You're on the list."
            placeholder="you@studio.com"
            className="docs-changelog-follow-form"
          />
          <a
            href="https://x.com/AtroUI0"
            className="docs-changelog-follow-x"
            target="_blank"
            rel="noopener noreferrer"
          >
            <XMark className="size-3.5" />
            Follow @AtroUI0
          </a>
        </div>
        <p className="docs-changelog-follow-meta">
          Email for majors only.{" "}
          <Link href="/updates" className="bam-link">
            What you get
          </Link>
          .
        </p>
      </div>

      <div className="docs-changelog">
        {releases.map((release) => (
          <section key={release.version} className="docs-changelog-release">
            <h2
              className="docs-changelog-version"
              id={release.version.replace(/[^\w.-]+/g, "-")}
            >
              {release.version}
            </h2>
            {release.categories.length ? (
              <div className="docs-changelog-timeline" data-toc-skip>
                {release.categories.map((category) => (
                  <ChangelogCategory
                    key={`${release.version}-${category.kind}`}
                    category={category}
                  />
                ))}
              </div>
            ) : null}
          </section>
        ))}
      </div>

      <DocsPager href="/docs/changelog" kind="guides" />
    </article>
  )
}
