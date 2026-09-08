import Link from "next/link"
import { ComponentDoc } from "@/components/component-doc"
import { DemoThemeToggleIcon } from "@/components/registry-demos"


export function ThemeToggleIconDoc() {
  return (
    <ComponentDoc
      href="/docs/components/theme-toggle-icon"
      registryName="theme-toggle-icon"
      title="Theme Toggle Icon"
      description="Compact sun/moon theme toggle for narrow chrome."
      preview={<DemoThemeToggleIcon />}
      code={'import { ThemeToggleIcon } from "@/components/blocks/theme-toggle-icon"\n\n<ThemeToggleIcon />'}
      fullBleed={false}
      usage={
        <>
          Mount{" "}
          <Link href="/docs/components/theme-provider" className="bam-link">
            ThemeProvider
          </Link>{" "}
          at the root first. This one flips straight between light and dark —
          there is no system option, so pick it for narrow chrome where a third
          segment would not fit. For the segmented light / system / dark pill,
          use{" "}
          <Link href="/docs/components/ui-theme-toggle" className="bam-link">
            Theme Toggle
          </Link>
          .
        </>
      }
    />
  )
}
