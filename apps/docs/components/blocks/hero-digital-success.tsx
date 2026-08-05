"use client"

import { Suspense, useRef } from "react"
import Link from "next/link"
import { Github, Star } from "lucide-react"
import { ShaderGradient, ShaderGradientCanvas } from "@shadergradient/react"
import { TimelineAnimation } from "@/components/ui/timeline-animation"
import { useMediaQuery } from "@/hooks/use-media-query"
import MotionDrawer from "@/components/ui/motion-drawer"
import { LogoMark } from "@/components/logo-mark"

const GITHUB_REPO = "https://github.com/atroui/atroui"

const navLinks = [
  { label: "Catalog", href: "/docs/components" },
  { label: "Registry", href: "/docs/registry" },
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "/blog" },
] as const

const catalogBands = [
  { title: "Registry", body: "Own the UI in your repo" },
  { title: "Sections", body: "Home bands, chrome, CTAs" },
  { title: "Primitives", body: "Button, logo, theme toggle" },
  { title: "Headless", body: "Analytics, JSON-LD, reviews" },
] as const

/**
 * Fresh install of @ui-layouts/hero-digital-success (shader + TimelineAnimation
 * unchanged). Copy/links branded for AtroUI.
 */
export function HeroDigitalSuccess() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <section
      ref={timelineRef}
      className="relative flex min-h-screen flex-col overflow-hidden bg-black text-white"
    >
      <Suspense fallback={null}>
        <ShaderGradientCanvas
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
          }}
          lazyLoad={false}
          pixelDensity={1}
          pointerEvents="none"
        >
          <ShaderGradient
            animate="on"
            type="sphere"
            wireframe={false}
            shader="defaults"
            uTime={0}
            uSpeed={0.3}
            uStrength={0.3}
            uDensity={0.8}
            uFrequency={5.5}
            uAmplitude={3.2}
            positionX={-0.1}
            positionY={0}
            positionZ={0}
            rotationX={0}
            rotationY={130}
            rotationZ={70}
            color1="#92dbe0"
            color2="#0b7bff"
            color3="#3865cf"
            reflection={0.4}
            cAzimuthAngle={270}
            cPolarAngle={180}
            cDistance={0.5}
            cameraZoom={15.1}
            lightType="env"
            brightness={0.8}
            envPreset="city"
            grain="on"
            toggleAxis={false}
            zoomOut={false}
            hoverState=""
            enableTransition={false}
          />
        </ShaderGradientCanvas>
      </Suspense>

      {isMobile ? (
        <div className="flex items-center justify-between gap-4 px-6 pt-4 sm:px-10">
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
                <span>AtroUI</span>
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
            <TimelineAnimation
              once
              as="a"
              href="/docs/registry"
              animationNum={3}
              timelineRef={timelineRef}
              className="group inline-flex h-10 items-center gap-2 rounded-full bg-white px-4 text-sm font-medium text-black shadow-[0_0_14px_rgba(11,123,255,0.3)] transition hover:bg-white/90"
            >
              <span
                className="size-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(146,219,224,0.9)]"
                aria-hidden
              />
              Own UI
            </TimelineAnimation>
          </div>
        </div>
      ) : null}

      {!isMobile ? (
        <header className="relative z-10 flex items-center justify-between p-4 px-10">
          <TimelineAnimation
            once
            animationNum={1}
            timelineRef={timelineRef}
            className="flex items-center gap-2.5"
          >
            <LogoMark className="h-8 w-8 text-white" />
            <span className="text-lg font-medium tracking-tight">AtroUI</span>
          </TimelineAnimation>

          <TimelineAnimation
            once
            as="nav"
            animationNum={2}
            timelineRef={timelineRef}
            className="hidden items-center gap-12 text-sm font-medium text-white md:flex"
            aria-label="Primary"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-white/80"
              >
                {link.label}
              </Link>
            ))}
          </TimelineAnimation>

          <TimelineAnimation
            once
            animationNum={3}
            timelineRef={timelineRef}
            className="flex items-center gap-2.5"
          >
            <a
              href={GITHUB_REPO}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Star AtroUI on GitHub"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/10"
            >
              <Github className="size-3.5" aria-hidden />
              Star
              <Star className="size-3.5 opacity-80" aria-hidden />
            </a>
            <a
              href="/docs/registry"
              className="group inline-flex h-11 items-center gap-2.5 rounded-full bg-white px-5 text-sm font-medium text-black shadow-[0_0_18px_rgba(11,123,255,0.35)] transition hover:bg-white/90"
            >
              <span
                className="size-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(146,219,224,0.9)] transition group-hover:scale-110"
                aria-hidden
              />
              Own the UI
            </a>
          </TimelineAnimation>
        </header>
      ) : null}

      <div className="relative z-10 flex grow flex-col justify-center px-6 sm:px-12 md:px-24">
        <TimelineAnimation
          once
          as="h1"
          animationNum={4}
          timelineRef={timelineRef}
          className="flex flex-col items-baseline gap-x-8 gap-y-2 pb-10 text-[10vw] font-medium leading-[100%] xl:flex-row xl:text-[6.5vw]"
        >
          AtroUI
          <span className="block bg-linear-to-r from-white via-sky-300 to-blue-400 bg-clip-text pb-8 text-transparent xl:inline-block">
            Component catalog
          </span>
        </TimelineAnimation>

        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center">
          <div className="flex flex-wrap justify-start gap-4">
            <TimelineAnimation
              once
              as="a"
              href="/docs/registry"
              animationNum={5}
              timelineRef={timelineRef}
              className="flex cursor-pointer items-center gap-3 rounded-full bg-white px-8 py-4 text-lg font-medium text-black shadow-[0_0_20px_rgba(11,123,255,0.4)]"
            >
              <span className="h-2 w-2 rounded-full bg-sky-400" />
              Own the UI
            </TimelineAnimation>
            <TimelineAnimation
              once
              as="a"
              href="/docs/components"
              animationNum={6}
              timelineRef={timelineRef}
              className="cursor-pointer rounded-full border border-white/20 bg-white/5 px-8 py-4 text-lg font-medium backdrop-blur-md"
            >
              Browse catalog
            </TimelineAnimation>
          </div>
          <TimelineAnimation
            once
            as="p"
            animationNum={7}
            timelineRef={timelineRef}
            className="max-w-md text-xl font-light leading-relaxed text-neutral-100"
          >
            Add AtroUI with the shadcn CLI. Source lands in your repo - edit
            CONTENT, keep the craft. Home: atroui.com.
          </TimelineAnimation>
        </div>
      </div>

      <div className="relative z-10 flex flex-wrap items-end justify-end p-6 sm:p-12">
        <TimelineAnimation
          once
          animationNum={8}
          timelineRef={timelineRef}
          className="grid grid-cols-2 gap-x-12 gap-y-4 rounded-lg bg-black/20 p-4 backdrop-blur-lg md:grid-cols-4"
        >
          {catalogBands.map((band, i) => (
            <TimelineAnimation
              key={band.title}
              once
              animationNum={9 + i}
              timelineRef={timelineRef}
            >
              <p className="mb-1 text-sm text-white">{band.title}</p>
              <p className="text-xs text-neutral-300">{band.body}</p>
            </TimelineAnimation>
          ))}
        </TimelineAnimation>
      </div>
    </section>
  )
}
