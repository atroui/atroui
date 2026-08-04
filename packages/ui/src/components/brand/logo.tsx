import * as React from "react";

import { cn } from "../../lib/utils";

/**
 * Makershot studio mark.
 * - Uses `currentColor` for the main glyph so it adapts to light/dark.
 * - Indigo accent stays constant via brand token.
 */
export function LogoMark({
  className,
  title = "Makershot",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      width="24"
      height="24"
      role="img"
      aria-label={title}
      className={cn("text-foreground", className)}
    >
      <title>{title}</title>
      <rect
        x="4"
        y="4"
        width="40"
        height="40"
        rx="12"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.16"
        strokeWidth="1.25"
      />
      {/* Aperture-style M — two intersecting arcs forming the stroke */}
      <path
        d="M14 30 L14 18 L24 28 L34 18 L34 30"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="34" cy="30" r="2.2" fill="var(--color-brand, #f59e0b)" />
    </svg>
  );
}

export function LogoWordmark({
  className,
  markClassName,
}: {
  className?: string;
  markClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={cn("h-7 w-7 shrink-0", markClassName)} />
      <span className="ds-display text-[19px] leading-none tracking-[-0.01em] text-foreground">
        Makershot
      </span>
    </span>
  );
}
