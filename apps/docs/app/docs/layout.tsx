import { IBM_Plex_Serif } from "next/font/google"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { DocsLayoutShell } from "@/components/docs-layout"

/**
 * Docs book room — Zed/mdBook spine + shared site chrome.
 * Serif titles for reading class; Outfit body via root; SiteFooter closes the room.
 */
const docsSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-docs-serif",
  display: "swap",
})

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`docs-book ${docsSerif.variable}`}>
      <SiteHeader />
      <DocsLayoutShell>{children}</DocsLayoutShell>
      <SiteFooter />
    </div>
  )
}
