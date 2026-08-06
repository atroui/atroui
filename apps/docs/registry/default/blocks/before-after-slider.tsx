"use client";

import { useCallback, useRef, useState } from "react";

import { UiMockupFrame, type MockupVariant } from "@/components/ui/mockup-frame";
import { cn } from "@/lib/utils";

type BeforeAfterSliderProps = {
  variant?: MockupVariant;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
};

export function BeforeAfterSlider({
  variant = "saas",
  beforeLabel = "Before",
  afterLabel = "After",
  className,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setPosition(pct);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    updatePosition(e.clientX);
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 5));
    if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 5));
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative aspect-[16/9] overflow-hidden rounded-2xl border border-border-subtle bg-muted p-3 sm:p-4 select-none touch-none",
        className
      )}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      <div className="absolute inset-3 sm:inset-4" aria-hidden>
        <UiMockupFrame variant={variant} state="shipped" label={`${afterLabel} UI state`} className="h-full" />
      </div>

      <div
        className="absolute inset-3 sm:inset-4 overflow-hidden rounded-lg"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        aria-hidden
      >
        <UiMockupFrame variant={variant} state="wireframe" label={`${beforeLabel} UI state`} className="h-full" />
      </div>

      <div
        className="absolute top-3 bottom-3 z-10 w-1 cursor-ew-resize bg-white shadow-lg sm:top-4 sm:bottom-4"
        style={{ left: `calc(${position}% * 0.92 + 4%)`, transform: "translateX(-50%)" }}
        onPointerDown={onPointerDown}
        onKeyDown={onKeyDown}
        role="slider"
        tabIndex={0}
        aria-valuenow={Math.round(position)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Compare ${beforeLabel} and ${afterLabel}. Use arrow keys or drag.`}
      >
        <div className="absolute top-1/2 left-1/2 flex size-9 items-center justify-center border-2 border-white bg-brand shadow-md">
          <span className="text-[10px] font-bold text-white" aria-hidden>
            ||
          </span>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-6 border border-border-subtle bg-background/90 px-2.5 py-1 text-[10px] font-medium backdrop-blur-sm">
        {beforeLabel}
      </div>
      <div className="pointer-events-none absolute right-6 bottom-6 border border-border-subtle bg-background/90 px-2.5 py-1 text-[10px] font-medium backdrop-blur-sm">
        {afterLabel}
      </div>
    </div>
  );
}
