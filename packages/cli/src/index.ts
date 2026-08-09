#!/usr/bin/env node
import { createRequire } from "node:module"
import { Command } from "commander"
import pc from "picocolors"
import { addCommand } from "./commands/add.js"
import { listCommand } from "./commands/list.js"

const require = createRequire(import.meta.url)
const { version } = require("../package.json") as { version: string }

const program = new Command()

program
  .name("atroui")
  .description(
    "Add AtroUI registry components into your project (source in your repo)."
  )
  .version(version)

program
  .command("add")
  .description("Add one or more registry items (interactive if no names given)")
  .argument("[components...]", "Item names, e.g. home-hero site-header")
  .option("-y, --yes", "Skip confirms; skip existing files")
  .option("-f, --overwrite", "Overwrite existing files without prompting")
  .option("-p, --path <dir>", "Custom write root (default: src/ or project root)")
  .option(
    "-r, --registry <url>",
    "Registry base URL",
    "https://www.atroui.com"
  )
  .action(async (components: string[], opts) => {
    try {
      await addCommand(components, {
        yes: Boolean(opts.yes),
        overwrite: Boolean(opts.overwrite),
        path: opts.path as string | undefined,
        registry: opts.registry as string | undefined,
      })
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      console.error(pc.red(`Error: ${message}`))
      process.exit(1)
    }
  })

program
  .command("list")
  .description("List items in the AtroUI registry")
  .option(
    "-r, --registry <url>",
    "Registry base URL",
    "https://www.atroui.com"
  )
  .action(async (opts) => {
    try {
      await listCommand(opts.registry as string | undefined)
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      console.error(pc.red(`Error: ${message}`))
      process.exit(1)
    }
  })

program.parseAsync(process.argv)
