import { ColorThemePicker, ThemeToggle } from "atroui"
import { LogoMark } from "@/components/logo-mark"
import { CommandMenu } from "@/components/command-menu"
import { SiteNav } from "@/components/site-nav"
import { SiteChrome } from "@/components/site-chrome"
import { SharedBrand, TransitionLink } from "@/components/view-transitions"

/**
 * Short marketing bar — brand · Docs/Components/Blog · search · theme.
 * Hide-on-scroll (Motion scroll-direction) — docs book uses DocsHeader instead.
 */
export function SiteHeader() {
  return (
    <SiteChrome
      hideOnScroll
      leading={
        <SharedBrand>
          <TransitionLink
            href="/"
            className="atro-site-brand"
            aria-label="AtroUI home"
          >
            <LogoMark className="size-4 shrink-0 text-foreground" />
            <span>AtroUI</span>
          </TransitionLink>
        </SharedBrand>
      }
      trailing={
        <>
          <CommandMenu compact />
          <ColorThemePicker />
          <ThemeToggle />
        </>
      }
    >
      <SiteNav />
    </SiteChrome>
  )
}
