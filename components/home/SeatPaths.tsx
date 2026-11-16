"use client";

import { useState } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { SEATS } from "@/lib/guide";
import { useReading, isRead } from "@/lib/reading";
import type { PostMeta } from "@/lib/blog";
import CopyButton from "@/components/CopyButton";

const SLATE = "#2B3A52";
const BROWN = "#8B7355";
const INK = "#1A1A1A";
const MUTED = "#6B6B6B";
const PAPER = "#F7F4EF";
const LINE = "#D8D3CB";

const label = "text-xs uppercase tracking-widest";
const serif = "font-[family-name:var(--font-cormorant)] font-light";

/**
 * A reading path per seat at the table: three essays in order, one tool, and
 * one question for the next meeting. A reader with twenty minutes should not
 * have to work out where to start in an archive of twenty essays.
 */
export default function SeatPaths({ posts }: { posts: PostMeta[] }) {
  const [active, setActive] = useState(0);
  const reading = useReading();
  const seat = SEATS[active];
  const bySlug = new Map(posts.map((p) => [p.slug, p]));
  const essays = seat.essays.map((s) => bySlug.get(s)).filter((p): p is PostMeta => Boolean(p));
  const minutes = essays.reduce((sum, p) => sum + p.readingTime, 0);

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const to = (active + (e.key === "ArrowRight" ? 1 : SEATS.length - 1)) % SEATS.length;
    setActive(to);
    document.getElementById(`seat-tab-${SEATS[to].id}`)?.focus();
  }

  return (
    <div>
      <div role="tablist" aria-label="Your seat" className="seat-tabs flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 md:mx-0 md:px-0 md:flex-wrap" onKeyDown={onKeyDown}>
        {SEATS.map((s, i) => (
          <button
            key={s.id}
            id={`seat-tab-${s.id}`}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls="seat-panel"
            tabIndex={i === active ? 0 : -1}
            className="chip shrink-0"
            data-on={i === active}
            onClick={() => {
              setActive(i);
              track("seat_pick", { seat: s.id });
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div id="seat-panel" role="tabpanel" aria-labelledby={`seat-tab-${seat.id}`} key={seat.id} className="seat-panel mt-6 grid md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]" style={{ border: `1px solid ${LINE}`, background: PAPER }}>
        {/* Three essays, in order */}
        <div className="p-6 md:p-8">
          <p className="mb-6" style={{ color: INK, lineHeight: 1.7, fontSize: "0.95rem", maxWidth: 520 }}>
            {seat.desk}
          </p>
          <p className={`${label} mb-1`} style={{ color: BROWN }}>
            Three essays &middot; {minutes} minutes
          </p>
          <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {essays.map((p, i) => (
              <li key={p.slug} style={i > 0 ? { borderTop: `1px solid ${LINE}` } : undefined}>
                <Link href={`/blog/${p.slug}`} className="group flex gap-4 py-4" onClick={() => track("seat_essay", { seat: seat.id, slug: p.slug })}>
                  <span aria-hidden="true" className={serif} style={{ fontSize: "1.7rem", lineHeight: 1, color: BROWN, width: "1.4rem", flexShrink: 0 }}>
                    {i + 1}
                  </span>
                  <span className="block">
                    <span className={`${serif} block group-hover:underline`} style={{ fontSize: "1.3rem", lineHeight: 1.25, color: SLATE }}>
                      {p.title}
                    </span>
                    <span className="block text-xs mt-1.5" style={{ color: MUTED, lineHeight: 1.5 }}>
                      {p.readingTime} min
                      {p.figures > 0 && <> &middot; {p.figures === 1 ? "1 figure to operate" : `${p.figures} figures to operate`}</>}
                      {isRead(reading, p.slug) && <> &middot; <span style={{ color: SLATE }}>Read ✓</span></>}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>

        {/* One tool, one question */}
        <div className="p-6 md:p-8 flex flex-col gap-7" style={{ background: SLATE, color: PAPER }}>
          <div>
            <p className={`${label} mb-2`} style={{ color: "#C4AE8C" }}>
              Then work with it
            </p>
            <Link href={seat.tool.href} className="group block" onClick={() => track("seat_tool", { seat: seat.id })}>
              <span className={`${serif} block group-hover:underline`} style={{ fontSize: "1.4rem", lineHeight: 1.2 }}>
                {seat.tool.label}&nbsp;→
              </span>
              <span className="block text-sm mt-1.5" style={{ color: "rgba(247,244,239,0.72)", lineHeight: 1.6 }}>
                {seat.tool.line}
              </span>
            </Link>
          </div>
          <div className="pt-6" style={{ borderTop: "1px solid rgba(247,244,239,0.18)" }}>
            <p className={`${label} mb-2`} style={{ color: "#C4AE8C" }}>
              One question for your next meeting
            </p>
            <p className={serif} style={{ fontSize: "1.3rem", lineHeight: 1.3 }}>
              {seat.question}
            </p>
            <CopyButton text={`${seat.question}\n\nFrom agentictom.com`} event="seat_question_copy" data={{ seat: seat.id }} tone="dark" className="mt-4">
              Copy for the agenda
            </CopyButton>
          </div>
        </div>
      </div>
    </div>
  );
}
