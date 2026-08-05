import Image, { type StaticImageData } from "next/image"

import { getBrand } from "../../lib/brand"
import { MEDIA, mediaSrc, type MediaSrc } from "../../lib/media"
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
   * Portrait override. Defaults to the bundled package asset, then
   * `NEXT_PUBLIC_FOUNDER_AVATAR` if set.
   */
  src?: MediaSrc
  /** Override initials when falling back (no usable image). */
  initials?: string
}

function resolveSrc(src?: MediaSrc): string | StaticImageData {
  if (src) return typeof src === "string" ? src : src
  if (typeof process !== "undefined" && process.env) {
    const fromEnv = process.env.NEXT_PUBLIC_FOUNDER_AVATAR?.trim()
    if (fromEnv) return fromEnv
  }
  return MEDIA.founderPortrait
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
 * Ships with a bundled portrait from the `atroui` package so consumer apps
 * do not need `/public/images/founder-portrait.png`.
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
        className,
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

/** @internal helper for docs / tests */
export function founderAvatarSrc(src?: MediaSrc): string {
  return mediaSrc(resolveSrc(src))
}
