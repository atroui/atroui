import { DocsRouteTransition } from "@/components/view-transitions"

export default function UpdatesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DocsRouteTransition>{children}</DocsRouteTransition>
}