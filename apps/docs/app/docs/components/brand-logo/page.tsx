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
      description="Interrupted-A mark + wordmark. Open letterform for Atro; floating brand bar is the recall cue. Defaults to getBrand().name."
      preview={<DemoLogo />}
      code={'import { LogoMark, LogoWordmark } from "atroui"\n\n<LogoMark />\n<LogoWordmark />\n<LogoWordmark name="Acme" />'}
      fullBleed={false}
      installation='import { LogoMark, LogoWordmark } from "atroui"'
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
          default: "—",
          description: "Size / color via currentColor.",
        },
      ]}
    />
  )
}
