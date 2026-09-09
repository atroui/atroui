import { Github } from "lucide-react"
import { ColorThemePicker, ThemeToggle } from "atroui"
import { LogoMark } from "@/components/logo-mark"
import { CommandMenu } from "@/components/command-menu"
import { MobileSidebar } from "@/components/sidebar"
import { SiteChrome } from "@/components/site-chrome"
import { SharedBrand, TransitionLink } from "@/components/view-transitions"

const GITHUB_REPO = "https://github.com/atroui/atroui"

/**
 * Docs book header — Zed index bar:
 * brand left · wide centered search · theme + GitHub right.
 * No Browse CTA. Tool rooms pass `showChapterNav={false}`.
 */
export function DocsHeader({
  showChapterNav = true,
}: {
  showChapterNav?: boolean
}) {
  return (
    <SiteChrome
      leading={
        <>
          {showChapterNav ? <MobileSidebar /> : null}
          <SharedBrand>
            <TransitionLink
              href="/"
              className="atro-site-brand"
              aria-label="AtroUI home"
            >
              <LogoMark className="size-4 shrink-0 text-foreground" />
              <span className="hidden min-[380px]:inline">AtroUI</span>
            </TransitionLink>
          </SharedBrand>
        </>
      }
      center={
        <div className="hidden w-full sm:block">
          <CommandMenu />
        </div>
      }
      trailing={
        <>
          <div className="sm:hidden">
            <CommandMenu compact />
          </div>
          <ColorThemePicker />
          <ThemeToggle />
          <a
            href={GITHUB_REPO}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="atro-site-icon-btn hidden sm:inline-flex"
          >
            <Github className="size-3.5" aria-hidden />
          </a>
        </>
      }
    />
  )
}
