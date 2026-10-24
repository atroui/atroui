"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { motion, useReducedMotion } from "motion/react"

import { easeOutExpo } from "@/lib/motion"
import { cn } from "@/lib/utils"

/** Check path draw + soft scale — ~160ms easeOutExpo, no spring. */
const checkTween = {
  duration: 0.16,
  ease: easeOutExpo,
} as const

const CHECK_PATH = "M4.5 8.2 7.1 10.8 11.6 5.2"

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

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  const reduce = useReducedMotion()

  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      {...props}
      className={cn(
        "peer group/checkbox relative inline-flex size-4 shrink-0 items-center justify-center rounded-[calc(var(--atro-control-radius,var(--radius))-2px)] border border-border-subtle bg-background text-primary-foreground outline-none transition-[background-color,border-color,box-shadow] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
        "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20",
        "data-checked:border-primary data-checked:bg-primary",
        "data-indeterminate:border-primary data-indeterminate:bg-primary",
        "data-disabled:cursor-not-allowed data-disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",
        "motion-reduce:transition-none",
        className
      )}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        keepMounted
        className="flex size-full items-center justify-center text-current"
        render={
          reduce
            ? (htmlProps, state) => {
                const show = state.checked || state.indeterminate
                return (
                  <span
                    {...htmlProps}
                    className={cn(htmlProps.className, !show && "opacity-0")}
                  >
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      className="size-3.5"
                      aria-hidden
                    >
                      {state.indeterminate ? (
                        <path
                          d="M4 8h8"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                        />
                      ) : (
                        <path
                          d={CHECK_PATH}
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      )}
                    </svg>
                  </span>
                )
              }
            : (htmlProps, state) => {
                const show = state.checked || state.indeterminate
                return (
                  <motion.span
                    {...withoutDomAnimationHandlers(
                      htmlProps as Record<string, unknown>
                    )}
                    initial={false}
                    animate={{
                      opacity: show ? 1 : 0,
                      scale: show ? 1 : 0.82,
                    }}
                    transition={checkTween}
                  >
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      className="size-3.5"
                      aria-hidden
                    >
                      {state.indeterminate ? (
                        <motion.path
                          d="M4 8h8"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          initial={false}
                          animate={{ pathLength: show ? 1 : 0 }}
                          transition={checkTween}
                        />
                      ) : (
                        <motion.path
                          d={CHECK_PATH}
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={false}
                          animate={{ pathLength: state.checked ? 1 : 0 }}
                          transition={checkTween}
                        />
                      )}
                    </svg>
                  </motion.span>
                )
              }
        }
      />
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
