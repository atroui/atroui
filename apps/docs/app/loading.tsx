export default function Loading() {
  return (
    <div
      className="mx-auto flex min-h-[40svh] max-w-3xl flex-col gap-4 px-4 py-10 sm:px-6"
      aria-busy="true"
      aria-label="Loading"
    >
      <div className="h-3 w-24 animate-pulse rounded-full bg-white/10" />
      <div className="h-9 w-2/3 max-w-md animate-pulse rounded-xl bg-white/10" />
      <div className="mt-4 h-40 w-full animate-pulse rounded-2xl bg-white/5" />
      <div className="h-4 w-full animate-pulse rounded-full bg-white/5" />
      <div className="h-4 w-5/6 animate-pulse rounded-full bg-white/5" />
    </div>
  )
}
