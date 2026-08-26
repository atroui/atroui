import Link from "next/link"

export default function NotFound() {
  return (
    <main>
      <h1 className="wf-page-title text-foreground">Off the map</h1>
      <p className="wf-lede mt-4 max-w-[40ch] text-muted-foreground">
        That URL isn&apos;t in the catalog. Pick a door that is.
      </p>
      <div className="wf-cta-row mt-8">
        <Link href="/library" className="spec-btn">
          Browse components
        </Link>
        <Link href="/docs" className="wf-cta-text">
          Docs
        </Link>
      </div>
    </main>
  )
}