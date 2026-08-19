#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from "zod"
import {
  docsUrl,
  getCatalogItem,
  installCommands,
  loadCatalog,
  searchCatalog,
} from "./catalog.js"
import { parseInitArgs, writeClientConfig } from "./init.js"
import { getSkill, listSkills } from "./skills.js"

const INSTALL_NOTE =
  "shadcn is the public install path (official directory). npx atroui add is the first-party CLI on the ni2 branch — not published yet. Prefer shadcn until that CLI is live."

function withInstall(item: { name: string; title: string; description: string; type: string }) {
  const commands = installCommands(item.name)
  return {
    ...item,
    install: commands.shadcn,
    installCommands: commands,
    note: INSTALL_NOTE,
  }
}

async function startServer() {
  const catalog = loadCatalog()
  const server = new McpServer({
    name: "atroui",
    version: "0.1.0",
  })

  server.tool(
    "search_components",
    "Search the AtroUI registry by name, title, or description. Empty query lists the first items.",
    { query: z.string().describe("Search text, e.g. hero, og, contact") },
    async ({ query }) => {
      const items = searchCatalog(catalog, query)
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(items.map(withInstall), null, 2),
          },
        ],
      }
    }
  )

  server.tool(
    "get_item",
    "Get one AtroUI registry item and install commands. Pass the item name (home-hero) or @atroui/home-hero. Public path is shadcn; atroui CLI is reserved until published.",
    { name: z.string().describe("Registry item name") },
    async ({ name }) => {
      const item = getCatalogItem(catalog, name)
      if (!item) {
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify({
                error: "not_found",
                name,
                hint: "Use search_components to find a valid name.",
              }),
            },
          ],
          isError: true,
        }
      }
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify(
              {
                ...withInstall(item),
                docs: docsUrl(item.name),
              },
              null,
              2
            ),
          },
        ],
      }
    }
  )

  server.tool(
    "get_skill",
    "AtroUI design or Host API / BYOK skill for agents. Omit id to list skills. Ids: design, host-api (aliases: family-values, byok).",
    {
      id: z
        .string()
        .optional()
        .describe("Skill id: design | host-api. Omit to list."),
    },
    async ({ id }) => {
      if (!id) {
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify({ skills: listSkills() }, null, 2),
            },
          ],
        }
      }
      const skill = getSkill(id)
      if (!skill) {
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify({
                error: "not_found",
                id,
                skills: listSkills(),
              }),
            },
          ],
          isError: true,
        }
      }
      return {
        content: [{ type: "text" as const, text: skill.markdown }],
      }
    }
  )

  const transport = new StdioServerTransport()
  await server.connect(transport)
}

async function main() {
  const argv = process.argv.slice(2)
  if (argv[0] === "init") {
    const client = parseInitArgs(argv.slice(1))
    const path = writeClientConfig(process.cwd(), client)
    console.error(`Wrote ${path}`)
    return
  }
  await startServer()
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error)
  console.error(message)
  process.exit(1)
})
