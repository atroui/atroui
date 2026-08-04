"use client"

import { LogoMark as AtroLogoMark } from "atroui"
import { cn } from "@/lib/utils"

/** Docs chrome mark — same geometry as `atroui` LogoMark. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <AtroLogoMark
      className={cn("h-7 w-7", className)}
      title="AtroUI"
    />
  )
}
