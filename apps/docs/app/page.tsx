import type { Metadata } from "next"
import { SiteGraphJsonLd, SoftwareAppJsonLd } from "atroui"
import { LandingHero } from "@/components/landing-hero"
import { SiteHeader } from "@/components/site-header"
import { DirectionalPage } from "@/components/view-transitions"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "AtroUI — Add the section. Own the room.",
  description:
    "Opinionated section catalog for Next.js. Install production bands with the shadcn CLI, tune accent/surface/type/radius in Theme Studio, wire Host APIs with your keys. Own every file.",
  path: "/",
})

export default function HomePage() {
  return (
    <div className="atro-landing">
      <SiteHeader />
      <DirectionalPage>
        <SiteGraphJsonLd />
        <SoftwareAppJsonLd />
        <LandingHero />
      </DirectionalPage>
    </div>
  )
}
