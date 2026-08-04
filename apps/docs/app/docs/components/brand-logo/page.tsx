import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoLogo } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: "Logo",
}

export default function Page() {
  return (
    <ComponentDoc
      title="Logo"
      description="Studio mark and wordmark — defaults to getBrand().name (AtroUI)."
      preview={<DemoLogo />}
      code={'import { LogoMark, LogoWordmark } from "atroui"\n\n<LogoMark />\n<LogoWordmark />\n<LogoWordmark name="Acme" />'}
      fullBleed={false}
      installation='import { LogoMark, LogoWordmark } from "atroui"'
      usage="LogoMark and LogoWordmark resolve their label from getBrand() (NEXT_PUBLIC_SITE_NAME / AtroUI). Pass title or name to override. Mark uses currentColor; accent uses --color-brand."
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
          default: "—",
          description: "Size / color via currentColor.",
        },
      ]}
    />
  )
}
