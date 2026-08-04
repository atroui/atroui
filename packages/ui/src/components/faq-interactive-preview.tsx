"use client";

import { useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";

import { TimelineAnimation } from "./ui/timeline-animation";
import { SERVICES_FAQ, type FaqItem } from "../content/faq";
import { cn } from "../lib/utils";

const FAQ_DATA = SERVICES_FAQ;

/**
 * Interactive FAQ — accordion on mobile, side preview on lg+.
 */
export function FaqInteractivePreview() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState<FaqItem>(FAQ_DATA[0]!);

  return (
    <section ref={timelineRef} className="border-t border-border-subtle">
      <div className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle">
          <div className="ms-shell-pad py-12 text-center sm:py-16">
            <TimelineAnimation
              once
              timelineRef={timelineRef}
              animationNum={0}
              as="p"
              className="ms-stamp mb-4"
            >
              FAQ
            </TimelineAnimation>
            <TimelineAnimation
              once
              timelineRef={timelineRef}
              animationNum={1}
              as="h2"
              className="ds-display text-3xl text-foreground sm:text-5xl"
            >
              Questions we get{" "}
              <span className="ds-display-italic text-brand">a lot</span>.
            </TimelineAnimation>
          </div>

          {/* Mobile / tablet accordion */}
          <div className="divide-y divide-border-subtle border-t border-border-subtle lg:hidden">
            {FAQ_DATA.map((item, i) => {
              const open = activeItem.id === item.id;
              return (
                <TimelineAnimation
                  key={item.id}
                  once
                  animationNum={2 + i}
                  timelineRef={timelineRef}
                >
                  <div className="ms-shell-pad">
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setActiveItem(item)}
                      className="flex min-h-14 w-full items-start justify-between gap-4 py-4 text-left active:scale-[0.99]"
                    >
                      <span className="ds-headline text-base text-foreground">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={cn(
                          "mt-1 size-4 shrink-0 text-muted-foreground transition-transform",
                          open && "rotate-180 text-brand",
                        )}
                        aria-hidden
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {open ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pb-5">
                            <p className="ms-stamp mb-2">{item.category}</p>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                              {item.answer}
                            </p>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </TimelineAnimation>
              );
            })}
            <div className="ms-shell-pad py-5">
              <Link href="/contact" className="ms-cta-ghost">
                Still unsure? Talk to us
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </div>
          </div>

          {/* Desktop side preview */}
          <div className="relative z-10 hidden border-t border-border-subtle lg:grid lg:grid-cols-12">
            <div className="divide-y divide-border-subtle border-r border-border-subtle lg:col-span-6">
              {FAQ_DATA.map((item, i) => (
                <TimelineAnimation
                  key={item.id}
                  once
                  animationNum={2 + i}
                  timelineRef={timelineRef}
                >
                  <button
                    type="button"
                    onMouseEnter={() => setActiveItem(item)}
                    onFocus={() => setActiveItem(item)}
                    onClick={() => setActiveItem(item)}
                    className={cn(
                      "group flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left transition-colors sm:px-8",
                      "active:scale-[0.99]",
                      activeItem.id === item.id
                        ? "bg-muted/40 text-foreground"
                        : "text-muted-foreground hover:bg-muted/30 hover:text-foreground",
                    )}
                  >
                    <span className="ds-headline text-base sm:text-lg">
                      {item.question}
                    </span>
                    <ArrowRight
                      className={cn(
                        "size-4 shrink-0 transition-transform",
                        activeItem.id === item.id
                          ? "translate-x-0 text-brand"
                          : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                      )}
                      aria-hidden
                    />
                  </button>
                </TimelineAnimation>
              ))}
            </div>

            <div className="relative flex min-h-80 flex-col justify-center bg-muted/20 p-8 lg:col-span-6 lg:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <span className="ms-stamp">{activeItem.category}</span>
                  <h3 className="ds-headline text-2xl leading-tight text-foreground sm:text-3xl">
                    {activeItem.question}
                  </h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {activeItem.answer}
                  </p>
                  <Link href="/contact" className="ms-cta-ghost mt-2 inline-flex">
                    Still unsure? Talk to us
                    <ArrowRight className="size-3.5" aria-hidden />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
