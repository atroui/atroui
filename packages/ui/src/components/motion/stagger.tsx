"use client";

import { motion, useReducedMotion } from "motion/react";
import type { HTMLMotionProps } from "motion/react";

type StaggerProps = HTMLMotionProps<"div"> & {
  delay?: number;
  stagger?: number;
  once?: boolean;
  /** Docs / Storybook: play on mount instead of waiting for scroll. */
  preview?: boolean;
};

export function Stagger({
  delay = 0,
  stagger = 0.08,
  once = true,
  preview = false,
  children,
  ...props
}: StaggerProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div {...(props as React.HTMLAttributes<HTMLDivElement>)}>
        {children as React.ReactNode}
      </div>
    );
  }

  const transition = {
    delayChildren: delay,
    staggerChildren: stagger,
  };

  return (
    <motion.div
      initial="hidden"
      {...(preview
        ? { animate: "show" as const }
        : { whileInView: "show" as const, viewport: { once, margin: "0px", amount: 0.15 } })}
      variants={{
        hidden: {},
        show: { transition },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type ChildProps = HTMLMotionProps<"div"> & { y?: number };

export function StaggerChild({ y = 14, children, ...props }: ChildProps) {
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
      variants={{
        hidden: { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.26, ease: [0.23, 1, 0.32, 1] },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
