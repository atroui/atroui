import * as React from "react";

import { getBrand } from "../../lib/brand";
import { cn } from "../../lib/utils";

/**
 * Brand mark.
 * - Uses `currentColor` for the main glyph so it adapts to light/dark.
 * - Brand accent stays constant via CSS token.
 */
export function LogoMark({
  className,
  title,
}: {
  className?: string;
  title?: string;
}) {
  const label = title ?? getBrand().name;
  return (
    <svg
      viewBox="0 0 48 48"
      width="24"
      height="24"
      role="img"
      aria-label={label}
      className={cn("text-foreground", className)}
    >
      <title>{label}</title>
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
      <path
        d="M14 30 L14 18 L24 28 L34 18 L34 30"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="34" cy="30" r="2.2" fill="var(--color-brand, #0b7bff)" />
    </svg>
  );
}

export function LogoWordmark({
  className,
  markClassName,
  name,
}: {
  className?: string;
  markClassName?: string;
  /** Override brand name (defaults to getBrand().name). */
  name?: string;
}) {
  const label = name ?? getBrand().name;
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark
        className={cn("h-7 w-7 shrink-0", markClassName)}
        title={label}
      />
      <span className="ds-display text-[19px] leading-none tracking-[-0.01em] text-foreground">
        {label}
      </span>
    </span>
  );
}
