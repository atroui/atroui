import { ComponentDoc } from "@/components/component-doc"
import { DemoBaseUiPlayground } from "@/components/registry-demos"

export function UiPlaygroundDoc() {
  return (
    <ComponentDoc
      href="/docs/components/ui-playground"
      title="Base UI Playground"
      description="Full Base UI kit under MotionConfig — ease-out settle, layout morph, list stagger. Tokens from @atroui/motion."
      preview={<DemoBaseUiPlayground />}
      installation="npx shadcn@latest add @atroui/motion @atroui/dialog @atroui/drawer @atroui/toast @atroui/menu @atroui/context-menu @atroui/menubar @atroui/navigation-menu @atroui/combobox @atroui/autocomplete @atroui/toggle-group @atroui/accordion @atroui/progress @atroui/slider @atroui/meter @atroui/avatar @atroui/button"
      code={`import { MotionConfig } from "motion/react"
import { atroMotionDefaults } from "@/lib/motion"
// after: npx shadcn add @atroui/motion

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig {...atroMotionDefaults}>
      {children}
    </MotionConfig>
  )
}

// Taste cues to watch in the playground:
// - Dialog / Drawer / Menu — ease-out settle; exit ≈ 80% enter; opacity + travel
// - Tabs / ToggleGroup — layoutId pill morph (LayoutGroup)
// - Switch — layout thumb + justify flip (not x tween)
// - Combobox / Menu — staggerChildren ≤40–50ms + layoutId highlight
// - Accordion — height:auto + chevron; Checkbox/Radio — pathLength / scale ~160ms`}
      fullBleed={false}
      usage="Wrap app chrome in MotionConfig {...atroMotionDefaults} (tween 200ms easeOutSoft, reducedMotion: user). Primitives override per-surface with dialog/popup/panel/layout tokens. prefers-reduced-motion → duration 0 / skip scale."
    />
  )
}
