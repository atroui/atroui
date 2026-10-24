import { ComponentDoc } from "@/components/component-doc"
import {
  DemoPlaygroundEnter,
  DemoPlaygroundHover,
  DemoPlaygroundMedia,
  DemoPlaygroundOverview,
  DemoPlaygroundPresence,
  DemoPlaygroundText,
} from "@/components/registry-demos"

export function UiPlaygroundDoc() {
  return (
    <ComponentDoc
      href="/docs/components/ui-playground"
      title="Motion Playground"
      description="One stage for the motion kit — hover language, text, Imageory media, FadeIn, AnimateNumber, CopyButton, TransitionPanel. Soft settle; never grow on hover."
      preview={<DemoPlaygroundOverview />}
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
      examples={[
        {
          title: "Hover",
          tip: "Material brightens; geometry barely lifts; ink rolls. Scale-up on hover is out.",
          preview: <DemoPlaygroundHover />,
          code: `import { Button } from "@/components/ui/button"
import { LabelRoll } from "@/components/ui/label-roll"

<Button>Continue</Button>
<a href="/docs">
  <LabelRoll secondary="Install AtroUI">Get started</LabelRoll>
</a>`,
        },
        {
          title: "Text",
          tip: "TextMorph / LabelRoll / LineReveal — ink travels; no scramble.",
          preview: <DemoPlaygroundText />,
          code: `import { TextMorph } from "@/components/ui/text-morph"
import { LineReveal } from "@/components/ui/line-reveal"
import { CopyButton } from "@/components/ui/copy-button"

<TextMorph>{label}</TextMorph>
<LineReveal>Show the fundamental first.</LineReveal>
<CopyButton value="npx shadcn@latest add @atroui/copy-button" />`,
        },
        {
          title: "Media",
          tip: "Magnetic · Tilt · Spotlight — media only, never Button chrome.",
          preview: <DemoPlaygroundMedia />,
          code: `import { Magnetic } from "@/components/ui/magnetic"
import { Tilt } from "@/components/ui/tilt"
import { Spotlight } from "@/components/ui/spotlight"

<Magnetic intensity={0.28}><img src={src} alt="" /></Magnetic>
<Tilt rotationFactor={6}><img src={src} alt="" /></Tilt>
<Spotlight><img src={src} alt="" /></Spotlight>`,
        },
        {
          title: "Enter",
          tip: "FadeIn opacity + rise. AnimateNumber for digit settle. No blur-in by default.",
          preview: <DemoPlaygroundEnter />,
          code: `import { FadeIn } from "@/components/ui/fade-in"
import { AnimateNumber } from "@/components/ui/animate-number"

<FadeIn>Opacity + rise.</FadeIn>
<AnimateNumber value={1280} from={0} prefix="$" />`,
        },
        {
          title: "Presence",
          tip: "TransitionPanel wait mode — exit finishes before enter.",
          preview: <DemoPlaygroundPresence />,
          code: `import { TransitionPanel } from "@/components/ui/transition-panel"

<TransitionPanel activeKey={key}>{panels}</TransitionPanel>`,
        },
      ]}
    />
  )
}
