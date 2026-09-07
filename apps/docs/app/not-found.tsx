import Link from "next/link"

export default function NotFound() {
  return (
    <main className="relative mx-auto flex min-h-[60svh] max-w-lg flex-col items-center justify-center gap-4 overflow-hidden px-6 py-20 text-center">
      <span
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.1]"
        aria-hidden
      >
        <span className="ds-sketch absolute top-[18%] left-[12%] rotate-[-8deg] text-[7rem] leading-none text-brand">
          ?
        </span>
      </span>

      <p className="ds-mono-label">404</p>
      <h1 className="ds-headline text-3xl tracking-tight sm:text-4xl">
        Off the map
      </h1>
      <p className="max-w-[36ch] text-[15px] leading-relaxed text-muted-foreground">
        That URL isn&apos;t in the catalog. Files are still yours — pick a door
        that is.
      </p>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
        <Link href="/docs" className="atro-btn">
          Docs
        </Link>
        <Link href="/docs/components" className="atro-btn-ghost">
          Components
        </Link>
        <Link href="/docs/registry" className="atro-btn-ghost">
          Registry
        </Link>
      </div>
      <p className="mt-6 font-mono text-[11px] tracking-wide text-muted-foreground/60">
        tip · ⌘K searches the whole catalog
      </p>
    </main>
  )
}
