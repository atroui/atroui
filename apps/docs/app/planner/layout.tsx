import { SiteChrome } from "@/components/app-shell"

export default function PlannerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SiteChrome>{children}</SiteChrome>
}
