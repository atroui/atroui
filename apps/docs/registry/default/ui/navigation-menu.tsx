"use client"

import * as React from "react"
import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu"
import { ChevronDown } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { enterTween, pageFade, popupMotion, easeOutSoft } from "@/lib/motion"
import { cn } from "@/lib/utils"

/** Quiet Mira elevation — soft lift; border carries the edge. */
const overlayElevation =
  "shadow-[0_8px_24px_-18px_color-mix(in_oklch,var(--foreground)_16%,transparent)]"

type NavigationMenuOpenContextValue = {
  open: boolean
}

const NavigationMenuOpenContext =
  React.createContext<NavigationMenuOpenContextValue | null>(null)

function useNavigationMenuOpen() {
  const ctx = React.useContext(NavigationMenuOpenContext)
  if (!ctx) {
    throw new Error("NavigationMenu parts must be used within <NavigationMenu>")
  }
  return ctx.open
}

function NavigationMenu({
  value: valueProp,
  defaultValue = null,
  onValueChange,
  className,
  ...props
}: NavigationMenuPrimitive.Root.Props) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue)
  const isControlled = valueProp !== undefined
  const value = isControlled ? valueProp : uncontrolledValue
  const open = value != null

  const handleValueChange = React.useCallback<
    NonNullable<NavigationMenuPrimitive.Root.Props["onValueChange"]>
  >(
    (next, eventDetails) => {
      if (!isControlled) setUncontrolledValue(next)
      onValueChange?.(next, eventDetails)
    },
    [isControlled, onValueChange]
  )

  return (
    <NavigationMenuOpenContext.Provider value={{ open }}>
      <NavigationMenuPrimitive.Root
        data-slot="navigation-menu"
        value={value}
        onValueChange={handleValueChange}
        className={cn("relative isolate z-10 flex max-w-max flex-1 items-center justify-center", className)}
        {...props}
      />
    </NavigationMenuOpenContext.Provider>
  )
}

function NavigationMenuList({
  className,
  ...props
}: NavigationMenuPrimitive.List.Props) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        "group flex flex-1 list-none items-center justify-center gap-0.5",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuItem({
  className,
  ...props
}: NavigationMenuPrimitive.Item.Props) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("relative", className)}
      {...props}
    />
  )
}

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: NavigationMenuPrimitive.Trigger.Props) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(
        "group inline-flex h-7 w-max items-center justify-center gap-1 rounded-[calc(var(--radius)-2px)] bg-transparent px-2 text-[0.8125rem] font-medium text-foreground outline-none select-none",
        "hover:bg-muted/80 focus-visible:ring-2 focus-visible:ring-ring/40",
        "data-popup-open:bg-muted/80 data-pressed:bg-muted/80",
        className
      )}
      {...props}
    >
      {children}
      <NavigationMenuPrimitive.Icon
        data-slot="navigation-menu-icon"
        className="relative top-px ml-0.5 inline-flex text-muted-foreground transition-transform duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] data-popup-open:rotate-180"
      >
        <ChevronDown className="size-3" aria-hidden />
      </NavigationMenuPrimitive.Icon>
    </NavigationMenuPrimitive.Trigger>
  )
}

function NavigationMenuContent({
  className,
  render,
  ...props
}: NavigationMenuPrimitive.Content.Props) {
  const reduce = useReducedMotion()

  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        "h-full w-[calc(100vw-2.5rem)] p-1.5 sm:w-auto sm:max-w-md",
        className
      )}
      render={
        render ?? (
          <motion.div
            initial={
              reduce ? false : { opacity: 0, y: 4 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduce
                ? { duration: 0 }
                : enterTween(pageFade.duration, easeOutSoft)
            }
          />
        )
      }
      {...props}
    />
  )
}

function NavigationMenuLink({
  className,
  ...props
}: NavigationMenuPrimitive.Link.Props) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "flex flex-col gap-0.5 rounded-[calc(var(--radius)-2px)] p-1.5 text-sm text-foreground no-underline outline-none transition-colors",
        "hover:bg-muted/80 focus-visible:ring-2 focus-visible:ring-ring/40",
        "data-active:bg-muted/80",
        className
      )}
      {...props}
    />
  )
}

function NavigationMenuIcon({
  className,
  ...props
}: NavigationMenuPrimitive.Icon.Props) {
  return (
    <NavigationMenuPrimitive.Icon
      data-slot="navigation-menu-icon"
      className={cn(
        "size-3 text-muted-foreground transition-transform duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] data-popup-open:rotate-180",
        className
      )}
      {...props}
    />
  )
}

/**
 * Portal + positioner + popup + viewport — peer panel surface.
 * Open when any item value is set; settle with popupMotion; size via Base UI CSS vars.
 */
function NavigationMenuViewport({
  className,
  align = "start",
  side = "bottom",
  sideOffset = 8,
  render,
  ...props
}: NavigationMenuPrimitive.Popup.Props &
  Pick<
    NavigationMenuPrimitive.Positioner.Props,
    "align" | "side" | "sideOffset"
  >) {
  const open = useNavigationMenuOpen()
  const reduce = useReducedMotion()

  return (
    <AnimatePresence>
      {open ? (
        <NavigationMenuPrimitive.Portal keepMounted key="navigation-menu-portal">
          <NavigationMenuPrimitive.Positioner
            className="isolate z-50 outline-none"
            align={align}
            side={side}
            sideOffset={sideOffset}
            collisionPadding={{ top: 5, bottom: 5, left: 16, right: 16 }}
          >
            <NavigationMenuPrimitive.Popup
              data-slot="navigation-menu-viewport"
              className={cn(
                "relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin) overflow-hidden rounded-[var(--radius)] border border-border-subtle bg-popover text-popover-foreground outline-none transition-[width,height] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none",
                overlayElevation,
                className
              )}
              render={render ?? <motion.div {...popupMotion(reduce)} />}
              {...props}
            >
              <NavigationMenuPrimitive.Viewport className="relative h-full w-full overflow-hidden" />
            </NavigationMenuPrimitive.Popup>
          </NavigationMenuPrimitive.Positioner>
        </NavigationMenuPrimitive.Portal>
      ) : null}
    </AnimatePresence>
  )
}

function NavigationMenuPortal({
  ...props
}: NavigationMenuPrimitive.Portal.Props) {
  return (
    <NavigationMenuPrimitive.Portal
      data-slot="navigation-menu-portal"
      {...props}
    />
  )
}

function NavigationMenuPositioner({
  className,
  ...props
}: NavigationMenuPrimitive.Positioner.Props) {
  return (
    <NavigationMenuPrimitive.Positioner
      data-slot="navigation-menu-positioner"
      className={cn("isolate z-50 outline-none", className)}
      {...props}
    />
  )
}

function NavigationMenuPopup({
  className,
  ...props
}: NavigationMenuPrimitive.Popup.Props) {
  return (
    <NavigationMenuPrimitive.Popup
      data-slot="navigation-menu-popup"
      className={cn(
        "relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin) overflow-hidden rounded-[var(--radius)] border border-border-subtle bg-popover text-popover-foreground outline-none",
        overlayElevation,
        className
      )}
      {...props}
    />
  )
}

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIcon,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPortal,
  NavigationMenuPopup,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
  NavigationMenuViewport,
}
