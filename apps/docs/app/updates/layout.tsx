import { SiteHeader } from "@/components/site-header"
import { DocsRouteTransition } from "@/components/view-transitions"

export default function UpdatesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SiteHeader />
      <DocsRouteTransition>{children}</DocsRouteTransition>
    </>
  )
}
