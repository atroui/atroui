import { cn } from "@/lib/utils";

export type MockupVariant = "saas" | "ai" | "design" | "marketplace";
export type MockupState = "wireframe" | "shipped";

type UiMockupFrameProps = {
  variant?: MockupVariant;
  state?: MockupState;
  className?: string;
  /** Accessible label for the decorative preview */
  label?: string;
};

/**
 * Realistic browser-frame UI placeholder for case studies.
 * Wireframe = grey blocks; shipped = branded polish with amber accents.
 */
export function UiMockupFrame({
  variant = "saas",
  state = "shipped",
  className,
  label = "Product UI preview mockup",
}: UiMockupFrameProps) {
  const wireframe = state === "wireframe";

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-lg border border-border-subtle bg-background shadow-sm",
        className
      )}
      role="img"
      aria-label={label}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-border-subtle bg-muted/50 px-3 py-2">
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2 rounded-full bg-red-400/80" />
          <span className="size-2 rounded-full bg-amber-400/80" />
          <span className="size-2 rounded-full bg-emerald-400/80" />
        </div>
        <div className="mx-auto h-4 max-w-[55%] flex-1 rounded-md bg-muted" aria-hidden />
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Sidebar */}
        <div
          className={cn(
            "hidden w-[22%] shrink-0 border-r border-border-subtle p-2 sm:block",
            wireframe ? "bg-muted/40" : "bg-surface"
          )}
          aria-hidden
        >
          <div className={cn("mb-2 h-2 w-3/4 rounded", wireframe ? "bg-muted-foreground/20" : "bg-brand/30")} />
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={cn(
                "mb-1.5 h-2 rounded",
                wireframe ? "bg-muted-foreground/15" : i === 1 ? "bg-brand/20" : "bg-muted"
              )}
            />
          ))}
        </div>

        {/* Main content */}
        <div className="flex min-w-0 flex-1 flex-col p-3">
          {variant === "ai" ? (
            <AiMockup wireframe={wireframe} />
          ) : variant === "design" ? (
            <DesignMockup wireframe={wireframe} />
          ) : variant === "marketplace" ? (
            <MarketplaceMockup wireframe={wireframe} />
          ) : (
            <SaasMockup wireframe={wireframe} />
          )}
        </div>
      </div>
    </div>
  );
}

function SaasMockup({ wireframe }: { wireframe: boolean }) {
  return (
    <>
      <div className={cn("mb-3 h-3 w-1/2 rounded", wireframe ? "bg-muted-foreground/20" : "bg-foreground/80")} />
      <div className="grid flex-1 grid-cols-3 gap-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              "rounded-md border border-border-subtle p-2",
              wireframe ? "bg-muted/50" : "bg-surface"
            )}
          >
            <div className={cn("h-2 w-2/3 rounded", wireframe ? "bg-muted-foreground/20" : "bg-brand/40")} />
            <div className={cn("mt-2 h-8 rounded", wireframe ? "bg-muted-foreground/10" : "bg-muted")} />
          </div>
        ))}
      </div>
    </>
  );
}

function AiMockup({ wireframe }: { wireframe: boolean }) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <div className={cn("h-16 rounded-lg border border-dashed p-2", wireframe ? "border-muted-foreground/20 bg-muted/30" : "border-brand/30 bg-brand/5")}>
        <div className={cn("h-2 w-1/3 rounded", wireframe ? "bg-muted-foreground/20" : "bg-brand/50")} />
        <div className={cn("mt-2 h-2 w-full rounded", wireframe ? "bg-muted-foreground/10" : "bg-muted")} />
      </div>
      <div className={cn("mt-auto flex gap-2 rounded-lg p-2", wireframe ? "bg-muted/40" : "bg-surface border border-border-subtle")}>
        <div className={cn("size-6 shrink-0 rounded-full", wireframe ? "bg-muted-foreground/20" : "bg-brand/30")} />
        <div className="flex-1 space-y-1">
          <div className={cn("h-2 w-full rounded", wireframe ? "bg-muted-foreground/15" : "bg-muted")} />
          <div className={cn("h-2 w-4/5 rounded", wireframe ? "bg-muted-foreground/10" : "bg-muted")} />
        </div>
      </div>
    </div>
  );
}

function DesignMockup({ wireframe }: { wireframe: boolean }) {
  return (
    <div className="grid flex-1 grid-cols-2 gap-2">
      {["#f59e0b", "#1e293b", "#10b981", "#6366f1"].map((color, i) => (
        <div
          key={i}
          className={cn("rounded-md border border-border-subtle p-2", wireframe ? "bg-muted/40" : "bg-surface")}
        >
          <div
            className={cn(
              "h-6 w-6 rounded-full border border-border-subtle",
              wireframe ? "bg-muted-foreground/20" : ""
            )}
            style={wireframe ? undefined : { background: color }}
          />
          <div className={cn("mt-2 h-2 w-2/3 rounded", wireframe ? "bg-muted-foreground/15" : "bg-muted")} />
        </div>
      ))}
    </div>
  );
}

function MarketplaceMockup({ wireframe }: { wireframe: boolean }) {
  return (
    <div className="grid flex-1 grid-cols-2 gap-2">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className={cn("overflow-hidden rounded-md border border-border-subtle", wireframe ? "bg-muted/40" : "bg-surface")}>
          <div className={cn("aspect-[4/3]", wireframe ? "bg-muted-foreground/10" : "bg-gradient-to-br from-brand/20 to-muted")} />
          <div className="p-1.5">
            <div className={cn("h-2 w-3/4 rounded", wireframe ? "bg-muted-foreground/20" : "bg-foreground/70")} />
          </div>
        </div>
      ))}
    </div>
  );
}
