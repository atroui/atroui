"use client";

import { motion, useReducedMotion } from "motion/react";
import type { HTMLMotionProps } from "motion/react";

type FadeInProps = HTMLMotionProps<"div"> & {
  y?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  /**
   * Docs / Storybook: animate on mount instead of scroll-reveal so the
   * content is never stuck at opacity 0 inside a preview canvas.
   */
  preview?: boolean;
};

/** Scroll reveal — opacity + small translate, critically damped, <300ms feel. */
export function FadeIn({
  y = 14,
  delay = 0,
  duration = 0.28,
  once = true,
  preview = false,
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

  if (preview) {
    return (
      <motion.div
        initial={{ opacity: 0, y }}
        animate={{ opacity: 1, y: 0 }}
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

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "0px", amount: 0.15 }}
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
