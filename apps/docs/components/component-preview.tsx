"use client"

import * as React from "react"
import { cn } from "@meridian/ui"

interface ComponentPreviewProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export function ComponentPreview({ title, children, className }: ComponentPreviewProps) {
  return (
    <div className="overflow-hidden rounded-lg border">
      {title ? (
        <div className="border-b bg-muted/40 px-4 py-2 text-sm font-medium text-muted-foreground">
          {title}
        </div>
      ) : null}
      <div
        className={cn(
          "flex min-h-[180px] items-center justify-center bg-[radial-gradient(circle_at_1px_1px,hsl(var(--border))_1px,transparent_0)] bg-[length:16px_16px] p-8",
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}
