"use client"

import { useEffect } from "react"
import { captureLaunchWorkflowViewed } from "@/lib/analytics-capture"

/** Fires once per session when the Launch workflow guide mounts. */
export function LaunchWorkflowViewTracker() {
  useEffect(() => {
    captureLaunchWorkflowViewed()
  }, [])

  return null
}
