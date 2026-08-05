/** Rule-based project scoping fallback when no AI key is configured. */

export type ScopeMessage = {
  role: "user" | "assistant";
  content: string;
};

const KEYWORDS: { pattern: RegExp; response: string }[] = [
  {
    pattern: /\b(mvp|validate|launch|week|sprint)\b/i,
    response:
      "Sounds like a **7-Day MVP Sprint** ($4,800) fits best. We scope to one core workflow, ship auth + database + one AI feature, and deploy in a week. Want me to connect you with the planner for a detailed estimate?",
  },
  {
    pattern: /\b(ai|ml|gpt|llm|chatbot|document|extract)\b/i,
    response:
      "For AI features, our **AI Integration** package ($2,400+) is the right fit. We wire streaming UI, guardrails, and cost caps - not a bolted-on chatbot. Timeline is typically 1–2 weeks.",
  },
  {
    pattern: /\b(design system|tokens|components|figma|storybook)\b/i,
    response:
      "A **Custom Design System** ($3,600+, 2–3 weeks) gives you tokens, a component library, light/dark mode, and a living docs site. Great when your team is scaling past 2 engineers.",
  },
  {
    pattern: /\b(marketplace|full.?stack|complete|platform|payments)\b/i,
    response:
      "That's a **Full-Stack Build** ($8,000+, 4–8 weeks) - end-to-end product with auth, payments, admin, and observability. We do weekly strategy calls and ship in one loop.",
  },
  {
    pattern: /\b(budget|price|cost|how much)\b/i,
    response:
      "Our packages are fixed-price: MVP Sprint $4,800 · AI Integration from $2,400 · Design System from $3,600 · Full-Stack from $8,000. Use the [project planner](/planner) for a personalized ballpark.",
  },
  {
    pattern: /\b(timeline|how long|when|deadline)\b/i,
    response:
      "Timelines: MVP Sprint = 7 days · AI Integration = 1–2 weeks · Design System = 2–3 weeks · Full-Stack = 4–8 weeks. We keep 1–2 client slots open at a time for fast starts.",
  },
];

export function getRuleBasedScopeReply(messages: ScopeMessage[]): string {
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUser) {
    return "Hi! I'm the scoping assistant. Tell me what you're building - MVP, AI feature, design system, or full product - and I'll recommend the right package.";
  }

  for (const { pattern, response } of KEYWORDS) {
    if (pattern.test(lastUser.content)) return response;
  }

  return "Thanks for sharing! Based on what you've described, I'd suggest starting with our [project planner](/planner) for a tailored recommendation, or [booking a 15-min call](/contact#book) to scope it together. What matters most - speed, AI features, or a complete product?";
}
