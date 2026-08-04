"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ComponentPreviewProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export function ComponentPreview({ title, children, className }: ComponentPreviewProps) {
  return (
    <div className="overflow-hidden border border-border-subtle bg-background">
      {title ? (
        <div className="border-b border-border-subtle bg-muted/40 px-4 py-2.5 text-[13px] font-medium text-muted-foreground">
          {title}
        </div>
      ) : null}
      <div
        className={cn(
          "flex min-h-[200px] items-center justify-center p-8",
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}
