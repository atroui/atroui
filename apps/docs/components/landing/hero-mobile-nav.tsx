"use client"

import { useEffect, useId, useState } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Menu, Star, X } from "lucide-react"
import { LogoMark } from "@/components/logo-mark"
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock"
import { fadeTween, panelTween } from "@/lib/motion"

const GITHUB_REPO = "https://github.com/atroui/atroui"

const navLinks = [
  { label: "Catalog", href: "/docs/components" },
  { label: "Registry", href: "/docs/registry" },
  { label: "Host APIs", href: "/docs/host-api" },
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "/blog" },
] as const

export function HeroMobileNav() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const panelId = useId()
  const reduce = useReducedMotion()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  useBodyScrollLock(open)

  const drawer =
    mounted &&
    createPortal(
      <AnimatePresence>
        {open ? (
          <motion.div
            key="hero-nav"
            className="fixed inset-0 z-[200] flex md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={fadeTween}
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/80"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            />

            <motion.div
              id={panelId}
              className="relative ml-auto flex h-full w-[min(100%,20rem)] flex-col border-l border-white/10 bg-black shadow-[-24px_0_48px_rgba(0,0,0,0.65)]"
              initial={reduce ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={panelTween}
            >
              <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
                <div className="flex items-center gap-2 text-white">
                  <LogoMark className="h-7 w-7 text-white" />
                  <span className="ds-sketch text-xl tracking-tight">AtroUI</span>
                </div>
                <button
                  type="button"
                  className="inline-flex size-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <X className="size-5" aria-hidden />
                </button>
              </div>

              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto overscroll-contain px-3 py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-lg px-3 py-3 text-[15px] text-neutral-200 transition-colors active:bg-white/10 hover:bg-white/5 hover:text-white"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <a
                  href={GITHUB_REPO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 rounded-lg px-3 py-3 text-[15px] text-neutral-200 transition-colors active:bg-white/10 hover:bg-white/5 hover:text-white"
                  aria-label="Star AtroUI on GitHub"
                  onClick={() => setOpen(false)}
                >
                  <Star className="size-4" aria-hidden />
                  Star on GitHub
                </a>
              </nav>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>,
      document.body
    )

  return (
    <div className="relative z-20 flex items-center justify-between gap-3 px-5 pt-4 sm:px-8 md:hidden">
      <Link href="/" className="flex items-center gap-2 text-white">
        <LogoMark className="h-8 w-8 text-white" />
        <span className="ds-sketch text-2xl tracking-tight">AtroUI</span>
      </Link>

      <div className="flex items-center gap-2">
        <a
          href={GITHUB_REPO}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Star AtroUI on GitHub"
          className="inline-flex size-10 items-center justify-center rounded-lg border border-white/15 bg-white/4 text-white transition hover:border-white/25 hover:bg-white/8"
        >
          <Star className="size-4" aria-hidden />
        </a>
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center bg-white text-black"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <X className="size-5" aria-hidden />
          ) : (
            <Menu className="size-5" aria-hidden />
          )}
        </button>
      </div>

      {drawer}
    </div>
  )
}
