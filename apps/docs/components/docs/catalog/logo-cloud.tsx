import { ComponentDoc } from "@/components/component-doc"
import { DemoLogoCloud } from "@/components/registry-demos"


export function LogoCloudDoc() {
  return (
    <ComponentDoc
      href="/docs/components/logo-cloud"
      registryName="logo-cloud"
      title="Logo Cloud"
      description="Partner / client name strip. Replace placeholder names when you have real marks."
      preview={<DemoLogoCloud />}
      code={'import { LogoCloud } from "@/components/blocks/logo-cloud"\n\n<LogoCloud />'}
      fullBleed={true}
      usage="Social-proof strip for landings that have real clients or partners. Not mounted on atroui.com until you have logos worth showing."
    />
  )
}
