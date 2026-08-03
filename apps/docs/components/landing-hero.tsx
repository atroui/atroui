"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@meridian/ui"
import { LandingNav } from "@/components/landing-nav"

const avatars = [
  { src: "https://i.pravatar.cc/80?img=12", fallback: "A" },
  { src: "https://i.pravatar.cc/80?img=32", fallback: "B" },
  { src: "https://i.pravatar.cc/80?img=47", fallback: "C" },
]

export function LandingHero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#f2f4f6] text-neutral-950">
      {/* Full-bleed atmospheric hero plane */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=80)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #f2f4f6 0%, rgba(242,244,246,0.92) 28%, rgba(242,244,246,0.55) 48%, rgba(242,244,246,0.15) 68%, transparent 82%), linear-gradient(0deg, rgba(255,255,255,0.35) 0%, transparent 35%)",
        }}
      />

      <LandingNav />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-3xl flex-col items-center px-5 pb-28 pt-28 text-center md:justify-center md:px-6 md:pb-36 md:pt-24">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4 text-sm font-semibold tracking-[0.08em] text-neutral-500 uppercase md:mb-5"
        >
          Meridian
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[15ch] text-[2.35rem] font-semibold leading-[1.12] tracking-tight text-neutral-950 sm:text-5xl md:max-w-[18ch] md:text-[3.5rem] md:leading-[1.08]"
        >
          Make Better Decisions, With Ease
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-xl text-base leading-relaxed text-neutral-500 sm:text-[1.0625rem]"
        >
          Meridian&apos;s component library helps you cut through the noise, ship faster,
          and stay focused without switching contexts.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 w-full sm:w-auto"
        >
          <Link
            href="/docs"
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-neutral-950 px-8 text-[15px] font-medium text-white transition-colors hover:bg-neutral-800 active:scale-[0.98] sm:w-auto"
          >
            Get started
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-col items-center gap-2.5"
        >
          <div className="flex -space-x-2.5">
            {avatars.map((avatar) => (
              <Avatar
                key={avatar.fallback}
                className="h-8 w-8 border-2 border-white shadow-sm"
              >
                <AvatarImage src={avatar.src} alt="" />
                <AvatarFallback className="bg-neutral-200 text-[10px] text-neutral-700">
                  {avatar.fallback}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          <p className="text-xs text-neutral-400">Loved by 4200+ professionals</p>
        </motion.div>
      </div>
    </section>
  )
}
