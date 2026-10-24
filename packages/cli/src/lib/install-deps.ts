import { execSync } from "node:child_process"
import * as p from "@clack/prompts"
import pc from "picocolors"
import {
  detectPackageManager,
  installCommand,
  missingPackages,
  readInstalledPackages,
} from "./project.js"

export async function installMissingDeps(
  deps: string[],
  cwd = process.cwd(),
  opts: { yes?: boolean } = {}
): Promise<void> {
  if (deps.length === 0) return

  const installed = readInstalledPackages(cwd)
  const missing = missingPackages(deps, installed)
  if (missing.length === 0) {
    p.log.info("All npm dependencies already installed.")
    return
  }

  if (!opts.yes) {
    const ok = await p.confirm({
      message: `Install ${missing.length} package(s): ${pc.yellow(missing.join(", "))}?`,
      initialValue: true,
    })
    if (p.isCancel(ok) || !ok) {
      p.log.warn("Skipped npm install. Add packages manually if needed.")
      return
    }
  }

  const pm = detectPackageManager(cwd)
  const cmd = installCommand(pm, missing)
  p.log.info(`Running ${pc.dim(cmd)}`)
  execSync(cmd, { cwd, stdio: "inherit" })
}
