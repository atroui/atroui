import Image from "next/image"

import { getBrand } from "@/lib/brand"
import { cn } from "@/lib/utils"

/** Edit CONTENT to point at your founder portrait in /public. */
const CONTENT = {
  /** Path under public/, or absolute URL. Empty falls back to initials. */
  src: "",
  initials: "",
}

const sizeClass = {
  sm: "size-8 text-[10px]",
  md: "size-9 text-[11px]",
  lg: "size-11 text-xs",
} as const

export type FounderAvatarSize = keyof typeof sizeClass

type FounderAvatarProps = {
  size?: FounderAvatarSize
  className?: string
  src?: string
  initials?: string
}

function resolveSrc(src?: string): string {
  if (src?.trim()) return src.trim()
  if (CONTENT.src.trim()) return CONTENT.src.trim()
  if (typeof process !== "undefined" && process.env) {
    const fromEnv = process.env.NEXT_PUBLIC_FOUNDER_AVATAR?.trim()
    if (fromEnv) return fromEnv
  }
  return ""
}

function resolveInitials(initials?: string): string {
  if (initials?.trim()) return initials.trim().slice(0, 2).toUpperCase()
  if (CONTENT.initials.trim()) return CONTENT.initials.trim().slice(0, 2).toUpperCase()
  const name = getBrand().name.trim()
  const parts = name.split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    return `${parts[0]![0] ?? ""}${parts[1]![0] ?? ""}`.toUpperCase()
  }
  return (name.slice(0, 2) || "A").toUpperCase()
}

/**
 * Circular founder portrait for signature rows.
 * Decorative - adjacent text carries the name.
 */
export function FounderAvatar({
  size = "sm",
  className,
  src,
  initials,
}: FounderAvatarProps) {
  const image = resolveSrc(src)
  const label = resolveInitials(initials)

  return (
    <span
      aria-hidden
      className={cn(
        "relative inline-flex shrink-0 overflow-hidden rounded-full ring-1 ring-black/10 dark:ring-white/15",
        sizeClass[size],
        className
      )}
    >
      {image ? (
        <Image
          src={image}
          alt=""
          width={176}
          height={176}
          className="size-full object-cover object-[center_25%]"
          sizes="44px"
        />
      ) : (
        <span className="flex size-full items-center justify-center bg-brand/20 font-semibold tracking-wide text-brand">
          {label}
        </span>
      )}
    </span>
  )
}
