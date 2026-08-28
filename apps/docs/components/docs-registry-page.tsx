import { RegistryComponentDoc } from "@/components/registry-component-doc"

export async function DocsRegistryPageView({
  registry,
  href,
  usage,
}: {
  registry: string
  href: string
  usage?: string
}) {
  return (
    <RegistryComponentDoc
      registryName={registry}
      href={href}
      usage={usage}
    />
  )
}
