import Link from "next/link"
import { ComponentDoc } from "@/components/component-doc"
import { DemoThemeToggle } from "@/components/registry-demos"


export function UiThemeToggleDoc() {
  return (
    <ComponentDoc
      href="/docs/components/ui-theme-toggle"
      registryName="theme-toggle"
      title="Theme Toggle"
      description="Segmented light / system / dark control for next-themes. Soft-rect chrome, not a pill."
      preview={<DemoThemeToggle />}
      code={'import { ThemeToggle } from "@/components/ui/theme-toggle"\n\n<ThemeToggle />'}
      fullBleed={false}
      usage={
        <>
          Mount{" "}
          <Link href="/docs/components/theme-provider" className="bam-link">
            ThemeProvider
          </Link>{" "}
          at the root first — without it there is no theme to read or set. Keep
          one toggle per page: below the{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            sm
          </code>{" "}
          breakpoint it collapses to a single icon button that cycles light →
          system → dark, and the sliding pill above that shares one layout id,
          so two on screen hand the indicator back and forth. If a naive dark
          mode hides body copy, use{" "}
          <Link href="/docs/components/ui-theme-adapt" className="bam-link">
            Adaptive Theme Switch
          </Link>
          .
        </>
      }
      props={[
        {
          name: "className",
          type: "string",
          default: "-",
          description:
            "Extra classes. Applied to both the mobile button and the desktop pill.",
        },
      ]}
    />
  )
}
