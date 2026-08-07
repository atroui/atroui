const CONTENT = {
  stamp: "Reading now",
};

/** Default demo covers — no remote images (works without next/image remotePatterns). */
const BOOKS = [
  {
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    cover: "",
    tone: "#1e3a5f",
  },
  {
    title: "Refactoring",
    author: "Martin Fowler",
    cover: "",
    tone: "#3d2c29",
  },
  {
    title: "The Pragmatic Programmer",
    author: "Hunt & Thomas",
    cover: "",
    tone: "#1a3d2e",
  },
];

const COVER_W = 88;
const COVER_H = 128;

export type ReadingBook = {
  title: string;
  author: string;
  /** Optional image URL. When empty, a typographic cover is shown. */
  cover?: string;
  /** Background for the typographic fallback cover. */
  tone?: string;
};

export type ReadingShelfProps = {
  stamp?: string;
  books?: ReadingBook[];
  className?: string;
};

export function ReadingShelf({
  stamp = CONTENT.stamp,
  books = BOOKS,
  className,
}: ReadingShelfProps = {}) {
  if (books.length === 0) return null;

  return (
    <section className={className ?? "mx-auto max-w-[640px]"}>
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="font-mono text-[10.5px] tracking-[0.12em] text-muted-foreground uppercase">
          {stamp}
        </h2>
        <span className="font-mono text-[11px] text-muted-foreground">
          {books.length} book{books.length === 1 ? "" : "s"}
        </span>
      </div>

      <div
        className="no-scrollbar -mx-5 flex gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:overflow-visible sm:px-0"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {books.map((book, i) => (
          <div
            key={book.title}
            className="group relative shrink-0"
            style={{
              scrollSnapAlign: "start",
              animationDelay: `${i * 40}ms`,
            }}
            title={`${book.title} — ${book.author}`}
          >
            <div
              className="relative overflow-hidden rounded-[3px] transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[2px]"
              style={{
                width: COVER_W,
                height: COVER_H,
                boxShadow:
                  "0 1px 2px 0 rgba(0,0,0,0.08), 0 0 0 1px color-mix(in oklab, black 6%, transparent) inset",
              }}
            >
              {book.cover ? (
                <img
                  src={book.cover}
                  alt={`${book.title} by ${book.author}`}
                  width={COVER_W * 2}
                  height={COVER_H * 2}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div
                  className="flex h-full w-full flex-col justify-between p-2.5"
                  style={{ background: book.tone ?? "#1a1a1a" }}
                  aria-hidden
                >
                  <span className="font-mono text-[9px] tracking-wide text-white/70 uppercase">
                    {book.author.split(" ").slice(-1)[0]}
                  </span>
                  <span className="text-[11px] leading-snug font-medium text-white">
                    {shortTitle(book.title, 28)}
                  </span>
                </div>
              )}
            </div>
            <div
              className="mt-2 truncate text-[11px] leading-tight text-muted-foreground"
              style={{ width: COVER_W }}
            >
              {shortTitle(book.title)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function shortTitle(t: string, max = 22) {
  return t.length > max ? `${t.slice(0, max - 2)}…` : t;
}
