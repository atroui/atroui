export default function DocsLoading() {
  return (
    <div className="mx-auto max-w-3xl animate-pulse space-y-4" aria-hidden>
      <div className="h-3 w-24 rounded-sm bg-muted" />
      <div className="h-9 w-2/3 max-w-md rounded-[var(--radius-sm)] bg-muted" />
      <div className="mt-2 h-40 w-full rounded-[var(--radius)] border border-[var(--line)] bg-[var(--plate-ground)]" />
      <div className="h-3.5 w-full rounded-sm bg-muted" />
      <div className="h-3.5 w-5/6 rounded-sm bg-muted" />
    </div>
  )
}
