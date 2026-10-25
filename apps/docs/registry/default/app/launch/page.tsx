import { LaunchRoom } from "@/components/blocks/launch-room"

/**
 * Consumer launch path — dropped by @atroui/launch-workflow.
 * Wire SiteHeader / layout in your app as needed.
 */
export default function LaunchPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 @min-[40rem]:px-6 @min-[40rem]:py-10">
      <LaunchRoom />
    </main>
  )
}
