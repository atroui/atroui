import Image from "next/image"

import { getBrand } from "../../lib/brand"
import { cn } from "../../lib/utils"

const sizeClass = {
  /** 32px - hero signature */
  sm: "size-8 text-[10px]",
  /** 36px - CTA / quote figcaption */
  md: "size-9 text-[11px]",
  /** 44px - founder letter */
  lg: "size-11 text-xs",
} as const

export type FounderAvatarSize = keyof typeof sizeClass

type FounderAvatarProps = {
  size?: FounderAvatarSize
  className?: string
  /**
   * Portrait URL. Defaults to `NEXT_PUBLIC_FOUNDER_AVATAR` when set.
   * When neither is provided, renders brand initials (no image request).
   */
  src?: string
  /** Override initials when no image is available. */
  initials?: string
}

function resolveSrc(src?: string): string | null {
  const fromProp = src?.trim()
  if (fromProp) return fromProp
  if (typeof process === "undefined" || !process.env) return null
  const fromEnv = process.env.NEXT_PUBLIC_FOUNDER_AVATAR?.trim()
  return fromEnv || null
}

function resolveInitials(initials?: string): string {
  if (initials?.trim()) return initials.trim().slice(0, 2).toUpperCase()
  const name = getBrand().name.trim()
  const parts = name.split(/\s+/).filter(Boolean)
  if (parts.length >= 2) {
    return `${parts[0]![0] ?? ""}${parts[1]![0] ?? ""}`.toUpperCase()
  }
  return (name.slice(0, 2) || "A").toUpperCase()
}

/**
 * Circular founder portrait for signature rows. Decorative - name sits in
 * adjacent text; `alt` is empty and the wrapper is `aria-hidden`.
 *
 * Consumer apps: omit `src` (or set `NEXT_PUBLIC_FOUNDER_AVATAR`) so missing
 * `/images/founder-portrait.png` does not 404.
 */
export function FounderAvatar({
  size = "sm",
  className,
  src,
  initials,
}: FounderAvatarProps) {
  const imageSrc = resolveSrc(src)
  const label = resolveInitials(initials)

  return (
    <span
      aria-hidden
      className={cn(
        "relative inline-flex shrink-0 overflow-hidden rounded-full ring-1 ring-black/10 dark:ring-white/15",
        sizeClass[size],
        className,
      )}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
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
