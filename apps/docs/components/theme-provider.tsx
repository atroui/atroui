"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import { resolveSiteTheme, SITE_THEMES } from "@/lib/site-themes"

function DarkClassSync({ children }: { children: React.ReactNode }) {
  const { theme, resolvedTheme } = useTheme()

  React.useEffect(() => {
    const id = resolveSiteTheme(theme ?? resolvedTheme)
    const sheet = SITE_THEMES.find((item) => item.id === id)
    document.documentElement.classList.toggle("dark", sheet?.kind === "dark")
  }, [theme, resolvedTheme])

  return children
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <DarkClassSync>{children}</DarkClassSync>
    </NextThemesProvider>
  )
}
