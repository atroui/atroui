import { getPost } from "@/lib/blog"
import { allNavItems } from "@/lib/navigation"
import { getPseoCollection, getPseoPage, getPseoTerm } from "@/lib/pseo"
import { eyebrowForPath } from "@/lib/share-og"

export function normalizeSharePath(path: string): string {
  const raw = (path.split("?")[0] ?? "/").trim() || "/"
  const withSlash = raw.startsWith("/") ? raw : `/${raw}`
  if (withSlash.length > 1 && withSlash.endsWith("/")) {
    return withSlash.slice(0, -1)
  }
  return withSlash
}

function titleFromSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

/** Title/description for a share card, resolved on the server (no query string). */
export function resolveOgCopyForPath(path: string): {
  title: string
  description: string
  eyebrow: string
  path: string
} {
  const p = normalizeSharePath(path)
  const eyebrow = eyebrowForPath(p)

  const overlay = getPseoPage(p)
  if (overlay) {
    return {
      title: overlay.title,
      description: overlay.description,
      eyebrow,
      path: p,
    }
  }

  if (p === "/blog") {
    return {
      title: "AtroUI blog",
      description:
        "Host APIs, shadcn registry, dark-first tokens, and Next.js notes from search to owning the UI.",
      eyebrow,
      path: p,
    }
  }

  const blog = /^\/blog\/([^/]+)$/.exec(p)
  if (blog) {
    const post = getPost(blog[1] ?? "")
    if (post) {
      return {
        title: post.title,
        description: post.description,
        eyebrow,
        path: p,
      }
    }
  }

  const collection = /^\/docs\/collections\/([^/]+)$/.exec(p)
  if (collection) {
    const item = getPseoCollection(collection[1] ?? "")
    if (item) {
      return {
        title: item.title,
        description: item.description,
        eyebrow,
        path: p,
      }
    }
  }

  const glossary = /^\/docs\/glossary\/([^/]+)$/.exec(p)
  if (glossary) {
    const term = getPseoTerm(glossary[1] ?? "")
    if (term) {
      return {
        title: term.title,
        description: term.description,
        eyebrow,
        path: p,
      }
    }
  }

  const nav = allNavItems.find((item) => item.href === p)
  if (nav) {
    return {
      title: nav.title,
      description:
        nav.description ||
        `${nav.title} in AtroUI. Preview, install, and own the files.`,
      eyebrow,
      path: p,
    }
  }

  const last = p.split("/").filter(Boolean).at(-1) ?? "AtroUI"
  return {
    title: titleFromSlug(last),
    description: "Dark-first React sections. Add with the shadcn CLI.",
    eyebrow,
    path: p,
  }
}
