"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { track } from "@vercel/analytics";

type Entry = { href: string; title: string; kind: string; text: string; minutes?: number };
type IndexedPost = { slug: string; title: string; excerpt: string; theme: string; minutes: number };

/** Everything on the site that is not an essay. Essays are fetched on first use. */
const PLACES: Entry[] = [
  { href: "/framework", title: "The agentic operating model", kind: "Framework", text: "Three layers, five principles, the autonomy ladder and one worked example." },
  { href: "/lab", title: "The Lab", kind: "Tools", text: "Numbers to estimate, the working tools and the figures from the essays." },
  { href: "/calculator", title: "Where the Chain Breaks", kind: "Calculator", text: "Error propagation in a process chain: accuracy per step, chain length, checks, reliability." },
  { href: "/assessment", title: "Agentic readiness assessment", kind: "Assessment", text: "Fifteen questions across five dimensions, with a PDF export for the leadership team." },
  { href: "/blog/the-staff-of-fifteen-buys-a-house", title: "The journey map and film", kind: "Tool", text: "One household, one property, twelve stages. The bank's map and the client's map. Mortgage." },
  { href: "/finma-guidance-08-2024", title: "FINMA Guidance 08/2024", kind: "Explainer", text: "What the guidance on governance and risk management for AI asks of a bank. Regulation." },
  { href: "/blog", title: "All essays", kind: "Thoughts", text: "The archive, by theme, length and reading status." },
  { href: "/#about", title: "About Marc Hauser", kind: "About", text: "Background, speaking and contact." },
  { href: "/#contact", title: "Start a conversation", kind: "Contact", text: "Contact form for keynotes, executive briefings and questions." },
];

const SUGGESTED = ["/lab", "/calculator", "/assessment", "/framework", "/blog/the-staff-of-fifteen-buys-a-house"];

function match(entries: Entry[], query: string): Entry[] {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return [];
  const scored: { e: Entry; score: number }[] = [];
  for (const e of entries) {
    const title = e.title.toLowerCase();
    const body = `${e.kind} ${e.text}`.toLowerCase();
    let score = 0;
    for (const t of tokens) {
      if (title.includes(t)) score += 3;
      else if (body.includes(t)) score += 1;
      else {
        score = -1;
        break;
      }
    }
    if (score > 0) scored.push({ e, score });
  }
  return scored.sort((a, b) => b.score - a.score).slice(0, 8).map((s) => s.e);
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="4.75" stroke="currentColor" strokeWidth="1.3" />
      <path d="M10.6 10.6 14 14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

const label = "text-xs uppercase tracking-widest";

/**
 * The two overlays of the navigation: the site search, and the full menu on
 * narrow screens, where the bar itself only has room for the name. Both are
 * native dialogs, which bring focus handling and the Escape key with them.
 */
export default function NavMenus({ home }: { home: boolean }) {
  const searchRef = useRef<HTMLDialogElement>(null);
  const menuRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState<Entry[] | null>(null);
  const [cursor, setCursor] = useState(0);

  const entries = useMemo(() => [...PLACES, ...(posts ?? [])], [posts]);
  const results = useMemo(() => match(entries, query), [entries, query]);
  const suggested = useMemo(() => SUGGESTED.map((h) => PLACES.find((p) => p.href === h)!), []);
  const shown = query.trim() ? results : suggested;

  function openSearch() {
    menuRef.current?.close();
    if (!searchRef.current?.open) searchRef.current?.showModal();
    inputRef.current?.focus();
    if (posts === null) {
      fetch("/search.json")
        .then((r) => (r.ok ? r.json() : []))
        .then((list: IndexedPost[]) =>
          setPosts(
            list.map((p) => ({
              href: `/blog/${p.slug}`,
              title: p.title,
              kind: p.theme ? `Essay · ${p.theme}` : "Essay",
              text: p.excerpt,
              minutes: p.minutes,
            })),
          ),
        )
        .catch(() => setPosts([]));
    }
    track("search_open");
  }

  function go(entry: Entry) {
    track("search_go", { to: entry.href });
    searchRef.current?.close();
    setQuery("");
    router.push(entry.href);
  }

  // "/" opens the search from anywhere outside a form field.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null;
      const typing = t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable);
      if ((e.key === "/" && !typing) || (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey))) {
        e.preventDefault();
        openSearch();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- openSearch only reads refs and the loaded flag
  }, [posts]);

  function onInputKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(shown.length - 1, c + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(0, c - 1));
    } else if (e.key === "Enter" && shown[cursor]) {
      e.preventDefault();
      go(shown[cursor]);
    }
  }

  const aboutHref = home ? "#about" : "/#about";
  const contactHref = home ? "#contact" : "/#contact";
  const menu: { href: string; title: string; line: string }[] = [
    { href: "/framework", title: "Framework", line: "The model in one page" },
    { href: "/blog", title: "Thoughts", line: "The essays" },
    { href: "/lab", title: "Lab", line: "Numbers, tools and figures to operate" },
    { href: "/assessment", title: "Assessment", line: "Fifteen questions, five minutes" },
    { href: "/calculator", title: "Calculator", line: "Where the chain breaks" },
    { href: aboutHref, title: "About", line: "Marc Hauser" },
  ];

  return (
    <>
      <button type="button" onClick={openSearch} aria-label="Search the site" className="nav-icon" title="Search (press /)">
        <SearchIcon />
        <span className={`hidden xl:inline ${label}`}>Search</span>
      </button>

      <button
        type="button"
        className="nav-icon nav-menu-button"
        aria-label="Open the menu"
        onClick={() => {
          menuRef.current?.showModal();
          track("menu_open");
        }}
      >
        <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true">
          <path d="M0 1h20M0 7h20M0 13h20" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      </button>

      {/* Search */}
      <dialog
        ref={searchRef}
        className="site-dialog site-search"
        aria-label="Search the site"
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
        onClose={() => setQuery("")}
      >
        <div className="p-5 md:p-6">
          <div className="flex items-center gap-3 pb-3" style={{ borderBottom: "1px solid #2B3A52", color: "#2B3A52" }}>
            <SearchIcon />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCursor(0);
              }}
              onKeyDown={onInputKey}
              placeholder="Search essays, tools and pages"
              aria-label="Search essays, tools and pages"
              aria-controls="search-results"
              autoComplete="off"
              className="quiet-input flex-1 bg-transparent font-[family-name:var(--font-cormorant)]"
              style={{ fontSize: "1.4rem", color: "#1A1A1A", minWidth: 0 }}
            />
            <button type="button" onClick={() => searchRef.current?.close()} className={label} style={{ color: "#6B6B6B", background: "none", border: 0, cursor: "pointer" }}>
              Close
            </button>
          </div>

          <p className={`${label} mt-5 mb-2`} style={{ color: "#8B7355" }} aria-live="polite">
            {query.trim() ? (results.length === 0 ? (posts === null ? "Searching" : "Nothing found") : `${results.length} ${results.length === 1 ? "result" : "results"}`) : "Good places to start"}
          </p>
          <ul id="search-results" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {shown.map((e, i) => (
              <li key={`${e.kind}:${e.href}`}>
                <a
                  href={e.href}
                  onClick={(ev) => {
                    ev.preventDefault();
                    go(e);
                  }}
                  onMouseEnter={() => setCursor(i)}
                  className="block px-3 py-3 -mx-3"
                  style={{ background: i === cursor ? "#F0ECE3" : "transparent" }}
                >
                  <span className={`${label} block mb-1`} style={{ color: "#8B7355" }}>
                    {e.kind}
                    {e.minutes ? ` · ${e.minutes} min` : ""}
                  </span>
                  <span className="block font-[family-name:var(--font-cormorant)]" style={{ fontSize: "1.2rem", lineHeight: 1.25, color: "#2B3A52" }}>
                    {e.title}
                  </span>
                  <span className="block text-xs mt-1" style={{ color: "#6B6B6B", lineHeight: 1.5 }}>
                    {e.text}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          {query.trim() && results.length === 0 && posts !== null && (
            <p className="text-sm mt-2" style={{ color: "#6B6B6B", lineHeight: 1.6 }}>
              Try a broader term such as mortgage, escalation, compliance or FINMA.
            </p>
          )}
        </div>
      </dialog>

      {/* The full menu, for narrow screens */}
      <dialog
        ref={menuRef}
        className="site-dialog site-menu"
        aria-label="Menu"
        onClick={(e) => {
          const el = e.target as HTMLElement;
          if (el.closest("a")) e.currentTarget.close();
        }}
      >
        <div className="px-5 py-4 flex justify-between items-center" style={{ borderBottom: "1px solid #D8D3CB" }}>
          <span className="font-[family-name:var(--font-cormorant)] text-lg font-light tracking-wide" style={{ color: "#1A1A1A" }}>
            agenticTOM
          </span>
          <button type="button" onClick={() => menuRef.current?.close()} className={label} style={{ color: "#2B3A52", background: "none", border: 0, cursor: "pointer", padding: "6px 0" }}>
            Close
          </button>
        </div>
        <nav aria-label="All pages" className="px-5 py-2">
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {menu.map((m) => {
              const current = m.href !== aboutHref && (pathname === m.href || pathname.startsWith(`${m.href}/`));
              const inner = (
                <>
                  <span className="font-[family-name:var(--font-cormorant)] font-light" style={{ fontSize: "1.9rem", lineHeight: 1.1, color: current ? "#8B7355" : "#2B3A52" }}>
                    {m.title}
                  </span>
                  <span className="text-xs" style={{ color: "#6B6B6B" }}>{m.line}</span>
                </>
              );
              const cls = "flex items-baseline justify-between gap-4 py-4";
              return (
                <li key={m.title} style={{ borderBottom: "1px solid #D8D3CB" }}>
                  {m.href.startsWith("#") ? (
                    <a href={m.href} className={cls}>{inner}</a>
                  ) : (
                    <Link href={m.href} className={cls} aria-current={current ? "page" : undefined}>{inner}</Link>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="flex flex-col gap-3 mt-6 pb-6">
            <button type="button" onClick={openSearch} className="btn-outline-slate" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
              <SearchIcon /> Search the site
            </button>
            {home ? (
              <a href={contactHref} className="btn-slate text-center">Let&apos;s talk</a>
            ) : (
              <Link href={contactHref} className="btn-slate text-center">Let&apos;s talk</Link>
            )}
          </div>
        </nav>
      </dialog>
    </>
  );
}
