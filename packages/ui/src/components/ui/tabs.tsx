"use client"

import * as React from "react"
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"
import { LayoutGroup, motion, useReducedMotion } from "motion/react"

import { easeOutSoft, layoutTween } from "../../lib/motion"
import { cn } from "../../lib/utils"

const TabsPillContext = React.createContext("atro-tabs-pill")
const TabsListVariantContext = React.createContext<"default" | "line">(
  "default"
)

/** Peer-switch panel — opacity + y (Zajno fade+transform), easeOutSoft. */
const panelFade = {
  duration: 0.2,
  ease: easeOutSoft,
} as const

const PILL_CLASS =
  "absolute z-0 inset-0 bg-background shadow-sm ring-1 ring-border-subtle/70 " +
  "group-data-[variant=line]/tabs-list:inset-x-2 group-data-[variant=line]/tabs-list:top-auto " +
  "group-data-[variant=line]/tabs-list:bottom-0 group-data-[variant=line]/tabs-list:h-0.5 " +
  "group-data-[variant=line]/tabs-list:bg-foreground " +
  "group-data-[variant=line]/tabs-list:shadow-none group-data-[variant=line]/tabs-list:ring-0"

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

/**
 * Tabs — Motion.dev Base UI pattern:
 * LayoutGroup + layoutId pill morph + layout height on panel.
 * Mira muted list / soft-rect chrome.
 */
function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: TabsPrimitive.Root.Props) {
  const layoutId = React.useId()

  return (
    <TabsPillContext.Provider value={`${layoutId}-pill`}>
      <LayoutGroup id={layoutId}>
        <TabsPrimitive.Root
          data-slot="tabs"
          data-orientation={orientation}
          className={cn(
            "group/tabs flex gap-2 data-horizontal:flex-col",
            className
          )}
          {...props}
        />
      </LayoutGroup>
    </TabsPillContext.Provider>
  )
}

const tabsListVariants = cva(
  "relative inline-flex w-fit items-center justify-center rounded-[var(--radius)] p-0.5 text-muted-foreground group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col",
  {
    variants: {
      variant: {
        default: "bg-muted/50",
        line: "gap-1 rounded-none bg-transparent p-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsListVariantContext.Provider value={variant ?? "default"}>
      <TabsPrimitive.List
        data-slot="tabs-list"
        data-variant={variant}
        className={cn(tabsListVariants({ variant }), className)}
        {...props}
      />
    </TabsListVariantContext.Provider>
  )
}

function TabsTrigger({
  className,
  children,
  ...props
}: TabsPrimitive.Tab.Props) {
  const reduce = useReducedMotion()
  const pillId = React.useContext(TabsPillContext)
  const listVariant = React.useContext(TabsListVariantContext)
  // borderRadius via style so layoutId scale-correction stays soft-rect / line-flat
  const pillStyle = {
    borderRadius: listVariant === "line" ? 0 : "calc(var(--radius) - 2px)",
  } as const

  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      {...props}
      className={cn(
        "relative z-[1] inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-[calc(var(--radius)-2px)] px-3 text-sm font-medium whitespace-nowrap text-muted-foreground outline-none transition-colors duration-200",
        "hover:text-foreground",
        "focus-visible:ring-2 focus-visible:ring-ring/20",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-active:text-foreground",
        "group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start",
        "group-data-[variant=line]/tabs-list:rounded-none group-data-[variant=line]/tabs-list:px-2",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "motion-reduce:transition-none",
        className
      )}
      render={(htmlProps, state) => (
        <button type="button" {...htmlProps}>
          {state.active
            ? reduce
              ? (
                  <span className={PILL_CLASS} style={pillStyle} aria-hidden />
                )
              : (
                  <motion.span
                    layoutId={pillId}
                    className={PILL_CLASS}
                    style={pillStyle}
                    transition={layoutTween}
                    aria-hidden
                  />
                )
            : null}
          <span className="relative z-[1] inline-flex items-center justify-center gap-1.5">
            {children}
          </span>
        </button>
      )}
    />
  )
}

/**
 * No-op kept for API compatibility. The active mark morphs via
 * `layoutId` on TabsTrigger (theme-toggle pill pattern).
 */
function TabsIndicator(_props: TabsPrimitive.Indicator.Props) {
  return null
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  const reduce = useReducedMotion()

  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      {...props}
      className={cn("flex-1 outline-none overflow-hidden", className)}
      render={
        reduce
          ? undefined
          : (htmlProps, state) => (
              <motion.div
                {...withoutDomAnimationHandlers(
                  htmlProps as Record<string, unknown>
                )}
                layout
                initial={false}
                animate={{
                  opacity: state.hidden ? 0 : 1,
                  y: state.hidden ? 4 : 0,
                }}
                transition={{
                  opacity: panelFade,
                  y: panelFade,
                  layout: layoutTween,
                }}
              />
            )
      }
    />
  )
}

export {
  Tabs,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsTrigger,
  tabsListVariants,
}
