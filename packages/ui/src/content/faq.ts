/**
 * Shared FAQ content - used on /services UI and FAQPage JSON-LD.
 */

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

export const SERVICES_FAQ: FaqItem[] = [
  {
    id: "fixed-price",
    category: "Engagement",
    question: "Why fixed-price instead of hourly?",
    answer:
      "Hourly aligns incentives against you. Fixed price means we scope carefully up-front and ship on time - if we go over, that's our problem, not yours.",
  },
  {
    id: "stack",
    category: "Technical",
    question: "What stack do you use?",
    answer:
      "Next.js 16 (App Router), TypeScript, Tailwind + shadcn, Postgres / Supabase, Vercel, and the AI SDK. Happy to work in other stacks, but we ship fastest here.",
  },
  {
    id: "team",
    category: "Engagement",
    question: "Can you work with my existing team?",
    answer:
      "Yes. We slot in like a senior engineer: PR reviews, shared Linear/Notion, and we adopt your conventions. Our job is to make your team faster, not to silo.",
  },
  {
    id: "maintenance",
    category: "Billing",
    question: "What about ongoing maintenance?",
    answer:
      "We offer a monthly retainer for studio time - bug fixes, small features, and infra maintenance. Optional, not bundled with projects.",
  },
  {
    id: "equity",
    category: "Billing",
    question: "Do you take equity?",
    answer:
      "No. We keep it simple with cash-only engagements. Refer us to a founder who'd benefit and we'll send you a thank-you instead.",
  },
  {
    id: "start",
    category: "Timing",
    question: "How fast can you start?",
    answer:
      "Typically within 1–2 weeks of a signed proposal. If you're on a deadline, say so - we keep one slot open for urgent sprints.",
  },
];
