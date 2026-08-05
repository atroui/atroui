import Image from "next/image";

import { cn } from "../../lib/utils";

const sizeClass = {
  /** 32px - hero signature */
  sm: "size-8",
  /** 36px - CTA / quote figcaption */
  md: "size-9",
  /** 44px - founder letter */
  lg: "size-11",
} as const;

export type FounderAvatarSize = keyof typeof sizeClass;

type FounderAvatarProps = {
  size?: FounderAvatarSize;
  className?: string;
};

/**
 * Circular founder portrait for signature rows. Decorative - name sits in
 * adjacent text; `alt` is empty and the wrapper is `aria-hidden`.
 */
export function FounderAvatar({ size = "sm", className }: FounderAvatarProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative inline-flex shrink-0 overflow-hidden rounded-full ring-1 ring-black/10 dark:ring-white/15",
        sizeClass[size],
        className,
      )}
    >
      <Image
        src="/images/founder-portrait.png"
        alt=""
        width={176}
        height={176}
        className="size-full object-cover object-[center_25%]"
        sizes="44px"
      />
    </span>
  );
}
