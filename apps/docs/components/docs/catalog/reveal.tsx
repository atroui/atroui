import { ComponentDoc } from "@/components/component-doc"
import { DemoReveal, DemoRevealStaggered } from "@/components/registry-demos"


export function RevealDoc() {
  return (
    <ComponentDoc
      href="/docs/components/reveal"
      registryName="reveal"
      title="Reveal"
      description="IntersectionObserver reveal using .atro-reveal CSS."
      preview={<DemoReveal />}
      code={`import { Reveal } from "@/components/blocks/reveal"

<Reveal>
  {/* content */}
</Reveal>`}
      fullBleed={false}
      usage="CSS lives in atroui/globals.css (.atro-reveal / .atro-reveal-in). For Framer motion fades, see @atroui/fade-in."
      examples={[
        {
          title: "Staggered delay",
          tip: "delay is animationDelay in ms on the same CSS keyframes — stack Reveals with stepped delays for a cascade.",
          preview: <DemoRevealStaggered />,
          code: `import { Reveal } from "@/components/blocks/reveal"

<Reveal>First in</Reveal>
<Reveal delay={160}>Follows at 160ms</Reveal>`,
        },
      ]}
      props={[
        {
          name: "delay",
          type: "number",
          default: "0",
          description: "Animation delay in ms once the block is in view.",
        },
        {
          name: "once",
          type: "boolean",
          default: "true",
          description: "If true, reveal only on first intersection.",
        },
        {
          name: "as",
          type: "ElementType",
          default: "div",
          description: "Polymorphic root element.",
        },
        {
          name: "className",
          type: "string",
          default: "-",
          description: "Merged onto the reveal root.",
        },
      ]}
    />
  )
}