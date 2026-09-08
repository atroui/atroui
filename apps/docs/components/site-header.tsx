import { ThemeToggle } from "atroui"
import { LogoMark } from "@/components/logo-mark"
import { CommandMenu } from "@/components/command-menu"
import { SiteNav } from "@/components/site-nav"
import { SiteChrome } from "@/components/site-chrome"
import { SharedBrand, TransitionLink } from "@/components/view-transitions"

/**
 * Short marketing bar — brand · Docs/Components/Blog · search · theme.
 * No mega menus, no Browse CTA (Components + search cover it).
 */
export function SiteHeader() {
  return (
    <SiteChrome
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
          <ThemeToggle />
        </>
      }
    >
      <SiteNav />
    </SiteChrome>
  )
}
