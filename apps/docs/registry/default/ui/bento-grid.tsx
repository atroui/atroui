"use client"

import { cn } from "@/lib/utils"

export function BentoGrid({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      data-slot="bento-grid"
      className={cn(
        "grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  )
}

export function BentoCard({
  className,
  title,
  description,
  header,
  children,
}: {
  className?: string
  title?: React.ReactNode
  description?: React.ReactNode
  header?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <div
      data-slot="bento-card"
      className={cn(
        "ds-elev-card ds-hover-lift group relative flex flex-col justify-between overflow-hidden rounded-[var(--atro-panel-radius,var(--radius))] bg-card p-5",
        className
      )}
    >
      {header ? <div className="mb-4 overflow-hidden">{header}</div> : null}
      <div className="mt-auto">
        {title ? (
          <h3 className="text-[0.9375rem] font-medium tracking-tight text-foreground">
            {title}
          </h3>
        ) : null}
        {description ? (
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
        {children}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color-mix(in_oklch,var(--brand)_40%,transparent)] to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      />
    </div>
  )
}
