/**
 * React experimental View Transition APIs (enabled via next.config
 * experimental.viewTransition). Stable @types/react may lag — declare here.
 */
import type * as React from "react"

declare module "react" {
  export type ViewTransitionClass =
    | "none"
    | "auto"
    | (string & {})

  export type ViewTransitionClassPerType = {
    default: ViewTransitionClass
    [transitionType: string]: ViewTransitionClass
  }

  export type ViewTransitionProps = {
    children?: React.ReactNode
    name?: string
    default?: ViewTransitionClass
    enter?: ViewTransitionClass | ViewTransitionClassPerType
    exit?: ViewTransitionClass | ViewTransitionClassPerType
    share?: ViewTransitionClass | ViewTransitionClassPerType
  }

  export const unstable_ViewTransition: React.FC<ViewTransitionProps>
  export function unstable_addTransitionType(type: string): void
}

export {}
