"use client"

import * as React from "react"
import { Menu as MenuPrimitive } from "@base-ui/react/menu"
import { Check, ChevronRight } from "lucide-react"
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "motion/react"

import {
  layoutTween,
  menuItemVariants,
  menuPopupMotion,
} from "@/lib/motion"
import { cn } from "@/lib/utils"

/** Layered pop elevation — ring-as-border + cast stack + top light. */
const overlayElevation = "ds-elev-pop"

type MenuOpenContextValue = {
  open: boolean
}

const MenuOpenContext = React.createContext<MenuOpenContextValue | null>(null)

type MenuHighlightContextValue = {
  layoutId: string
  activeId: string | null
  setActiveId: (id: string | null) => void
  reduce: boolean | null
}

const MenuHighlightContext =
  React.createContext<MenuHighlightContextValue | null>(null)

function useMenuOpen() {
  const ctx = React.useContext(MenuOpenContext)
  if (!ctx) {
    throw new Error("Menu parts must be used within <Menu> or <MenuSub>")
  }
  return ctx.open
}

function Menu({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  ...props
}: MenuPrimitive.Root.Props) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isControlled = openProp !== undefined
  const open = isControlled ? openProp : uncontrolledOpen

  const handleOpenChange = React.useCallback<
    NonNullable<MenuPrimitive.Root.Props["onOpenChange"]>
  >(
    (next, eventDetails) => {
      if (!isControlled) setUncontrolledOpen(next)
      onOpenChange?.(next, eventDetails)
    },
    [isControlled, onOpenChange]
  )

  return (
    <MenuOpenContext.Provider value={{ open }}>
      <MenuPrimitive.Root
        data-slot="menu"
        open={open}
        onOpenChange={handleOpenChange}
        {...props}
      />
    </MenuOpenContext.Provider>
  )
}

function MenuPortal({ ...props }: MenuPrimitive.Portal.Props) {
  return <MenuPrimitive.Portal data-slot="menu-portal" {...props} />
}

function MenuTrigger({ ...props }: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger data-slot="menu-trigger" {...props} />
}

function MenuContent({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 6,
  className,
  render,
  onMouseLeave,
  ...props
}: MenuPrimitive.Popup.Props &
  Pick<
    MenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  const open = useMenuOpen()
  const reduce = useReducedMotion()
  const groupId = React.useId()
  const [activeId, setActiveId] = React.useState<string | null>(null)

  const highlight = React.useMemo<MenuHighlightContextValue>(
    () => ({
      layoutId: `${groupId}-ink`,
      activeId,
      setActiveId,
      reduce: reduce ?? false,
    }),
    [activeId, groupId, reduce]
  )

  return (
    <AnimatePresence>
      {open ? (
        <MenuPrimitive.Portal keepMounted key="menu-portal">
          <MenuPrimitive.Positioner
            className="isolate z-50 outline-none"
            align={align}
            alignOffset={alignOffset}
            side={side}
            sideOffset={sideOffset}
          >
            <LayoutGroup id={groupId}>
              <MenuHighlightContext.Provider value={highlight}>
                <MenuPrimitive.Popup
                  data-slot="menu-content"
                  className={cn(
                    "z-50 max-h-(--available-height) min-w-40 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-[var(--radius)] bg-popover p-0.5 text-popover-foreground outline-none",
                    "data-closed:overflow-hidden",
                    overlayElevation,
                    className
                  )}
                  render={render ?? <motion.div {...menuPopupMotion(reduce)} />}
                  onMouseLeave={(event) => {
                    setActiveId(null)
                    onMouseLeave?.(event)
                  }}
                  {...props}
                />
              </MenuHighlightContext.Provider>
            </LayoutGroup>
          </MenuPrimitive.Positioner>
        </MenuPrimitive.Portal>
      ) : null}
    </AnimatePresence>
  )
}

function MenuHighlight({
  itemId,
  tone = "default",
}: {
  itemId: string
  tone?: "default" | "destructive"
}) {
  const highlight = React.useContext(MenuHighlightContext)
  if (!highlight || highlight.reduce || highlight.activeId !== itemId) {
    return null
  }
  return (
    <motion.span
      layoutId={highlight.layoutId}
      className={cn(
        "absolute inset-0 z-0 rounded-[calc(var(--radius)-2px)]",
        tone === "destructive" ? "bg-destructive/10" : "bg-muted/80"
      )}
      transition={layoutTween}
      aria-hidden
    />
  )
}

const itemBase =
  "relative flex cursor-default items-center gap-2 rounded-[calc(var(--radius)-2px)] px-2 py-0.5 text-[0.8125rem] leading-snug outline-none select-none"

function useMenuItemMotion(itemId: string) {
  const highlight = React.useContext(MenuHighlightContext)
  const reduce = highlight?.reduce ?? false

  const arm = React.useCallback(() => {
    highlight?.setActiveId(itemId)
  }, [highlight, itemId])

  return {
    reduce,
    arm,
    rowMotion: reduce ? undefined : menuItemVariants,
  }
}

function MenuGroup({ ...props }: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group data-slot="menu-group" {...props} />
}

function MenuLabel({
  className,
  inset,
  ...props
}: MenuPrimitive.GroupLabel.Props & {
  inset?: boolean
}) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="menu-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1 text-[0.6875rem] font-medium tracking-wide text-muted-foreground data-[inset]:pl-7",
        className
      )}
      {...props}
    />
  )
}

function MenuItem({
  className,
  inset,
  variant = "default",
  onMouseEnter,
  onFocus,
  children,
  ...props
}: MenuPrimitive.Item.Props & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  const itemId = React.useId()
  const { reduce, arm, rowMotion } = useMenuItemMotion(itemId)

  return (
    <MenuPrimitive.Item
      data-slot="menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        itemBase,
        reduce
          ? "data-highlighted:bg-muted data-highlighted:text-foreground data-[variant=destructive]:data-highlighted:bg-destructive/10"
          : "data-highlighted:text-foreground",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        "data-[variant=destructive]:text-destructive",
        "data-[inset]:pl-7",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
        className
      )}
      render={
        rowMotion ? <motion.div variants={rowMotion} /> : undefined
      }
      onMouseEnter={(event) => {
        arm()
        onMouseEnter?.(event)
      }}
      onFocus={(event) => {
        arm()
        onFocus?.(event)
      }}
      {...props}
    >
      <MenuHighlight itemId={itemId} tone={variant} />
      <span className="relative z-[1] flex min-w-0 flex-1 items-center gap-2">
        {children}
      </span>
    </MenuPrimitive.Item>
  )
}

function MenuSub({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  ...props
}: MenuPrimitive.SubmenuRoot.Props) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isControlled = openProp !== undefined
  const open = isControlled ? openProp : uncontrolledOpen

  const handleOpenChange = React.useCallback<
    NonNullable<MenuPrimitive.SubmenuRoot.Props["onOpenChange"]>
  >(
    (next, eventDetails) => {
      if (!isControlled) setUncontrolledOpen(next)
      onOpenChange?.(next, eventDetails)
    },
    [isControlled, onOpenChange]
  )

  return (
    <MenuOpenContext.Provider value={{ open }}>
      <MenuPrimitive.SubmenuRoot
        data-slot="menu-sub"
        open={open}
        onOpenChange={handleOpenChange}
        {...props}
      />
    </MenuOpenContext.Provider>
  )
}

function MenuSubTrigger({
  className,
  inset,
  children,
  onMouseEnter,
  onFocus,
  ...props
}: MenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean
}) {
  const itemId = React.useId()
  const { reduce, arm, rowMotion } = useMenuItemMotion(itemId)

  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="menu-sub-trigger"
      data-inset={inset}
      className={cn(
        itemBase,
        reduce
          ? "data-highlighted:bg-muted data-highlighted:text-foreground data-popup-open:bg-muted data-popup-open:text-foreground"
          : "data-highlighted:text-foreground data-popup-open:text-foreground",
        "data-[inset]:pl-7",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
        className
      )}
      render={
        rowMotion ? <motion.div variants={rowMotion} /> : undefined
      }
      onMouseEnter={(event) => {
        arm()
        onMouseEnter?.(event)
      }}
      onFocus={(event) => {
        arm()
        onFocus?.(event)
      }}
      {...props}
    >
      <MenuHighlight itemId={itemId} />
      <span className="relative z-[1] flex min-w-0 flex-1 items-center gap-2">
        {children}
        <ChevronRight className="ml-auto size-3.5 text-muted-foreground" />
      </span>
    </MenuPrimitive.SubmenuTrigger>
  )
}

function MenuSubContent({
  align = "start",
  alignOffset = -3,
  side = "right",
  sideOffset = 0,
  className,
  ...props
}: React.ComponentProps<typeof MenuContent>) {
  return (
    <MenuContent
      data-slot="menu-sub-content"
      className={cn("min-w-36", className)}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  )
}

function MenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  onMouseEnter,
  onFocus,
  ...props
}: MenuPrimitive.CheckboxItem.Props & {
  inset?: boolean
}) {
  const itemId = React.useId()
  const { reduce, arm, rowMotion } = useMenuItemMotion(itemId)

  return (
    <MenuPrimitive.CheckboxItem
      data-slot="menu-checkbox-item"
      data-inset={inset}
      className={cn(
        itemBase,
        "pr-2 pl-7",
        reduce
          ? "data-highlighted:bg-muted data-highlighted:text-foreground"
          : "data-highlighted:text-foreground",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        "data-[inset]:pl-7",
        className
      )}
      render={
        rowMotion ? <motion.div variants={rowMotion} /> : undefined
      }
      checked={checked}
      onMouseEnter={(event) => {
        arm()
        onMouseEnter?.(event)
      }}
      onFocus={(event) => {
        arm()
        onFocus?.(event)
      }}
      {...props}
    >
      <MenuHighlight itemId={itemId} />
      <span className="pointer-events-none absolute left-2 z-[1] flex size-3.5 items-center justify-center">
        <MenuPrimitive.CheckboxItemIndicator>
          <Check className="size-3" />
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      <span className="relative z-[1] flex min-w-0 flex-1 items-center gap-2">
        {children}
      </span>
    </MenuPrimitive.CheckboxItem>
  )
}

function MenuRadioGroup({ ...props }: MenuPrimitive.RadioGroup.Props) {
  return <MenuPrimitive.RadioGroup data-slot="menu-radio-group" {...props} />
}

function MenuRadioItem({
  className,
  children,
  inset,
  onMouseEnter,
  onFocus,
  ...props
}: MenuPrimitive.RadioItem.Props & {
  inset?: boolean
}) {
  const itemId = React.useId()
  const { reduce, arm, rowMotion } = useMenuItemMotion(itemId)

  return (
    <MenuPrimitive.RadioItem
      data-slot="menu-radio-item"
      data-inset={inset}
      className={cn(
        itemBase,
        "pr-2 pl-7",
        reduce
          ? "data-highlighted:bg-muted data-highlighted:text-foreground"
          : "data-highlighted:text-foreground",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        className
      )}
      render={
        rowMotion ? <motion.div variants={rowMotion} /> : undefined
      }
      onMouseEnter={(event) => {
        arm()
        onMouseEnter?.(event)
      }}
      onFocus={(event) => {
        arm()
        onFocus?.(event)
      }}
      {...props}
    >
      <MenuHighlight itemId={itemId} />
      <span className="pointer-events-none absolute left-2 z-[1] flex size-3.5 items-center justify-center">
        <MenuPrimitive.RadioItemIndicator>
          <Check className="size-3" />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      <span className="relative z-[1] flex min-w-0 flex-1 items-center gap-2">
        {children}
      </span>
    </MenuPrimitive.RadioItem>
  )
}

function MenuSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      data-slot="menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border-subtle", className)}
      {...props}
    />
  )
}

function MenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="menu-shortcut"
      className={cn(
        "ml-auto font-mono text-[0.6875rem] tracking-wide text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuItem,
  MenuLabel,
  MenuPortal,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuShortcut,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
  MenuTrigger,
}
