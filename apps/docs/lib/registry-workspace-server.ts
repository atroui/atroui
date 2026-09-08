import fs from "node:fs"
import path from "node:path"

export type RegistryWorkspaceBlockId = "principle" | "hero" | "pricing"

export type PreviewStrategy = "contain" | "fold" | "fit"

export type RegistryWorkspaceBlock = {
  id: RegistryWorkspaceBlockId
  label: string
  registry: string
  docs: string
  target: string
  source: string
  preview: {
    strategy: PreviewStrategy
    designWidth: number
    excerptMaxLines: number
  }
  host?: {
    env: string
    route: string
    note: string
  }
}

const BLOCKS: Omit<RegistryWorkspaceBlock, "source">[] = [
  {
    id: "principle",
    label: "Principle",
    registry: "home-principle",
    docs: "/docs/components/home-principle",
    target: "components/blocks/home-principle.tsx",
    preview: { strategy: "fold", designWidth: 900, excerptMaxLines: 3 },
  },
  {
    id: "hero",
    label: "Home hero",
    registry: "home-hero",
    docs: "/docs/components/home-hero",
    target: "components/blocks/home-hero.tsx",
    preview: { strategy: "fold", designWidth: 900, excerptMaxLines: 3 },
  },
  {
    id: "pricing",
    label: "Pricing",
    registry: "pricing-overview",
    docs: "/docs/components/pricing-overview",
    target: "components/blocks/pricing-overview.tsx",
    preview: { strategy: "fold", designWidth: 900, excerptMaxLines: 3 },
  },
]

const REGISTRY_BLOCKS_DIR = path.join(
  process.cwd(),
  "registry/default/blocks"
)

function readRegistrySource(registryName: string): string {
  const filePath = path.join(REGISTRY_BLOCKS_DIR, `${registryName}.tsx`)
  return fs.readFileSync(filePath, "utf8")
}

export function getRegistryWorkspaceBlocks(): RegistryWorkspaceBlock[] {
  return BLOCKS.map((block) => ({
    ...block,
    source: readRegistrySource(block.registry),
  }))
}
