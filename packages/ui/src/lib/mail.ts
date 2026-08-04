import type nodemailer from "nodemailer";

export type MailAttachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

export type SendMailOptions = {
  to: string;
  from: string;
  replyTo?: string;
  subject: string;
  text: string;
  html?: string;
  attachments?: MailAttachment[];
};

/** True when Gmail / SMTP credentials are configured. */
export function isSmtpConfigured(): boolean {
  const user = process.env.SMTP_USER?.trim();
  const pass =
    process.env.SMTP_PASSWORD?.trim() || process.env.SMTP_PASS?.trim();
  return Boolean(user && pass);
}

function getSmtpConfig() {
  const user = process.env.SMTP_USER?.trim();
  const pass =
    process.env.SMTP_PASSWORD?.trim() || process.env.SMTP_PASS?.trim();
  if (!user || !pass) {
    throw new Error("SMTP_USER and SMTP_PASSWORD are required for SMTP.");
  }

  const port = Number(process.env.SMTP_PORT?.trim() || "587");
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  return {
    host: process.env.SMTP_HOST?.trim() || "smtp.gmail.com",
    port,
    secure,
    auth: { user, pass },
  };
}

let cachedTransport: nodemailer.Transporter | null = null;

async function getTransport(): Promise<nodemailer.Transporter> {
  if (cachedTransport) return cachedTransport;
  const nodemailerMod = await import("nodemailer");
  cachedTransport = nodemailerMod.default.createTransport(getSmtpConfig());
  return cachedTransport;
}

/** Send via Gmail / SMTP (hello@makershot.tech). */
export async function sendMail(options: SendMailOptions): Promise<void> {
  const transport = await getTransport();
  await transport.sendMail({
    from: options.from,
    to: options.to,
    replyTo: options.replyTo,
    subject: options.subject,
    text: options.text,
    html: options.html,
    attachments: options.attachments?.map((a) => ({
      filename: a.filename,
      content: a.content,
      contentType: a.contentType,
    })),
  });
}

export function getDefaultFromAddress(): string {
  return (
    process.env.CONTACT_EMAIL_FROM?.trim() ||
    process.env.SMTP_USER?.trim() ||
    "Makershot <hello@makershot.tech>"
  );
}
