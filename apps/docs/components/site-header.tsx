import Link from "next/link"
import { Github } from "lucide-react"
import { Button } from "@meridian/ui"
import { ThemeToggle } from "@/components/theme-toggle"
import { CommandMenu } from "@/components/command-menu"
import { MobileSidebar } from "@/components/sidebar"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-4 px-4 sm:px-6">
        <MobileSidebar />
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
            M
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">Meridian</span>
        </Link>
        <nav className="ml-4 hidden items-center gap-4 text-sm md:flex">
          <Link href="/docs" className="text-muted-foreground transition-colors hover:text-foreground">
            Docs
          </Link>
          <Link
            href="/docs/components/button"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Components
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <div className="hidden sm:block">
            <CommandMenu />
          </div>
          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
