import fs from "fs";
import path from "path";

import { RESOURCES, type Resource } from "../content/resources";

const DOWNLOADS_DIR = path.join(process.cwd(), "public", "downloads");
const EXTENSIONS = [".pdf", ".md", ".txt", ".zip"] as const;

/** Returns `/downloads/{file}` when a matching file exists on disk. */
export function resolveResourceDownloadUrl(resourceId: string): string | null {
  for (const ext of EXTENSIONS) {
    const filename = `${resourceId}${ext}`;
    if (fs.existsSync(path.join(DOWNLOADS_DIR, filename))) {
      return `/downloads/${filename}`;
    }
  }
  return null;
}

export type ResourceWithDownload = Resource & {
  /** Direct download path when a file exists in /public/downloads */
  directDownloadUrl: string | null;
};

export function getResourcesWithDownloads(): ResourceWithDownload[] {
  return RESOURCES.map((r) => {
    const fromDisk = r.externalUrl ? null : resolveResourceDownloadUrl(r.id);
    const fromMeta =
      r.downloadUrl && r.downloadUrl !== "#" ? r.downloadUrl : null;
    return {
      ...r,
      directDownloadUrl: fromDisk ?? fromMeta,
    };
  });
}
