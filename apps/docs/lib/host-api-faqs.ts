export const hostApiFaqs = [
  {
    question: "What is an AtroUI Host API?",
    answer:
      "A Host API is a thin Next.js App Router API route running on your own server that delegates processing to secure, pre-hardened validation and security handlers inside the local atroui npm package.",
  },
  {
    question: "Do I need to install atroui for every component?",
    answer:
      "No. Pure UI blocks from the registry need only the shadcn CLI. Install atroui when you add forms or AI tools that call /api/* routes on your app.",
  },
  {
    question: "Where do API keys live?",
    answer:
      "In your deployment environment — SMTP, Resend, Hugging Face, Gemini, etc. AtroUI docs never host shared keys for your production traffic.",
  },
]
