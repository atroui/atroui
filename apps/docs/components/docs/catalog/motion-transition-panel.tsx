import { ComponentDoc } from "@/components/component-doc"
import { DemoTransitionPanel } from "@/components/registry-demos"

export function MotionTransitionPanelDoc() {
  return (
    <ComponentDoc
      registryName="transition-panel"
      href="/docs/components/motion-transition-panel"
      title="Transition Panel"
      description="Wait-mode content swaps for feature tabs and docs panels — opacity + small y."
      preview={<DemoTransitionPanel />}
      code={`import { TransitionPanel } from "@/components/ui/transition-panel"

<TransitionPanel activeKey={tab}>
  {{ overview: <Overview />, details: <Details /> }}
</TransitionPanel>`}
      fullBleed={false}
      props={[
        {
          name: "activeKey",
          type: "string",
          description: "Which panel is shown. Changes remount the keyed motion child.",
        },
        {
          name: "children",
          type: "Record<string, ReactNode> | (key) => ReactNode",
          description: "Map of panels or a render prop for the active key.",
        },
        {
          name: "className",
          type: "string",
          description: "Optional class on the outer wrapper.",
        },
        {
          name: "y",
          type: "number",
          default: "8",
          description: "Enter y travel in px. Exit uses half height upward.",
        },
      ]}
      usage={
        <>
          Prefer <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px]">mode=&quot;wait&quot;</code>{" "}
          (built-in) for discrete tabs so panels never overlap. Crossfade sync only when heights
          must share space — not the default here.
        </>
      }
    />
  )
}
