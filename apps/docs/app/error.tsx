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
    <main className="relative mx-auto flex min-h-[60svh] max-w-lg flex-col items-center justify-center gap-4 overflow-hidden px-6 py-20 text-center">
      <span
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.1]"
        aria-hidden
      >
        <span className="ds-sketch absolute top-[20%] right-[14%] rotate-[10deg] text-[6rem] leading-none text-brand">
          !
        </span>
      </span>

      <p className="ms-stamp">Error</p>
      <h1 className="ds-display text-3xl sm:text-4xl">Stroke slipped</h1>
      <p className="max-w-[36ch] text-[15px] leading-relaxed text-muted-foreground">
        This section failed to render. Retry the paint, or step back to the
        catalog.
      </p>
      {error.digest ? (
        <p className="font-mono text-[11px] text-muted-foreground/50">
          {error.digest}
        </p>
      ) : null}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
        <button type="button" onClick={reset} className="ms-cta text-sm">
          Try again
        </button>
        <Link href="/docs/components" className="ms-cta-ghost text-sm">
          Components
        </Link>
        <Link href="/" className="ms-cta-ghost text-sm">
          Home
        </Link>
      </div>
    </main>
  )
}
