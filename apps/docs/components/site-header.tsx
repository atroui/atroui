"use client"

import { Github, Star } from "lucide-react"
import { ThemeToggle } from "atroui"
import { LogoMark } from "@/components/logo-mark"
import { CommandMenu } from "@/components/command-menu"
import { MobileSidebar } from "@/components/sidebar"
import { SiteNav } from "@/components/site-nav"
import {
  SharedBrand,
  SharedOwnCta,
  TransitionLink,
} from "@/components/view-transitions"

const GITHUB_REPO = "https://github.com/atroui/atroui"

export function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-40 w-full border-b border-border-subtle bg-background/80 pt-[env(safe-area-inset-top)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/70"
      style={{ viewTransitionName: "site-header" }}
    >
      <div className="mx-auto flex h-14 max-w-350 items-center gap-2 px-3 sm:gap-3 sm:px-6">
        <MobileSidebar />

        <SharedBrand>
          <TransitionLink
            href="/"
            className="flex min-w-0 items-center gap-2 sm:gap-2.5"
            aria-label="AtroUI home"
          >
            <LogoMark className="shrink-0 text-foreground" />
            <span className="truncate text-[15px] font-medium tracking-tight text-foreground sm:text-[17px]">
              AtroUI
            </span>
          </TransitionLink>
        </SharedBrand>

        <SiteNav />

        <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
          <div className="md:hidden">
            <CommandMenu compact />
          </div>
          <div className="hidden md:block">
            <CommandMenu />
          </div>
          <ThemeToggle />
          <a
            href={GITHUB_REPO}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Star AtroUI on GitHub"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border-subtle bg-white/[0.03] px-2.5 text-foreground transition-colors hover:bg-white/[0.06] sm:px-3"
          >
            <Github className="size-4" aria-hidden />
            <span className="hidden text-[13px] font-medium sm:inline">
              Star
            </span>
            <Star className="size-3.5 opacity-80" aria-hidden />
          </a>
          <SharedOwnCta>
            <TransitionLink
              href="/docs/registry"
              transitionTypes={[]}
              className="ms-cta hidden h-9 px-3.5 text-sm md:inline-flex lg:px-4"
            >
              Own the UI
            </TransitionLink>
          </SharedOwnCta>
        </div>
      </div>
    </header>
  )
}
