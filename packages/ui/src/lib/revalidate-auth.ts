/**
 * Shared secret check for on-demand revalidation / IndexNow routes.
 * Set REVALIDATE_SECRET in production to prevent abuse.
 */
export function isRevalidateAuthorized(request: Request, secret?: unknown): boolean {
  const expected = process.env.REVALIDATE_SECRET?.trim();
  if (!expected) {
    // Allow in dev when secret is unset; require secret in production.
    return process.env.NODE_ENV !== "production";
  }

  const headerSecret = request.headers.get("x-revalidate-secret")?.trim();
  const bearer = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim();
  const bodySecret = typeof secret === "string" ? secret.trim() : "";

  return [headerSecret, bearer, bodySecret].some((s) => s === expected);
}
