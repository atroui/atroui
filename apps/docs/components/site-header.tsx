"use client"

import Link from "next/link"
import { Github } from "lucide-react"
import { cn } from "@/lib/utils"
import { LogoMark } from "@/components/logo-mark"
import { CommandMenu } from "@/components/command-menu"
import { MobileSidebar } from "@/components/sidebar"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-subtle bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-3 px-4 sm:px-6">
        <MobileSidebar />

        <Link href="/" className="flex items-center gap-2.5" aria-label="Meridian home">
          <LogoMark />
          <span className="text-[15px] font-semibold tracking-tight text-foreground">
            Meridian
          </span>
        </Link>

        <nav className="ml-3 hidden items-center gap-0.5 md:flex">
          {[
            { href: "/docs", label: "Docs" },
            { href: "/docs/components", label: "Components" },
            { href: "/docs/theming", label: "Theming" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden sm:block">
            <CommandMenu />
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border-subtle bg-background text-foreground transition-colors hover:bg-muted"
          >
            <Github className="h-4 w-4" />
          </a>
          <Link
            href="/docs/installation"
            className={cn(
              "hidden h-9 items-center rounded-md bg-foreground px-3.5 text-[13px] font-medium text-background transition-colors hover:bg-foreground/90 sm:inline-flex"
            )}
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  )
}
