"use client"

import * as React from "react"
import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete"
import { ChevronDown, X } from "lucide-react"
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
} from "../../lib/motion"
import { cn } from "../../lib/utils"

/** Quiet Mira elevation — one soft lift on floating layers. */
const overlayElevation =
  "shadow-[0_18px_40px_-24px_color-mix(in_oklch,var(--foreground)_32%,transparent)]"

type AutocompleteOpenContextValue = {
  open: boolean
}

const AutocompleteOpenContext =
  React.createContext<AutocompleteOpenContextValue | null>(null)

type AutocompleteHighlightContextValue = {
  layoutId: string
  activeId: string | null
  setActiveId: (id: string | null) => void
  reduce: boolean | null
}

const AutocompleteHighlightContext =
  React.createContext<AutocompleteHighlightContextValue | null>(null)

function useAutocompleteOpen() {
  const ctx = React.useContext(AutocompleteOpenContext)
  if (!ctx) {
    throw new Error("Autocomplete parts must be used within <Autocomplete>")
  }
  return ctx.open
}

function Autocomplete({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  ...props
}: React.ComponentProps<typeof AutocompletePrimitive.Root>) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isControlled = openProp !== undefined
  const open = isControlled ? openProp : uncontrolledOpen

  const handleOpenChange = React.useCallback(
    (next: boolean, eventDetails: Parameters<
      NonNullable<
        React.ComponentProps<typeof AutocompletePrimitive.Root>["onOpenChange"]
      >
    >[1]) => {
      if (!isControlled) setUncontrolledOpen(next)
      onOpenChange?.(next, eventDetails)
    },
    [isControlled, onOpenChange]
  )

  return (
    <AutocompleteOpenContext.Provider value={{ open }}>
      <AutocompletePrimitive.Root
        data-slot="autocomplete"
        open={open}
        onOpenChange={handleOpenChange}
        {...props}
      />
    </AutocompleteOpenContext.Provider>
  )
}

function AutocompleteInputGroup({
  className,
  ...props
}: AutocompletePrimitive.InputGroup.Props) {
  return (
    <AutocompletePrimitive.InputGroup
      data-slot="autocomplete-input-group"
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

function AutocompleteInput({
  className,
  ...props
}: AutocompletePrimitive.Input.Props) {
  return (
    <AutocompletePrimitive.Input
      data-slot="autocomplete-input"
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

function AutocompleteTrigger({
  className,
  children,
  ...props
}: AutocompletePrimitive.Trigger.Props) {
  const open = useAutocompleteOpen()
  const reduce = useReducedMotion()

  return (
    <AutocompletePrimitive.Trigger
      data-slot="autocomplete-trigger"
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
    </AutocompletePrimitive.Trigger>
  )
}

function AutocompleteClear({
  className,
  ...props
}: AutocompletePrimitive.Clear.Props) {
  return (
    <AutocompletePrimitive.Clear
      data-slot="autocomplete-clear"
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
    </AutocompletePrimitive.Clear>
  )
}

function AutocompleteIcon({
  className,
  ...props
}: AutocompletePrimitive.Icon.Props) {
  return (
    <AutocompletePrimitive.Icon
      data-slot="autocomplete-icon"
      className={cn("inline-flex shrink-0 text-muted-foreground", className)}
      {...props}
    >
      <ChevronDown className="size-4" />
    </AutocompletePrimitive.Icon>
  )
}

function AutocompleteContent({
  className,
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 6,
  render,
  onMouseLeave,
  ...props
}: AutocompletePrimitive.Popup.Props &
  Pick<
    AutocompletePrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  const open = useAutocompleteOpen()
  const reduce = useReducedMotion()
  const groupId = React.useId()
  const [activeId, setActiveId] = React.useState<string | null>(null)

  const highlight = React.useMemo<AutocompleteHighlightContextValue>(
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
        <AutocompletePrimitive.Portal keepMounted>
          <AutocompletePrimitive.Positioner
            className="isolate z-50 outline-none"
            align={align}
            alignOffset={alignOffset}
            side={side}
            sideOffset={sideOffset}
          >
            <LayoutGroup id={groupId}>
              <AutocompleteHighlightContext.Provider value={highlight}>
                <AutocompletePrimitive.Popup
                  data-slot="autocomplete-content"
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
              </AutocompleteHighlightContext.Provider>
            </LayoutGroup>
          </AutocompletePrimitive.Positioner>
        </AutocompletePrimitive.Portal>
      ) : null}
    </AnimatePresence>
  )
}

function AutocompleteList({
  className,
  ...props
}: AutocompletePrimitive.List.Props) {
  const reduce = useReducedMotion()

  return (
    <AutocompletePrimitive.List
      data-slot="autocomplete-list"
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

function AutocompleteHighlight({ itemId }: { itemId: string }) {
  const highlight = React.useContext(AutocompleteHighlightContext)
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

function AutocompleteItem({
  className,
  children,
  onMouseEnter,
  onFocus,
  ...props
}: AutocompletePrimitive.Item.Props) {
  const itemId = React.useId()
  const highlight = React.useContext(AutocompleteHighlightContext)
  const reduce = highlight?.reduce ?? false

  return (
    <AutocompletePrimitive.Item
      data-slot="autocomplete-item"
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
      <AutocompleteHighlight itemId={itemId} />
      <span className="relative z-[1] flex min-w-0 flex-1 items-center gap-2">
        {children}
      </span>
    </AutocompletePrimitive.Item>
  )
}

function AutocompleteEmpty({
  className,
  ...props
}: AutocompletePrimitive.Empty.Props) {
  return (
    <AutocompletePrimitive.Empty
      data-slot="autocomplete-empty"
      className={cn(
        "px-2 py-3 text-center text-[0.8125rem] text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function AutocompleteGroup({ ...props }: AutocompletePrimitive.Group.Props) {
  return (
    <AutocompletePrimitive.Group data-slot="autocomplete-group" {...props} />
  )
}

function AutocompleteGroupLabel({
  className,
  ...props
}: AutocompletePrimitive.GroupLabel.Props) {
  return (
    <AutocompletePrimitive.GroupLabel
      data-slot="autocomplete-group-label"
      className={cn(
        "px-2 py-1 text-[0.6875rem] font-medium tracking-wide text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function AutocompleteCollection({
  ...props
}: AutocompletePrimitive.Collection.Props) {
  return (
    <AutocompletePrimitive.Collection
      data-slot="autocomplete-collection"
      {...props}
    />
  )
}

export {
  Autocomplete,
  AutocompleteClear,
  AutocompleteCollection,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteIcon,
  AutocompleteInput,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteList,
  AutocompleteTrigger,
}
