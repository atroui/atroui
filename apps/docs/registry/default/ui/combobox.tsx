"use client"

import * as React from "react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox"
import { Check, ChevronDown, X } from "lucide-react"
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "motion/react"

import {
  easeOutExpo,
  layoutTween,
  menuItemVariants,
  menuPopupMotion,
} from "@/lib/motion"
import { cn } from "@/lib/utils"

/** Quiet Mira elevation — one soft lift on floating layers. */
const overlayElevation =
  "shadow-[0_18px_40px_-24px_color-mix(in_oklch,var(--foreground)_32%,transparent)]"

type ComboboxOpenContextValue = {
  open: boolean
}

const ComboboxOpenContext =
  React.createContext<ComboboxOpenContextValue | null>(null)

type ComboboxHighlightContextValue = {
  layoutId: string
  activeId: string | null
  setActiveId: (id: string | null) => void
  reduce: boolean | null
}

const ComboboxHighlightContext =
  React.createContext<ComboboxHighlightContextValue | null>(null)

function useComboboxOpen() {
  const ctx = React.useContext(ComboboxOpenContext)
  if (!ctx) {
    throw new Error("Combobox parts must be used within <Combobox>")
  }
  return ctx.open
}

function Combobox({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Root>) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isControlled = openProp !== undefined
  const open = isControlled ? openProp : uncontrolledOpen

  const handleOpenChange = React.useCallback(
    (next: boolean, eventDetails: Parameters<
      NonNullable<
        React.ComponentProps<typeof ComboboxPrimitive.Root>["onOpenChange"]
      >
    >[1]) => {
      if (!isControlled) setUncontrolledOpen(next)
      onOpenChange?.(next, eventDetails)
    },
    [isControlled, onOpenChange]
  )

  return (
    <ComboboxOpenContext.Provider value={{ open }}>
      <ComboboxPrimitive.Root
        data-slot="combobox"
        open={open}
        onOpenChange={handleOpenChange}
        {...props}
      />
    </ComboboxOpenContext.Provider>
  )
}

function ComboboxValue({ ...props }: ComboboxPrimitive.Value.Props) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />
}

function ComboboxInputGroup({
  className,
  ...props
}: ComboboxPrimitive.InputGroup.Props) {
  return (
    <ComboboxPrimitive.InputGroup
      data-slot="combobox-input-group"
      className={cn(
        "flex h-[var(--atro-control-height,2.25rem)] w-full min-w-0 items-center gap-1 rounded-[var(--atro-control-radius,var(--radius))] border border-border-subtle bg-background px-2",
        "transition-[border-color,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20",
        "has-aria-invalid:border-destructive has-aria-invalid:ring-2 has-aria-invalid:ring-destructive/20",
        "has-data-disabled:opacity-50",
        "motion-reduce:transition-none",
        className
      )}
      {...props}
    />
  )
}

function ComboboxInput({
  className,
  ...props
}: ComboboxPrimitive.Input.Props) {
  return (
    <ComboboxPrimitive.Input
      data-slot="combobox-input"
      className={cn(
        "h-full min-w-0 flex-1 bg-transparent px-1 text-base text-foreground outline-none sm:text-sm",
        "placeholder:text-muted-foreground",
        "disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  )
}

function ComboboxTrigger({
  className,
  children,
  ...props
}: ComboboxPrimitive.Trigger.Props) {
  const open = useComboboxOpen()
  const reduce = useReducedMotion()

  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      className={cn(
        "inline-flex size-7 shrink-0 items-center justify-center rounded-[calc(var(--radius)-2px)] text-muted-foreground outline-none",
        "hover:bg-muted/60 hover:text-foreground",
        "focus-visible:ring-2 focus-visible:ring-ring/20",
        className
      )}
      {...props}
    >
      {children ?? (
        <motion.span
          aria-hidden
          className="inline-flex"
          animate={{ rotate: open ? 180 : 0 }}
          transition={
            reduce ? { duration: 0 } : { duration: 0.2, ease: easeOutExpo }
          }
        >
          <ChevronDown className="size-4" />
        </motion.span>
      )}
    </ComboboxPrimitive.Trigger>
  )
}

function ComboboxClear({
  className,
  ...props
}: ComboboxPrimitive.Clear.Props) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      className={cn(
        "inline-flex size-7 shrink-0 items-center justify-center rounded-[calc(var(--radius)-2px)] text-muted-foreground outline-none",
        "hover:bg-muted/60 hover:text-foreground",
        "focus-visible:ring-2 focus-visible:ring-ring/20",
        "data-disabled:pointer-events-none",
        className
      )}
      {...props}
    >
      <X className="size-3.5" strokeWidth={1.75} />
      <span className="sr-only">Clear</span>
    </ComboboxPrimitive.Clear>
  )
}

function ComboboxIcon({ className, ...props }: ComboboxPrimitive.Icon.Props) {
  return (
    <ComboboxPrimitive.Icon
      data-slot="combobox-icon"
      className={cn("inline-flex shrink-0 text-muted-foreground", className)}
      {...props}
    >
      <ChevronDown className="size-4" />
    </ComboboxPrimitive.Icon>
  )
}

function ComboboxContent({
  className,
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 6,
  render,
  onMouseLeave,
  ...props
}: ComboboxPrimitive.Popup.Props &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  const open = useComboboxOpen()
  const reduce = useReducedMotion()
  const groupId = React.useId()
  const [activeId, setActiveId] = React.useState<string | null>(null)

  const highlight = React.useMemo<ComboboxHighlightContextValue>(
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
        <ComboboxPrimitive.Portal keepMounted>
          <ComboboxPrimitive.Positioner
            className="isolate z-50 outline-none"
            align={align}
            alignOffset={alignOffset}
            side={side}
            sideOffset={sideOffset}
          >
            <LayoutGroup id={groupId}>
              <ComboboxHighlightContext.Provider value={highlight}>
                <ComboboxPrimitive.Popup
                  data-slot="combobox-content"
                  className={cn(
                    "z-50 max-h-(--available-height) min-w-(--anchor-width) origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-[var(--radius)] border border-border-subtle bg-popover p-1 text-popover-foreground outline-none",
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
              </ComboboxHighlightContext.Provider>
            </LayoutGroup>
          </ComboboxPrimitive.Positioner>
        </ComboboxPrimitive.Portal>
      ) : null}
    </AnimatePresence>
  )
}

function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  const reduce = useReducedMotion()

  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn(
        "max-h-[min(280px,var(--available-height))] scroll-py-1 overflow-y-auto outline-none",
        className
      )}
      render={
        reduce
          ? undefined
          : (
              <motion.div
                variants={{
                  closed: {},
                  open: {
                    transition: {
                      staggerChildren: 0.04,
                      delayChildren: 0.02,
                    },
                  },
                }}
              />
            )
      }
      {...props}
    />
  )
}

function ComboboxHighlight({ itemId }: { itemId: string }) {
  const highlight = React.useContext(ComboboxHighlightContext)
  if (!highlight || highlight.reduce || highlight.activeId !== itemId) {
    return null
  }
  return (
    <motion.span
      layoutId={highlight.layoutId}
      className="absolute inset-0 z-0 rounded-[calc(var(--radius)-2px)] bg-muted"
      transition={layoutTween}
      aria-hidden
    />
  )
}

const itemBase =
  "relative flex cursor-default items-center gap-2 rounded-[calc(var(--radius)-2px)] px-2 py-1.5 text-[0.8125rem] outline-none select-none"

function ComboboxItem({
  className,
  children,
  onMouseEnter,
  onFocus,
  ...props
}: ComboboxPrimitive.Item.Props) {
  const itemId = React.useId()
  const highlight = React.useContext(ComboboxHighlightContext)
  const reduce = highlight?.reduce ?? false

  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cn(
        itemBase,
        reduce
          ? "data-highlighted:bg-muted data-highlighted:text-foreground"
          : "data-highlighted:text-foreground",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        className
      )}
      render={
        reduce ? undefined : <motion.div variants={menuItemVariants} />
      }
      onMouseEnter={(event) => {
        highlight?.setActiveId(itemId)
        onMouseEnter?.(event)
      }}
      onFocus={(event) => {
        highlight?.setActiveId(itemId)
        onFocus?.(event)
      }}
      {...props}
    >
      <ComboboxHighlight itemId={itemId} />
      <span className="relative z-[1] flex min-w-0 flex-1 items-center gap-2">
        {children}
      </span>
    </ComboboxPrimitive.Item>
  )
}

function ComboboxItemIndicator({
  className,
  ...props
}: ComboboxPrimitive.ItemIndicator.Props) {
  return (
    <ComboboxPrimitive.ItemIndicator
      data-slot="combobox-item-indicator"
      className={cn(
        "ml-auto inline-flex size-3.5 shrink-0 items-center justify-center text-foreground",
        className
      )}
      {...props}
    >
      <Check className="size-3" />
    </ComboboxPrimitive.ItemIndicator>
  )
}

function ComboboxEmpty({
  className,
  ...props
}: ComboboxPrimitive.Empty.Props) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn(
        "px-2 py-3 text-center text-[0.8125rem] text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function ComboboxGroup({ ...props }: ComboboxPrimitive.Group.Props) {
  return <ComboboxPrimitive.Group data-slot="combobox-group" {...props} />
}

function ComboboxGroupLabel({
  className,
  ...props
}: ComboboxPrimitive.GroupLabel.Props) {
  return (
    <ComboboxPrimitive.GroupLabel
      data-slot="combobox-group-label"
      className={cn(
        "px-2 py-1 text-[0.6875rem] font-medium tracking-wide text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function ComboboxLabel({
  className,
  ...props
}: ComboboxPrimitive.Label.Props) {
  return (
    <ComboboxPrimitive.Label
      data-slot="combobox-label"
      className={cn(
        "mb-1.5 block text-[0.8125rem] font-medium text-foreground",
        className
      )}
      {...props}
    />
  )
}

function ComboboxCollection({
  ...props
}: ComboboxPrimitive.Collection.Props) {
  return (
    <ComboboxPrimitive.Collection data-slot="combobox-collection" {...props} />
  )
}

export {
  Combobox,
  ComboboxClear,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxIcon,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxLabel,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
}
