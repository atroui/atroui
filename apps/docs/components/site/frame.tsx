"use client"

import * as React from "react"
import { Menu, X } from "lucide-react"
import { usePathname, useSearchParams } from "next/navigation"
import { LogoMark } from "@/components/logo-mark"
import { CommandMenu } from "@/components/command-menu"
import { OverlayShell } from "@/components/overlay-shell"
import { DocsSidebar } from "@/components/sidebar"
import { DraftingSquare } from "@/components/site/drafting-square"
import { ThemeRail, ThemeTrayButton } from "@/components/site/theme-picker"
import { SharedBrand, TransitionLink } from "@/components/view-transitions"
import { catalogCount, FAMILY_PARAM } from "@/lib/catalog"
import { activeNavId, primaryNav } from "@/lib/primary-nav"
import { syncStudioViewport } from "@/lib/studio-viewport"
import { cn } from "@/lib/utils"

const GITHUB_REPO = "https://github.com/atroui/atroui"

function useActive() {
  const pathname = usePathname()
  const params = useSearchParams()
  return activeNavId(pathname, params.get(FAMILY_PARAM))
}

function NavLinks({
  active,
  onNavigate,
  className,
}: {
  active: ReturnType<typeof activeNavId>
  onNavigate?: () => void
  className?: string
}) {
  return (
    <nav aria-label="Primary" className={className}>
      {primaryNav.map((item) => (
        <TransitionLink
          key={item.id}
          href={item.href}
          transitionTypes={[]}
          onClick={onNavigate}
          className={cn(
            "wf-nav-link",
            active === item.id && "wf-nav-link-active"
          )}
        >
          {item.label}
        </TransitionLink>
      ))}
      <TransitionLink
        href="/blog"
        transitionTypes={[]}
        onClick={onNavigate}
        className="wf-nav-link"
      >
        Blog
      </TransitionLink>
    </nav>
  )
}

function SiteMenu() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()
  const active = useActive()
  const onDocs = pathname.startsWith("/docs")

  React.useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <div className="wf-left-mobile min-[1200px]:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="inline-flex size-11 items-center justify-center text-foreground"
      >
        {open ? <X className="size-4" /> : <Menu className="size-4" />}
      </button>
      <OverlayShell
        open={open}
        onClose={() => setOpen(false)}
        side="left"
        label="Site menu"
        trapFocus
        className="min-[1200px]:hidden"
        panelClassName="w-[min(18rem,calc(100vw-2.5rem))] border-[var(--line)] bg-background p-5 pt-[max(1.25rem,env(safe-area-inset-top))]"
      >
        <div className="mb-6 flex items-center justify-between">
          <span className="text-[15px] font-medium">AtroUI</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="inline-flex size-11 items-center justify-center"
          >
            <X className="size-4" />
          </button>
        </div>
        <NavLinks
          active={active}
          onNavigate={() => setOpen(false)}
          className="flex flex-col gap-1"
        />
        {onDocs ? (
          <div className="mt-8 border-t border-[var(--line)] pt-6">
            <DocsSidebar />
          </div>
        ) : null}
      </OverlayShell>
    </div>
  )
}

function LeftRail({ active }: { active: ReturnType<typeof activeNavId> }) {
  return (
    <header className="wf-left" style={{ viewTransitionName: "site-header" }}>
      <div className="wf-left-head flex w-full items-center gap-2">
        <SiteMenu />
        <SharedBrand>
          <TransitionLink href="/" aria-label="AtroUI home" className="wf-mark">
            <LogoMark className="size-8" />
          </TransitionLink>
        </SharedBrand>
        <div className="wf-left-mobile ml-auto flex items-center gap-2 min-[1200px]:hidden">
          <TransitionLink
            href="/docs"
            transitionTypes={[]}
            className={cn(
              "inline-flex h-11 items-center text-[13px] text-muted-foreground",
              active === "docs" && "font-medium text-foreground"
            )}
          >
            Docs
          </TransitionLink>
          <CommandMenu compact />
          <ThemeTrayButton />
        </div>
      </div>

      <NavLinks active={active} className="wf-left-nav" />

      <p className="wf-left-foot">
        Open source. MIT.
        <a href={GITHUB_REPO} target="_blank" rel="noopener noreferrer">
          github.com/atroui
        </a>
      </p>
    </header>
  )
}

function RightRail() {
  return (
    <aside className="wf-right" aria-label="Utilities">
      <p className="wf-stat">{catalogCount.toLocaleString()} on the registry</p>
      <ThemeRail />
    </aside>
  )
}

function FrameInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const active = useActive()
  const wide =
    pathname.startsWith("/library") ||
    pathname.startsWith("/docs") ||
    pathname.startsWith("/blog") ||
    pathname.startsWith("/updates") ||
    pathname.startsWith("/og") ||
    pathname.startsWith("/planner")

  React.useLayoutEffect(() => {
    syncStudioViewport()
    window.addEventListener("resize", syncStudioViewport)
    return () => window.removeEventListener("resize", syncStudioViewport)
  }, [])

  return (
    <div
      className={cn("wf-frame", !wide && "wf-board")}
      data-wide={wide ? "" : undefined}
    >
      <LeftRail active={active} />
      <div className="wf-center">{children}</div>
      <RightRail />
      {wide ? null : <DraftingSquare />}
    </div>
  )
}

function FrameFallback({ children }: { children: React.ReactNode }) {
  return (
    <div className="wf-frame">
      <header className="wf-left">
        <TransitionLink href="/" aria-label="AtroUI home" className="wf-mark">
          <LogoMark className="size-8" />
        </TransitionLink>
      </header>
      <div className="wf-center">{children}</div>
    </div>
  )
}

/**
 * Site chrome: map on the left, page in the center, utilities on the right.
 */
export function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <React.Suspense fallback={<FrameFallback>{children}</FrameFallback>}>
      <FrameInner>{children}</FrameInner>
    </React.Suspense>
  )
}
