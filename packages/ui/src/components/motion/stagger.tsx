"use client";

import { motion, useReducedMotion } from "motion/react";
import type { HTMLMotionProps } from "motion/react";

type StaggerProps = HTMLMotionProps<"div"> & {
  delay?: number;
  stagger?: number;
  once?: boolean;
};

export function Stagger({
  delay = 0,
  stagger = 0.08,
  once = true,
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

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "0px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            delayChildren: delay,
            staggerChildren: stagger,
          },
        },
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
