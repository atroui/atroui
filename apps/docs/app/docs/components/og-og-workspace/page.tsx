import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Next.js OG Image Workspace (Satori + BYOK)",
  "/docs/components/og-og-workspace",
  "An interactive, client-side Open Graph social card workspace UI for Next.js powered by Satori, tailwindcss, and AI prompt overrides."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="og-workspace"
      href="/docs/components/og-og-workspace"
      title="Next.js OG Image Workspace (Satori + BYOK)"
      description="An interactive, client-side Open Graph social card workspace UI for Next.js powered by Satori, tailwindcss, and AI prompt overrides."
      fullBleed
      code={`import { OgWorkspace } from "@/components/blocks/og-workspace"\n\n<OgWorkspace />`}
    />
  )
}
