"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { QUIZ, QUIZ_COUNT, isClose, type QuizItem } from "@/lib/guide";

const SLATE = "#2B3A52";
const BROWN = "#8B7355";
const INK = "#1A1A1A";
const MUTED = "#6B6B6B";
const PAPER = "#F7F4EF";
const LINE = "#D8D3CB";

const label = "text-xs uppercase tracking-widest";
const serif = "font-[family-name:var(--font-cormorant)] font-light";

/** Swiss thousands separator: 21'087. */
function swiss(n: number): string {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}

/**
 * Counts up to the figure as soon as it is revealed. It starts on mount and
 * not on scroll position: the reader has just pressed the button, so the
 * number is in front of them wherever it sits on the screen.
 */
function CountUp({ value }: { value: number }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    // With reduced motion the figure is simply shown: the first frame is the last.
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 900;
    let start: number | null = null;
    let frame = 0;
    function step(now: number) {
      if (start === null) start = now;
      const t = duration === 0 ? 1 : Math.min((now - start) / duration, 1);
      setShown(Math.round((1 - Math.pow(1 - t, 3)) * value));
      if (t < 1) frame = requestAnimationFrame(step);
    }
    frame = requestAnimationFrame(step);
    // Whatever happens to the animation, the true figure is what stays on screen.
    const settle = window.setTimeout(() => setShown(value), duration + 150);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settle);
    };
  }, [value]);

  return <>{swiss(shown)}</>;
}

/**
 * Marks a link that leaves the game in a new tab. The estimates live in this
 * page only, so an essay opened in the same tab would throw them away.
 */
function NewTab() {
  return (
    <>
      <span aria-hidden="true">&nbsp;↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </>
  );
}

function Bar({ title, value, max, colour, animate }: { title: string; value: number; max: number; colour: string; animate?: boolean }) {
  const pct = Math.max(1.5, (value / max) * 100);
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 mb-1.5">
        <span className={label} style={{ color: MUTED }}>{title}</span>
        <span className={serif} style={{ fontSize: "1.6rem", lineHeight: 1, color: colour }}>
          {animate ? <CountUp value={value} /> : swiss(value)}
        </span>
      </div>
      <div style={{ height: 6, background: "rgba(43,58,82,0.1)" }}>
        <div className="quiz-bar" style={{ height: "100%", width: `${pct}%`, background: colour }} />
      </div>
    </div>
  );
}

function Verdict({ item, guess }: { item: QuizItem; guess: number }) {
  if (item.kind === "choice") {
    return guess === item.correct ? "Your estimate was right." : `You chose: ${item.options[guess].toLowerCase()}.`;
  }
  const diff = guess - item.answer;
  if (diff === 0) return "Exactly right.";
  return `Your estimate was ${swiss(Math.abs(diff))} too ${diff > 0 ? "high" : "low"}.`;
}

/**
 * A few figures from the essays, each estimated before it is shown. An estimate
 * that turns out wrong is remembered far longer than a statistic that was only
 * read, which is the reason this replaces a plain row of numbers.
 */
export default function NumberQuiz({ place }: { place: "home" | "lab" }) {
  const [index, setIndex] = useState(0);
  const [guesses, setGuesses] = useState<(number | null)[]>(() => QUIZ.map(() => null));
  const [draft, setDraft] = useState<number>(() => (QUIZ[0].kind === "slider" ? QUIZ[0].start : -1));
  const [showAll, setShowAll] = useState(false);

  const done = showAll || index >= QUIZ.length;
  const item = QUIZ[Math.min(index, QUIZ.length - 1)];
  const guess = guesses[index] ?? null;
  const revealed = guess !== null;

  function commit(value: number) {
    setGuesses((g) => g.map((v, i) => (i === index ? value : v)));
    track("quiz_estimate", { item: item.id, place, close: String(isClose(item, value)) });
  }

  function next() {
    const to = index + 1;
    setIndex(to);
    if (to < QUIZ.length) {
      const upcoming = QUIZ[to];
      setDraft(upcoming.kind === "slider" ? upcoming.start : -1);
    } else {
      track("quiz_complete", { place });
    }
  }

  function restart() {
    setGuesses(QUIZ.map(() => null));
    setIndex(0);
    setDraft(QUIZ[0].kind === "slider" ? QUIZ[0].start : -1);
    setShowAll(false);
  }

  const answered = guesses.filter((g) => g !== null).length;
  const close = QUIZ.filter((q, i) => guesses[i] !== null && isClose(q, guesses[i] as number)).length;

  return (
    <div>
      {/* Progress: one mark per number, filled once it has been estimated. */}
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 mb-6">
        <ol className="flex items-center gap-2" style={{ listStyle: "none", padding: 0, margin: 0 }} aria-label="Progress">
          {QUIZ.map((q, i) => {
            const state = guesses[i] !== null || showAll ? "done" : i === index ? "now" : "todo";
            return (
              <li key={q.id} className="flex items-center gap-2">
                <span
                  aria-label={`${q.short}: ${state === "done" ? "shown" : state === "now" ? "current" : "to come"}`}
                  style={{
                    display: "block",
                    width: state === "now" ? 28 : 16,
                    height: 3,
                    background: state === "todo" ? LINE : state === "now" ? BROWN : SLATE,
                    transition: "width 300ms ease, background 300ms ease",
                  }}
                />
              </li>
            );
          })}
        </ol>
        {!done && (
          <button
            type="button"
            onClick={() => {
              setShowAll(true);
              track("quiz_show_all", { place, at: String(index) });
            }}
            className={`${label} underline underline-offset-4 hover:text-[#2B3A52]`}
            style={{ color: MUTED, background: "none", border: 0, padding: 0, cursor: "pointer" }}
          >
            Skip the estimates, show all {QUIZ_COUNT}
          </button>
        )}
      </div>

      {!done ? (
        <div className="grid md:grid-cols-2" style={{ border: `1px solid ${LINE}`, background: PAPER }}>
          {/* The question */}
          <div className="p-6 md:p-8 md:border-r" style={{ borderColor: LINE }}>
            <p className={`${label} mb-4`} style={{ color: BROWN }}>
              Number {index + 1} of {QUIZ.length} &middot; {item.short}
            </p>
            <p className={serif} style={{ fontSize: "clamp(21px, 2.6vw, 27px)", lineHeight: 1.3, color: INK }}>
              {item.prompt}
            </p>
          </div>

          {/* The estimate, then the figure */}
          <div className="p-6 md:p-8 flex flex-col justify-center" style={{ borderTop: `1px solid ${LINE}` }} aria-live="polite">
            {!revealed && item.kind === "slider" && (
              <div>
                <div className="flex items-baseline justify-between gap-4 mb-3">
                  <label htmlFor={`quiz-${item.id}`} className={label} style={{ color: MUTED }}>
                    Your estimate
                  </label>
                  <span>
                    <span className={serif} style={{ fontSize: "2.6rem", lineHeight: 1, color: SLATE }}>{swiss(draft)}</span>
                    <span className="text-xs ml-2" style={{ color: MUTED }}>{item.unit}</span>
                  </span>
                </div>
                <input
                  id={`quiz-${item.id}`}
                  type="range"
                  min={item.min}
                  max={item.max}
                  value={draft}
                  onChange={(e) => setDraft(parseInt(e.target.value, 10))}
                  className="range-slate w-full"
                />
                <div className="flex justify-between text-xs mt-1 mb-6" style={{ color: MUTED }}>
                  <span>{item.min}</span>
                  <span>{item.max}</span>
                </div>
                <button type="button" className="btn-slate" onClick={() => commit(draft)}>
                  Commit and reveal
                </button>
              </div>
            )}

            {!revealed && item.kind === "choice" && (
              <div role="group" aria-label="Your estimate" className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {item.options.map((o, i) => (
                  <button key={o} type="button" className="quiz-option" onClick={() => commit(i)}>
                    {o}
                  </button>
                ))}
              </div>
            )}

            {revealed && (
              <div className="quiz-reveal">
                {item.kind === "slider" ? (
                  <div className="flex flex-col gap-4 mb-5">
                    <Bar title="Your estimate" value={guess} max={item.max} colour={BROWN} />
                    <Bar title="The figure" value={item.answer} max={item.max} colour={SLATE} animate />
                  </div>
                ) : (
                  <p className={`${serif} mb-4`} style={{ fontSize: "clamp(2.4rem, 6vw, 3.2rem)", lineHeight: 1, color: SLATE }}>
                    {item.answerLabel}
                  </p>
                )}
                <p className="text-sm mb-3" style={{ color: INK, lineHeight: 1.7 }}>
                  <strong style={{ fontWeight: 700 }}>
                    <Verdict item={item} guess={guess} />
                  </strong>{" "}
                  {item.reveal}
                </p>
                <p className="text-xs mb-5" style={{ color: MUTED, lineHeight: 1.6 }}>
                  Source: {item.source}.
                </p>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                  <button type="button" className="btn-slate" onClick={next}>
                    {index < QUIZ.length - 1 ? "Next number" : `See all ${QUIZ_COUNT}`}&nbsp;→
                  </button>
                  <Link href={`/blog/${item.essay.slug}`} target="_blank" rel="noopener" className={`${label} underline underline-offset-4`} style={{ color: SLATE }}>
                    Read the essay<NewTab />
                  </Link>
                  {item.tool && (
                    <Link href={item.tool.href} target="_blank" rel="noopener" className={`${label} underline underline-offset-4`} style={{ color: SLATE }}>
                      {item.tool.label}<NewTab />
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="quiz-reveal">
          {answered > 0 && (
            <p className="text-sm mb-6" style={{ color: INK, lineHeight: 1.7 }}>
              <strong style={{ fontWeight: 700 }}>
                {close} of your {answered} {answered === 1 ? "estimate was" : "estimates were"} close.
              </strong>{" "}
              Each figure opens the essay that explains it, in a new tab.
            </p>
          )}
          <ul className="grid grid-cols-2 md:grid-cols-3" style={{ listStyle: "none", padding: 0, margin: 0, gap: 1, background: LINE, border: `1px solid ${LINE}` }}>
            {QUIZ.map((q, i) => {
              const g = guesses[i];
              return (
                <li key={q.id} style={{ background: PAPER }}>
                  <Link href={`/blog/${q.essay.slug}`} target="_blank" rel="noopener" className="group block h-full p-4 md:p-5">
                    <span className={`${label} block mb-2`} style={{ color: BROWN }}>{q.short}</span>
                    <span className={`${serif} block`} style={{ fontSize: "clamp(26px, 3.2vw, 34px)", lineHeight: 1.05, color: SLATE, whiteSpace: "nowrap" }}>
                      {q.answerLabel}
                    </span>
                    <span className="block text-xs mt-2" style={{ color: MUTED, lineHeight: 1.5, minHeight: "1.5em" }}>
                      {g === null || g === undefined
                        ? ""
                        : q.kind === "slider"
                          ? `You said ${swiss(g)}`
                          : g === q.correct
                            ? "You had it"
                            : `You said ${q.options[g].toLowerCase()}`}
                    </span>
                    <span className="block text-xs mt-2 group-hover:underline" style={{ color: INK, lineHeight: 1.5 }}>
                      {q.essay.title}<NewTab />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-6">
            {place === "home" ? (
              <Link href="/lab" className="btn-slate">Open the Lab&nbsp;→</Link>
            ) : (
              <Link href="/assessment" className="btn-slate">Take the assessment&nbsp;→</Link>
            )}
            <button
              type="button"
              onClick={restart}
              className={`${label} underline underline-offset-4`}
              style={{ color: MUTED, background: "none", border: 0, padding: 0, cursor: "pointer" }}
            >
              {answered > 0 ? "Start again" : "Estimate them after all"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
