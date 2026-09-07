import { RegistryWorkspace } from "@/components/landing/registry-workspace"
import { getRegistryWorkspaceBlocks } from "@/lib/registry-workspace-server"
import { HomeHero } from "../../registry/default/blocks/home-hero"
import { PricingOverview } from "../../registry/default/blocks/pricing-overview"

/**
 * Live registry previews — same components as `npx shadcn add @atroui/…`.
 * Server sections (hero/pricing) pass as RSC slots; waitlist/contact are
 * owned inside the client workspace so tab switches always show real forms.
 */
export function RegistryWorkspaceDemo({ className }: { className?: string }) {
  const blocks = getRegistryWorkspaceBlocks()

  return (
    <RegistryWorkspace
      blocks={blocks}
      className={className}
      hero={<HomeHero />}
      pricing={<PricingOverview />}
    />
  )
}
