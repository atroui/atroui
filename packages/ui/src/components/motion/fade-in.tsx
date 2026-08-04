"use client";

import { motion, useReducedMotion } from "motion/react";
import type { HTMLMotionProps } from "motion/react";

type FadeInProps = HTMLMotionProps<"div"> & {
  y?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
};

/** Scroll reveal — opacity + small translate, critically damped, <300ms feel. */
export function FadeIn({
  y = 14,
  delay = 0,
  duration = 0.28,
  once = true,
  children,
  ...props
}: FadeInProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div {...(props as React.HTMLAttributes<HTMLDivElement>)}>
        {children as React.ReactNode}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-40px" }}
      transition={{
        type: "spring",
        bounce: 0,
        duration,
        delay,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
