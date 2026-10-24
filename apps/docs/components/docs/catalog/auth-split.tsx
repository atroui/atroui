import { ComponentDoc } from "@/components/component-doc"
import { DemoAuthSplit } from "@/components/registry-demos"

export function AuthSplitDoc() {
  return (
    <ComponentDoc
      href="/docs/components/auth-split"
      registryName="auth-split"
      title="Auth Split"
      description="Split sign-in layout with DashboardShell preview. Install as @atroui/auth-split."
      preview={<DemoAuthSplit />}
      code={`import { AuthSplit } from "@/components/blocks/auth-split"

export function Example() {
  return <AuthSplit />
}

// DashboardShell is a second export from the same file:
import { DashboardShell } from "@/components/blocks/auth-split"

export function PreviewExample() {
  return <DashboardShell />
}`}
      fullBleed={true}
      usage="Auth page layout — sign-in left, product preview right. DashboardShell ships in the same file; swap it for your real dashboard."
    />
  )
}
