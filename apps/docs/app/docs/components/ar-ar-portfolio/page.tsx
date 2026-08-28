import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "AR Portfolio",
  "/docs/components/ar-ar-portfolio",
  "model-viewer showcase with AR modes - demo GLBs until you swap the model list."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="ar-portfolio"
      href="/docs/components/ar-ar-portfolio"
      title="AR Portfolio"
      description="model-viewer showcase with AR modes - demo GLBs until you swap the model list."
      fullBleed
      usage="Zero-prop mount. Loads model-viewer from Google’s CDN. Demo models are public Astronaut/NeilArmstrong GLBs - fork MODELS (and optional poster) for real work. “View in AR” needs WebXR, Scene Viewer, or Quick Look on a supported device."
      code={`import { ArPortfolio } from "@/components/blocks/ar-portfolio"\n\n<ArPortfolio />`}
    />
  )
}
