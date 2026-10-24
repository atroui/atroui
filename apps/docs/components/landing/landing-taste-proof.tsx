"use client"

/**
 * Three Blocks that must look designed at Mobile 390 — the taste proof set.
 * Gradual revelation: one job (prove the room), three installable proofs.
 */

import Link from "next/link"
import { BoldFooter, CopyButton, buildShadcnAddCommand } from "atroui"
import { FeatureBento } from "../../registry/default/blocks/feature-bento"
import { HomeHero } from "../../registry/default/blocks/home-hero"
import { useLiveThemeInstallAxes } from "@/hooks/use-live-theme-install-axes"
import { cn } from "@/lib/utils"

const PROOFS = [
  {
    id: "home-hero",
    label: "Home Hero",
    href: "/docs/components/home-hero",
    blurb: "Section altitude — CONTENT at the top of the file.",
    Preview: HomeHero,
  },
  {
    id: "feature-bento",
    label: "Feature Bento",
    href: "/docs/components/feature-bento",
    blurb: "Dense grid that stacks with taste, not clip.",
    Preview: FeatureBento,
  },
  {
    id: "footer-bold",
    label: "Bold Footer",
    href: "/docs/components/footer-bold",
    blurb: "Wordmark + columns that restack inside the frame.",
    Preview: BoldFooter,
  },
] as const

function ProofCard({
  id,
  label,
  href,
  blurb,
  Preview,
}: (typeof PROOFS)[number]) {
  const axes = useLiveThemeInstallAxes()
  const command = buildShadcnAddCommand([id], axes)

  return (
    <article className="atro-taste-proof-card flex min-w-0 flex-col">
      <header className="flex items-baseline justify-between gap-3 border-b border-border-subtle px-4 py-3">
        <div className="min-w-0">
          <Link
            href={href}
            className="font-medium tracking-tight text-foreground hover:underline"
          >
            {label}
          </Link>
          <p className="mt-0.5 text-[12px] leading-snug text-muted-foreground">
            {blurb}
          </p>
        </div>
        <span className="shrink-0 font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
          390
        </span>
      </header>

      <div className="atro-taste-proof-stage @container relative mx-auto w-full max-w-[390px] overflow-hidden border-x border-border-subtle bg-background">
        <div className="max-h-[22rem] overflow-y-auto overflow-x-hidden">
          <Preview />
        </div>
      </div>

      <footer className="flex items-center gap-2 border-t border-border-subtle bg-card/40 px-3 py-2.5">
        <code className="min-w-0 flex-1 truncate font-mono text-[11px] text-muted-foreground">
          {command}
        </code>
        <CopyButton
          value={command}
          size="icon-sm"
          variant="ghost"
          timeout={1600}
          aria-label={`Copy install for ${label}`}
          className="shrink-0 text-muted-foreground hover:text-foreground"
        />
      </footer>
    </article>
  )
}

export function LandingTasteProof({ className }: { className?: string }) {
  return (
    <section
      className={cn("atro-section border-t border-border-subtle", className)}
      aria-labelledby="atro-taste-proof-title"
    >
      <div className="atro-shell atro-section-inner">
        <header className="mx-auto max-w-2xl text-center">
          <p className="ds-mono-label text-muted-foreground">Taste proof</p>
          <h2
            id="atro-taste-proof-title"
            className="atro-section-title mt-2 text-foreground"
          >
            Three sections that still look like Atro at 390px
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            Preview frames use container queries — the same stacking you get in
            the docs Mobile preset. Flip accents above; these recolor with the
            room.
          </p>
        </header>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {PROOFS.map((proof) => (
            <ProofCard key={proof.id} {...proof} />
          ))}
        </div>
      </div>
    </section>
  )
}
