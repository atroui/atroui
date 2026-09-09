"use client"

import { Form as FormPrimitive } from "@base-ui/react/form"

import { cn } from "../../lib/utils"

/**
 * Form — Base UI validation orchestration.
 * Pair with Field for label / error reveal; chrome stays quiet.
 */
function Form<FormValues extends Record<string, any> = Record<string, any>>({
  className,
  ...props
}: FormPrimitive.Props<FormValues>) {
  return (
    <FormPrimitive
      data-slot="form"
      className={cn("flex w-full flex-col gap-4", className)}
      {...props}
    />
  )
}

export { Form }
