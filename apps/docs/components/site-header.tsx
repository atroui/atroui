"use client"

import * as React from "react"
import Link from "next/link"
import { Github, Search } from "lucide-react"
import { cn } from "@meridian/ui"
import { LogoMark } from "@/components/logo-mark"
import { CommandMenu } from "@/components/command-menu"
import { MobileSidebar } from "@/components/sidebar"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#f2f4f6]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.25rem] max-w-[1400px] items-center gap-3 px-4 sm:px-6">
        <MobileSidebar />

        <Link href="/" className="flex items-center gap-2.5" aria-label="Meridian home">
          <LogoMark />
          <span className="text-[15px] font-semibold tracking-tight text-neutral-950">
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
              className="rounded-full px-3 py-1.5 text-[13px] font-medium text-neutral-600 transition-colors hover:bg-white hover:text-neutral-950"
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
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-[0_1px_2px_rgb(0,0,0,0.04)] transition-colors hover:bg-neutral-50"
          >
            <Github className="h-4 w-4" />
          </a>
          <Link
            href="/docs/installation"
            className={cn(
              "hidden h-9 items-center rounded-full bg-neutral-950 px-4 text-[13px] font-medium text-white transition-colors hover:bg-neutral-800 sm:inline-flex"
            )}
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  )
}

/** Slimmer search trigger used if CommandMenu is restyled externally */
export function DocsSearchHint() {
  return (
    <span className="inline-flex items-center gap-2 text-neutral-400">
      <Search className="h-3.5 w-3.5" />
      Search
    </span>
  )
}
