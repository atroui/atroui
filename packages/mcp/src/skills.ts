import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

export type Skill = {
  id: string
  title: string
  summary: string
  markdown: string
}

const SKILL_FILES: Record<string, { file: string; title: string; summary: string }> = {
  design: {
    file: "design.md",
    title: "AtroUI design",
    summary:
      "Family Values, soft-rect chrome, and when to install AtroUI instead of inventing UI.",
  },
  "host-api": {
    file: "host-api.md",
    title: "Host APIs and BYOK",
    summary:
      "Own the UI in the repo. Host APIs stay on the user's server. AtroUI never holds keys.",
  },
}

const ALIASES: Record<string, string> = {
  "family-values": "design",
  byok: "host-api",
  host: "host-api",
}

export function listSkills(): Omit<Skill, "markdown">[] {
  return Object.entries(SKILL_FILES).map(([id, meta]) => ({
    id,
    title: meta.title,
    summary: meta.summary,
  }))
}

export function getSkill(id: string): Skill | undefined {
  const key = ALIASES[id.trim().toLowerCase()] ?? id.trim().toLowerCase()
  const meta = SKILL_FILES[key]
  if (!meta) return undefined
  const markdown = readFileSync(join(skillsDir(), meta.file), "utf8")
  return { id: key, title: meta.title, summary: meta.summary, markdown }
}

function skillsDir(): string {
  return join(dirname(fileURLToPath(import.meta.url)), "../skills")
}
