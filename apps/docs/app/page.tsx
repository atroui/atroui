import type { Metadata } from "next"
import { SiteGraphJsonLd, SoftwareAppJsonLd } from "atroui"
import { LandingHero } from "@/components/landing-hero"
import { SiteHeader } from "@/components/site-header"
import { DirectionalPage } from "@/components/view-transitions"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "AtroUI - Own the UI. Borrow the API.",
  description:
    "AtroUI is an MIT-licensed React and Next.js component catalog. Copy dark-first sections into your repo with the shadcn CLI, plus Host APIs for forms and AI tools. Your keys stay in your env. atroui.com",
  path: "/",
})

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <DirectionalPage>
        <SiteGraphJsonLd />
        <SoftwareAppJsonLd />
        <LandingHero />
      </DirectionalPage>
    </>
  )
}
