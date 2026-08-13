/**
 * Shared launch brief — glue between Scope → Planner → OG / Thumbnail.
 * Host-owned, serializable JSON. No AtroUI backend required.
 *
 * Install: npx shadcn@latest add @atroui/project-brief
 */

export type ProjectBrief = {
  name: string
  oneLiner: string
  audience: string
  pages: string[]
  tone: string
  constraints: string[]
  ogTitle?: string
  ogSubtitle?: string
  thumbnailTitle?: string
}

export const EMPTY_PROJECT_BRIEF: ProjectBrief = {
  name: "",
  oneLiner: "",
  audience: "",
  pages: [],
  tone: "",
  constraints: [],
}

/** localStorage key for optional client-side persistence on the host. */
export const PROJECT_BRIEF_STORAGE_KEY = "atroui:project-brief"

export function isProjectBrief(value: unknown): value is ProjectBrief {
  if (!value || typeof value !== "object") return false
  const v = value as Record<string, unknown>
  return (
    typeof v.name === "string" &&
    typeof v.oneLiner === "string" &&
    typeof v.audience === "string" &&
    Array.isArray(v.pages) &&
    typeof v.tone === "string" &&
    Array.isArray(v.constraints)
  )
}

export function parseProjectBrief(raw: string): ProjectBrief | null {
  try {
    const data = JSON.parse(raw) as unknown
    return isProjectBrief(data) ? data : null
  } catch {
    return null
  }
}

export function briefOgTitle(brief: ProjectBrief): string {
  return (brief.ogTitle ?? brief.name).trim()
}

export function briefOgSubtitle(brief: ProjectBrief): string {
  return (brief.ogSubtitle ?? brief.oneLiner).trim()
}

export function briefThumbnailTitle(brief: ProjectBrief): string {
  return (brief.thumbnailTitle ?? brief.ogTitle ?? brief.name).trim()
}

export function buildOgHref(
  brief: ProjectBrief,
  options?: { path?: string; style?: string }
): string {
  const path = options?.path ?? "/og"
  const title = briefOgTitle(brief)
  const subtitle = briefOgSubtitle(brief)
  const params = new URLSearchParams({ mode: "quick" })
  if (title) params.set("title", title)
  if (subtitle) params.set("subtitle", subtitle)
  if (options?.style) params.set("style", options.style)
  const qs = params.toString()
  return `${path}?${qs}#og-workspace`
}

export function buildThumbnailHref(
  brief: ProjectBrief,
  options?: { path?: string }
): string {
  const path = options?.path ?? "/thumbnail"
  const title = briefThumbnailTitle(brief)
  const params = new URLSearchParams()
  if (title) params.set("title", title)
  const qs = params.toString()
  return qs ? `${path}?${qs}` : path
}

export function briefFromScopeMessage(text: string): ProjectBrief {
  const oneLiner = text.trim().slice(0, 160)
  return {
    ...EMPTY_PROJECT_BRIEF,
    name: oneLiner.slice(0, 48) || "Untitled project",
    oneLiner,
    ogTitle: oneLiner.slice(0, 64) || "Ship in days, not quarters.",
    ogSubtitle: "Built with AtroUI",
  }
}
