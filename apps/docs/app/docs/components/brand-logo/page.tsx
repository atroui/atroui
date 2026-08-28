import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Logo",
  "/docs/components/brand-logo",
  "Interrupted-A mark + wordmark. Open letterform for Atro; floating brand bar is the recall cue. Defaults to getBrand().name."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="logo"
      href="/docs/components/brand-logo"
      title="Logo"
      description="Interrupted-A mark + wordmark. Open letterform for Atro; floating brand bar is the recall cue. Defaults to getBrand().name."
      usage="Mark uses currentColor for the A; the crossbar uses --color-brand (#0b7bff). Static assets: /brand/atroui-mark.svg and /brand/atroui-mark-app.svg. Pass title or name to override the label."
      props={[
        {
          name: "title",
          type: "string",
          default: "getBrand().name",
          description: "Accessible label for LogoMark.",
        },
        {
          name: "name",
          type: "string",
          default: "getBrand().name",
          description: "Wordmark text for LogoWordmark.",
        },
        {
          name: "className",
          type: "string",
          default: "-",
          description: "Size / color via currentColor.",
        },
      ]}
      code={`import { LogoMark, LogoWordmark } from "@/components/brand/logo"\n\n<LogoMark />\n<LogoWordmark />\n<LogoWordmark name="Acme" />`}
    />
  )
}
