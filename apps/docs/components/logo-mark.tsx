import { cn } from "@/lib/utils"

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className={cn("h-7 w-7 text-foreground", className)}
    >
      <circle
        cx="16"
        cy="16"
        r="15"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-muted-foreground/40"
      />
      <path
        d="M16 8.5L22.5 12.25V19.75L16 23.5L9.5 19.75V12.25L16 8.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M16 12.5L19.5 14.5V18.5L16 20.5L12.5 18.5V14.5L16 12.5Z"
        fill="currentColor"
      />
    </svg>
  )
}
