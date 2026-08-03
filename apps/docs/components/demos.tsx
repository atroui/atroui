"use client"

import * as React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Skeleton,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  toast,
} from "@meridian/ui"

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}

export function ButtonSizesDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  )
}

export function InputDemo() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="demo-email">Email</Label>
      <Input id="demo-email" type="email" placeholder="you@example.com" />
    </div>
  )
}

export function TextareaDemo() {
  return <Textarea placeholder="Write something thoughtful…" className="max-w-sm" />
}

export function LabelDemo() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="label-demo" />
      <Label htmlFor="label-demo">Labeled control</Label>
    </div>
  )
}

export function CheckboxDemo() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="newsletter" defaultChecked />
      <Label htmlFor="newsletter">Subscribe to newsletter</Label>
    </div>
  )
}

export function SwitchDemo() {
  return (
    <div className="flex items-center gap-2">
      <Switch id="notifications" />
      <Label htmlFor="notifications">Enable notifications</Label>
    </div>
  )
}

export function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="comfortable" className="gap-3">
      {["default", "comfortable", "compact"].map((value) => (
        <div key={value} className="flex items-center gap-2">
          <RadioGroupItem value={value} id={`radio-${value}`} />
          <Label htmlFor={`radio-${value}`} className="capitalize">
            {value}
          </Label>
        </div>
      ))}
    </RadioGroup>
  )
}

export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="Select a framework" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="next">Next.js</SelectItem>
        <SelectItem value="remix">Remix</SelectItem>
        <SelectItem value="astro">Astro</SelectItem>
      </SelectContent>
    </Select>
  )
}

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm action</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to continue?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuItem>Archive</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function ToastDemo() {
  return (
    <Button
      onClick={() =>
        toast.success("Saved successfully", {
          description: "Your changes have been persisted.",
        })
      }
    >
      Show toast
    </Button>
  )
}

export function BadgeDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  )
}

export function AvatarDemo() {
  return (
    <div className="flex gap-3">
      <Avatar>
        <AvatarImage src="https://github.com/vercel.png" alt="Vercel" />
        <AvatarFallback>VC</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>MR</AvatarFallback>
      </Avatar>
    </div>
  )
}

export function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Project Alpha</CardTitle>
        <CardDescription>Deployed 2 hours ago</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          A calm production surface with clear hierarchy and soft elevation.
        </p>
      </CardContent>
      <CardFooter>
        <Button size="sm">View project</Button>
      </CardFooter>
    </Card>
  )
}

export function TabsDemo() {
  return (
    <Tabs defaultValue="preview" className="w-full max-w-sm">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview" className="text-sm text-muted-foreground">
        Live preview of your component.
      </TabsContent>
      <TabsContent value="code" className="text-sm text-muted-foreground">
        Source code for the example.
      </TabsContent>
    </Tabs>
  )
}

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full max-w-sm">
      <AccordionItem value="1">
        <AccordionTrigger>Accessibility</AccordionTrigger>
        <AccordionContent>Built on Radix with full keyboard support.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="2">
        <AccordionTrigger>Theming</AccordionTrigger>
        <AccordionContent>Override CSS variables to match your brand.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export function TooltipDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover</Button>
        </TooltipTrigger>
        <TooltipContent>Helpful hint</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function SkeletonDemo() {
  return (
    <div className="flex w-full max-w-sm items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  )
}

export function SeparatorDemo() {
  return (
    <div className="w-full max-w-sm space-y-3">
      <p className="text-sm font-medium">Meridian UI</p>
      <Separator />
      <p className="text-sm text-muted-foreground">Calm components for modern apps.</p>
    </div>
  )
}

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-1">
          <p className="text-sm font-medium">Dimensions</p>
          <p className="text-sm text-muted-foreground">Set width and height for the layer.</p>
        </div>
      </PopoverContent>
    </Popover>
  )
}
