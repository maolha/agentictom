"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { useReading, isRead, isNewSince, forgetReading } from "@/lib/reading";
import type { PostMeta, ThemeKey } from "@/lib/blog";

type Theme = { key: ThemeKey; label: string; line: string };
type Length = "any" | "short" | "medium" | "long";

const LENGTHS: { key: Length; label: string; test: (m: number) => boolean }[] = [
  { key: "any", label: "Any length", test: () => true },
  { key: "short", label: "Up to 5 min", test: (m) => m <= 5 },
  { key: "medium", label: "6 to 8 min", test: (m) => m >= 6 && m <= 8 },
  { key: "long", label: "9 min and more", test: (m) => m >= 9 },
];

const label = "text-xs uppercase tracking-widest";
const gold = { color: "#8B7355" } as const;

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

/**
 * The archive with its filters: a search, the four themes, the time the reader
 * has, and whether an essay carries something to operate. It also shows what
 * this browser has already read. The full list is in the server-rendered HTML;
 * the filters only hide rows.
 */
export default function EssayExplorer({ posts, themes }: { posts: PostMeta[]; themes: Theme[] }) {
  const reading = useReading();
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState<ThemeKey | "all">("all");
  const [length, setLength] = useState<Length>("any");
  const [interactive, setInteractive] = useState(false);
  const [unreadOnly, setUnreadOnly] = useState(false);

  // Essays link to their theme as /blog#the-model: open the archive on that theme.
  useEffect(() => {
    function fromHash() {
      const key = window.location.hash.slice(1);
      if (themes.some((t) => t.key === key)) {
        setTheme(key as ThemeKey);
        document.getElementById("essays")?.scrollIntoView();
      }
    }
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [themes]);

  const readCount = posts.filter((p) => isRead(reading, p.slug)).length;

  const shown = useMemo(() => {
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
    const lengthTest = LENGTHS.find((l) => l.key === length)!.test;
    return posts.filter((p) => {
      if (theme !== "all" && p.theme !== theme) return false;
      if (!lengthTest(p.readingTime)) return false;
      if (interactive && p.figures === 0 && !p.film) return false;
      if (unreadOnly && isRead(reading, p.slug)) return false;
      if (tokens.length) {
        const hay = `${p.title} ${p.excerpt}`.toLowerCase();
        if (!tokens.every((t) => hay.includes(t))) return false;
      }
      return true;
    });
  }, [posts, query, theme, length, interactive, unreadOnly, reading]);

  const minutes = shown.reduce((sum, p) => sum + p.readingTime, 0);
  const filtered = query.trim() !== "" || theme !== "all" || length !== "any" || interactive || unreadOnly;
  const activeTheme = themes.find((t) => t.key === theme);

  function reset() {
    setQuery("");
    setTheme("all");
    setLength("any");
    setInteractive(false);
    setUnreadOnly(false);
  }

  function pickTheme(key: ThemeKey | "all") {
    setTheme(key);
    track("essays_filter", { theme: key });
  }

  return (
    <div>
      {/* Search */}
      <div className="flex items-center gap-3 pb-2 mb-6" style={{ borderBottom: "1px solid #2B3A52" }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ color: "#2B3A52", flexShrink: 0 }}>
          <circle cx="7" cy="7" r="4.75" stroke="currentColor" strokeWidth="1.3" />
          <path d="M10.6 10.6 14 14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${posts.length} essays`}
          aria-label="Search the essays"
          className="quiet-input flex-1 bg-transparent font-[family-name:var(--font-cormorant)]"
          style={{ fontSize: "1.35rem", color: "#1A1A1A", minWidth: 0 }}
        />
      </div>

      {/* Theme */}
      <div role="group" aria-label="Theme" className="seat-tabs flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 md:mx-0 md:px-0 md:flex-wrap">
        <button type="button" className="chip shrink-0" data-on={theme === "all"} aria-pressed={theme === "all"} onClick={() => pickTheme("all")}>
          All themes <span className="chip-count">{posts.length}</span>
        </button>
        {themes.map((t) => (
          <button key={t.key} type="button" className="chip shrink-0" data-on={theme === t.key} aria-pressed={theme === t.key} onClick={() => pickTheme(t.key)}>
            {t.label} <span className="chip-count">{posts.filter((p) => p.theme === t.key).length}</span>
          </button>
        ))}
      </div>

      {/* Length, and what the essay carries */}
      <div role="group" aria-label="Length and format" className="seat-tabs flex gap-2 overflow-x-auto pb-2 mt-1 -mx-5 px-5 md:mx-0 md:px-0 md:flex-wrap">
        {LENGTHS.map((l) => (
          <button
            key={l.key}
            type="button"
            className="chip shrink-0"
            data-on={length === l.key}
            aria-pressed={length === l.key}
            onClick={() => {
              setLength(l.key);
              track("essays_filter", { length: l.key });
            }}
          >
            {l.label}
          </button>
        ))}
        <button
          type="button"
          className="chip shrink-0"
          data-on={interactive}
          aria-pressed={interactive}
          onClick={() => {
            setInteractive((v) => !v);
            track("essays_filter", { interactive: String(!interactive) });
          }}
        >
          With a figure or film
        </button>
        {readCount > 0 && (
          <button type="button" className="chip shrink-0" data-on={unreadOnly} aria-pressed={unreadOnly} onClick={() => setUnreadOnly((v) => !v)}>
            Unread only
          </button>
        )}
      </div>

      {/* What is shown */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 mt-6 pb-3" style={{ borderBottom: "1px solid #D8D3CB" }}>
        <p className={label} style={gold} aria-live="polite">
          {shown.length} {shown.length === 1 ? "essay" : "essays"} &middot; {minutes} min of reading
          {readCount > 0 && <> &middot; {readCount} read</>}
        </p>
        {filtered && (
          <button type="button" onClick={reset} className={`${label} underline underline-offset-4`} style={{ color: "#2B3A52", background: "none", border: 0, padding: 0, cursor: "pointer" }}>
            Clear filters
          </button>
        )}
      </div>
      {activeTheme && (
        <p className="text-sm mt-4" style={{ color: "#6B6B6B", lineHeight: 1.6 }}>
          <strong style={{ fontWeight: 700, color: "#2B3A52" }}>{activeTheme.label}.</strong> {activeTheme.line}
        </p>
      )}

      {/* The list */}
      {shown.length === 0 ? (
        <div className="py-12">
          <p className="font-[family-name:var(--font-cormorant)] font-light mb-3" style={{ fontSize: "1.5rem", color: "#2B3A52" }}>
            No essay matches these filters.
          </p>
          <button type="button" onClick={reset} className="btn-outline-slate">Show all essays</button>
        </div>
      ) : (
        <div className="flex flex-col">
          {shown.map((post, i) => {
            const read = isRead(reading, post.slug);
            const progress = reading.progress[post.slug] ?? 0;
            const fresh = !read && isNewSince(reading, post.date);
            return (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block py-8 group" style={i > 0 ? { borderTop: "1px solid #D8D3CB" } : {}}>
                <article>
                  <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 mb-2 ${label}`} style={gold}>
                    {fresh && (
                      <span style={{ background: "#8B7355", color: "#F7F4EF", padding: "2px 8px" }}>New</span>
                    )}
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span aria-hidden="true" style={{ color: "#D8D3CB" }}>&middot;</span>
                    <span>{post.readingTime} min read</span>
                    {post.theme && (
                      <>
                        <span aria-hidden="true" style={{ color: "#D8D3CB" }}>&middot;</span>
                        <span>{themes.find((t) => t.key === post.theme)?.label}</span>
                      </>
                    )}
                  </div>
                  <h3
                    className="font-[family-name:var(--font-cormorant)] font-light mb-3 group-hover:text-[#2B3A52] transition-colors"
                    style={{ fontSize: "clamp(22px, 3.5vw, 30px)", color: "#1A1A1A" }}
                  >
                    {post.title}
                  </h3>
                  <p className="mb-4" style={{ fontSize: "0.9rem", color: "#6B6B6B", lineHeight: 1.7 }}>
                    {post.excerpt}
                  </p>
                  <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 ${label}`}>
                    <span className="group-hover:underline" style={{ color: "#2B3A52", fontSize: "0.875rem" }}>
                      {read ? "Read again" : progress >= 0.08 ? "Continue" : "Read"}
                    </span>
                    {read && <span style={{ color: "#2B3A52" }}>Read ✓</span>}
                    {!read && progress >= 0.08 && <span style={{ color: "#6B6B6B" }}>{Math.round(progress * 100)} percent read</span>}
                    {post.film && <span style={{ color: "#6B6B6B", border: "1px solid #D8D3CB", padding: "2px 8px" }}>Film</span>}
                    {post.figures > 0 && (
                      <span style={{ color: "#6B6B6B", border: "1px solid #D8D3CB", padding: "2px 8px" }}>
                        {post.figures === 1 ? "1 figure" : `${post.figures} figures`}
                      </span>
                    )}
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      )}

      {readCount > 0 && (
        <p className="text-xs mt-2" style={{ color: "#6B6B6B", lineHeight: 1.6 }}>
          Reading status is kept in this browser only and is never sent to the site.{" "}
          <button type="button" onClick={forgetReading} className="underline underline-offset-4" style={{ background: "none", border: 0, padding: 0, color: "inherit", cursor: "pointer", font: "inherit" }}>
            Forget it
          </button>
        </p>
      )}
    </div>
  );
}
