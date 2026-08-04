"use client"

import Link from "next/link"
import { Github } from "lucide-react"
import { ThemeToggle } from "@meridian/ui"
import { LogoMark } from "@/components/logo-mark"
import { CommandMenu } from "@/components/command-menu"
import { MobileSidebar } from "@/components/sidebar"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-subtle bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-3 px-4 sm:px-6">
        <MobileSidebar />

        <Link href="/" className="flex items-center gap-2.5" aria-label="Meridian home">
          <LogoMark className="text-foreground" />
          <span className="text-[17px] font-medium tracking-tight text-foreground">
            Meridian
          </span>
        </Link>

        <nav className="ml-3 hidden items-center gap-1 md:flex">
          {[
            { href: "/docs", label: "Docs" },
            { href: "/docs/components", label: "Components" },
            { href: "/docs/theming", label: "Theming" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden sm:block">
            <CommandMenu />
          </div>
          <ThemeToggle />
          <a
            href="https://github.com/KOUSTAV2409"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="inline-flex size-9 items-center justify-center rounded-full border border-border-subtle bg-white/5 text-foreground transition-colors hover:bg-white/10"
          >
            <Github className="size-4" />
          </a>
          <Link
            href="/docs/installation"
            className="ms-cta hidden h-9 px-4 text-sm sm:inline-flex"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  )
}
