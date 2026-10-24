"use client"

import { Select } from "@base-ui/react/select"
import { ChevronDown } from "lucide-react"
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "motion/react"
import {
  useId,
  useMemo,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react"

import {
  easeOutExpo,
  layoutTween,
  menuItemVariants,
  menuPopupMotion,
} from "@/lib/motion"
import { cn } from "@/lib/utils"

export type FormSelectOption = { value: string; label: string }

type FormSelectProps = {
  id?: string
  value: string
  onValueChange: (value: string) => void
  options: FormSelectOption[]
  placeholder?: string
  disabled?: boolean
  className?: string
}

/**
 * Soft-rect select — toolbar-density trigger, caret rotate,
 * popup settle + list stagger ≤40ms (`menuPopupMotion`), layoutId item highlight.
 */
export function FormSelect({
  id,
  value,
  onValueChange,
  options,
  placeholder = "Choose…",
  disabled,
  className,
}: FormSelectProps) {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()
  const highlightId = useId()
  const labelByValue = useMemo(
    () => Object.fromEntries(options.map((o) => [o.value, o.label])),
    [options]
  )

  return (
    <Select.Root
      value={value}
      onValueChange={(v) => onValueChange(v ?? "")}
      disabled={disabled}
      open={open}
      onOpenChange={setOpen}
    >
      <Select.Trigger
        id={id}
        className={cn(
          "group/select-trigger flex h-[var(--atro-control-height,2.25rem)] w-full items-center justify-between gap-2",
          "rounded-[var(--atro-control-radius,var(--radius))] border border-border-subtle bg-background px-3",
          "text-left text-base text-foreground sm:text-sm",
          "transition-[border-color,box-shadow,background-color,color,padding] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)]",
          "hover:border-foreground/20",
          "focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20",
          "data-popup-open:border-ring data-popup-open:bg-muted/40 data-popup-open:ring-2 data-popup-open:ring-ring/20",
          "disabled:cursor-not-allowed disabled:opacity-60",
          "motion-reduce:transition-none",
          className
        )}
      >
        <span
          className={cn(
            "min-w-0 flex-1 truncate transition-[opacity] duration-150",
            !value && "text-muted-foreground"
          )}
        >
          <Select.Value placeholder={placeholder}>
            {(v) => {
              const key = v == null ? "" : String(v)
              return labelByValue[key] ?? placeholder
            }}
          </Select.Value>
        </span>
        <Select.Icon
          data-slot="select-icon"
          className="pointer-events-none shrink-0 text-muted-foreground"
          render={
            <motion.span
              animate={{
                rotate: open ? 180 : 0,
                scale: open && !reduce ? 1.05 : 1,
              }}
              transition={
                reduce ? { duration: 0 } : { duration: 0.2, ease: easeOutExpo }
              }
            />
          }
        >
          <ChevronDown className="size-4" aria-hidden />
        </Select.Icon>
      </Select.Trigger>
      <AnimatePresence>
        {open ? (
          <Select.Portal>
            <Select.Positioner className="z-100" sideOffset={6} align="start">
              <Select.Popup
                className={cn(
                  "max-h-[min(320px,var(--available-height))] min-w-(--anchor-width) origin-(--transform-origin)",
                  "overflow-hidden rounded-[var(--radius)] border border-border-subtle bg-surface py-1 shadow-md outline-none"
                )}
                render={<motion.div {...menuPopupMotion(reduce)} />}
              >
                <LayoutGroup id={highlightId}>
                  <Select.List
                    className="max-h-[min(280px,var(--available-height))] scroll-py-1 overflow-y-auto p-1 outline-none"
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
                  >
                    {options.map((opt) => (
                      <Select.Item
                        key={opt.value === "" ? "__empty__" : opt.value}
                        value={opt.value}
                        className={cn(
                          "relative flex cursor-pointer select-none items-center rounded-[calc(var(--radius)-2px)] px-2.5 py-2",
                          "text-base text-foreground outline-none sm:text-[14.5px]",
                          "data-selected:font-medium",
                          "data-disabled:pointer-events-none data-disabled:opacity-50"
                        )}
                        render={(htmlProps, state) => {
                          const {
                            children: itemChildren,
                            ...itemRest
                          } = htmlProps as typeof htmlProps & {
                            children?: ReactNode
                          }
                          const highlight = state.highlighted ? (
                            reduce ? (
                              <span
                                className="absolute inset-0 z-0 rounded-[calc(var(--radius)-2px)] bg-muted/90"
                                aria-hidden
                              />
                            ) : (
                              <motion.span
                                layoutId={`${highlightId}-hl`}
                                className="absolute inset-0 z-0 rounded-[calc(var(--radius)-2px)] bg-muted/90"
                                transition={layoutTween}
                                aria-hidden
                              />
                            )
                          ) : null
                          if (reduce) {
                            return (
                              <div {...itemRest}>
                                {highlight}
                                <span className="relative z-[1]">
                                  {itemChildren}
                                </span>
                              </div>
                            )
                          }
                          // Base UI htmlProps use DOM Animation/Drag handlers;
                          // Motion overrides those names — cast at the boundary.
                          return (
                            <motion.div
                              {...(itemRest as ComponentProps<
                                typeof motion.div
                              >)}
                              variants={menuItemVariants}
                            >
                              {highlight}
                              <span className="relative z-[1]">
                                {itemChildren}
                              </span>
                            </motion.div>
                          )
                        }}
                      >
                        <Select.ItemText>{opt.label}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.List>
                </LayoutGroup>
              </Select.Popup>
            </Select.Positioner>
          </Select.Portal>
        ) : null}
      </AnimatePresence>
    </Select.Root>
  )
}
