"use client"

import * as React from "react"
import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible"
import { ChevronDown } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

import { revealTween } from "@/lib/motion"
import { cn } from "@/lib/utils"

function withoutDomAnimationHandlers<T extends Record<string, unknown>>(
  props: T
) {
  const {
    onAnimationStart: _onAnimationStart,
    onDrag: _onDrag,
    onDragStart: _onDragStart,
    onDragEnd: _onDragEnd,
    ...rest
  } = props
  return rest
}

function withoutDomAnimationHandlersAndChildren<
  T extends Record<string, unknown>,
>(props: T) {
  const { children: _children, ...rest } = withoutDomAnimationHandlers(props)
  return rest
}

function Collapsible({
  className,
  ...props
}: CollapsiblePrimitive.Root.Props) {
  return (
    <CollapsiblePrimitive.Root
      data-slot="collapsible"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  )
}

function CollapsibleTrigger({
  className,
  children,
  ...props
}: CollapsiblePrimitive.Trigger.Props) {
  const reduce = useReducedMotion()

  return (
    <CollapsiblePrimitive.Trigger
      data-slot="collapsible-trigger"
      {...props}
      className={cn(
        "group/collapsible-trigger flex w-full items-center justify-between gap-3 rounded-[var(--atro-control-radius,var(--radius))] py-2 text-left text-sm font-medium text-foreground outline-none transition-colors",
        "hover:text-foreground/90",
        "focus-visible:text-foreground",
        "data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      )}
      render={
        reduce
          ? undefined
          : (htmlProps, state) => (
              <motion.button
                {...withoutDomAnimationHandlersAndChildren(
                  htmlProps as Record<string, unknown>
                )}
                type="button"
              >
                <span className="min-w-0 flex-1">{children}</span>
                <motion.span
                  aria-hidden
                  className="inline-flex shrink-0 text-muted-foreground"
                  initial={false}
                  animate={{ rotate: state.open ? 180 : 0 }}
                  transition={revealTween}
                >
                  <ChevronDown className="size-4" />
                </motion.span>
              </motion.button>
            )
      }
    >
      {reduce ? (
        <>
          <span className="min-w-0 flex-1">{children}</span>
          <ChevronDown
            aria-hidden
            className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] group-data-panel-open/collapsible-trigger:rotate-180 motion-reduce:transition-none"
          />
        </>
      ) : (
        children
      )}
    </CollapsiblePrimitive.Trigger>
  )
}

/**
 * Panel height:auto via Motion (Family Values fluidity).
 * keepMounted so exit settle can finish; reduced motion uses Base UI CSS height.
 */
function CollapsiblePanel({
  className,
  children,
  ...props
}: CollapsiblePrimitive.Panel.Props) {
  const reduce = useReducedMotion()

  return (
    <CollapsiblePrimitive.Panel
      data-slot="collapsible-panel"
      keepMounted={!reduce}
      {...props}
      className={cn(
        "overflow-hidden text-sm text-muted-foreground",
        reduce &&
          "h-[var(--collapsible-panel-height)] transition-[height] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] data-ending-style:h-0 data-starting-style:h-0 motion-reduce:transition-none",
        className
      )}
      render={
        reduce
          ? undefined
          : (htmlProps, state) => {
              const open =
                state.open && state.transitionStatus !== "ending"
              return (
                <motion.div
                  {...withoutDomAnimationHandlers(
                    htmlProps as Record<string, unknown>
                  )}
                  initial={false}
                  animate={
                    open
                      ? { height: "auto", opacity: 1 }
                      : { height: 0, opacity: 0 }
                  }
                  transition={revealTween}
                />
              )
            }
      }
    >
      <div className="pb-2">{children}</div>
    </CollapsiblePrimitive.Panel>
  )
}

export { Collapsible, CollapsiblePanel, CollapsibleTrigger }
