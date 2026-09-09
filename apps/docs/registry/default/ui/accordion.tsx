"use client"

import * as React from "react"
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { ChevronDown } from "lucide-react"
import { LayoutGroup, motion, useReducedMotion } from "motion/react"

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

const AccordionFocusContext = React.createContext("atro-accordion-focus")

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  const layoutId = React.useId()

  return (
    <AccordionFocusContext.Provider value={`${layoutId}-focus`}>
      <LayoutGroup id={layoutId}>
        <AccordionPrimitive.Root
          data-slot="accordion"
          className={cn("flex w-full flex-col", className)}
          {...props}
        />
      </LayoutGroup>
    </AccordionFocusContext.Provider>
  )
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-border-subtle", className)}
      {...props}
    />
  )
}

function AccordionHeader({
  className,
  ...props
}: AccordionPrimitive.Header.Props) {
  return (
    <AccordionPrimitive.Header
      data-slot="accordion-header"
      className={cn("m-0", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: AccordionPrimitive.Trigger.Props) {
  const reduce = useReducedMotion()
  const focusId = React.useContext(AccordionFocusContext)

  return (
    <AccordionPrimitive.Trigger
      data-slot="accordion-trigger"
      {...props}
      className={cn(
        "group/accordion-trigger relative flex w-full items-center justify-between gap-3 py-3 text-left text-sm font-medium text-foreground outline-none transition-colors",
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
                {state.open ? (
                  <motion.span
                    layoutId={focusId}
                    className="pointer-events-none absolute inset-x-0 -inset-y-0.5 -z-10 rounded-[var(--atro-control-radius,var(--radius))] bg-muted/50"
                    transition={revealTween}
                  />
                ) : null}
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
            className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] group-data-panel-open/accordion-trigger:rotate-180 motion-reduce:transition-none"
          />
        </>
      ) : (
        children
      )}
    </AccordionPrimitive.Trigger>
  )
}

/**
 * Panel height:auto via Motion (Family Values fluidity).
 * keepMounted so exit settle can finish; reduced motion uses Base UI CSS height.
 */
function AccordionPanel({
  className,
  children,
  ...props
}: AccordionPrimitive.Panel.Props) {
  const reduce = useReducedMotion()

  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-panel"
      keepMounted={!reduce}
      {...props}
      className={cn(
        "overflow-hidden text-sm text-muted-foreground",
        reduce &&
          "h-[var(--accordion-panel-height)] transition-[height] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] data-ending-style:h-0 data-starting-style:h-0 motion-reduce:transition-none",
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
      <div className="pb-3 pr-8">{children}</div>
    </AccordionPrimitive.Panel>
  )
}

export {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
}
