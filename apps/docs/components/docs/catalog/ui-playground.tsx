import { ComponentDoc } from "@/components/component-doc"
import { DemoBaseUiPlayground } from "@/components/registry-demos"

export function UiPlaygroundDoc() {
  return (
    <ComponentDoc
      href="/docs/components/ui-playground"
      title="Motion Playground"
      description="One stage for the motion kit — hover language, text, Imageory media, FadeIn, AnimateNumber, CopyButton, TransitionPanel. Soft settle; never grow on hover."
      preview={<DemoBaseUiPlayground />}
      installation="npx shadcn@latest add @atroui/motion @atroui/fade-in @atroui/text-morph @atroui/label-roll @atroui/line-reveal @atroui/magnetic @atroui/tilt @atroui/spotlight @atroui/animate-number @atroui/copy-button @atroui/transition-panel @atroui/button"
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

// Taste cues in this stage:
// - Hover — hoverLift ≤1px y; pressInto; never scale up
// - Text — TextMorph / LabelRoll / LineReveal (ink travels; no scramble)
// - Media — Magnetic / Tilt / Spotlight on Imageory only (not Button chrome)
// - Enter — FadeIn opacity+rise; AnimateNumber digit tween
// - Delight — CopyButton (rare path); TransitionPanel wait-mode swap
// - Chrome overlays still Soft settle — see Dialog / Drawer / Menu docs`}
      fullBleed={false}
      usage="Wrap app chrome in MotionConfig {...atroMotionDefaults} (tween easeOutSoft, reducedMotion: user). Hover lifts ≤1px — never grow. Media effects stay on Imageory / PreviewCard. prefers-reduced-motion → duration 0 / skip decorative pull."
    />
  )
}
