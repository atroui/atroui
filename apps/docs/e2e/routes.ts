/** Shared route inventory for smoke + visual runs. */

export type Route = {
  path: string
  name: string
}

/** Guide and landing surfaces — every one is hand-authored, so all are covered. */
export const coreRoutes: Route[] = [
  { path: "/", name: "landing" },
  { path: "/docs", name: "docs-intro" },
  { path: "/library", name: "library" },
  { path: "/docs/installation", name: "docs-installation" },
  { path: "/docs/host-api", name: "docs-host-api" },
  { path: "/docs/registry", name: "docs-registry" },
  { path: "/docs/theming", name: "docs-theming" },
  { path: "/docs/brand", name: "docs-brand" },
  { path: "/docs/identity", name: "docs-identity" },
  { path: "/docs/compare", name: "docs-compare" },
  { path: "/docs/changelog", name: "docs-changelog" },
  { path: "/docs/collections", name: "docs-collections" },
  { path: "/docs/glossary", name: "docs-glossary" },
  { path: "/docs/guides/launch-workflow", name: "docs-launch-workflow" },
  { path: "/blog", name: "blog-index" },
  { path: "/updates", name: "updates" },
  { path: "/og", name: "og-tool" },
  { path: "/planner", name: "planner-tool" },
]

/** Dynamic pSEO hubs — one per template is enough to prove the template. */
export const dynamicRoutes: Route[] = [
  { path: "/docs/collections/nextjs-forms", name: "collection-nextjs-forms" },
  { path: "/docs/glossary/host-api", name: "glossary-host-api" },
]

/**
 * Representative component pages — one per catalog family rather than all 71,
 * so the suite stays fast while still covering each doc template variant.
 */
export const componentRoutes: Route[] = [
  { path: "/docs/components/ui-button", name: "component-button" },
  { path: "/docs/components/home-hero", name: "component-hero" },
  { path: "/docs/components/contact-contact-form", name: "component-contact-form" },
  { path: "/docs/components/og-og-workspace", name: "component-og-workspace" },
  { path: "/docs/components/seo-json-ld", name: "component-json-ld" },
  { path: "/docs/components/command-menu", name: "component-command-menu" },
  { path: "/docs/components/motion-fade-in", name: "component-fade-in" },
]

export const allRoutes: Route[] = [
  ...coreRoutes,
  ...dynamicRoutes,
  ...componentRoutes,
]
