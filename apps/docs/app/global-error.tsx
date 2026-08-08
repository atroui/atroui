"use client"

import { useEffect } from "react"
import Link from "next/link"
import posthog from "posthog-js"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    posthog.captureException(error)
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body className="min-h-svh bg-background font-sans text-foreground antialiased">
        <main className="mx-auto flex min-h-svh max-w-lg flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="ms-stamp">Error</p>
          <h1 className="ds-display text-3xl">Something went wrong</h1>
          <p className="text-[15px] text-muted-foreground">
            The page failed to load. Try again, or head back to docs.
          </p>
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
