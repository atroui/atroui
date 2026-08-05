"use client";

import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { NewsletterForm } from "../newsletter/newsletter-form";
import { FadeIn } from "../motion/fade-in";
import {
  ARTICLE_CATEGORIES,
  type ArticleCategory,
  getArticles,
  formatArticleDate,
} from "../../lib/articles";
import { cn } from "../../lib/utils";

const chipBase =
  "border px-3 py-1.5 text-xs font-medium transition-colors";
const chipActive = "border-brand bg-brand/10 text-brand";
const chipIdle =
  "border-border-subtle text-muted-foreground hover:border-border hover:text-foreground";

export function JournalContent() {
  const [category, setCategory] = useState<ArticleCategory | "all">("all");
  const [query, setQuery] = useState("");

  const articles = useMemo(() => {
    let list = getArticles();
    if (category !== "all") {
      list = list.filter((a) => a.category === category);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.tag.toLowerCase().includes(q)
      );
    }
    return list.sort((a, b) => b.date.localeCompare(a.date));
  }, [category, query]);

  return (
    <>
      <section className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle ms-shell-pad py-12 sm:py-16">
          <FadeIn className="max-w-3xl">
            <p className="ms-stamp">Journal</p>
            <h1 className="ds-display mt-4 text-4xl tracking-tight text-foreground sm:text-6xl">
              Notes from the{" "}
              <span className="ds-display-italic text-brand">studio</span>.
            </h1>
            <p className="ds-lede mt-5 max-w-xl">
              Essays, playbooks, and practical notes on shipping with AI,
              design systems, and fast product development.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle">
          <div className="border-b border-border-subtle ms-shell-pad py-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setCategory("all")}
                  aria-pressed={category === "all"}
                  className={cn(chipBase, category === "all" ? chipActive : chipIdle)}
                >
                  All
                </button>
                {ARTICLE_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    aria-pressed={category === cat}
                    className={cn(
                      chipBase,
                      category === cat ? chipActive : chipIdle
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="relative">
                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search articles…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full border border-border-subtle bg-background py-2 pr-4 pl-9 text-sm sm:w-64 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/25"
                  aria-label="Search articles"
                />
              </div>
            </div>
          </div>

          <div className="border-b border-border-subtle ms-shell-pad py-4">
            <p className="ds-mono-label">
              {articles.length} article{articles.length === 1 ? "" : "s"}
            </p>
          </div>

          {articles.length === 0 ? (
            <p className="ms-shell-pad py-12 text-sm text-muted-foreground">
              No articles match your search.
            </p>
          ) : (
            <ul className="divide-y divide-border-subtle">
              {articles.map((a, i) => (
                <li key={a.slug}>
                  <FadeIn delay={0.03 * i}>
                    <Link
                      href={`/journal/${a.slug}`}
                      className={cn(
                        "group grid grid-cols-1 items-baseline gap-2 px-6 py-5 transition-colors md:grid-cols-12 md:gap-4 md:px-8 md:py-6",
                        "hover:bg-muted/40 active:scale-[0.998]"
                      )}
                    >
                      <span className="font-mono text-[11px] tabular-nums text-muted-foreground md:col-span-1">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="md:col-span-6">
                        <p className="ds-headline text-base text-foreground sm:text-lg">
                          {a.title}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {a.tag} · {a.category}
                        </p>
                      </div>
                      <p className="hidden text-sm text-muted-foreground md:col-span-3 md:block">
                        {formatArticleDate(a.date)} · {a.readTime}
                      </p>
                      <div className="flex items-center justify-between gap-3 md:col-span-2 md:justify-end">
                        <span className="text-xs text-muted-foreground md:hidden">
                          {formatArticleDate(a.date)} · {a.readTime}
                        </span>
                        <ArrowRight className="size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-brand" />
                      </div>
                    </Link>
                  </FadeIn>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="border-b border-border-subtle">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 border-x border-border-subtle ms-shell-pad py-12 sm:flex-row sm:items-center sm:justify-between sm:py-14">
          <FadeIn className="max-w-lg">
            <p className="ms-stamp">Newsletter</p>
            <h2 className="ds-display mt-3 text-2xl text-foreground sm:text-3xl">
              Stay in the loop
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              New articles and studio notes - no spam, unsubscribe anytime.
            </p>
          </FadeIn>
          <FadeIn delay={0.06} className="w-full max-w-md sm:w-auto">
            <NewsletterForm />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
