import { SiteHeader } from "@/components/site-header"
import { DocsLayoutShell } from "@/components/docs-layout"

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <DocsLayoutShell>{children}</DocsLayoutShell>
    </>
  )
}
