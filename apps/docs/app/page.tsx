"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Boxes, Contrast, Keyboard, Sparkles } from "lucide-react"
import { Badge, Button } from "@meridian/ui"

const features = [
  {
    icon: Sparkles,
    title: "Polished defaults",
    description: "Soft surfaces, thoughtful spacing, and variants that feel production-ready out of the box.",
  },
  {
    icon: Keyboard,
    title: "Accessible by design",
    description: "Radix primitives power keyboard navigation, focus management, and WAI-ARIA patterns.",
  },
  {
    icon: Contrast,
    title: "Light & dark",
    description: "Theme tokens via CSS variables with next-themes — switch modes without fighting styles.",
  },
  {
    icon: Boxes,
    title: "Composable API",
    description: "Familiar shadcn/ui patterns: cva variants, Slot composition, and clean TypeScript exports.",
  },
]

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(168 55% 32% / 0.18), transparent), radial-gradient(ellipse 60% 40% at 100% 0%, hsl(40 40% 90% / 0.5), transparent), linear-gradient(180deg, hsl(var(--background)), hsl(var(--background)))",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] dark:opacity-[0.15]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <section className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-5xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6"
        >
          <Badge variant="secondary" className="px-3 py-1 text-xs font-medium">
            v0.1 · Open source component library
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-6xl tracking-tight text-foreground sm:text-7xl md:text-8xl"
        >
          Meridian
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl"
        >
          Beautiful, accessible React components — the calm middle ground between raw primitives and heavy design systems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Button asChild size="lg">
            <Link href="/docs">
              Get started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/docs/components/button">Browse components</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 w-full max-w-2xl overflow-hidden rounded-xl border bg-card/80 shadow-sm backdrop-blur"
        >
          <div className="flex items-center gap-2 border-b px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            <span className="ml-2 text-xs text-muted-foreground">install.sh</span>
          </div>
          <pre className="overflow-x-auto p-5 text-left font-mono text-sm leading-relaxed text-foreground">
            <code>{`pnpm add @meridian/ui\n\nimport { Button } from "@meridian/ui"\n\n<Button>Build something calm</Button>`}</code>
          </pre>
        </motion.div>
      </section>

      <section className="border-t bg-muted/30 py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="font-display text-3xl tracking-tight sm:text-4xl">Built for real products</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Meridian ships the components you reach for every day — forms, overlays, feedback — with Storybook and a docs playground included.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex gap-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <feature.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">{feature.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t py-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <p>Meridian · Crafted for modern React apps</p>
          <div className="flex gap-4">
            <Link href="/docs" className="hover:text-foreground">
              Documentation
            </Link>
            <Link href="/docs/components/button" className="hover:text-foreground">
              Components
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
