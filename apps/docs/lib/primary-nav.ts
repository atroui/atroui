/**
 * Shared top nav — shadcn pattern: few always-visible doors.
 * Depth (Host APIs, each component) lives in the docs sidebar / MobileNav.
 */
export const primaryNav = [
  { href: "/docs", label: "Docs" },
  { href: "/docs/components", label: "Components" },
  { href: "/docs/registry", label: "Blocks" },
  { href: "/blog", label: "Blog" },
] as const

export function isPrimaryNavActive(pathname: string, href: string): boolean {
  if (href === "/docs") {
    return (
      pathname === "/docs" ||
      (pathname.startsWith("/docs/") &&
        !pathname.startsWith("/docs/components") &&
        !pathname.startsWith("/docs/registry"))
    )
  }
  return pathname === href || pathname.startsWith(`${href}/`)
}
