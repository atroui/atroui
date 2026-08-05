import { z } from "zod";

/**
 * Server-side environment validation.
 * Imported from instrumentation.ts on startup - throws on invalid formats.
 */
const serverEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  RESEND_API_KEY: z.string().min(1).optional(),
  CONTACT_EMAIL_TO: z.string().email().optional(),
  CONTACT_EMAIL_FROM: z.string().optional(),
  RESEND_AUDIENCE_ID: z.string().optional(),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().email().optional(),
  SMTP_PASSWORD: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_SECURE: z.string().optional(),
  GEMINI_API_KEY: z.string().optional(),
  GOOGLE_AI_KEY: z.string().optional(),
  GOOGLE_AI_API_KEY: z.string().optional(),
  HUGGINGFACE_API_KEY: z.string().optional(),
  REVALIDATE_SECRET: z.string().optional(),
  INDEX_NOW_KEY: z.string().optional(),
});

const clientEnvSchema = z.object({
  NEXT_PUBLIC_PLAUSIBLE_DOMAIN: z.string().optional(),
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: z.string().optional(),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

function parseServerEnv(): ServerEnv {
  const result = serverEnvSchema.safeParse(process.env);
  if (!result.success) {
    const message = result.error.issues
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(`Invalid server environment variables:\n${message}`);
  }
  return result.data;
}

function parseClientEnv() {
  const result = clientEnvSchema.safeParse({
    NEXT_PUBLIC_PLAUSIBLE_DOMAIN: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
    NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  });
  if (!result.success) {
    const message = result.error.issues
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(`Invalid client environment variables:\n${message}`);
  }
  return result.data;
}

/** Validated server env - call only on server. */
export function getServerEnv(): ServerEnv {
  return parseServerEnv();
}

/** Run once at startup via instrumentation.ts */
export function validateEnvOnStartup(): void {
  const env = parseServerEnv();
  parseClientEnv();

  if (env.NODE_ENV === "production") {
    const hasSmtp = Boolean(
      env.SMTP_USER && (env.SMTP_PASSWORD || env.SMTP_PASS)
    );
    const hasResend = Boolean(env.RESEND_API_KEY);
    if (!hasSmtp && !hasResend) {
      console.error(
        "[env] Production is missing email config. Set SMTP_USER + SMTP_PASSWORD (Gmail) or RESEND_API_KEY."
      );
    }
    if (!env.CONTACT_EMAIL_TO && !env.SMTP_USER) {
      console.error(
        "[env] Production: set CONTACT_EMAIL_TO or SMTP_USER for contact form delivery."
      );
    }
  }
}
