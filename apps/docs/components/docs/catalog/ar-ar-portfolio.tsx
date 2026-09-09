import { ComponentDoc } from "@/components/component-doc"
import { DemoArPortfolio } from "@/components/registry-demos"


export function ArArPortfolioDoc() {
  return (
    <ComponentDoc
      registryName="ar-portfolio"
      href="/docs/components/ar-ar-portfolio"
      title="AR Portfolio"
      description="model-viewer showcase with AR modes - demo GLBs until you swap the model list."
      preview={<DemoArPortfolio />}
      code={'import { ArPortfolio } from "@/components/blocks/ar-portfolio"\n\n<ArPortfolio />'}
      fullBleed={true}
      usage="Zero-prop mount. Loads model-viewer from Google’s CDN. Demo models are public Astronaut/NeilArmstrong GLBs - fork MODELS (and optional poster) for real work. “View in AR” needs WebXR, Scene Viewer, or Quick Look on a supported device."
    />
  )
}
