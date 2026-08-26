"use client"

import { Github } from "lucide-react"
import { Suspense } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { ThemeToggleIcon } from "atroui"
import { LogoMark } from "@/components/logo-mark"
import { CommandMenu } from "@/components/command-menu"
import { MobileSidebar } from "@/components/sidebar"
import { AnnounceBar } from "@/components/site/announce-bar"
import { SharedBrand, TransitionLink } from "@/components/view-transitions"
import { FAMILY_PARAM } from "@/lib/catalog"
import { activeNavId, primaryNav } from "@/lib/primary-nav"
import { cn } from "@/lib/utils"

const GITHUB_REPO = "https://github.com/atroui/atroui"

function HeaderNav() {
  const pathname = usePathname()
  const params = useSearchParams()
  const family = params.get(FAMILY_PARAM)
  const active = activeNavId(pathname, family)
  const docsOn =
    pathname.startsWith("/docs") &&
    !pathname.startsWith("/docs/components") &&
    !pathname.startsWith("/docs/host-api")

  return (
    <>
      <nav aria-label="Primary" className="ml-2 flex items-center gap-0.5">
        {primaryNav.map((item, index) => (
          <TransitionLink
            key={item.id}
            href={item.href}
            transitionTypes={[]}
            className={cn(
              "rounded-md px-2.5 py-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground",
              active === item.id && "bg-muted font-medium text-foreground",
              index > 0 && "hidden md:inline-flex"
            )}
          >
            {item.label}
          </TransitionLink>
        ))}
      </nav>

      <div className="ml-auto flex shrink-0 items-center gap-1.5">
        <TransitionLink
          href="/docs"
          transitionTypes={[]}
          className={cn(
            "rounded-md px-2.5 py-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground",
            docsOn && "bg-muted font-medium text-foreground"
          )}
        >
          Docs
        </TransitionLink>
        <CommandMenu compact />
        <a
          href={GITHUB_REPO}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="AtroUI on GitHub"
          className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
        >
          <Github className="size-4" aria-hidden />
        </a>
        <ThemeToggleIcon />
      </div>
    </>
  )
}

function HeaderNavFallback() {
  return (
    <>
      <nav aria-label="Primary" className="ml-2 flex items-center gap-0.5">
        {primaryNav.map((item, index) => (
          <TransitionLink
            key={item.id}
            href={item.href}
            transitionTypes={[]}
            className={cn(
              "rounded-md px-2.5 py-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground",
              index > 0 && "hidden md:inline-flex"
            )}
          >
            {item.label}
          </TransitionLink>
        ))}
      </nav>
      <div className="ml-auto flex shrink-0 items-center gap-1.5">
        <TransitionLink
          href="/docs"
          transitionTypes={[]}
          className="rounded-md px-2.5 py-1.5 text-[13px] text-muted-foreground"
        >
          Docs
        </TransitionLink>
        <CommandMenu compact />
        <span className="size-8" aria-hidden />
        <span className="size-8" aria-hidden />
      </div>
    </>
  )
}

/**
 * Product map on the left, utilities on the right. CTAs live in the hero.
 */
export function SiteHeader({
  className,
  showSidebarToggle = false,
}: {
  className?: string
  showSidebarToggle?: boolean
}) {
  return (
    <>
      <AnnounceBar />
      <header
        className={cn(
          "sticky top-0 z-30 w-full border-b border-[var(--line)] bg-background/90 pt-[env(safe-area-inset-top)] backdrop-blur-md",
          className
        )}
        style={{ viewTransitionName: "site-header" }}
      >
        <div className="spec-shell flex h-12 items-center gap-3">
          {showSidebarToggle ? <MobileSidebar /> : null}

          <SharedBrand>
            <TransitionLink
              href="/"
              className="flex min-w-0 items-center gap-2"
              aria-label="AtroUI home"
            >
              <LogoMark className="size-[18px] shrink-0 text-foreground" />
              <span className="text-[15px] font-medium tracking-[-0.03em] text-foreground">
                AtroUI
              </span>
            </TransitionLink>
          </SharedBrand>

          <Suspense fallback={<HeaderNavFallback />}>
            <HeaderNav />
          </Suspense>
        </div>
      </header>
    </>
  )
}
