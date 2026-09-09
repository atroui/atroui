"use client"

import * as React from "react"
import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar"

import { cn } from "@/lib/utils"
import {
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
} from "@/components/ui/menu"

/**
 * Menubar — Base UI focus-roving shell + Menu grammar (Motion settle on popups).
 * Soft-rect Mira chrome; arrow keys move across triggers when a menu is open.
 */
function Menubar({ className, ...props }: MenubarPrimitive.Props) {
  return (
    <MenubarPrimitive
      data-slot="menubar"
      className={cn(
        "flex h-9 items-center gap-0.5 rounded-[var(--radius)] border border-border-subtle bg-muted/40 p-0.5",
        className
      )}
      {...props}
    />
  )
}

function MenubarMenu({ ...props }: React.ComponentProps<typeof Menu>) {
  return <Menu data-slot="menubar-menu" {...props} />
}

function MenubarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof MenuTrigger>) {
  return (
    <MenuTrigger
      data-slot="menubar-trigger"
      className={cn(
        "inline-flex h-8 items-center justify-center rounded-[calc(var(--radius)-2px)] px-2.5 text-[0.8125rem] font-medium text-foreground outline-none select-none",
        "hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/40",
        "data-popup-open:bg-muted data-pressed:bg-muted",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function MenubarContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof MenuContent>) {
  return (
    <MenuContent
      data-slot="menubar-content"
      sideOffset={sideOffset}
      className={cn("min-w-40", className)}
      {...props}
    />
  )
}

function MenubarItem(props: React.ComponentProps<typeof MenuItem>) {
  return <MenuItem data-slot="menubar-item" {...props} />
}

function MenubarSeparator(props: React.ComponentProps<typeof MenuSeparator>) {
  return <MenuSeparator data-slot="menubar-separator" {...props} />
}

function MenubarLabel(props: React.ComponentProps<typeof MenuLabel>) {
  return <MenuLabel data-slot="menubar-label" {...props} />
}

function MenubarGroup(props: React.ComponentProps<typeof MenuGroup>) {
  return <MenuGroup data-slot="menubar-group" {...props} />
}

function MenubarCheckboxItem(
  props: React.ComponentProps<typeof MenuCheckboxItem>
) {
  return <MenuCheckboxItem data-slot="menubar-checkbox-item" {...props} />
}

function MenubarRadioGroup(props: React.ComponentProps<typeof MenuRadioGroup>) {
  return <MenuRadioGroup data-slot="menubar-radio-group" {...props} />
}

function MenubarRadioItem(props: React.ComponentProps<typeof MenuRadioItem>) {
  return <MenuRadioItem data-slot="menubar-radio-item" {...props} />
}

function MenubarSub(props: React.ComponentProps<typeof MenuSub>) {
  return <MenuSub data-slot="menubar-sub" {...props} />
}

function MenubarSubTrigger(props: React.ComponentProps<typeof MenuSubTrigger>) {
  return <MenuSubTrigger data-slot="menubar-sub-trigger" {...props} />
}

function MenubarSubContent(props: React.ComponentProps<typeof MenuSubContent>) {
  return <MenuSubContent data-slot="menubar-sub-content" {...props} />
}

function MenubarShortcut(props: React.ComponentProps<typeof MenuShortcut>) {
  return <MenuShortcut data-slot="menubar-shortcut" {...props} />
}

function MenubarPortal(props: React.ComponentProps<typeof MenuPortal>) {
  return <MenuPortal data-slot="menubar-portal" {...props} />
}

export {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
}
