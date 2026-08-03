export type NavItem = {
  title: string
  href: string
  description?: string
}

export type NavSection = {
  title: string
  items: NavItem[]
}

export const navigation: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs", description: "What is Meridian?" },
      { title: "Installation", href: "/docs/installation", description: "Install and configure Meridian" },
      { title: "Theming", href: "/docs/theming", description: "Customize colors and dark mode" },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Overview", href: "/docs/components" },
      { title: "Accordion", href: "/docs/components/accordion" },
      { title: "Avatar", href: "/docs/components/avatar" },
      { title: "Badge", href: "/docs/components/badge" },
      { title: "Button", href: "/docs/components/button" },
      { title: "Card", href: "/docs/components/card" },
      { title: "Checkbox", href: "/docs/components/checkbox" },
      { title: "Dialog", href: "/docs/components/dialog" },
      { title: "Dropdown Menu", href: "/docs/components/dropdown-menu" },
      { title: "Input", href: "/docs/components/input" },
      { title: "Label", href: "/docs/components/label" },
      { title: "Popover", href: "/docs/components/popover" },
      { title: "Radio Group", href: "/docs/components/radio-group" },
      { title: "Select", href: "/docs/components/select" },
      { title: "Separator", href: "/docs/components/separator" },
      { title: "Skeleton", href: "/docs/components/skeleton" },
      { title: "Switch", href: "/docs/components/switch" },
      { title: "Tabs", href: "/docs/components/tabs" },
      { title: "Textarea", href: "/docs/components/textarea" },
      { title: "Toast", href: "/docs/components/toast" },
      { title: "Tooltip", href: "/docs/components/tooltip" },
    ],
  },
]

export const allNavItems = navigation.flatMap((section) => section.items)
