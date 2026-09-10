import { ComponentDoc } from "@/components/component-doc"
import { DemoLogoMarquee } from "@/components/registry-demos"

export function LogoMarqueeDoc() {
  return (
    <ComponentDoc
      href="/docs/components/logo-marquee"
      registryName="logo-marquee"
      title="Logo Marquee"
      description="Pure CSS customer logo marquee. Install as @atroui/logo-marquee."
      preview={<DemoLogoMarquee />}
      code={`import { LogoMarquee } from "@/components/blocks/logo-marquee"

export function Example() {
  return <LogoMarquee />
}`}
      fullBleed={false}
      usage="Place below a hero as a social-proof strip. After install, edit CONTENT and LOGOS at the top of the file — swap in real customer marks."
    />
  )
}
