"use client"

import * as React from "react"
import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu"
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
const overlayElevation =
  "ds-elev-pop"

type ContextMenuOpenContextValue = {
  open: boolean
}

const ContextMenuOpenContext =
  React.createContext<ContextMenuOpenContextValue | null>(null)

type ContextMenuHighlightContextValue = {
  layoutId: string
  activeId: string | null
  setActiveId: (id: string | null) => void
  reduce: boolean | null
}

const ContextMenuHighlightContext =
  React.createContext<ContextMenuHighlightContextValue | null>(null)

function useContextMenuOpen() {
  const ctx = React.useContext(ContextMenuOpenContext)
  if (!ctx) {
    throw new Error(
      "ContextMenu parts must be used within <ContextMenu> or <ContextMenuSub>"
    )
  }
  return ctx.open
}

function ContextMenu({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  ...props
}: ContextMenuPrimitive.Root.Props) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isControlled = openProp !== undefined
  const open = isControlled ? openProp : uncontrolledOpen

  const handleOpenChange = React.useCallback<
    NonNullable<ContextMenuPrimitive.Root.Props["onOpenChange"]>
  >(
    (next, eventDetails) => {
      if (!isControlled) setUncontrolledOpen(next)
      onOpenChange?.(next, eventDetails)
    },
    [isControlled, onOpenChange]
  )

  return (
    <ContextMenuOpenContext.Provider value={{ open }}>
      <ContextMenuPrimitive.Root
        data-slot="context-menu"
        open={open}
        onOpenChange={handleOpenChange}
        {...props}
      />
    </ContextMenuOpenContext.Provider>
  )
}

function ContextMenuTrigger({
  className,
  ...props
}: ContextMenuPrimitive.Trigger.Props) {
  return (
    <ContextMenuPrimitive.Trigger
      data-slot="context-menu-trigger"
      className={cn(className)}
      {...props}
    />
  )
}

function ContextMenuPortal({ ...props }: ContextMenuPrimitive.Portal.Props) {
  return (
    <ContextMenuPrimitive.Portal data-slot="context-menu-portal" {...props} />
  )
}

function ContextMenuContent({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  className,
  render,
  onMouseLeave,
  ...props
}: ContextMenuPrimitive.Popup.Props &
  Pick<
    ContextMenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  const open = useContextMenuOpen()
  const reduce = useReducedMotion()
  const groupId = React.useId()
  const [activeId, setActiveId] = React.useState<string | null>(null)

  const highlight = React.useMemo<ContextMenuHighlightContextValue>(
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
        <ContextMenuPrimitive.Portal keepMounted key="context-menu-portal">
          <ContextMenuPrimitive.Positioner
            className="isolate z-50 outline-none"
            align={align}
            alignOffset={alignOffset}
            side={side}
            sideOffset={sideOffset}
          >
            <LayoutGroup id={groupId}>
              <ContextMenuHighlightContext.Provider value={highlight}>
                <ContextMenuPrimitive.Popup
                  data-slot="context-menu-content"
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
              </ContextMenuHighlightContext.Provider>
            </LayoutGroup>
          </ContextMenuPrimitive.Positioner>
        </ContextMenuPrimitive.Portal>
      ) : null}
    </AnimatePresence>
  )
}

function ContextMenuHighlight({
  itemId,
  tone = "default",
}: {
  itemId: string
  tone?: "default" | "destructive"
}) {
  const highlight = React.useContext(ContextMenuHighlightContext)
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

function useContextMenuItemMotion(itemId: string) {
  const highlight = React.useContext(ContextMenuHighlightContext)
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

function ContextMenuGroup({ ...props }: ContextMenuPrimitive.Group.Props) {
  return <ContextMenuPrimitive.Group data-slot="context-menu-group" {...props} />
}

function ContextMenuLabel({
  className,
  inset,
  ...props
}: ContextMenuPrimitive.GroupLabel.Props & {
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitive.GroupLabel
      data-slot="context-menu-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1 text-[0.6875rem] font-medium tracking-wide text-muted-foreground data-[inset]:pl-7",
        className
      )}
      {...props}
    />
  )
}

function ContextMenuItem({
  className,
  inset,
  variant = "default",
  onMouseEnter,
  onFocus,
  children,
  ...props
}: ContextMenuPrimitive.Item.Props & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  const itemId = React.useId()
  const { reduce, arm, rowMotion } = useContextMenuItemMotion(itemId)

  return (
    <ContextMenuPrimitive.Item
      data-slot="context-menu-item"
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
      render={rowMotion ? <motion.div variants={rowMotion} /> : undefined}
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
      <ContextMenuHighlight itemId={itemId} tone={variant} />
      <span className="relative z-[1] flex min-w-0 flex-1 items-center gap-2">
        {children}
      </span>
    </ContextMenuPrimitive.Item>
  )
}

function ContextMenuSub({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  ...props
}: ContextMenuPrimitive.SubmenuRoot.Props) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isControlled = openProp !== undefined
  const open = isControlled ? openProp : uncontrolledOpen

  const handleOpenChange = React.useCallback<
    NonNullable<ContextMenuPrimitive.SubmenuRoot.Props["onOpenChange"]>
  >(
    (next, eventDetails) => {
      if (!isControlled) setUncontrolledOpen(next)
      onOpenChange?.(next, eventDetails)
    },
    [isControlled, onOpenChange]
  )

  return (
    <ContextMenuOpenContext.Provider value={{ open }}>
      <ContextMenuPrimitive.SubmenuRoot
        data-slot="context-menu-sub"
        open={open}
        onOpenChange={handleOpenChange}
        {...props}
      />
    </ContextMenuOpenContext.Provider>
  )
}

function ContextMenuSubTrigger({
  className,
  inset,
  children,
  onMouseEnter,
  onFocus,
  ...props
}: ContextMenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean
}) {
  const itemId = React.useId()
  const { reduce, arm, rowMotion } = useContextMenuItemMotion(itemId)

  return (
    <ContextMenuPrimitive.SubmenuTrigger
      data-slot="context-menu-sub-trigger"
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
      render={rowMotion ? <motion.div variants={rowMotion} /> : undefined}
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
      <ContextMenuHighlight itemId={itemId} />
      <span className="relative z-[1] flex min-w-0 flex-1 items-center gap-2">
        {children}
        <ChevronRight className="ml-auto size-3.5 text-muted-foreground" />
      </span>
    </ContextMenuPrimitive.SubmenuTrigger>
  )
}

function ContextMenuSubContent({
  align = "start",
  alignOffset = -3,
  side = "right",
  sideOffset = 0,
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuContent>) {
  return (
    <ContextMenuContent
      data-slot="context-menu-sub-content"
      className={cn("min-w-36", className)}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  )
}

function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  onMouseEnter,
  onFocus,
  ...props
}: ContextMenuPrimitive.CheckboxItem.Props & {
  inset?: boolean
}) {
  const itemId = React.useId()
  const { reduce, arm, rowMotion } = useContextMenuItemMotion(itemId)

  return (
    <ContextMenuPrimitive.CheckboxItem
      data-slot="context-menu-checkbox-item"
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
      render={rowMotion ? <motion.div variants={rowMotion} /> : undefined}
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
      <ContextMenuHighlight itemId={itemId} />
      <span className="pointer-events-none absolute left-2 z-[1] flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.CheckboxItemIndicator>
          <Check className="size-3" />
        </ContextMenuPrimitive.CheckboxItemIndicator>
      </span>
      <span className="relative z-[1] flex min-w-0 flex-1 items-center gap-2">
        {children}
      </span>
    </ContextMenuPrimitive.CheckboxItem>
  )
}

function ContextMenuRadioGroup({
  ...props
}: ContextMenuPrimitive.RadioGroup.Props) {
  return (
    <ContextMenuPrimitive.RadioGroup
      data-slot="context-menu-radio-group"
      {...props}
    />
  )
}

function ContextMenuRadioItem({
  className,
  children,
  inset,
  onMouseEnter,
  onFocus,
  ...props
}: ContextMenuPrimitive.RadioItem.Props & {
  inset?: boolean
}) {
  const itemId = React.useId()
  const { reduce, arm, rowMotion } = useContextMenuItemMotion(itemId)

  return (
    <ContextMenuPrimitive.RadioItem
      data-slot="context-menu-radio-item"
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
      render={rowMotion ? <motion.div variants={rowMotion} /> : undefined}
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
      <ContextMenuHighlight itemId={itemId} />
      <span className="pointer-events-none absolute left-2 z-[1] flex size-3.5 items-center justify-center">
        <ContextMenuPrimitive.RadioItemIndicator>
          <Check className="size-3" />
        </ContextMenuPrimitive.RadioItemIndicator>
      </span>
      <span className="relative z-[1] flex min-w-0 flex-1 items-center gap-2">
        {children}
      </span>
    </ContextMenuPrimitive.RadioItem>
  )
}

function ContextMenuSeparator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      data-slot="context-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border-subtle", className)}
      {...props}
    />
  )
}

function ContextMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="context-menu-shortcut"
      className={cn(
        "ml-auto font-mono text-[0.6875rem] tracking-wide text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
}
