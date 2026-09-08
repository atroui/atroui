import Link from "next/link"

type Door = { label: string; href: string }

const defaultDoors: Door[] = [
  { label: "Docs", href: "/docs" },
  { label: "Components", href: "/docs/components" },
  { label: "Registry", href: "/docs/registry" },
]

/**
 * Compact miss panel shared by every 404 boundary.
 *
 * The ⌘K tip is only honest because each boundary sits under a header that
 * mounts `CommandMenu` — root/blog via `SiteHeader`, the book via `DocsHeader`.
 * Use `as="div"` inside the docs book: `docs-book-main` is already the `<main>`.
 */
export function NotFoundPanel({
  doors = defaultDoors,
  as: Tag = "main",
}: {
  doors?: Door[]
  as?: "main" | "div"
}) {
  return (
    <Tag className="relative isolate mx-auto flex min-h-[46svh] max-w-lg flex-col items-center justify-center gap-4 overflow-hidden px-6 py-16 text-center">
      <span
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
        aria-hidden
      >
        <span className="ds-sketch absolute top-[14%] left-[12%] rotate-[-8deg] text-[6rem] leading-none text-brand">
          ?
        </span>
      </span>

      <p className="ds-mono-label">404</p>
      <h1 className="ds-headline text-2xl tracking-tight sm:text-3xl">
        Off the map
      </h1>
      <p className="max-w-[36ch] text-[15px] leading-relaxed text-muted-foreground">
        That URL isn&apos;t in the catalog. Files are still yours — pick a door
        that is.
      </p>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
        {doors.map((door, i) => (
          <Link
            key={door.href}
            href={door.href}
            className={i === 0 ? "atro-btn" : "atro-btn-ghost"}
          >
            {door.label}
          </Link>
        ))}
      </div>
      <p className="mt-6 font-mono text-[11px] tracking-wide text-muted-foreground/60">
        <span className="sm:hidden">tip · search the whole catalog</span>
        <span className="hidden sm:inline">
          tip · ⌘K searches the whole catalog
        </span>
      </p>
    </Tag>
  )
}
