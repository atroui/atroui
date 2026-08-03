import type { Meta, StoryObj } from "@storybook/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Button } from "./button"
import { Toaster, toast } from "./toast"

const meta: Meta = {
  title: "Components/Overlays",
  tags: ["autodocs"],
}

export default meta

export const TabsDefault: StoryObj = {
  render: () => (
    <Tabs defaultValue="account" className="w-80">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="text-sm">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password" className="text-sm">
        Change your password here.
      </TabsContent>
    </Tabs>
  ),
}

export const AccordionDefault: StoryObj = {
  render: () => (
    <Accordion type="single" collapsible className="w-80">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>Yes. It comes with default styles that match Meridian.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}

export const TooltipDefault: StoryObj = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}

export const PopoverDefault: StoryObj = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Dimensions</h4>
          <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

export const ToastDefault: StoryObj = {
  render: () => (
    <>
      <Toaster />
      <Button
        onClick={() =>
          toast("Event created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
          })
        }
      >
        Show toast
      </Button>
    </>
  ),
}
