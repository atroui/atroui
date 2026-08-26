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
    <main className="mx-auto flex min-h-[70svh] max-w-lg flex-col items-center justify-center gap-4 px-6 py-20 text-center">
      <p className="ms-stamp">Error</p>
      <h1 className="spec-title text-foreground">That one didn&apos;t render</h1>
      <p className="spec-lede max-w-[38ch]">
        This section failed to mount. Try again, or step back to the catalog.
      </p>
      {error.digest ? <p className="spec-num">{error.digest}</p> : null}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
        <button type="button" onClick={reset} className="spec-btn">
          Try again
        </button>
        <Link href="/library" className="spec-btn-ghost">
          Browse components
        </Link>
      </div>
    </main>
  )
}
