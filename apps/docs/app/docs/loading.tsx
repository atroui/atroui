export default function Loading() {
  return (
    <div
      className="mx-auto flex min-h-[40svh] max-w-3xl flex-col gap-4 px-4 py-10 sm:px-6"
      aria-busy="true"
      aria-label="Loading"
    >
      <p className="ms-stamp">Loading</p>
      <div className="h-9 w-2/3 max-w-md rounded-md bg-white/8" />
      <div className="mt-2 h-36 w-full rounded-xl border border-border-subtle bg-white/[0.03]" />
      <div className="h-3.5 w-full rounded-sm bg-white/[0.05]" />
      <div className="h-3.5 w-5/6 rounded-sm bg-white/[0.05]" />
    </div>
  )
}
