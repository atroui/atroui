import { ComponentDoc } from "@/components/component-doc"
import { DemoSaasStarter } from "@/components/registry-demos"

export function SaasStarterDoc() {
  return (
    <ComponentDoc
      href="/docs/components/saas-starter"
      registryName="saas-starter"
      title="SaaS Starter"
      description="One-file SaaS landing with hero, logos, features, and pricing. Install as @atroui/saas-starter."
      preview={<DemoSaasStarter />}
      code={`import { SaasStarter } from "@/components/blocks/saas-starter"

export function Example() {
  return <SaasStarter />
}`}
      fullBleed={true}
      usage="Full landing in one file — hero, logos, features, stats, pricing teaser, CTA. Edit CONTENT and deploy."
    />
  )
}
