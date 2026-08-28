import { SiteChrome } from "@/components/app-shell"

export default function UpdatesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SiteChrome>{children}</SiteChrome>
}
