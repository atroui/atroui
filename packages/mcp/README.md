# @atroui/mcp

stdio [MCP](https://modelcontextprotocol.io) server for the AtroUI registry. Agents search the catalog, get install commands, and load design / Host API skills.

The server does not write component files. It returns commands.

Public install (live shadcn directory): `npx shadcn@latest add @atroui/{name}`. First-party `npx atroui add {name}` is reserved until `@atroui/cli` is published.

## Local (this repo, before npm)

```bash
pnpm --filter @atroui/mcp build
```

`.cursor/mcp.json` in this monorepo already points at `packages/mcp/dist/index.js`.

Write a client config that uses `npx` (after publish):

```bash
node packages/mcp/dist/index.js init --client cursor
node packages/mcp/dist/index.js init --client claude
```

## After publish

```json
{
  "mcpServers": {
    "atroui": {
      "command": "npx",
      "args": ["-y", "@atroui/mcp"]
    }
  }
}
```

Cursor Marketplace listing (icon + Add to Cursor) needs npm plus a submit at cursor.com/marketplace/publish. Plugin files live at `.cursor-plugin/plugin.json`.

## Tools

| Tool | Role |
| --- | --- |
| `search_components` | Search name / title / description |
| `get_item` | One item + shadcn and atroui install lines |
| `get_skill` | `design` or `host-api` (aliases: `family-values`, `byok`) |

Docs: [atroui.com/docs/mcp](https://www.atroui.com/docs/mcp)
