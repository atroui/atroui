import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"

export const MCP_SERVER_ENTRY = {
  command: "npx",
  args: ["-y", "@atroui/mcp"],
} as const

export type InitClient = "cursor" | "claude"

export function clientConfigPath(cwd: string, client: InitClient): string {
  if (client === "claude") return join(cwd, ".mcp.json")
  return join(cwd, ".cursor/mcp.json")
}

export function mergeMcpConfig(existing: string | undefined): string {
  const parsed = existing?.trim()
    ? (JSON.parse(existing) as Record<string, unknown>)
    : {}
  const servers =
    parsed.mcpServers && typeof parsed.mcpServers === "object"
      ? { ...(parsed.mcpServers as Record<string, unknown>) }
      : {}
  servers.atroui = { ...MCP_SERVER_ENTRY }
  return `${JSON.stringify({ ...parsed, mcpServers: servers }, null, 2)}\n`
}

export function writeClientConfig(cwd: string, client: InitClient): string {
  const path = clientConfigPath(cwd, client)
  let existing: string | undefined
  try {
    existing = readFileSync(path, "utf8")
  } catch {
    existing = undefined
  }
  mkdirSync(dirname(path), { recursive: true })
  const next = mergeMcpConfig(existing)
  writeFileSync(path, next)
  return path
}

export function parseInitArgs(argv: string[]): InitClient {
  const clientFlag = argv.findIndex((arg) => arg === "--client")
  if (clientFlag >= 0) {
    const value = argv[clientFlag + 1]
    if (value === "claude" || value === "cursor") return value
    throw new Error("Use --client cursor or --client claude")
  }
  return "cursor"
}
