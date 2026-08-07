"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type RevealProps = {
  as?: React.ElementType
  delay?: number
  once?: boolean
  id?: string
  className?: string
  children: React.ReactNode
}

/**
 * IntersectionObserver reveal. Pair with `.atro-reveal` / `.atro-reveal-in` CSS.
 */
export function Reveal({
  as,
  delay = 0,
  once = true,
  id,
  className,
  children,
}: RevealProps) {
  const Tag = (as ?? "div") as React.ElementType
  const ref = React.useRef<HTMLElement | null>(null)
  const [inView, setInView] = React.useState(false)

  React.useEffect(() => {
    const node = ref.current
    if (!node) return
    if (typeof IntersectionObserver === "undefined") {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true)
          if (once) io.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    )
    io.observe(node)
    return () => io.disconnect()
  }, [once])

  return (
    <Tag
      id={id}
      ref={ref as React.Ref<HTMLElement>}
      className={cn("atro-reveal", inView && "atro-reveal-in", className)}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
