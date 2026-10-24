import Link from "next/link"
import { ComponentDoc } from "@/components/component-doc"
import { DemoCopyButton } from "@/components/registry-demos"

export function MotionCopyButtonDoc() {
  return (
    <ComponentDoc
      registryName="copy-button"
      href="/docs/components/motion-copy-button"
      title="Copy Button"
      description="Copy → check Button with TextMorph label + icon swap. Rare-path careful delight."
      preview={<DemoCopyButton />}
      code={`import { CopyButton } from "@/components/ui/copy-button"

<CopyButton value="npx shadcn@latest add @atroui/copy-button" />

{/* Icon-only */}
<CopyButton value="atroui.com" size="icon-sm" aria-label="Copy site URL" />`}
      fullBleed={false}
      usage={
        <>
          Use for install chips, share links, and code copy — earned confirmations, not every
          CTA. Built on{" "}
          <Link href="/docs/components/ui-button" className="bam-link">
            Button
          </Link>{" "}
          +{" "}
          <Link href="/docs/components/motion-text-morph" className="bam-link">
            TextMorph
          </Link>
          . Reduced motion swaps instantly (no tween).
        </>
      }
      props={[
        {
          name: "value",
          type: "string",
          description: "Clipboard payload.",
        },
        {
          name: "idleLabel",
          type: "string",
          default: '"Copy"',
          description: "Label before copy (TextMorph).",
        },
        {
          name: "copiedLabel",
          type: "string",
          default: '"Copied"',
          description: "Label after copy (TextMorph).",
        },
        {
          name: "idleIcon",
          type: "ReactNode",
          default: "<Copy />",
          description: "Idle glyph.",
        },
        {
          name: "copiedIcon",
          type: "ReactNode",
          default: "<Check />",
          description: "Copied glyph.",
        },
        {
          name: "iconOnly",
          type: "boolean",
          default: "size starts with icon",
          description: "Hide labels; icon AnimatePresence only.",
        },
        {
          name: "timeout",
          type: "number",
          default: "2000",
          description: "Ms before reset to idle.",
        },
        {
          name: "onCopied",
          type: "(value: string) => void",
          description: "Fires after a successful clipboard write.",
        },
        {
          name: "onCopyError",
          type: "(error: unknown) => void",
          description: "Fires if clipboard write fails.",
        },
        {
          name: "variant / size",
          type: "Button props",
          default: 'outline / sm',
          description: "Pass-through Button chrome.",
        },
      ]}
    />
  )
}
