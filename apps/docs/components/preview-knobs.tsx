"use client"

export type BooleanKnob = {
  name: string
  value: boolean
  onChange: (v: boolean) => void
}

export type EnumKnob = {
  name: string
  value: string
  options: string[]
  onChange: (v: string) => void
}

export function PreviewKnobs({
  booleans = [],
  enums = [],
}: {
  booleans?: BooleanKnob[]
  enums?: EnumKnob[]
}) {
  if (booleans.length === 0 && enums.length === 0) return null
  return (
    <div
      className="flex flex-wrap items-center gap-x-4 gap-y-2"
      aria-label="Preview options"
    >
      {booleans.map((knob) => (
        <button
          key={knob.name}
          type="button"
          aria-pressed={knob.value}
          aria-label={knob.name}
          onClick={() => knob.onChange(!knob.value)}
          className="inline-flex items-center gap-1.5 outline-none focus-visible:ring-2 focus-visible:ring-ring/20"
        >
          <span
            aria-hidden
            className={
              knob.value
                ? "inline-flex h-4 w-7 shrink-0 items-center justify-end rounded-full bg-primary px-0.5 transition-colors"
                : "inline-flex h-4 w-7 shrink-0 items-center justify-start rounded-full border border-border-subtle bg-muted px-0.5 transition-colors"
            }
          >
            <span className="size-3 rounded-full bg-background shadow-sm ring-1 ring-black/5 dark:ring-white/10" />
          </span>
          <span className="font-mono text-[12px] text-muted-foreground">
            {knob.name}
          </span>
        </button>
      ))}
      {enums.map((knob) => (
        <span key={knob.name} className="inline-flex items-center gap-1.5">
          <span className="font-mono text-[12px] text-muted-foreground">
            {knob.name}
          </span>
          <span
            role="group"
            aria-label={knob.name}
            className="inline-flex rounded-md border border-border-subtle bg-muted/40 p-0.5"
          >
            {knob.options.map((option) => {
              const active = option === knob.value
              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={active}
                  onClick={() => knob.onChange(option)}
                  className={
                    active
                      ? "rounded bg-card px-1.5 py-0.5 font-mono text-[12px] text-foreground shadow-sm"
                      : "rounded px-1.5 py-0.5 font-mono text-[12px] text-muted-foreground hover:text-foreground"
                  }
                >
                  {option}
                </button>
              )
            })}
          </span>
        </span>
      ))}
    </div>
  )
}
