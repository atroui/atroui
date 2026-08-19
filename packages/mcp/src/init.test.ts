import { mkdtempSync, readFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { describe, expect, it } from "vitest"
import { mergeMcpConfig, parseInitArgs, writeClientConfig } from "./init.js"

describe("init", () => {
  it("defaults to cursor", () => {
    expect(parseInitArgs([])).toBe("cursor")
  })

  it("writes Cursor mcp.json", () => {
    const dir = mkdtempSync(join(tmpdir(), "atroui-mcp-"))
    const path = writeClientConfig(dir, "cursor")
    expect(path).toBe(join(dir, ".cursor/mcp.json"))
    const parsed = JSON.parse(readFileSync(path, "utf8")) as {
      mcpServers: { atroui: { args: string[] } }
    }
    expect(parsed.mcpServers.atroui.args).toEqual(["-y", "@atroui/mcp"])
  })

  it("keeps other servers when merging", () => {
    const next = mergeMcpConfig(
      JSON.stringify({ mcpServers: { other: { command: "echo" } } })
    )
    const parsed = JSON.parse(next) as {
      mcpServers: Record<string, { command: string }>
    }
    expect(parsed.mcpServers.other.command).toBe("echo")
    expect(parsed.mcpServers.atroui.command).toBe("npx")
  })
})
