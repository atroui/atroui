"use client"

import Link from "next/link"
import { Star } from "lucide-react"
import MotionDrawer from "@/components/ui/motion-drawer"
import { LogoMark } from "@/components/logo-mark"

const GITHUB_REPO = "https://github.com/atroui/atroui"

const navLinks = [
  { label: "Catalog", href: "/docs/components" },
  { label: "Registry", href: "/docs/registry" },
  { label: "Host APIs", href: "/docs/host-api" },
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "/blog" },
] as const

export function HeroMobileNav() {
  return (
    <div className="flex items-center justify-between gap-4 px-5 pt-4 sm:px-8 md:hidden">
      <MotionDrawer
        direction="right"
        width={300}
        backgroundColor="#000000"
        clsBtnClassName="bg-neutral-800 border-r border-neutral-900 text-white"
        contentClassName="bg-black border-r border-neutral-900 text-white"
        btnClassName="bg-white text-black relative w-fit p-2 left-0 top-0"
      >
        <nav className="space-y-4">
          <div className="flex items-center gap-2 text-white">
            <LogoMark className="h-8 w-8 text-white" />
            <span className="ds-sketch text-2xl tracking-tight">AtroUI</span>
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-sm p-2 hover:bg-neutral-100 hover:text-black"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={GITHUB_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center gap-2 rounded-sm p-2 hover:bg-neutral-100 hover:text-black"
            aria-label="Star AtroUI on GitHub"
          >
            <Star className="size-4" aria-hidden />
            Star on GitHub
          </a>
        </nav>
      </MotionDrawer>

      <div className="flex items-center gap-2">
        <a
          href={GITHUB_REPO}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Star AtroUI on GitHub"
          className="inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-md transition hover:bg-white/10"
        >
          <Star className="size-4" aria-hidden />
        </a>
        <Link
          href="/docs/registry"
          className="group inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-medium text-black shadow-[0_0_14px_rgba(11,123,255,0.3)] transition hover:bg-white/90"
        >
          <span
            className="size-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(146,219,224,0.9)]"
            aria-hidden
          />
          Own UI
        </Link>
      </div>
    </div>
  )
}
