"use client";

import { Select } from "@base-ui/react/select";
import { ChevronDown } from "lucide-react";
import { useMemo } from "react";

import { cn } from "../../lib/utils";

export type FormSelectOption = { value: string; label: string };

type FormSelectProps = {
  id?: string;
  value: string;
  onValueChange: (value: string) => void;
  options: FormSelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

export function FormSelect({
  id,
  value,
  onValueChange,
  options,
  placeholder = "Choose…",
  disabled,
  className,
}: FormSelectProps) {
  const labelByValue = useMemo(
    () => Object.fromEntries(options.map((o) => [o.value, o.label])),
    [options],
  );

  return (
    <Select.Root
      value={value}
      onValueChange={(v) => onValueChange(v ?? "")}
      disabled={disabled}
    >
      <Select.Trigger
        id={id}
        className={cn(
          "flex w-full items-center justify-between gap-2 border border-border-subtle bg-background px-3.5 py-2.5 text-left text-base text-foreground sm:text-sm",
          "transition-[border-color,box-shadow] duration-200",
          "focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20",
          "data-popup-open:border-ring data-popup-open:ring-2 data-popup-open:ring-ring/20",
          "disabled:cursor-not-allowed disabled:opacity-60",
          className,
        )}
      >
        <span className="min-w-0 flex-1 truncate">
          <Select.Value placeholder={placeholder}>
            {(v) => {
              const key = v == null ? "" : String(v);
              return labelByValue[key] ?? placeholder;
            }}
          </Select.Value>
        </span>
        <Select.Icon className="pointer-events-none shrink-0 text-muted-foreground">
          <ChevronDown className="size-4" aria-hidden />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner className="z-100" sideOffset={6} align="start">
          <Select.Popup
            className={cn(
              "max-h-[min(320px,var(--available-height))] min-w-(--anchor-width) overflow-hidden rounded-lg border border-border-subtle bg-surface py-1 shadow-md outline-none",
              "origin-(--transform-origin)",
            )}
          >
            <Select.List className="max-h-[min(280px,var(--available-height))] scroll-py-1 overflow-y-auto p-1 outline-none">
              {options.map((opt) => (
                <Select.Item
                  key={opt.value === "" ? "__empty__" : opt.value}
                  value={opt.value}
                  className={cn(
                    "flex cursor-pointer select-none items-center rounded-lg px-2.5 py-2 text-base text-foreground outline-none sm:text-[14.5px]",
                    "data-highlighted:bg-muted/90 data-highlighted:text-foreground",
                    "data-selected:font-medium",
                    "data-disabled:pointer-events-none data-disabled:opacity-50",
                  )}
                >
                  <Select.ItemText>{opt.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}
