"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import {
  avatarFallbackMotion,
  avatarImageMotion,
} from "@/lib/motion"
import { cn } from "@/lib/utils"

function Avatar({
  className,
  style,
  ...props
}: AvatarPrimitive.Root.Props) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative inline-flex size-9 shrink-0 overflow-hidden rounded-[var(--radius)] bg-muted align-middle",
        "ring-1 ring-black/5 dark:ring-white/10",
        className
      )}
      style={{ borderRadius: "var(--radius)", ...style }}
      {...props}
    />
  )
}

/**
 * Soft-rect portrait — opacity + scale fade-in (Zajno fade+transform).
 * Base UI mounts only after load; Motion enter keeps the crossfade calm.
 */
function AvatarImage({
  className,
  render,
  ...props
}: AvatarPrimitive.Image.Props) {
  const reduce = useReducedMotion()

  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full object-cover", className)}
      render={
        render ?? <motion.img {...avatarImageMotion(reduce)} />
      }
      {...props}
    />
  )
}

/**
 * Initials / icon fallback — crossfades under the image (opacity + scale).
 * Soft-rect Mira (not capsule); reduced motion → instant swap.
 */
function AvatarFallback({
  className,
  render,
  ...props
}: AvatarPrimitive.Fallback.Props) {
  const reduce = useReducedMotion()

  return (
    <AnimatePresence mode="popLayout">
      <AvatarPrimitive.Fallback
        data-slot="avatar-fallback"
        className={cn(
          "flex size-full items-center justify-center bg-muted text-xs font-medium tracking-wide text-muted-foreground",
          className
        )}
        render={
          render ?? <motion.span {...avatarFallbackMotion(reduce)} />
        }
        {...props}
      />
    </AnimatePresence>
  )
}

export { Avatar, AvatarFallback, AvatarImage }
