"use client"

import type { ComponentProps } from "react"
import { Toaster as Sonner, toast } from "sonner"

type ToasterProps = ComponentProps<typeof Sonner>

/**
 * Toast notification host. Place once in your app root.
 * Use the exported `toast` helper to trigger notifications.
 *
 * @example
 * ```tsx
 * toast.success("Saved!")
 * ```
 */
function Toaster({ theme = "system", ...props }: ToasterProps) {
  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster, toast }
