import fs from "fs";
import path from "path";

import { getSiteUrl } from "./site-url";

const KEY_FILE = path.join(process.cwd(), "public", "INDEX_NOW_KEY.txt");
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

export type IndexNowResult = {
  ok: boolean;
  status: number;
  submitted: string[];
  host: string;
  keyLocation: string;
  message?: string;
};

/** Read IndexNow key from public/INDEX_NOW_KEY.txt or INDEX_NOW_KEY env. */
export function getIndexNowKey(): string {
  const fromEnv = process.env.INDEX_NOW_KEY?.trim();
  if (fromEnv) return fromEnv;

  if (!fs.existsSync(KEY_FILE)) {
    throw new Error(
      "IndexNow key not found. Add public/INDEX_NOW_KEY.txt or set INDEX_NOW_KEY env."
    );
  }
  return fs.readFileSync(KEY_FILE, "utf8").trim();
}

function toAbsoluteUrl(urlOrPath: string): string {
  const siteUrl = getSiteUrl();
  if (urlOrPath.startsWith("http://") || urlOrPath.startsWith("https://")) {
    return urlOrPath;
  }
  const pathPart = urlOrPath.startsWith("/") ? urlOrPath : `/${urlOrPath}`;
  return `${siteUrl}${pathPart}`;
}

/**
 * Submit URLs to IndexNow (Bing, Yandex, Naver, Seznam, etc.).
 * @see https://www.indexnow.org/documentation
 */
export async function submitToIndexNow(
  urls: string[]
): Promise<IndexNowResult> {
  const siteUrl = getSiteUrl();
  const host = new URL(siteUrl).host;
  const key = getIndexNowKey();
  const keyLocation = `${siteUrl}/INDEX_NOW_KEY.txt`;

  const urlList = [...new Set(urls.map(toAbsoluteUrl))].slice(0, 10_000);

  if (urlList.length === 0) {
    return {
      ok: false,
      status: 400,
      submitted: [],
      host,
      keyLocation,
      message: "No URLs provided",
    };
  }

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host, key, keyLocation, urlList }),
  });

  // 200 = OK, 202 = Accepted
  const ok = res.status === 200 || res.status === 202;
  const message = ok ? undefined : await res.text().catch(() => res.statusText);

  return {
    ok,
    status: res.status,
    submitted: urlList,
    host,
    keyLocation,
    message,
  };
}

/** Extract pathname from a URL or path string. */
export function urlToPath(urlOrPath: string): string {
  if (urlOrPath.startsWith("/")) return urlOrPath;
  try {
    return new URL(urlOrPath).pathname;
  } catch {
    return urlOrPath.startsWith("/") ? urlOrPath : `/${urlOrPath}`;
  }
}
