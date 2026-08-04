"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { cn } from "../../lib/utils";

const OPTIONS = [
  { id: "light", label: "Light", Icon: Sun },
  { id: "system", label: "System", Icon: Monitor },
  { id: "dark", label: "Dark", Icon: Moon },
] as const;

type ThemeId = (typeof OPTIONS)[number]["id"];

/**
 * Theme toggle — pill chrome (cycle on mobile, segmented sm+).
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const current = (mounted
    ? (theme ?? resolvedTheme ?? "system")
    : "system") as ThemeId;
  const currentOption =
    OPTIONS.find((o) => o.id === current) ?? OPTIONS[1]!;

  const cycle = () => {
    const idx = OPTIONS.findIndex((o) => o.id === current);
    const next = OPTIONS[(idx + 1) % OPTIONS.length]!;
    setTheme(next.id);
  };

  return (
    <>
      <button
        type="button"
        aria-label={`Theme: ${currentOption.label}. Tap to change.`}
        title={`Theme: ${currentOption.label}`}
        onClick={cycle}
        className={cn(
          "motion-safe-transition inline-flex size-9 items-center justify-center rounded-full border border-border-subtle bg-white/5 text-foreground sm:hidden active:scale-[0.97]",
          className,
        )}
      >
        <currentOption.Icon className="size-4" strokeWidth={2} />
      </button>

      <div
        role="radiogroup"
        aria-label="Theme"
        className={cn(
          "touch-manipulation hidden items-stretch overflow-hidden rounded-full border border-border-subtle bg-white/5 sm:inline-flex",
          className,
        )}
      >
        {OPTIONS.map(({ id, label, Icon }) => {
          const isActive = current === id;
          const title =
            id === "system" && mounted && theme === "system" && resolvedTheme
              ? `System (${resolvedTheme})`
              : label;
          return (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={isActive}
              aria-label={title}
              title={title}
              onClick={() => setTheme(id)}
              className={cn(
                "motion-safe-transition inline-flex min-h-9 min-w-9 items-center justify-center text-muted-foreground",
                isActive && "bg-primary text-primary-foreground",
                !isActive && "hover:bg-white/10 hover:text-foreground",
              )}
            >
              <Icon className="size-3.5" strokeWidth={2} />
            </button>
          );
        })}
      </div>
    </>
  );
}
