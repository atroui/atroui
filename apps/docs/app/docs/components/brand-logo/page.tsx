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
      description="Studio mark and wordmark — currently branded for Makershot."
      preview={<DemoLogo />}
      code={'import { LogoMark, LogoWordmark } from "@meridian/ui"\n\n<LogoMark />\n<LogoWordmark />'}
      fullBleed={false}
      installation='import { LogoMark, LogoWordmark } from "@meridian/ui"'
      usage="LogoMark accepts an accessible title (default “Makershot”) and follows currentColor. LogoWordmark hardcodes the Makershot name — rebrand by forking the wordmark or replacing the span."
      props={[
        {
          name: "title",
          type: "string",
          default: "'Makershot'",
          description: "Accessible label for LogoMark.",
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
