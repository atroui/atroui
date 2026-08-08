"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function GlobalError({
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
    <html lang="en">
      <body className="min-h-svh bg-background font-sans text-foreground antialiased">
        <main className="mx-auto flex min-h-svh max-w-lg flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="ms-stamp">Error</p>
          <h1 className="ds-display text-3xl">Stroke slipped</h1>
          <p className="max-w-[36ch] text-[15px] leading-relaxed text-muted-foreground">
            The page failed to load. Retry, or head back to docs.
          </p>
          {error.digest ? (
            <p className="font-mono text-[11px] text-muted-foreground/50">
              {error.digest}
            </p>
          ) : null}
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <button type="button" onClick={reset} className="ms-cta text-sm">
              Try again
            </button>
            <Link href="/docs" className="ms-cta-ghost text-sm">
              Docs
            </Link>
          </div>
        </main>
      </body>
    </html>
  )
}
