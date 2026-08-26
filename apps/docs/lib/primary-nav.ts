/** Left-rail map. Same slots as a studio site: work, then the rest. */
export const primaryNav = [
  { href: "/library", label: "Components", id: "components" },
  { href: "/library?family=Blocks", label: "Blocks", id: "blocks" },
  { href: "/docs/host-api", label: "Host APIs", id: "host-api" },
  { href: "/docs", label: "Docs", id: "docs" },
] as const

export type PrimaryNavId = (typeof primaryNav)[number]["id"]

export function activeNavId(pathname: string, family: string | null): PrimaryNavId | null {
  if (pathname.startsWith("/docs/host-api")) return "host-api"
  if (pathname.startsWith("/library") || pathname.startsWith("/docs/components")) {
    return family === "Blocks" ? "blocks" : "components"
  }
  if (pathname.startsWith("/docs")) return "docs"
  return null
}
