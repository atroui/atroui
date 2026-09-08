import { RegistryWorkspace } from "@/components/landing/registry-workspace"
import { getRegistryWorkspaceBlocks } from "@/lib/registry-workspace-server"
import { HomeHero } from "../../registry/default/blocks/home-hero"
import { HomePrinciple } from "../../registry/default/blocks/home-principle"
import { PricingOverview } from "../../registry/default/blocks/pricing-overview"

/**
 * Live registry previews — same components as `npx shadcn add @atroui/…`.
 * Principle / hero / pricing pass as slots so tab switches stay keep-alive.
 */
export function RegistryWorkspaceDemo({ className }: { className?: string }) {
  const blocks = getRegistryWorkspaceBlocks()

  return (
    <RegistryWorkspace
      blocks={blocks}
      className={className}
      principle={<HomePrinciple />}
      hero={<HomeHero />}
      pricing={<PricingOverview />}
    />
  )
}
