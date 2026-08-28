export const hostApiFaqs = [
  {
    question: "What is an AtroUI Host API?",
    answer:
      "A Host API is a thin Next.js App Router API route running on your own server that delegates processing to secure, pre-hardened validation and security handlers inside the local atroui npm package.",
  },
  {
    question: "Does AtroUI host any of my AI or SMTP keys?",
    answer:
      "No. AtroUI operates under a strict Bring Your Own Keys (BYOK) model. All secret tokens, API keys, and SMTP server passwords remain in your local environment variables and are never transmitted to AtroUI's documentation hosts.",
  },
  {
    question: "How are Host APIs secured against spam and abuse?",
    answer:
      "Every handler includes out-of-the-box production-ready safeguards: sliding-window rate limits (in-memory or Upstash Redis REST/Vercel KV), automatic honeypot spam fields, payload size capping (8 MB request size limit), and attachment filters.",
  },
] as const
