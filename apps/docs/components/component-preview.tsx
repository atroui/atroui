"use client"

import * as React from "react"
import {
  CatalogFrameRoot,
  CatalogPreviewPane,
} from "@/components/catalog-frame"
import { RegistryPreview, hasRegistryDemo } from "@/components/registry-demo-map"
import { cn } from "@/lib/utils"

type ComponentPreviewProps = {
  /** Registry item name — shadcn `<ComponentPreview name="…" />` pattern. */
  name?: string
  title?: string
  children?: React.ReactNode
  className?: string
  fullBleed?: boolean
}

/**
 * Preview frame for MDX docs. Prefer `name` (registry) over hand-wired children.
 */
export function ComponentPreview({
  name,
  title,
  children,
  className,
  fullBleed,
}: ComponentPreviewProps) {
  if (name) {
    if (!hasRegistryDemo(name)) {
      return (
        <div className="rounded-xl border border-border-subtle px-4 py-8 text-center text-[13px] text-muted-foreground">
          No demo registered for <code className="font-mono">{name}</code>
        </div>
      )
    }
    return (
      <CatalogFrameRoot className={className}>
        {title ? (
          <div className="catalog-frame-toolbar px-4 py-2.5 text-[13px] font-medium text-muted-foreground">
            {title}
          </div>
        ) : null}
        <CatalogPreviewPane fullBleed={fullBleed}>
          <RegistryPreview name={name} />
        </CatalogPreviewPane>
      </CatalogFrameRoot>
    )
  }

  return (
    <CatalogFrameRoot className={className}>
      {title ? (
        <div className="catalog-frame-toolbar px-4 py-2.5 text-[13px] font-medium text-muted-foreground">
          {title}
        </div>
      ) : null}
      <div
        className={cn(
          "flex min-h-[200px] items-center justify-center p-8",
          fullBleed && "p-0"
        )}
      >
        {children}
      </div>
    </CatalogFrameRoot>
  )
}
