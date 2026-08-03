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
    <div className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-[#f7f8fa]">
      {title ? (
        <div className="border-b border-neutral-200/80 px-4 py-2.5 text-[13px] font-medium text-neutral-500">
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
