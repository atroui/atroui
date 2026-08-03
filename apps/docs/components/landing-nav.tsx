"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronDown, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { LogoMark } from "@/components/logo-mark"

const navLinks = [
  { label: "Products", href: "/docs/components", hasMenu: true },
  { label: "Solutions", href: "/docs", hasMenu: true },
  { label: "Pricing", href: "/docs/installation" },
  { label: "Company", href: "/docs" },
]

export function LandingNav() {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      {/* Desktop floating pill */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-x-0 top-0 z-50 hidden pt-5 md:block"
      >
        <div className="pointer-events-auto mx-auto flex h-14 max-w-3xl items-center justify-between rounded-full border border-black/5 bg-white px-3 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
          <Link href="/" className="flex items-center pl-1.5" aria-label="Meridian home">
            <LogoMark />
          </Link>

          <nav className="flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[13px] font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
              >
                {link.label}
                {link.hasMenu ? <ChevronDown className="h-3.5 w-3.5 text-neutral-400" /> : null}
              </Link>
            ))}
          </nav>

          <Link
            href="/docs"
            className="inline-flex h-9 items-center rounded-full border border-neutral-200 bg-white px-4 text-[13px] font-medium text-neutral-800 transition-colors hover:bg-neutral-50"
          >
            Login
          </Link>
        </div>
      </motion.header>

      {/* Mobile top bar */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-4 md:hidden"
      >
        <Link href="/" aria-label="Meridian home">
          <LogoMark />
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/docs" className="text-sm font-medium text-neutral-800">
            Login
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-neutral-800"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute inset-x-4 top-16 z-50 rounded-2xl border border-black/5 bg-white p-3 shadow-lg md:hidden"
          >
            <nav className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-800 hover:bg-neutral-50"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
