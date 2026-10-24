import { NotFoundPanel } from "@/components/not-found-panel"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

/**
 * Unmatched URLs — marketing chrome so ⌘K actually works and the exit map is
 * one scroll away. Explicit `notFound()` calls under `/docs` and `/blog` hit
 * their own boundaries instead; those layouts already carry a header.
 */
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <NotFoundPanel />
      <SiteFooter />
    </>
  )
}
