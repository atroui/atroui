import { DocsRouteTransition } from "@/components/view-transitions"

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <DocsRouteTransition>{children}</DocsRouteTransition>
    </main>
  )
}