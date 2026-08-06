import Link from "next/link"

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[50svh] max-w-lg flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <p className="ms-stamp">404</p>
      <h1 className="ds-display text-3xl">Page not found</h1>
      <p className="text-[15px] text-muted-foreground">
        That URL is not in the catalog. Check the path or browse components.
      </p>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
        <Link href="/docs" className="ms-cta text-sm">
          Docs
        </Link>
        <Link href="/docs/components" className="ms-cta-ghost text-sm">
          Components
        </Link>
      </div>
    </main>
  )
}
