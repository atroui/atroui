/**
 * Safe PostHog helpers for the docs host only.
 * No-ops when the client token is unset (init skipped in instrumentation-client).
 */

import posthog from "posthog-js"

type Props = Record<string, string | number | boolean | null | undefined>

function safeCapture(event: string, properties?: Props) {
  try {
    if (typeof window === "undefined") return
    if (!process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) return
    posthog.capture(event, properties)
  } catch {
    /* never block UI on analytics */
  }
}

/** Docs / landing install or code copy. */
export function captureCodeCopied(properties: {
  language?: string
  kind?: "install" | "snippet" | "agent"
  command?: string
  registry_name?: string
  source?: string
  embedded?: boolean
  file?: string
}) {
  safeCapture("documentation_code_copied", properties)
}

/** Once-per-session Host API interest. */
export function captureHostApiViewed(from?: string) {
  try {
    if (typeof window === "undefined") return
    const key = "atro-host-api-viewed"
    if (sessionStorage.getItem(key) === "1") return
    sessionStorage.setItem(key, "1")
  } catch {
    /* private mode — still capture once this call */
  }
  safeCapture("documentation_host_api_viewed", from ? { from } : undefined)
}

/** Launch workflow guide interest. */
export function captureLaunchWorkflowViewed() {
  try {
    if (typeof window === "undefined") return
    const key = "atro-launch-viewed"
    if (sessionStorage.getItem(key) === "1") return
    sessionStorage.setItem(key, "1")
  } catch {
    /* continue */
  }
  safeCapture("documentation_launch_workflow_viewed")
}

/** Parse `@atroui/foo` from an install command when present. */
export function registryNameFromCommand(command: string): string | undefined {
  const match = command.match(/@atroui\/[\w-]+/)
  return match?.[0]
}
