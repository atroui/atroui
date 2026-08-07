import type { Metadata } from "next"
import { SiteGraphJsonLd, SoftwareAppJsonLd } from "atroui"
import { LandingHero } from "@/components/landing-hero"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "AtroUI - Own the UI. Borrow the API.",
  description:
    "Dark-first Next.js sections you copy into your repo, plus Host APIs for forms and AI tools. Your keys stay in your env. atroui.com",
  path: "/",
})

export default function HomePage() {
  return (
    <>
      <SiteGraphJsonLd />
      <SoftwareAppJsonLd />
      <LandingHero />
    </>
  )
}
