"use client"

import Link from "next/link"
import { Github } from "lucide-react"
import { ThemeToggle } from "atroui"
import { LogoMark } from "@/components/logo-mark"
import { CommandMenu } from "@/components/command-menu"
import { MobileSidebar } from "@/components/sidebar"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-subtle bg-background/80 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-350 items-center gap-2 px-3 sm:gap-3 sm:px-6">
        <MobileSidebar />

        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 sm:gap-2.5"
          aria-label="AtroUI home"
        >
          <LogoMark className="shrink-0 text-foreground" />
          <span className="truncate text-[15px] font-medium tracking-tight text-foreground sm:text-[17px]">
            AtroUI
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="ml-1 hidden items-center gap-0.5 lg:ml-3 lg:flex"
        >
          {[
            { href: "/docs", label: "Docs" },
            { href: "/docs/components", label: "Components" },
            { href: "/blog", label: "Blog" },
            { href: "/docs/theming", label: "Theming" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-2.5 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground xl:px-3.5"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
          <div className="hidden md:block">
            <CommandMenu />
          </div>
          <ThemeToggle />
          <a
            href="https://github.com/atroui/atroui"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="AtroUI on GitHub"
            className="inline-flex size-9 items-center justify-center rounded-full border border-border-subtle bg-white/5 text-foreground transition-colors hover:bg-white/10"
          >
            <Github className="size-4" />
          </a>
          <Link
            href="/docs/installation"
            className="ms-cta hidden h-9 px-3.5 text-sm md:inline-flex lg:px-4"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  )
}
