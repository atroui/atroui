"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="mx-auto flex min-h-[50svh] max-w-lg flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <p className="ms-stamp">Error</p>
      <h1 className="ds-display text-3xl">Something went wrong</h1>
      <p className="text-[15px] text-muted-foreground">
        This section failed to render. Retry or return to the catalog.
      </p>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
        <button type="button" onClick={reset} className="ms-cta text-sm">
          Try again
        </button>
        <Link href="/docs/components" className="ms-cta-ghost text-sm">
          Components
        </Link>
      </div>
    </main>
  )
}
