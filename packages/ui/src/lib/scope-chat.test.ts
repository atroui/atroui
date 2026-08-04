import { describe, expect, it } from "vitest";

import { getRuleBasedScopeReply } from "./scope-chat";

describe("getRuleBasedScopeReply", () => {
  it("returns a greeting when there is no user message", () => {
    const reply = getRuleBasedScopeReply([]);
    expect(reply).toContain("scoping assistant");
    expect(reply).not.toMatch(/Makershot/i);
  });

  it("matches MVP keywords", () => {
    const reply = getRuleBasedScopeReply([
      { role: "user", content: "I need an MVP in a week" },
    ]);
    expect(reply).toContain("7-Day MVP Sprint");
  });

  it("matches AI keywords", () => {
    const reply = getRuleBasedScopeReply([
      { role: "user", content: "Add an LLM chatbot" },
    ]);
    expect(reply).toContain("AI Integration");
  });

  it("falls back for unmatched messages", () => {
    const reply = getRuleBasedScopeReply([
      { role: "user", content: "hello there" },
    ]);
    expect(reply).toContain("project planner");
  });
});
