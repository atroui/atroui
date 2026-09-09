"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, useReducedMotion } from "motion/react"

import { controlGestures, hoverLift, hoverTween } from "@/lib/motion"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center border border-transparent bg-clip-padding text-[0.8125rem] font-medium tracking-[-0.01em] whitespace-nowrap outline-none select-none transition-[opacity,background-color,border-color,box-shadow,color] duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 motion-reduce:transition-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground [a]:hover:opacity-90",
        outline:
          "border-border-subtle bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-[var(--atro-control-height,2.25rem)] gap-1.5 rounded-[var(--atro-control-radius,var(--radius))] px-[0.95rem] has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
        xs: "h-6 gap-1 rounded-[calc(var(--atro-control-radius,var(--radius))-2px)] px-2 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[calc(var(--atro-control-radius,var(--radius))-1px)] px-2.5 text-[0.8rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-10 gap-1.5 rounded-[var(--atro-control-radius,var(--radius))] px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "size-[var(--atro-control-height,2.25rem)] rounded-[var(--atro-control-radius,var(--radius))]",
        "icon-xs":
          "size-6 rounded-[calc(var(--atro-control-radius,var(--radius))-2px)] [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[calc(var(--atro-control-radius,var(--radius))-1px)]",
        "icon-lg": "size-10 rounded-[var(--atro-control-radius,var(--radius))]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * Soft-rect Mira button — signature hover language + press into surface.
 * Material brightens (CSS); geometry ≤1px lift; never scale on hover.
 * TextMorph loading is opt-in via the TextMorph primitive — not default here.
 */
function Button({
  className,
  variant = "default",
  size = "default",
  render,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  const reduce = useReducedMotion()
  const hasPopup =
    props["aria-haspopup"] != null && props["aria-haspopup"] !== false
  const skipMotion = reduce || variant === "link" || hasPopup
  const gestures = controlGestures(skipMotion)
  const hoverPrimary = variant === "default" || variant === "secondary"

  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      render={
        render ?? (
          <motion.button
            whileHover={
              skipMotion
                ? undefined
                : hoverPrimary
                  ? { ...hoverLift, opacity: 0.9, transition: hoverTween }
                  : gestures.whileHover
            }
            whileFocus={skipMotion ? undefined : gestures.whileFocus}
            whileTap={gestures.whileTap}
          />
        )
      }
      {...props}
    />
  )
}

export { Button, buttonVariants }
