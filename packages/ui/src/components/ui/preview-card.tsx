"use client"

import * as React from "react"
import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { Magnetic } from "../motion/magnetic"
import { Spotlight } from "../motion/spotlight"
import { Tilt } from "../motion/tilt"
import { popupMotion } from "../../lib/motion"
import { cn } from "../../lib/utils"

/** Layered pop elevation — ring-as-border + cast stack + top light. */
const overlayElevation = "ds-elev-pop"

type PreviewCardOpenContextValue = {
  open: boolean
}

const PreviewCardOpenContext =
  React.createContext<PreviewCardOpenContextValue | null>(null)

function usePreviewCardOpen() {
  const ctx = React.useContext(PreviewCardOpenContext)
  if (!ctx) {
    throw new Error("PreviewCard parts must be used within <PreviewCard>")
  }
  return ctx.open
}

type TiltOpt = boolean | { rotationFactor?: number; perspective?: number }
type MagneticOpt = boolean | { intensity?: number; range?: number }
type SpotlightOpt = boolean | { size?: number; opacity?: number; color?: string }

function resolveOpt<T extends object>(
  opt: boolean | T | undefined,
  defaults: T
): T | null {
  if (!opt) return null
  if (opt === true) return defaults
  return { ...defaults, ...opt }
}

/**
 * Opt-in media motion for PreviewCardContent only.
 * Defaults off — never apply magnetic / tilt / spotlight to Button / Menu chrome.
 */
function wrapMediaMotion(
  children: React.ReactNode,
  opts: {
    tilt: ReturnType<typeof resolveOpt<{ rotationFactor?: number; perspective?: number }>>
    magnetic: ReturnType<typeof resolveOpt<{ intensity?: number; range?: number }>>
    spotlight: ReturnType<
      typeof resolveOpt<{ size?: number; opacity?: number; color?: string }>
    >
  }
) {
  let body = children
  if (opts.spotlight) {
    body = <Spotlight {...opts.spotlight}>{body}</Spotlight>
  }
  if (opts.tilt) {
    body = <Tilt {...opts.tilt}>{body}</Tilt>
  }
  if (opts.magnetic) {
    body = <Magnetic {...opts.magnetic}>{body}</Magnetic>
  }
  return body
}

function PreviewCard({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  ...props
}: PreviewCardPrimitive.Root.Props) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isControlled = openProp !== undefined
  const open = isControlled ? openProp : uncontrolledOpen

  const handleOpenChange = React.useCallback<
    NonNullable<PreviewCardPrimitive.Root.Props["onOpenChange"]>
  >(
    (next, eventDetails) => {
      if (!isControlled) setUncontrolledOpen(next)
      onOpenChange?.(next, eventDetails)
    },
    [isControlled, onOpenChange]
  )

  return (
    <PreviewCardOpenContext.Provider value={{ open }}>
      <PreviewCardPrimitive.Root
        data-slot="preview-card"
        open={open}
        onOpenChange={handleOpenChange}
        {...props}
      />
    </PreviewCardOpenContext.Provider>
  )
}

function PreviewCardTrigger({ ...props }: PreviewCardPrimitive.Trigger.Props) {
  return (
    <PreviewCardPrimitive.Trigger data-slot="preview-card-trigger" {...props} />
  )
}

function PreviewCardContent({
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 8,
  render,
  children,
  tilt: tiltOpt = false,
  magnetic: magneticOpt = false,
  spotlight: spotlightOpt = false,
  ...props
}: PreviewCardPrimitive.Popup.Props &
  Pick<
    PreviewCardPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  > & {
    /** Mild 3D tilt — media only. Default false. */
    tilt?: TiltOpt
    /** Mild magnetic pull — media only. Default false. */
    magnetic?: MagneticOpt
    /** Low-opacity cursor wash — dark Mira media. Default false. */
    spotlight?: SpotlightOpt
  }) {
  const open = usePreviewCardOpen()
  const reduce = useReducedMotion()

  const tilt = reduce
    ? null
    : resolveOpt(tiltOpt, { rotationFactor: 6 })
  const magnetic = reduce
    ? null
    : resolveOpt(magneticOpt, { intensity: 0.25, range: 48 })
  const spotlight = reduce
    ? null
    : resolveOpt(spotlightOpt, { opacity: 0.12, size: 240 })

  return (
    <AnimatePresence>
      {open ? (
        <PreviewCardPrimitive.Portal keepMounted key="preview-card-portal">
          <PreviewCardPrimitive.Positioner
            align={align}
            alignOffset={alignOffset}
            side={side}
            sideOffset={sideOffset}
            className="isolate z-50"
          >
            <PreviewCardPrimitive.Popup
              data-slot="preview-card-content"
              className={cn(
                "z-50 w-72 origin-(--transform-origin) rounded-[var(--radius)] bg-popover p-3.5 text-sm text-popover-foreground outline-none",
                overlayElevation,
                className
              )}
              render={render ?? <motion.div {...popupMotion(reduce)} />}
              {...props}
            >
              {wrapMediaMotion(children, { tilt, magnetic, spotlight })}
            </PreviewCardPrimitive.Popup>
          </PreviewCardPrimitive.Positioner>
        </PreviewCardPrimitive.Portal>
      ) : null}
    </AnimatePresence>
  )
}

function PreviewCardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="preview-card-header"
      className={cn("flex flex-col gap-1.5", className)}
      {...props}
    />
  )
}

function PreviewCardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="preview-card-title"
      className={cn(
        "text-[0.8125rem] font-medium leading-snug tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function PreviewCardDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="preview-card-description"
      className={cn("text-sm leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  PreviewCard,
  PreviewCardContent,
  PreviewCardDescription,
  PreviewCardHeader,
  PreviewCardTitle,
  PreviewCardTrigger,
}
export type { MagneticOpt, SpotlightOpt, TiltOpt }
