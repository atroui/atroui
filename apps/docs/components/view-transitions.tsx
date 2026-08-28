"use client"

/**
 * Family Values · Phase 5 — fly, don’t teleport.
 * Hierarchical `/` ↔ docs/blog use directional VT + shared brand/CTA morph.
 */

import {
  startTransition,
  unstable_ViewTransition as ViewTransition,
  unstable_addTransitionType as addTransitionType,
} from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import type { ComponentProps } from "react"

function isDocsSurface(path: string) {
  return (
    path === "/docs" ||
    path.startsWith("/docs/") ||
    path === "/blog" ||
    path.startsWith("/blog/") ||
    path === "/updates" ||
    path.startsWith("/updates/") ||
    path === "/og" ||
    path.startsWith("/og/") ||
    path === "/planner" ||
    path.startsWith("/planner/")
  )
}

function isHome(path: string) {
  return path === "/"
}

/** Infer nav-forward / nav-back only for home ↔ catalog depth. */
export function inferNavTypes(from: string, to: string): string[] {
  if (isHome(from) && isDocsSurface(to)) return ["nav-forward"]
  if (isDocsSurface(from) && isHome(to)) return ["nav-back"]
  return []
}

type TransitionLinkProps = ComponentProps<typeof Link> & {
  /** Override inferred types; empty array skips typed animation */
  transitionTypes?: string[]
}

/**
 * Link that tags the Next startTransition with nav types.
 * (Link.onNavigate runs *before* startTransition, so we own the push.)
 */
export function TransitionLink({
  href,
  transitionTypes,
  onClick,
  children,
  ...rest
}: TransitionLinkProps) {
  const router = useRouter()
  const pathname = usePathname()
  const target = typeof href === "string" ? href : href.pathname || "/"

  return (
    <Link
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e)
        if (e.defaultPrevented) return
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
          return
        }
        e.preventDefault()
        const types =
          transitionTypes ?? inferNavTypes(pathname, target.split("?")[0] || "/")
        startTransition(() => {
          for (const t of types) addTransitionType(t)
          router.push(target)
        })
      }}
    >
      {children}
    </Link>
  )
}

/** Page shell — directional when typed, soft fade for lateral. */
export function DirectionalPage({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition
      enter={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "fade-in",
      }}
      exit={{
        "nav-forward": "nav-forward",
        "nav-back": "nav-back",
        default: "fade-out",
      }}
      default="none"
    >
      {children}
    </ViewTransition>
  )
}

/**
 * Docs/blog continuity when layout persists — key remounts so enter/exit fire.
 * Lateral: soft fade. Hierarchical types still apply when TransitionLink tags them.
 */
export function DocsRouteTransition({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  // Docs room owns scroll — keep route swaps as a soft fade only (no layout morph).
  return (
    <ViewTransition
      key={pathname}
      name="docs-route"
      share="none"
      enter="fade-in"
      exit="fade-out"
      default="none"
    >
      {children}
    </ViewTransition>
  )
}

/** Shared logo mark — one instance per route tree (desktop headers). */
export function SharedBrand({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition name="atro-brand" share="morph" default="none">
      {children}
    </ViewTransition>
  )
}

/** Shared primary CTA — SiteHeader only (one name; hero body CTA is local). */
export function SharedOwnCta({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition name="atro-own-cta" share="morph" default="none">
      {children}
    </ViewTransition>
  )
}
