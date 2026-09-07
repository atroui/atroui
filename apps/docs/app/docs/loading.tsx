export default function Loading() {
  return (
    <div
      className="flex min-h-[40svh] flex-col gap-4 py-2"
      aria-busy="true"
      aria-label="Loading"
    >
      <div className="h-8 w-2/3 max-w-md rounded-sm bg-white/8" />
      <div className="h-px w-full bg-border-subtle" />
      <div className="mt-2 h-4 w-full max-w-lg rounded-sm bg-white/[0.05]" />
      <div className="h-4 w-5/6 max-w-md rounded-sm bg-white/[0.05]" />
    </div>
  )
}
