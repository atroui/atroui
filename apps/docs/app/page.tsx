import type { Metadata } from "next"
import { SiteGraphJsonLd, SoftwareAppJsonLd } from "atroui"
import { LandingHero } from "@/components/landing-hero"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "AtroUI - React Component Library & Dark Design System",
  description:
    "AtroUI is the React and Next.js component catalog at atroui.com. Add with the shadcn registry - own the UI in your repo. Dark-first design system.",
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
