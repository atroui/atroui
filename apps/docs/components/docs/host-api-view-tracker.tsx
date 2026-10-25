"use client"

import { useEffect } from "react"
import { captureHostApiViewed } from "@/lib/analytics-capture"

/** Fires once per session when the Host API docs page mounts. */
export function HostApiViewTracker({ from = "docs_host_api" }: { from?: string }) {
  useEffect(() => {
    captureHostApiViewed(from)
  }, [from])

  return null
}
