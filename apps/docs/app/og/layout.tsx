import { SiteChrome } from "@/components/app-shell"

export default function OgLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SiteChrome>{children}</SiteChrome>
}
