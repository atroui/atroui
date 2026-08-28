import { ComponentDoc } from "@/components/component-doc"
import { RegistryPreview } from "@/components/registry-demo-map"
import type { PropRow } from "@/components/props-table"
import type { DocKind } from "@/lib/navigation"
import { resolveRegistryDoc } from "@/lib/registry-item"

type RegistryComponentDocProps = {
  registryName: string
  href: string
  /** Override registry title when the docs title differs. */
  title?: string
  description?: string
  code?: string
  /** Prefer full registry source in the Code tab. */
  showSource?: boolean
  props?: PropRow[]
  usage?: React.ReactNode
  extra?: React.ReactNode
  fullBleed?: boolean
  kind?: DocKind
  installation?: string
}

/**
 * shadcn-style docs entry: registry name drives install, preview demo, and
 * default code. Pages pass overrides only when the catalog needs them.
 */
export async function RegistryComponentDoc({
  registryName,
  href,
  title,
  description,
  code,
  showSource = false,
  props,
  usage,
  extra,
  fullBleed,
  kind,
  installation,
}: RegistryComponentDocProps) {
  const resolved = await resolveRegistryDoc(registryName)
  const codeTab =
    code ??
    (showSource && resolved.source ? resolved.source : resolved.code)

  return (
    <ComponentDoc
      href={href}
      registryName={registryName}
      title={title ?? resolved.title}
      description={description ?? resolved.description ?? ""}
      preview={<RegistryPreview name={registryName} />}
      code={codeTab}
      props={props}
      usage={usage}
      extra={extra}
      fullBleed={fullBleed}
      kind={kind}
      installation={installation ?? resolved.installCommand}
    />
  )
}
