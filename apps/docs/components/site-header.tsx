"use client"

import { usePathname } from "next/navigation"
import { Github } from "lucide-react"
import { ThemeToggle } from "atroui"
import { LogoMark } from "@/components/logo-mark"
import { CommandMenu } from "@/components/command-menu"
import { MobileSidebar } from "@/components/sidebar"
import { SiteNav } from "@/components/site-nav"
import { SharedBrand, TransitionLink } from "@/components/view-transitions"
import { cn } from "@/lib/utils"

const GITHUB_REPO = "https://github.com/atroui/atroui"

export function SiteHeader() {
  const pathname = usePathname()
  const landing = pathname === "/"

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70",
        landing ? "border-white/[0.06]" : "border-border-subtle"
      )}
      style={{ viewTransitionName: "site-header" }}
    >
      <div className="atro-shell flex h-14 items-center gap-3">
        <MobileSidebar />

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

        <SiteNav />

        <div className="ml-auto flex shrink-0 items-center gap-2">
          {!landing ? (
            <>
              <div className="hidden md:block">
                <CommandMenu />
              </div>
              <div className="md:hidden">
                <CommandMenu compact />
              </div>
            </>
          ) : null}
          {!landing ? <ThemeToggle /> : null}
          <a
            href={GITHUB_REPO}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hidden h-9 items-center gap-1.5 rounded-md px-2.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            <Github className="size-4" aria-hidden />
            GitHub
          </a>
          <TransitionLink
            href="/docs/components"
            transitionTypes={[]}
            className="hidden h-9 items-center rounded-md bg-foreground px-3.5 text-[13px] font-medium text-background transition-opacity hover:opacity-90 md:inline-flex"
          >
            Browse
          </TransitionLink>
        </div>
      </div>
    </header>
  )
}
