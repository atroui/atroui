export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  title: string;
  company: string;
  rating: number;
  service?: string;
  videoUrl?: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Koustav shipped what would have taken me two months in a week. I talked to the person building it every day — no handoffs, no surprises.",
    name: "Alex R.",
    title: "Founder",
    company: "Dev tools startup",
    rating: 5,
    service: "mvp-sprint",
  },
  {
    id: "t2",
    quote:
      "The AI feature actually fits our workflow — not a chatbot bolted on the side. Our ops team uses it daily.",
    name: "Priya M.",
    title: "Head of Product",
    company: "Legal tech",
    rating: 5,
    service: "ai-integration",
  },
  {
    id: "t3",
    quote:
      "One person built what agencies quoted us $40k and 4 months for. The codebase is clean enough that our first hire ramped in a week.",
    name: "James K.",
    title: "CEO",
    company: "Marketplace startup",
    rating: 5,
    service: "full-stack-build",
    videoUrl: "https://www.youtube.com/embed/0fYi8SGA20k",
  },
  {
    id: "t4",
    quote:
      "Our design system went from chaos to something the whole team actually uses. PR review time on UI dropped noticeably within the first sprint.",
    name: "Sarah L.",
    title: "Engineering Lead",
    company: "Series A fintech",
    rating: 5,
    service: "design-system",
  },
  {
    id: "t5",
    quote:
      "Async-first but never felt disconnected. Daily updates, live previews, and honest scope conversations. Exactly what a solo founder needs.",
    name: "Marcus T.",
    title: "Indie hacker",
    company: "SaaS side project",
    rating: 5,
    service: "mvp-sprint",
  },
  {
    id: "t6",
    quote:
      "Fixed price, fixed scope, delivered on time. If you're tired of hourly billing and scope creep, this is the model.",
    name: "Elena V.",
    title: "Co-founder",
    company: "B2B analytics",
    rating: 5,
    service: "full-stack-build",
  },
];
