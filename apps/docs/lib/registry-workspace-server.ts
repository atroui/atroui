import fs from "node:fs"
import path from "node:path"

export type RegistryWorkspaceBlockId =
  | "waitlist"
  | "hero"
  | "pricing"
  | "contact"

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
    id: "waitlist",
    label: "Waitlist",
    registry: "waitlist-form",
    docs: "/docs/components/brand-waitlist-form",
    target: "components/blocks/waitlist-form.tsx",
    // Section-framed form — fit into the stage like Contact.
    preview: { strategy: "fit", designWidth: 420, excerptMaxLines: 3 },
    host: {
      env: "RESEND_API_KEY",
      route: "POST /api/waitlist",
      note: "Handler copies into app/api/waitlist — wire Resend once.",
    },
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
  {
    id: "contact",
    label: "Contact",
    registry: "contact-form",
    docs: "/docs/components/contact-contact-form",
    target: "components/blocks/contact-form.tsx",
    // Tall multi-step — scale to fit so Name/Email/Continue stay on stage.
    preview: { strategy: "fit", designWidth: 560, excerptMaxLines: 3 },
    host: {
      env: "SMTP_URL",
      route: "POST /api/contact",
      note: "Multi-step form posts to your contact Host API route.",
    },
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
