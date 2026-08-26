import type { Metadata } from "next"
import { SiteGraphJsonLd, SoftwareAppJsonLd } from "atroui"
import { LandingHero } from "@/components/landing-hero"
import { DirectionalPage } from "@/components/view-transitions"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "AtroUI - Own the UI. Borrow the API.",
  description:
    "Dark-first landing sections and Host APIs for indie Next.js — on the shadcn registry. Copy into your repo. BYOK. MIT. atroui.com",
  path: "/",
})

export default function HomePage() {
  return (
    <DirectionalPage>
      <SiteGraphJsonLd />
      <SoftwareAppJsonLd />
      <LandingHero />
    </DirectionalPage>
  )
}
