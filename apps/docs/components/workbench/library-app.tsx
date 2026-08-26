import { Suspense } from "react"
import { Gallery } from "@/components/catalog/gallery"
import { catalogCount } from "@/lib/catalog"

export function LibraryApp() {
  return (
    <div>
      <header className="mb-8 max-w-2xl">
        <h1 className="wf-page-title text-foreground">Components</h1>
        <p className="wf-lede mt-3 text-muted-foreground">
          Browse {catalogCount} production sections and primitives. Preview
          live, then install with the shadcn CLI.
        </p>
      </header>
      <Suspense fallback={<div className="min-h-[50svh]" aria-hidden />}>
        <Gallery syncUrl />
      </Suspense>
    </div>
  )
}