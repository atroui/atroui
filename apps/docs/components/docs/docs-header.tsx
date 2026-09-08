import { Github } from "lucide-react"
import { ThemeToggle } from "atroui"
import { LogoMark } from "@/components/logo-mark"
import { CommandMenu } from "@/components/command-menu"
import { MobileSidebar } from "@/components/sidebar"
import { SharedBrand, TransitionLink } from "@/components/view-transitions"

const GITHUB_REPO = "https://github.com/atroui/atroui"

/**
 * Docs book header — Zed's index.hbs bar, not the storefront nav.
 * Same sticky/blur chrome and shared `site-header` transition name as
 * SiteHeader so the bar holds its place across the shell swap; the Components ·
 * Docs · Blog megas stay on marketing routes so the book room reads quiet.
 *
 * Tool rooms (/og, /planner) pass `showChapterNav={false}` — they have no
 * chapter tree, so the sidebar trigger would open an empty drawer.
 */
export function DocsHeader({
  showChapterNav = true,
}: {
  showChapterNav?: boolean
}) {
  return (
    <header
      className="sticky top-0 z-40 border-b border-border-subtle bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70"
      style={{ viewTransitionName: "site-header" }}
    >
      <div className="atro-shell flex h-14 items-center gap-3">
        {showChapterNav ? <MobileSidebar /> : null}

        <SharedBrand>
          <TransitionLink
            href="/"
            className="flex min-w-0 items-center gap-2"
            aria-label="AtroUI home"
          >
            <LogoMark className="size-5 shrink-0 text-foreground" />
            <span className="text-[15px] font-medium tracking-[-0.02em] text-foreground">
              AtroUI
            </span>
          </TransitionLink>
        </SharedBrand>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <div className="hidden md:block">
            <CommandMenu />
          </div>
          <div className="md:hidden">
            <CommandMenu compact />
          </div>
          <ThemeToggle />
          <a
            href={GITHUB_REPO}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hidden size-9 items-center justify-center rounded-[var(--atro-control-radius)] text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            <Github className="size-4" aria-hidden />
          </a>
          <TransitionLink
            href="/docs/components"
            transitionTypes={[]}
            className="atro-btn hidden md:inline-flex"
          >
            Browse
          </TransitionLink>
        </div>
      </div>
    </header>
  )
}
