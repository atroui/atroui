"use client"

import * as React from "react"
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
  AnimateNumber,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  ArPortfolio,
  Autocomplete,
  AutocompleteClear,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteList,
  AutocompleteTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
  BoldFooter,
  Breadcrumbs,
  Button,
  CalendlyEmbed,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Changelog,
  Checkbox,
  CheckboxGroup,
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
  Combobox,
  ComboboxClear,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxInputGroup,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
  ComboboxTrigger,
  CommandMenu,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
  ContextualCTA,
  CountUp,
  DeadlineCountdown,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  ExitIntentPopup,
  FadeIn,
  fadeInSection,
  FaqInteractivePreview,
  FeatureGrid,
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldLabel,
  Fieldset,
  FieldsetLegend,
  Form,
  FormSelect,
  FounderAvatar,
  HomeCrafts,
  HomeLab,
  HomePrinciple,
  LabelRoll,
  LineReveal,
  Magnetic,
  HomeWho,
  HomeWork,
  Input,
  JournalContent,
  LiveDashboard,
  LocalClock,
  LogoCloud,
  LogoMark,
  LogoWordmark,
  MadeWithEmbed,
  MEDIA,
  mediaSrc,
  Menu,
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuTrigger,
  Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  NewsletterForm,
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
  OTPField,
  OTPFieldInput,
  OTPFieldSeparator,
  PersonalHero,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
  PreviewCard,
  PreviewCardContent,
  PreviewCardDescription,
  PreviewCardHeader,
  PreviewCardTitle,
  PreviewCardTrigger,
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
  ProjectList,
  Prose,
  Radio,
  RadioGroup,
  ResourcesContent,
  Resume,
  ScopeChat,
  ScrollArea,
  ScrollProgress,
  Separator,
  Slider,
  SliderControl,
  SliderIndicator,
  SliderLabel,
  SliderThumb,
  SliderTrack,
  SliderValue,
  SocialShare,
  Spotlight,
  Stagger,
  StaggerChild,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  TextMorph,
  CopyButton,
  ThemeToggle,
  ThumbnailLivePreview,
  ThumbnailWorkspace,
  Tilt,
  TimelineAnimation,
  Toaster,
  ToastProvider,
  Toggle,
  ToggleGroup,
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  TransitionPanel,
  trackEvent,
  useToastManager,
  WeatherChip,
  WordRevealScroll,
} from "atroui"
import { IMAGEORY } from "@/lib/imageory"
import {
  ArrowRight,
  MoreHorizontal,
  Plus,
  Settings2,
  Trash2,
} from "lucide-react"
import { MotionConfig } from "motion/react"
import { atroMotionDefaults } from "@/lib/motion"
import { WaitlistStagePreview } from "@/components/registry/waitlist-stage-preview"
import { HomeHero } from "../registry/default/blocks/home-hero"
import { OgExamples } from "../registry/default/blocks/og-examples"
import { OgLivePreview } from "../registry/default/blocks/og-live-preview"
import { OgWorkspace } from "../registry/default/blocks/og-workspace"
import { PricingOverview } from "../registry/default/blocks/pricing-overview"
import { ProjectPlanner } from "../registry/default/blocks/project-planner"
import { SiteFooter } from "../registry/default/blocks/site-footer"
import { SiteHeader } from "../registry/default/blocks/site-header"

/** Live canvas demos - one per documented component where a useful preview exists. */

export function DemoHomeHero() {
  // Same `@atroui/home-hero` source users install — not the npm `HomeHero` alias.
  return <HomeHero />
}

export function DemoHomeCrafts() {
  return <HomeCrafts />
}

export function DemoHomeLab() {
  return <HomeLab />
}

export function DemoHomePrinciple() {
  return <HomePrinciple />
}

export function DemoHomeWho() {
  return <HomeWho />
}

export function DemoHomeWork() {
  return <HomeWork />
}

export function DemoPricingOverview() {
  // Same `@atroui/pricing-overview` source users install — not npm.
  return <PricingOverview />
}

export function DemoFeatureGrid() {
  return <FeatureGrid />
}

export function DemoLogoCloud() {
  return <LogoCloud />
}

export function DemoBoldFooter() {
  return <BoldFooter />
}

export function DemoSiteHeader() {
  // Same `@atroui/site-header` source users install — not npm.
  return (
    <div className="w-full bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-7xl border-x border-border-subtle px-6 py-10 text-sm text-muted-foreground">
        Sticky header - AtroUI logo via getBrand(), studio nav routes, theme
        toggle, and Hire CTA. Links use host paths like{" "}
        <code className="font-mono text-xs text-foreground">/work</code> and{" "}
        <code className="font-mono text-xs text-foreground">/contact</code>.
      </div>
    </div>
  )
}

export function DemoButton() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button size="xs">XS</Button>
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
        <Button disabled>Disabled</Button>
      </div>
    </div>
  )
}

export function DemoButtonWithIcon() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button>
        <Plus data-icon="inline-start" />
        New project
      </Button>
      <Button variant="outline">
        Continue
        <ArrowRight data-icon="inline-end" />
      </Button>
      <Button variant="destructive">
        <Trash2 data-icon="inline-start" />
        Delete
      </Button>
    </div>
  )
}

export function DemoButtonIconOnly() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button size="icon-xs" variant="ghost" aria-label="Settings">
        <Settings2 />
      </Button>
      <Button size="icon-sm" variant="outline" aria-label="Settings">
        <Settings2 />
      </Button>
      <Button size="icon" variant="secondary" aria-label="Settings">
        <Settings2 />
      </Button>
      <Button size="icon-lg" aria-label="Add item">
        <Plus />
      </Button>
    </div>
  )
}

export function DemoCard() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Project Alpha</CardTitle>
          <CardDescription>Shipped this week</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            A calm surface with clear hierarchy.
          </p>
        </CardContent>
        <CardFooter className="gap-2">
          <Button size="sm">Open</Button>
          <Button size="sm" variant="ghost">
            Dismiss
          </Button>
        </CardFooter>
      </Card>
      <Card className="w-full max-w-sm border-brand/30">
        <CardHeader>
          <CardTitle>Accent edge</CardTitle>
          <CardDescription>Optional brand border</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Same primitives - compose with tokens, not one-off styles.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export function DemoCardFooterActions() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Deploy preview</CardTitle>
        <CardDescription>atroui-docs · main</CardDescription>
        <CardAction>
          <Button size="icon-sm" variant="ghost" aria-label="Deploy options">
            <MoreHorizontal />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Build finished in 42s. No checks failed.
        </p>
      </CardContent>
      <CardFooter className="justify-between">
        <span className="text-xs text-muted-foreground">2 minutes ago</span>
        <div className="flex gap-2">
          <Button size="sm" variant="ghost">
            Logs
          </Button>
          <Button size="sm">Visit</Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export function DemoCardCompactMedia() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-4">
      <Card size="sm" className="w-full max-w-[240px]">
        <img
          src={IMAGEORY.landscape}
          alt=""
          width={1200}
          height={630}
          className="aspect-2/1 w-full object-cover"
        />
        <CardHeader>
          <CardTitle>Landscape</CardTitle>
          <CardDescription>Imageory</CardDescription>
        </CardHeader>
      </Card>
      <Card size="sm" className="w-full max-w-[240px]">
        <img
          src={IMAGEORY.nature}
          alt=""
          width={1200}
          height={630}
          className="aspect-2/1 w-full object-cover"
        />
        <CardHeader>
          <CardTitle>Nature</CardTitle>
          <CardDescription>Imageory</CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}

export function DemoTextarea() {
  return <Textarea placeholder="Write a message…" className="max-w-md" />
}

export function DemoTextareaInvalid() {
  return (
    <div className="w-full max-w-md space-y-1.5 text-left">
      <label htmlFor="demo-textarea-notes" className="text-sm font-medium">
        Release notes
      </label>
      <Textarea
        id="demo-textarea-notes"
        aria-invalid
        aria-describedby="demo-textarea-notes-error"
        defaultValue="Ship it"
      />
      <p id="demo-textarea-notes-error" className="text-sm text-destructive">
        Add at least 20 characters.
      </p>
    </div>
  )
}

export function DemoTextareaAutoSize() {
  return (
    <Textarea
      className="max-h-40 max-w-md overflow-y-auto"
      defaultValue={
        "Review notes\n\n- Tighten the empty state copy\n- Keep the caret blink on search\n- Drop the second CTA in the tray"
      }
    />
  )
}

export function DemoFormSelect() {
  const [value, setValue] = React.useState("")
  return (
    <FormSelect
      className="max-w-xs"
      value={value}
      onValueChange={setValue}
      placeholder="Pick a stack"
      options={[
        { value: "next", label: "Next.js" },
        { value: "remix", label: "Remix" },
        { value: "astro", label: "Astro" },
      ]}
    />
  )
}

export function DemoFormSelectLabelled() {
  const [plan, setPlan] = React.useState("pro")
  return (
    <div className="flex w-full max-w-xs flex-col gap-4 text-left">
      <div className="space-y-1.5">
        <label htmlFor="demo-select-plan" className="text-sm font-medium">
          Plan
        </label>
        <FormSelect
          id="demo-select-plan"
          value={plan}
          onValueChange={setPlan}
          options={[
            { value: "free", label: "Free" },
            { value: "pro", label: "Pro" },
            { value: "team", label: "Team" },
          ]}
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="demo-select-region" className="text-sm font-medium">
          Region
        </label>
        <FormSelect
          id="demo-select-region"
          disabled
          value=""
          onValueChange={() => {}}
          placeholder="Chosen by your plan"
          options={[{ value: "iad", label: "Washington, D.C." }]}
        />
      </div>
    </div>
  )
}

export function DemoDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button />}>Open dialog</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename project</DialogTitle>
          <DialogDescription>
            Ease-out settle (opacity + y/scale). Exit ~80% of enter.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
          <DialogClose render={<Button />}>Save</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function DemoAlertDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="destructive" />}>
        Delete project
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this project?</AlertDialogTitle>
          <AlertDialogDescription>
            This removes drafts and cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export function DemoMenu() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline" />}>
        Open menu
      </MenuTrigger>
      <MenuContent>
        <MenuItem>Duplicate</MenuItem>
        <MenuItem>Archive</MenuItem>
        <MenuSeparator />
        <MenuItem variant="destructive">Delete</MenuItem>
      </MenuContent>
    </Menu>
  )
}

export function DemoContextMenu() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-28 w-full max-w-xs items-center justify-center rounded-[var(--radius)] border border-dashed border-border-subtle text-sm text-muted-foreground">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Duplicate</ContextMenuItem>
        <ContextMenuItem>Archive</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export function DemoNavigationMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Product</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-1 sm:w-56">
              <li>
                <NavigationMenuLink href="#">
                  <span className="font-medium">Overview</span>
                  <span className="text-muted-foreground">
                    What ships in the kit
                  </span>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">
                  <span className="font-medium">Pricing</span>
                  <span className="text-muted-foreground">
                    Free install path
                  </span>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-1 sm:w-56">
              <li>
                <NavigationMenuLink href="#">
                  <span className="font-medium">Guides</span>
                  <span className="text-muted-foreground">
                    Task-first install
                  </span>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">
                  <span className="font-medium">API</span>
                  <span className="text-muted-foreground">
                    Host routes + BYOK
                  </span>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuViewport />
    </NavigationMenu>
  )
}

export function DemoMenubar() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New</MenubarItem>
          <MenubarItem>Open</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Save</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Cut</MenubarItem>
          <MenubarItem>Copy</MenubarItem>
          <MenubarItem>Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Zoom In</MenubarItem>
          <MenubarItem>Zoom Out</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}

export function DemoPopover() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Details
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Deploy preview</PopoverTitle>
          <PopoverDescription>
            Progressive disclosure — keep the page, reveal the option.
          </PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  )
}

export function DemoTooltip() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" size="sm" />}>
          Hover me
        </TooltipTrigger>
        <TooltipContent>Short hint. Micro settle only.</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function DemoPreviewCard() {
  return (
    <p className="text-sm text-muted-foreground">
      Hover{" "}
      <PreviewCard>
        <PreviewCardTrigger
          href="https://www.atroui.com"
          className="font-medium text-foreground underline decoration-border-subtle underline-offset-4"
        >
          AtroUI
        </PreviewCardTrigger>
        <PreviewCardContent
          tilt
          spotlight
          className="w-80 overflow-hidden p-0"
        >
          <img
            src={IMAGEORY.cosmos}
            alt=""
            className="aspect-video w-full object-cover"
          />
          <PreviewCardHeader className="p-3.5">
            <PreviewCardTitle>AtroUI</PreviewCardTitle>
            <PreviewCardDescription>
              Opt-in tilt + spotlight on media — soft settle, never default chrome.
            </PreviewCardDescription>
          </PreviewCardHeader>
        </PreviewCardContent>
      </PreviewCard>{" "}
      for a quiet media preview.
    </p>
  )
}

export function DemoScrollArea() {
  const tags = [
    "button",
    "dialog",
    "menu",
    "popover",
    "preview-card",
    "scroll-area",
    "separator",
    "tabs",
    "tooltip",
  ]
  return (
    <ScrollArea className="h-48 w-56 rounded-[var(--radius)] border border-border-subtle text-left">
      <div className="p-3">
        <p className="mb-3 text-[0.6875rem] font-medium tracking-wide text-muted-foreground uppercase">
          Registry
        </p>
        {tags.map((tag) => (
          <div key={tag}>
            <div className="text-sm text-foreground">{tag}</div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

export function DemoSeparator() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3 text-left">
      <p className="text-sm text-foreground">Section A</p>
      <Separator />
      <p className="text-sm text-muted-foreground">Section B — hairline only.</p>
      <div className="flex h-8 items-center gap-3">
        <span className="text-sm">Left</span>
        <Separator orientation="vertical" />
        <span className="text-sm text-muted-foreground">Right</span>
      </div>
    </div>
  )
}

export function DemoField() {
  return (
    <Field className="max-w-xs text-left">
      <FieldLabel>Project name</FieldLabel>
      <FieldControl placeholder="Acme launch" name="project" required />
      <FieldDescription>Shown on the OG card and sitemap.</FieldDescription>
      <FieldError match="valueMissing">Name is required.</FieldError>
    </Field>
  )
}

export function DemoNumberField() {
  return (
    <NumberField
      className="max-w-[12rem] text-left"
      defaultValue={4}
      min={1}
      max={12}
    >
      <NumberFieldScrubArea>Quantity</NumberFieldScrubArea>
      <NumberFieldGroup>
        <NumberFieldDecrement />
        <NumberFieldInput />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>
  )
}

export function DemoOtpField() {
  return (
    <OTPField length={6} className="justify-start" aria-label="Verification code">
      <OTPFieldInput />
      <OTPFieldInput aria-label="Digit 2 of 6" />
      <OTPFieldInput aria-label="Digit 3 of 6" />
      <OTPFieldSeparator />
      <OTPFieldInput aria-label="Digit 4 of 6" />
      <OTPFieldInput aria-label="Digit 5 of 6" />
      <OTPFieldInput aria-label="Digit 6 of 6" />
    </OTPField>
  )
}

export function DemoForm() {
  return (
    <Form
      className="max-w-xs text-left"
      onFormSubmit={() => {
        /* demo — no network */
      }}
    >
      <Field name="email">
        <FieldLabel>Email</FieldLabel>
        <FieldControl
          type="email"
          required
          placeholder="you@studio.dev"
          defaultValue=""
        />
        <FieldError match="valueMissing">Email is required.</FieldError>
        <FieldError match="typeMismatch">Enter a valid email.</FieldError>
      </Field>
      <Button type="submit" size="sm">
        Continue
      </Button>
    </Form>
  )
}

export function DemoFieldset() {
  return (
    <Fieldset className="max-w-sm text-left">
      <FieldsetLegend>Billing contact</FieldsetLegend>
      <Field name="contact-name">
        <FieldLabel>Name</FieldLabel>
        <FieldControl placeholder="Ada Lovelace" />
      </Field>
      <Field name="contact-email">
        <FieldLabel>Email</FieldLabel>
        <FieldControl type="email" placeholder="ada@studio.dev" />
      </Field>
    </Fieldset>
  )
}

export function DemoInput() {
  return (
    <Input className="max-w-xs" placeholder="you@studio.dev" type="email" />
  )
}

export function DemoSwitch() {
  const [on, setOn] = React.useState(true)
  return (
    <div className="flex items-center gap-3">
      <Switch
        checked={on}
        onCheckedChange={setOn}
        aria-label="Publish drafts"
      />
      <span className="text-sm text-muted-foreground">
        {on ? "layout thumb" : "justify flip"}
      </span>
    </div>
  )
}


export function DemoToast() {
  return (
    <ToastProvider>
      <DemoToastTrigger />
      <Toaster />
    </ToastProvider>
  )
}

function DemoToastTrigger() {
  const toast = useToastManager()
  return (
    <Button
      onClick={() =>
        toast.add({
          title: "Saved",
          description: "Draft published to the registry.",
        })
      }
    >
      Show toast
    </Button>
  )
}

export function DemoProgress() {
  const [value, setValue] = React.useState(36)
  React.useEffect(() => {
    const id = window.setInterval(() => {
      setValue((v) => (v >= 100 ? 12 : v + 8))
    }, 1200)
    return () => window.clearInterval(id)
  }, [])
  return (
    <Progress value={value} className="w-full max-w-xs text-left">
      <div className="flex items-center justify-between gap-2">
        <ProgressLabel>Uploading</ProgressLabel>
        <ProgressValue />
      </div>
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </Progress>
  )
}

export function DemoSlider() {
  return (
    <Slider defaultValue={42} className="w-full max-w-xs text-left">
      <div className="flex items-center justify-between gap-2">
        <SliderLabel>Intensity</SliderLabel>
        <SliderValue />
      </div>
      <SliderControl>
        <SliderTrack>
          <SliderIndicator />
        </SliderTrack>
        <SliderThumb />
      </SliderControl>
    </Slider>
  )
}

export function DemoMeter() {
  return (
    <Meter value={72} className="w-full max-w-xs text-left">
      <div className="flex items-center justify-between gap-2">
        <MeterLabel>Storage</MeterLabel>
        <MeterValue />
      </div>
      <MeterTrack>
        <MeterIndicator />
      </MeterTrack>
    </Meter>
  )
}

export function DemoAvatar() {
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src={mediaSrc(MEDIA.founderPortrait)} alt="" />
        <AvatarFallback>AK</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    </div>
  )
}

export function DemoCheckbox() {
  return (
    <label className="flex items-center gap-2 text-sm text-foreground">
      <Checkbox defaultChecked />
      Notify on publish
    </label>
  )
}

const CHECKBOX_GROUP_ALL = ["draft", "review", "ship"] as const

export function DemoCheckboxGroup() {
  const [value, setValue] = React.useState<string[]>(["draft"])
  return (
    <CheckboxGroup
      aria-label="Release stages"
      value={value}
      onValueChange={setValue}
      allValues={[...CHECKBOX_GROUP_ALL]}
      className="text-left"
    >
      <label className="flex items-center gap-2 text-sm text-foreground">
        <Checkbox parent />
        Release stages
      </label>
      <label className="ml-4 flex items-center gap-2 text-sm text-foreground">
        <Checkbox value="draft" />
        Draft
      </label>
      <label className="ml-4 flex items-center gap-2 text-sm text-foreground">
        <Checkbox value="review" />
        Review
      </label>
      <label className="ml-4 flex items-center gap-2 text-sm text-foreground">
        <Checkbox value="ship" />
        Ship
      </label>
    </CheckboxGroup>
  )
}

export function DemoToggle() {
  return (
    <Toggle aria-label="Bold" defaultPressed>
      Bold
    </Toggle>
  )
}

export function DemoToggleGroup() {
  return (
    <ToggleGroup defaultValue={["left"]} aria-label="Align">
      <Toggle value="left">Left</Toggle>
      <Toggle value="center">Center</Toggle>
      <Toggle value="right">Right</Toggle>
    </ToggleGroup>
  )
}

export function DemoToolbar() {
  return (
    <Toolbar aria-label="Editor">
      <ToolbarGroup>
        <ToolbarButton aria-label="Bold">B</ToolbarButton>
        <ToolbarButton aria-label="Italic">I</ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarButton aria-label="Link">Link</ToolbarButton>
    </Toolbar>
  )
}

export function DemoRadio() {
  return (
    <RadioGroup
      defaultValue="draft"
      aria-label="Release state"
      className="text-left"
    >
      <label className="flex items-center gap-2 text-sm text-foreground">
        <Radio value="draft" />
        Draft
      </label>
      <label className="flex items-center gap-2 text-sm text-foreground">
        <Radio value="live" />
        Live
      </label>
      <label className="flex items-center gap-2 text-sm text-foreground">
        <Radio value="archived" />
        Archived
      </label>
    </RadioGroup>
  )
}

export function DemoAccordion() {
  return (
    <Accordion
      defaultValue={["install"]}
      className="w-full max-w-md text-left"
    >
      <AccordionItem value="install">
        <AccordionHeader>
          <AccordionTrigger>Install</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          npx shadcn add @atroui/accordion — own the files after install.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="motion">
        <AccordionHeader>
          <AccordionTrigger>Motion</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          Panel height settles with revealTween; chevron rotates; open
          trigger morphs a quiet focus wash.
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="a11y">
        <AccordionHeader>
          <AccordionTrigger>Reduced motion</AccordionTrigger>
        </AccordionHeader>
        <AccordionPanel>
          Prefers-reduced-motion falls back to Base UI CSS height — no path
          draw, no layoutId wash.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

const DEMO_FRUITS = ["Apple", "Banana", "Blueberry", "Cherry", "Mango"]
const DEMO_TAGS = ["motion", "registry", "scope", "og", "host-api"]

export function DemoCombobox() {
  return (
    <Combobox items={DEMO_FRUITS}>
      <div className="w-full max-w-xs text-left">
        <ComboboxInputGroup>
          <ComboboxInput placeholder="Choose a fruit" />
          <ComboboxClear />
          <ComboboxTrigger />
        </ComboboxInputGroup>
        <ComboboxContent>
          <ComboboxEmpty>No fruits found.</ComboboxEmpty>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
                <ComboboxItemIndicator />
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </div>
    </Combobox>
  )
}

export function DemoAutocomplete() {
  return (
    <Autocomplete items={DEMO_TAGS}>
      <div className="w-full max-w-xs text-left">
        <AutocompleteInputGroup>
          <AutocompleteInput placeholder="Search tags" />
          <AutocompleteClear />
          <AutocompleteTrigger />
        </AutocompleteInputGroup>
        <AutocompleteContent>
          <AutocompleteEmpty>No tags found.</AutocompleteEmpty>
          <AutocompleteList>
            {(item: string) => (
              <AutocompleteItem key={item} value={item}>
                {item}
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompleteContent>
      </div>
    </Autocomplete>
  )
}

export function DemoCollapsible() {
  return (
    <Collapsible defaultOpen className="w-full max-w-md text-left">
      <CollapsibleTrigger>Advanced options</CollapsibleTrigger>
      <CollapsiblePanel>
        Reveal depth only when it is relevant — one focused section at a
        time. Height settles with revealTween.
      </CollapsiblePanel>
    </Collapsible>
  )
}

export function DemoDrawer() {
  return (
    <Drawer side="right">
      <DrawerTrigger render={<Button variant="outline" />}>
        Open drawer
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filters</DrawerTitle>
          <DrawerDescription>
            Edge slide via panelTween (easeOutSoft) — travel, not teleport.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose render={<Button variant="outline" />}>
            Cancel
          </DrawerClose>
          <DrawerClose render={<Button />}>Apply</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export function DemoTabs() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="pt-3 text-sm text-muted-foreground">
        layoutId pill morph — shared element travels. Panel height settles
        when peers differ.
      </TabsContent>
      <TabsContent value="activity" className="pt-3 text-sm text-muted-foreground">
        Peer switch stays lateral.
        <br />
        Extra lines make layout height travel obvious.
      </TabsContent>
      <TabsContent value="settings" className="pt-3 text-sm text-muted-foreground">
        Soft-rect chrome. No spring bounce.
      </TabsContent>
    </Tabs>
  )
}

function PlaygroundCue({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
      {children}
    </p>
  )
}

export function DemoBaseUiPlayground() {
  const [morphLabel, setMorphLabel] = React.useState("Idle")
  const [amount, setAmount] = React.useState(1280)
  const [panelKey, setPanelKey] = React.useState("taste")
  const [revealKey, setRevealKey] = React.useState(0)

  const cycleMorph = () =>
    setMorphLabel((v) =>
      v === "Idle" ? "Loading" : v === "Loading" ? "Done" : "Idle"
    )

  const panels = {
    taste: (
      <p className="text-sm text-muted-foreground">
        Ease-out Soft settle. Exit ≈80% enter. Never grow on hover.
      </p>
    ),
    text: (
      <p className="text-sm text-muted-foreground">
        TextMorph / LabelRoll / LineReveal — ink travels; no scramble.
      </p>
    ),
    media: (
      <p className="text-sm text-muted-foreground">
        Magnetic · Tilt · Spotlight — media only, never Button chrome.
      </p>
    ),
  } as const

  return (
    <MotionConfig {...atroMotionDefaults}>
      <div className="flex w-full max-w-xl flex-col gap-10 text-left">
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-foreground">Motion kit</p>
          <p className="text-xs leading-relaxed text-muted-foreground">
            One stage under{" "}
            <code className="font-mono text-[11px] text-foreground">
              MotionConfig
            </code>{" "}
            +{" "}
            <code className="font-mono text-[11px] text-foreground">
              atroMotionDefaults
            </code>
            . Tweens only · ease-out settle · hoverLift ≤1px · pressInto · never
            grow · reduced motion → duration 0.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <PlaygroundCue>hover · lift ≤1px · never grow</PlaygroundCue>
          <div className="flex flex-wrap items-center gap-4">
            <DemoButton />
            <DemoToggle />
            <a
              href="#playground-motion"
              className="text-sm font-medium text-foreground"
            >
              <LabelRoll secondary="Install AtroUI">Get started</LabelRoll>
            </a>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Material brightens; geometry barely lifts; ink rolls. Scale-up on
            hover is out.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <PlaygroundCue>text · morph · roll · line</PlaygroundCue>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={cycleMorph}
              className="atro-btn inline-flex min-w-[7rem] justify-center"
            >
              <TextMorph className="font-medium">{morphLabel}</TextMorph>
            </button>
            <CopyButton value="npx shadcn@latest add @atroui/copy-button" />
          </div>
          <LineReveal
            key={`line-${revealKey}`}
            preview
            className="text-base font-medium tracking-tight text-foreground"
          >
            Show the fundamental first. Reveal depth when it earns the frame.
          </LineReveal>
          <button
            type="button"
            onClick={() => setRevealKey((k) => k + 1)}
            className="atro-btn-ghost self-start text-[11px]"
          >
            Replay line + fade
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <PlaygroundCue>media · Imageory · mild only</PlaygroundCue>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="flex flex-col gap-1.5">
              <Magnetic
                className="overflow-hidden rounded-[var(--radius)] border border-border-subtle bg-card"
                intensity={0.28}
                range={56}
              >
                <img
                  src={IMAGEORY.landscape}
                  alt=""
                  className="aspect-[4/3] w-full object-cover"
                />
              </Magnetic>
              <span className="text-[10px] text-muted-foreground">Magnetic</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <Tilt
                className="overflow-hidden rounded-[var(--radius)] border border-border-subtle bg-card"
                rotationFactor={6}
              >
                <img
                  src={IMAGEORY.sky}
                  alt=""
                  className="aspect-[4/3] w-full object-cover"
                />
              </Tilt>
              <span className="text-[10px] text-muted-foreground">Tilt ≤6°</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <Spotlight className="overflow-hidden rounded-[var(--radius)] border border-border-subtle bg-zinc-950">
                <img
                  src={IMAGEORY.darkVoid}
                  alt=""
                  className="aspect-[4/3] w-full object-cover opacity-90"
                />
              </Spotlight>
              <span className="text-[10px] text-muted-foreground">Spotlight</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <PlaygroundCue>enter · fade + count</PlaygroundCue>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <FadeIn
              key={`fade-${revealKey}`}
              preview
              className="max-w-[14rem] rounded-[var(--radius)] border border-border-subtle bg-card px-4 py-3 text-sm text-foreground"
            >
              Opacity + rise. No blur-in.
            </FadeIn>
            <div className="flex flex-col items-end gap-2">
              <p className="text-3xl font-medium tracking-tight text-foreground">
                <AnimateNumber
                  value={amount}
                  from={0}
                  prefix="$"
                  format={{ style: "decimal", maximumFractionDigits: 0 }}
                />
              </p>
              <div className="flex gap-1.5">
                {[480, 1280, 9600].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setAmount(n)}
                    className="atro-btn-ghost px-2 py-1 text-[11px]"
                  >
                    ${n.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3" id="playground-motion">
          <PlaygroundCue>presence · panel wait mode</PlaygroundCue>
          <div className="flex gap-1 rounded-[var(--radius)] border border-border-subtle bg-muted/40 p-1">
            {(
              [
                ["taste", "Taste"],
                ["text", "Text"],
                ["media", "Media"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setPanelKey(key)}
                className={
                  panelKey === key
                    ? "flex-1 rounded-md bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-sm"
                    : "flex-1 rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
                }
              >
                {label}
              </button>
            ))}
          </div>
          <TransitionPanel
            activeKey={panelKey}
            className="rounded-[var(--radius)] border border-border-subtle bg-card px-4 py-3"
          >
            {panels}
          </TransitionPanel>
          <p className="text-[11px] text-muted-foreground">
            Exit finishes before enter. Chrome overlays (Dialog / Drawer /
            Menu) still use the same Soft tokens — see each primitive doc.
          </p>
        </div>
      </div>
    </MotionConfig>
  )
}

export { DemoThemeAdapt } from "@/components/theme-adapt-demo"

export function DemoThemeToggle() {
  return <ThemeToggle />
}

export function DemoLogo() {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="flex items-end gap-5">
        <LogoMark className="size-8" />
        <LogoMark className="size-12" />
        <LogoMark className="size-16" />
      </div>
      <LogoWordmark className="text-xl" />
      <p className="max-w-xs text-xs text-muted-foreground">
        Interrupted A - open letterform + floating brand bar. Label from{" "}
        getBrand(); override with{" "}
        <code className="font-mono text-[11px]">title</code> /{" "}
        <code className="font-mono text-[11px]">name</code>.
      </p>
    </div>
  )
}

export function DemoFounderAvatar() {
  return (
    <div className="flex items-center gap-5">
      <div className="flex items-center gap-3">
        <FounderAvatar size="sm" />
        <FounderAvatar size="md" />
        <FounderAvatar size="lg" />
      </div>
      <div className="text-left">
        <p className="text-sm font-medium text-foreground">Founder avatar</p>
        <p className="text-xs text-muted-foreground">
          Bundled with the package. No{" "}
          <code className="font-mono text-[11px] text-foreground">/public</code>{" "}
          copy required.
        </p>
      </div>
    </div>
  )
}

export function DemoBreadcrumbs() {
  return (
    <Breadcrumbs
      items={[
        { label: "Docs", href: "/docs" },
        { label: "Components", href: "/docs/components" },
        { label: "Breadcrumbs" },
      ]}
    />
  )
}

export function DemoBreadcrumbsPlain() {
  return (
    <Breadcrumbs
      items={[
        { label: "Docs", href: "/docs" },
        { label: "Primitives" },
        { label: "Breadcrumbs", href: "/docs/components/ui-breadcrumbs" },
      ]}
    />
  )
}

export function DemoProse() {
  return (
    <Prose className="max-w-md text-left">
      <h3>Readable by default</h3>
      <p>
        Prose styles long-form content with comfortable measure, spacing, and contrast -
        ready for journal posts and docs.
      </p>
    </Prose>
  )
}

export function DemoFadeIn() {
  const [key, setKey] = React.useState(0)

  return (
    <div className="flex w-full max-w-md flex-col items-stretch gap-4">
      <FadeIn
        key={key}
        preview
        className="rounded-xl border border-border-subtle bg-card px-6 py-5 text-sm text-foreground shadow-sm"
      >
        <p className="ms-stamp mb-2">FadeIn</p>
        <p className="font-medium">Scroll-reveal motion</p>
        <p className="mt-1 text-muted-foreground">
          Fades and rises as it enters view. Replay to see it again.
        </p>
      </FadeIn>
      <button
        type="button"
        onClick={() => setKey((k) => k + 1)}
        className="atro-btn-ghost self-center"
      >
        Replay
      </button>
    </div>
  )
}

export function DemoFadeInDelayed() {
  const [key, setKey] = React.useState(0)

  return (
    <div className="flex w-full max-w-md flex-col items-stretch gap-4">
      <FadeIn
        key={key}
        preview
        delay={0.35}
        y={24}
        className="rounded-xl border border-border-subtle bg-card px-6 py-5 text-sm text-foreground shadow-sm"
      >
        <p className="ms-stamp mb-2">delay · y</p>
        <p className="font-medium">Arrives later, from farther</p>
        <p className="mt-1 text-muted-foreground">
          delay is seconds; y is the starting translateY in px.
        </p>
      </FadeIn>
      <button
        type="button"
        onClick={() => setKey((k) => k + 1)}
        className="atro-btn-ghost self-center"
      >
        Replay
      </button>
    </div>
  )
}

export function DemoFadeInSection() {
  const [key, setKey] = React.useState(0)

  return (
    <div className="flex w-full max-w-md flex-col items-stretch gap-4">
      <FadeIn
        key={key}
        preview
        {...fadeInSection}
        className="rounded-xl border border-border-subtle bg-card px-6 py-5 text-sm text-foreground shadow-sm"
      >
        <p className="ms-stamp mb-2">FadeIn · section</p>
        <p className="font-medium">Earlier trigger, same motion</p>
        <p className="mt-1 text-muted-foreground">
          Spreading fadeInSection — not a second component.
        </p>
      </FadeIn>
      <button
        type="button"
        onClick={() => setKey((k) => k + 1)}
        className="atro-btn-ghost self-center"
      >
        Replay
      </button>
    </div>
  )
}

/** @deprecated Gallery alias — use DemoFadeInSection */
export function DemoInView() {
  return <DemoFadeInSection />
}

export function DemoTextMorph() {
  const [label, setLabel] = React.useState("Idle")
  const cycle = () =>
    setLabel((v) => (v === "Idle" ? "Loading" : v === "Loading" ? "Done" : "Idle"))

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-4">
      <button
        type="button"
        onClick={cycle}
        className="atro-btn inline-flex min-w-[7rem] justify-center"
      >
        <TextMorph className="font-medium">{label}</TextMorph>
      </button>
      <p className="text-center text-sm text-muted-foreground">
        Click to morph Idle → Loading → Done. Opt-in — not default on every Button.
      </p>
    </div>
  )
}

export function DemoCopyButton() {
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-4">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <CopyButton value="npx shadcn@latest add @atroui/copy-button" />
        <CopyButton
          value="atroui.com"
          size="icon-sm"
          aria-label="Copy site URL"
        />
      </div>
      <p className="text-center text-sm text-muted-foreground">
        Rare-path delight — TextMorph label + icon swap. Not default on every Button.
      </p>
    </div>
  )
}

export function DemoAnimateNumber() {
  const [value, setValue] = React.useState(1280)

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-4">
      <p className="text-4xl font-medium tracking-tight text-foreground">
        <AnimateNumber
          value={value}
          from={0}
          prefix="$"
          format={{ style: "decimal", maximumFractionDigits: 0 }}
        />
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setValue(480)}
          className="atro-btn-ghost"
        >
          $480
        </button>
        <button
          type="button"
          onClick={() => setValue(1280)}
          className="atro-btn-ghost"
        >
          $1,280
        </button>
        <button
          type="button"
          onClick={() => setValue(9600)}
          className="atro-btn-ghost"
        >
          $9,600
        </button>
      </div>
      <p className="text-center text-sm text-muted-foreground">
        Digits tween as numbers — Soft settle, no scramble.
      </p>
    </div>
  )
}

export function DemoTransitionPanel() {
  const [activeKey, setActiveKey] = React.useState("overview")

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "motion", label: "Motion" },
    { key: "a11y", label: "A11y" },
  ] as const

  const panels = {
    overview: (
      <>
        <p className="ms-stamp mb-2">Overview</p>
        <p className="font-medium">Discrete panel swap</p>
        <p className="mt-1 text-muted-foreground">
          Exit finishes before enter — wait mode for feature tabs.
        </p>
      </>
    ),
    motion: (
      <>
        <p className="ms-stamp mb-2">Motion</p>
        <p className="font-medium">Opacity + small y</p>
        <p className="mt-1 text-muted-foreground">
          pageFade duration, easeOutSoft — no spring overshoot.
        </p>
      </>
    ),
    a11y: (
      <>
        <p className="ms-stamp mb-2">A11y</p>
        <p className="font-medium">Reduced motion</p>
        <p className="mt-1 text-muted-foreground">
          Instant swap when prefers-reduced-motion is set.
        </p>
      </>
    ),
  }

  return (
    <div className="flex w-full max-w-md flex-col items-stretch gap-4">
      <div className="flex gap-1 rounded-lg border border-border-subtle bg-muted/40 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveKey(tab.key)}
            className={
              activeKey === tab.key
                ? "flex-1 rounded-md bg-card px-3 py-1.5 text-sm font-medium text-foreground shadow-sm"
                : "flex-1 rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
            }
          >
            {tab.label}
          </button>
        ))}
      </div>
      <TransitionPanel
        activeKey={activeKey}
        className="rounded-xl border border-border-subtle bg-card px-6 py-5 text-sm text-foreground shadow-sm"
      >
        {panels}
      </TransitionPanel>
    </div>
  )
}

export function DemoLabelRoll() {
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-3 py-4">
      <a href="#demo" className="text-base font-medium text-foreground">
        <LabelRoll secondary="Install AtroUI">Get started</LabelRoll>
      </a>
      <p className="text-center text-sm text-muted-foreground">
        Hover or focus — clipped dual-copy roll.
      </p>
    </div>
  )
}

export function DemoMagnetic() {
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-3 py-4">
      <Magnetic
        className="w-full max-w-xs overflow-hidden rounded-[var(--radius)] border border-border-subtle bg-card"
        intensity={0.28}
        range={64}
      >
        <img
          src={IMAGEORY.landscape}
          alt=""
          className="aspect-[16/10] w-full object-cover"
        />
      </Magnetic>
      <p className="text-center text-sm text-muted-foreground">
        Move over the card — mild pull, tween settle. Media from Imageory.
      </p>
    </div>
  )
}

export function DemoTilt() {
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-3 py-6">
      <Tilt
        className="w-full max-w-xs overflow-hidden rounded-[var(--radius)] border border-border-subtle bg-card"
        rotationFactor={6}
      >
        <img
          src={IMAGEORY.sky}
          alt=""
          className="aspect-[16/10] w-full object-cover"
        />
      </Tilt>
      <p className="text-center text-sm text-muted-foreground">
        Mild ≤6° tilt. Imageory sky — never Button / Menu chrome.
      </p>
    </div>
  )
}

export function DemoSpotlight() {
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-3 py-4">
      <Spotlight className="w-full max-w-xs rounded-[var(--radius)] border border-border-subtle bg-zinc-950">
        <img
          src={IMAGEORY.darkVoid}
          alt=""
          className="aspect-[16/10] w-full object-cover opacity-90"
        />
      </Spotlight>
      <p className="text-center text-sm text-muted-foreground">
        Low-opacity wash on dark Imageory media.
      </p>
    </div>
  )
}

export function DemoLineReveal() {
  const [key, setKey] = React.useState(0)

  return (
    <div className="flex w-full max-w-lg flex-col items-stretch gap-4">
      <LineReveal
        key={key}
        preview
        className="text-left text-lg font-medium tracking-tight text-foreground"
      >
        Show the fundamental first. Reveal depth only when it is relevant.
      </LineReveal>
      <button
        type="button"
        onClick={() => setKey((k) => k + 1)}
        className="atro-btn-ghost self-center"
      >
        Replay
      </button>
    </div>
  )
}

export function DemoWordRevealScroll() {
  const [key, setKey] = React.useState(0)

  return (
    <div className="flex w-full max-w-lg flex-col items-stretch gap-4">
      <WordRevealScroll
        key={key}
        preview
        className="text-left text-lg font-medium tracking-tight text-foreground"
      >
        Your next ship starts right now
      </WordRevealScroll>
      <button
        type="button"
        onClick={() => setKey((k) => k + 1)}
        className="atro-btn-ghost self-center"
      >
        Replay
      </button>
    </div>
  )
}

export function DemoStagger() {
  const [key, setKey] = React.useState(0)

  return (
    <div className="flex w-full max-w-md flex-col items-stretch gap-4">
      <Stagger key={key} preview className="flex flex-col gap-2 text-left">
        {["First", "Second", "Third"].map((item) => (
          <StaggerChild key={item}>
            <div className="rounded-lg border border-border-subtle bg-card px-4 py-2.5 text-sm text-foreground">
              {item}
            </div>
          </StaggerChild>
        ))}
      </Stagger>
      <button
        type="button"
        onClick={() => setKey((k) => k + 1)}
        className="atro-btn-ghost self-center"
      >
        Replay
      </button>
    </div>
  )
}

export function DemoStaggerSlow() {
  const [key, setKey] = React.useState(0)

  return (
    <div className="flex w-full max-w-md flex-col items-stretch gap-4">
      <Stagger
        key={key}
        preview
        delay={0.15}
        stagger={0.18}
        className="flex flex-col gap-2 text-left"
      >
        {["Hold", "Then", "Cascade"].map((item) => (
          <StaggerChild key={item} y={22}>
            <div className="rounded-lg border border-border-subtle bg-card px-4 py-2.5 text-sm text-foreground">
              {item}
            </div>
          </StaggerChild>
        ))}
      </Stagger>
      <button
        type="button"
        onClick={() => setKey((k) => k + 1)}
        className="atro-btn-ghost self-center"
      >
        Replay
      </button>
    </div>
  )
}

export function DemoScrollProgress() {
  const containerRef = React.useRef<HTMLDivElement>(null)

  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl border border-border-subtle bg-background shadow-sm">
      <div className="relative border-b border-border-subtle bg-muted/40 px-4 py-2.5">
        <p className="ms-stamp">ScrollProgress</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Scroll the panel — scaleX tracks progress directly (no spring lag).
        </p>
        <ScrollProgress
          containerRef={containerRef}
          className="absolute inset-x-0 bottom-0 h-0.5 bg-brand"
        />
      </div>
      <div
        ref={containerRef}
        className="h-48 overflow-y-auto overscroll-contain px-4 py-3 text-sm leading-relaxed text-muted-foreground"
      >
        <p className="font-medium text-foreground">Reading pane</p>
        {Array.from({ length: 12 }, (_, i) => (
          <p key={i} className="mt-3">
            Section {i + 1}. Production mounts fixed at the viewport top and
            binds{" "}
            <code className="font-mono text-xs text-foreground">
              scrollYProgress
            </code>{" "}
            →{" "}
            <code className="font-mono text-xs text-foreground">scaleX</code>.
            Pass{" "}
            <code className="font-mono text-xs text-foreground">
              springOptions
            </code>{" "}
            only if you want a soft settle. Reduced motion hides the bar.
          </p>
        ))}
      </div>
    </div>
  )
}

export function DemoOgLivePreview() {
  // Same `@atroui/og-live-preview` source users install — CSS-only card.
  return (
    <div className="relative aspect-[1200/630] w-full max-w-xl overflow-hidden rounded-xl ring-1 ring-border-subtle">
      <OgLivePreview
        title={"Ship in days,\nnot quarters."}
        subtitle="AtroUI - your component catalog"
        styleKey="paperQuote"
      />
    </div>
  )
}

export function DemoOgExamples() {
  // Same `@atroui/og-examples` source users install — not npm.
  return (
    <div className="w-full border-y border-border-subtle bg-background">
      <OgExamples preview className="w-full" />
    </div>
  )
}

export function DemoOgWorkspace() {
  // Same `@atroui/og-workspace` install (CSS preview shell). Live /og tool is npm Host API.
  return (
    <div className="w-full max-h-[520px] overflow-auto rounded-xl border border-border-subtle">
      <OgWorkspace />
    </div>
  )
}

export function DemoThumbnailLivePreview() {
  return (
    <div className="relative aspect-video w-full max-w-xl overflow-hidden rounded-xl ring-1 ring-border-subtle">
      <ThumbnailLivePreview
        title="Build in public"
        subtitle="Episode 12"
        styleKey="youtubePop"
        format="youtube"
      />
    </div>
  )
}

export function DemoNewsletterForm() {
  return <NewsletterForm className="w-full max-w-md" />
}

export function DemoWaitlistForm() {
  return (
    <div className="mx-auto w-full max-w-md">
      <WaitlistStagePreview />
    </div>
  )
}

export function DemoSocialShare() {
  return (
    <SocialShare
      url="https://example.com/article"
      title="How we ship calm interfaces"
    />
  )
}

export function DemoFaqInteractivePreview() {
  return <FaqInteractivePreview />
}

export function DemoContextualCta() {
  return (
    <div className="w-full max-w-xl">
      <ContextualCTA preview />
    </div>
  )
}

export function DemoExitIntentPopup() {
  return (
    <div className="w-full max-w-lg">
      <ExitIntentPopup preview />
    </div>
  )
}

export function DemoMadeWithEmbed() {
  return <MadeWithEmbed />
}

function HeadlessShell({
  stamp,
  title,
  children,
}: {
  stamp: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="w-full max-w-2xl overflow-hidden border border-border-subtle bg-background text-left">
      <div className="border-b border-border-subtle bg-muted/40 px-4 py-3">
        <p className="ms-stamp">{stamp}</p>
        <p className="mt-2 text-sm font-medium text-foreground">{title}</p>
      </div>
      <div className="space-y-4 p-4 text-sm text-muted-foreground">{children}</div>
    </div>
  )
}

export function DemoAnalyticsProvider() {
  const plausible = Boolean(process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN)
  const ga = Boolean(process.env.NEXT_PUBLIC_GA_ID)

  return (
    <HeadlessShell
      stamp="Headless"
      title="AnalyticsProvider - scripts + experiments, no chrome"
    >
      <p>
        Mount once near the root. Loads Plausible / GA when env is set, fires{" "}
        <code className="font-mono text-xs text-foreground">page_view</code>, and
        exposes sticky A/B variants via{" "}
        <code className="font-mono text-xs text-foreground">useExperiment</code>.
      </p>
      <ul className="divide-y divide-border-subtle border border-border-subtle">
        <li className="flex items-center justify-between gap-3 px-3 py-2.5">
          <span>NEXT_PUBLIC_PLAUSIBLE_DOMAIN</span>
          <span className={plausible ? "text-brand" : "text-muted-foreground"}>
            {plausible ? "configured" : "not set"}
          </span>
        </li>
        <li className="flex items-center justify-between gap-3 px-3 py-2.5">
          <span>NEXT_PUBLIC_GA_ID</span>
          <span className={ga ? "text-brand" : "text-muted-foreground"}>
            {ga ? "configured" : "not set"}
          </span>
        </li>
      </ul>
      <button
        type="button"
        className="atro-btn-ghost"
        onClick={() =>
          trackEvent("docs_demo_click", { source: "analytics-provider-docs" })
        }
      >
        Fire demo trackEvent
      </button>
      <p className="text-xs">
        In development, events log to the browser console as{" "}
        <code className="font-mono text-foreground">[analytics]</code>.
      </p>
    </HeadlessShell>
  )
}

export function DemoSiteFooter() {
  // Same `@atroui/site-footer` source users install — not npm.
  return <SiteFooter />
}

export function DemoCalendlyEmbed() {
  return (
    <div className="w-full max-w-lg overflow-hidden rounded-[var(--atro-panel-radius)] border border-border-subtle bg-card/40">
      <CalendlyEmbed />
    </div>
  )
}

export function DemoArPortfolio() {
  return (
    <div className="w-full max-h-[640px] overflow-auto rounded-[var(--atro-panel-radius)] border border-border-subtle bg-background p-5 sm:p-8">
      <ArPortfolio />
    </div>
  )
}

export function DemoScopeChat() {
  return (
    <div className="w-full max-h-[520px] overflow-auto rounded-xl border border-border-subtle">
      <ScopeChat />
    </div>
  )
}

export function DemoProjectPlanner() {
  // Same `@atroui/project-planner` source users install — not npm.
  return (
    <div className="w-full max-h-[520px] overflow-auto rounded-xl border border-border-subtle">
      <ProjectPlanner />
    </div>
  )
}

export function DemoResourcesContent() {
  return <ResourcesContent />
}

export function DemoJournalContent() {
  return <JournalContent />
}

export function DemoLiveDashboard() {
  return <LiveDashboard />
}

export function DemoThumbnailWorkspace() {
  return (
    <div className="w-full max-h-[520px] overflow-auto rounded-xl border border-border-subtle">
      <ThumbnailWorkspace />
    </div>
  )
}

export function DemoTimelineAnimation() {
  const ref = React.useRef<HTMLDivElement>(null)
  return (
    <div ref={ref} className="w-full max-w-sm space-y-2 text-left">
      {["Scope", "Build", "Ship"].map((label, i) => (
        <TimelineAnimation
          key={label}
          animationNum={i}
          timelineRef={ref}
          className="rounded-lg border border-border-subtle bg-card px-4 py-3 text-sm"
        >
          {label}
        </TimelineAnimation>
      ))}
    </div>
  )
}

export function DemoThemeProviderNote() {
  return (
    <div className="w-full max-w-lg overflow-hidden rounded-xl border border-border-subtle bg-background text-left shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-border-subtle bg-muted/40 px-4 py-3">
        <div>
          <p className="ms-stamp">Provider</p>
          <p className="mt-1 text-sm font-medium text-foreground">
            ThemeProvider is active
          </p>
        </div>
        <ThemeToggle />
      </div>
      <div className="grid gap-3 p-4 sm:grid-cols-2">
        <div className="rounded-lg border border-border-subtle bg-card p-4 text-card-foreground">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Card
          </p>
          <p className="mt-2 text-sm text-foreground">
            Surfaces use design tokens that flip with light / dark.
          </p>
        </div>
        <div className="rounded-lg border border-border-subtle bg-muted p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Muted
          </p>
          <p className="mt-2 text-sm text-foreground">
            Try Light / System / Dark with the toggle.
          </p>
          <span className="mt-3 inline-flex h-8 items-center bg-brand px-2.5 text-xs font-medium text-[oklch(0.22_0.02_55)]">
            Brand
          </span>
        </div>
      </div>
    </div>
  )
}

/** Indie site kit demos — center the 640px column in the wide docs preview. */
function IndieKitFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[640px] px-4 py-6 sm:px-5 sm:py-8">
      {children}
    </div>
  )
}

export function DemoCountUp() {
  return (
    <div className="flex items-baseline justify-center gap-2 font-mono tabular-nums">
      <CountUp
        value={128}
        className="text-5xl font-medium tracking-tight text-foreground"
        ariaLabel="128"
      />
      <span className="text-sm text-muted-foreground">ships</span>
    </div>
  )
}

export function DemoCountUpSlow() {
  return (
    <div className="flex items-baseline justify-center gap-2 font-mono tabular-nums">
      <CountUp
        value={42}
        duration={2400}
        className="text-5xl font-medium tracking-tight text-foreground"
        ariaLabel="42"
      />
      <span className="text-sm text-muted-foreground">blocks</span>
    </div>
  )
}

export function DemoDeadlineCountdown() {
  return (
    <IndieKitFrame>
      <DeadlineCountdown className="w-full" />
    </IndieKitFrame>
  )
}

export function DemoProjectList() {
  return (
    <IndieKitFrame>
      <ProjectList className="w-full" />
    </IndieKitFrame>
  )
}

export function DemoChangelog() {
  return (
    <IndieKitFrame>
      <Changelog className="w-full" />
    </IndieKitFrame>
  )
}

export function DemoCommandMenu() {
  return (
    <div className="relative mx-auto w-full max-w-md rounded-xl border border-border-subtle bg-background px-6 py-10 text-center">
      <p className="text-sm text-muted-foreground">
        Press{" "}
        <kbd className="rounded border border-border-subtle bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground">
          ⌘K
        </kbd>{" "}
        (or Ctrl+K) to open the command menu.
      </p>
      <CommandMenu />
    </div>
  )
}

/** Contained gallery thumb — no portal (⌘K is for the live docs page). */
export function DemoCommandMenuGallery() {
  return (
    <div className="flex h-full items-center justify-center bg-background p-4">
      <div className="w-full max-w-[14rem] overflow-hidden rounded-lg border border-border-subtle bg-card shadow-sm">
        <div className="flex items-center gap-2 border-b border-border-subtle px-2.5 py-2">
          <span className="flex-1 truncate font-mono text-[10px] text-muted-foreground">
            Search docs…
          </span>
          <kbd className="rounded border border-border-subtle px-1 font-mono text-[9px] text-muted-foreground">
            ⌘K
          </kbd>
        </div>
        <ul className="space-y-0.5 p-1.5 font-mono text-[10px] text-foreground">
          <li className="rounded-md bg-white/[0.06] px-2 py-1.5">Home</li>
          <li className="rounded-md px-2 py-1.5 text-muted-foreground">
            Components
          </li>
          <li className="rounded-md px-2 py-1.5 text-muted-foreground">Blog</li>
        </ul>
      </div>
    </div>
  )
}

export function DemoPersonalHero() {
  return (
    <IndieKitFrame>
      <PersonalHero
        name="Your Name"
        imageSrc={mediaSrc(MEDIA.founderPortrait)}
        imageAlt="Portrait"
        className="w-full px-0 pt-2 sm:pt-4"
      />
    </IndieKitFrame>
  )
}

export function DemoResume() {
  return (
    <div className="mx-auto max-h-[560px] w-full max-w-[720px] overflow-auto">
      <Resume />
    </div>
  )
}

export function DemoLocalClock() {
  return (
    <div className="flex justify-center py-6">
      <LocalClock timezone="America/New_York" timezoneLabel="NYC" />
    </div>
  )
}

export function DemoLocalClockLondon() {
  return (
    <div className="flex justify-center py-6">
      <LocalClock timezone="Europe/London" timezoneLabel="LON" />
    </div>
  )
}

export function DemoWeatherChip() {
  return (
    <div className="flex justify-center py-6">
      <WeatherChip lat={40.7128} lon={-74.006} label="NYC" />
    </div>
  )
}

export function DemoWeatherChipLondon() {
  return (
    <div className="flex justify-center py-6">
      <WeatherChip lat={51.5074} lon={-0.1278} label="LON" />
    </div>
  )
}
