"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { questions, calculateResults, categories, categoryLines, levels } from "@/lib/assessment";
import AssessmentResults from "@/components/AssessmentResults";
import SiteNav from "@/components/SiteNav";
import FadeUp from "@/components/FadeUp";

const QUESTIONS_PER_CATEGORY = 3;

export default function AssessmentClient() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [finished, setFinished] = useState(false);

  const q = questions[currentQuestion];
  const canGoNext = answers[currentQuestion] !== null;
  const canGoPrev = currentQuestion > 0;
  const categoryIndex = Math.floor(currentQuestion / QUESTIONS_PER_CATEGORY);
  const questionInCategory = (currentQuestion % QUESTIONS_PER_CATEGORY) + 1;
  const isLast = currentQuestion === questions.length - 1;

  const selectOption = useCallback(
    (optionIndex: number) => {
      setAnswers((prev) => {
        const next = [...prev];
        next[currentQuestion] = optionIndex;
        return next;
      });
      // Auto-advance after a short pause, except on the last question
      if (currentQuestion < questions.length - 1) {
        setTimeout(() => setCurrentQuestion((c) => (c === currentQuestion ? c + 1 : c)), 400);
      }
    },
    [currentQuestion]
  );

  function finish() {
    const results = calculateResults(answers);
    track("assessment_complete", {
      level: results.level.name,
      score: results.totalScore,
    });
    setFinished(true);
  }

  function retake() {
    setAnswers(new Array(questions.length).fill(null));
    setCurrentQuestion(0);
    setFinished(false);
    setStarted(true);
  }

  // Keyboard input during the questionnaire: 1–4 answers, arrows navigate
  useEffect(() => {
    if (!started || finished) return;
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= q.options.length) {
        e.preventDefault();
        selectOption(num - 1);
      } else if (e.key === "ArrowLeft" && canGoPrev) {
        setCurrentQuestion((c) => Math.max(0, c - 1));
      } else if ((e.key === "ArrowRight" || e.key === "Enter") && canGoNext && !isLast) {
        setCurrentQuestion((c) => Math.min(questions.length - 1, c + 1));
      } else if (e.key === "Enter" && canGoNext && isLast) {
        finish();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, finished, currentQuestion, canGoNext, canGoPrev, isLast, selectOption]);

  if (finished) {
    const results = calculateResults(answers);
    return <AssessmentResults results={results} answers={answers} onRetake={retake} />;
  }

  if (!started) {
    return (
      <main style={{ background: "#F7F4EF", color: "#1A1A1A", minHeight: "100vh" }}>
        <SiteNav />

        <div className="px-5 md:px-8 pt-24 md:pt-36 pb-16 md:pb-24">
          <div className="max-w-[760px] mx-auto w-full">
            <FadeUp>
              <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#8B7355" }}>
                Assessment
              </p>
              <h1
                className="font-[family-name:var(--font-cormorant)] font-light mb-6"
                style={{ fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.15, color: "#1A1A1A" }}
              >
                How ready is your bank for the agentic shift?
              </h1>
              <p className="mb-3" style={{ fontSize: "1.05rem", color: "#1A1A1A", lineHeight: 1.8, maxWidth: 580 }}>
                Fifteen questions across the five dimensions of the <Link href="/framework" className="underline underline-offset-4 hover:text-[#2B3A52]">agentic operating model</Link>. The result places your institution on a four-level readiness scale, identifies where you are most exposed, and names the first moves.
              </p>
              <p className="mb-12 text-xs uppercase tracking-widest" style={{ color: "#6B6B6B", letterSpacing: "0.12em" }}>
                About five minutes · No registration · Individual answers stay in your browser
              </p>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="mb-12" style={{ borderTop: "1px solid #D8D3CB" }}>
                {categories.map((cat, i) => (
                  <div
                    key={cat}
                    className="py-4 md:py-5 grid grid-cols-[44px_1fr] md:grid-cols-[56px_240px_1fr] gap-2 md:gap-6 items-baseline"
                    style={{ borderBottom: "1px solid #D8D3CB" }}
                  >
                    <span className="font-[family-name:var(--font-cormorant)] font-light" style={{ fontSize: "1.4rem", color: "#8B7355" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-xs uppercase tracking-widest" style={{ color: "#2B3A52", fontWeight: 600 }}>
                      {cat}
                    </p>
                    <p className="text-sm col-start-2 md:col-start-3" style={{ color: "#6B6B6B", lineHeight: 1.6 }}>
                      {categoryLines[cat]}
                    </p>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10 mb-12">
                <button onClick={() => { track("assessment_start"); setStarted(true); }} className="btn-outline-slate" style={{ background: "#2B3A52", color: "#F7F4EF" }}>
                  Begin assessment
                </button>
                <div className="flex items-center gap-2" aria-hidden="true">
                  {levels.map((l, i) => (
                    <div key={l.name} className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-widest" style={{ color: "#6B6B6B" }}>{l.name}</span>
                      {i < levels.length - 1 && <span style={{ width: 16, height: 1, background: "#D8D3CB", display: "block" }} />}
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-xs" style={{ color: "#6B6B6B", maxWidth: 520, lineHeight: 1.7 }}>
                The result is exportable as a PDF for your leadership team. Scoring runs in your browser; only the resulting level and total score are measured, anonymously, to understand how the market is distributed.
              </p>
            </FadeUp>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={{ background: "#F7F4EF", color: "#1A1A1A", minHeight: "100vh" }}>
      <nav className="px-5 md:px-8 pt-4 md:pt-5 pb-0">
        <div className="max-w-[900px] mx-auto flex justify-between items-center mb-4">
          <Link
            href="/"
            className="font-[family-name:var(--font-cormorant)] text-lg md:text-xl font-light tracking-wide"
            style={{ color: "#1A1A1A" }}
          >
            agenticTOM
          </Link>
          <span className="text-xs uppercase tracking-widest" style={{ color: "#6B6B6B", fontVariantNumeric: "tabular-nums" }}>
            {currentQuestion + 1} / {questions.length}
          </span>
        </div>
        {/* Segmented progress: one segment per dimension */}
        <div
          className="max-w-[900px] mx-auto flex gap-1"
          role="progressbar"
          aria-label="Assessment progress"
          aria-valuenow={currentQuestion + 1}
          aria-valuemin={0}
          aria-valuemax={questions.length}
        >
          {categories.map((cat, seg) => {
            const fill = Math.min(Math.max(currentQuestion + 1 - seg * QUESTIONS_PER_CATEGORY, 0) / QUESTIONS_PER_CATEGORY, 1);
            return (
              <div key={cat} style={{ flex: 1, height: 2, background: "#D8D3CB" }}>
                <div style={{ height: "100%", width: `${fill * 100}%`, background: seg === categoryIndex ? "#2B3A52" : "#8B7355", transition: "width 0.4s ease-in-out" }} />
              </div>
            );
          })}
        </div>
      </nav>

      <div className="min-h-[82vh] flex flex-col justify-center px-5 md:px-8 py-12">
        <div className="max-w-[680px] mx-auto w-full">
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "#8B7355" }}>
            {q.category} <span style={{ color: "#B9B2A4" }}>· {questionInCategory} of {QUESTIONS_PER_CATEGORY}</span>
          </p>
          <h2
            className="font-[family-name:var(--font-cormorant)] font-light mb-4"
            style={{ fontSize: "clamp(22px, 4vw, 34px)", lineHeight: 1.3, color: "#1A1A1A" }}
          >
            {q.question}
          </h2>
          {q.context && (
            <p className="mb-10 text-sm" style={{ color: "#6B6B6B", lineHeight: 1.6, maxWidth: 540 }}>
              {q.context}
            </p>
          )}

          <div role="radiogroup" aria-label={q.question} className="flex flex-col gap-3">
            {q.options.map((opt, i) => {
              const selected = answers[currentQuestion] === i;
              return (
                <button
                  key={i}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => selectOption(i)}
                  className="text-left px-5 py-4 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2B3A52] flex gap-4 items-baseline"
                  style={{
                    background: selected ? "rgba(43,58,82,0.08)" : "transparent",
                    border: `1px solid ${selected ? "#2B3A52" : "#D8D3CB"}`,
                    color: selected ? "#2B3A52" : "#1A1A1A",
                    fontSize: "0.9rem",
                    lineHeight: 1.6,
                    cursor: "pointer",
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="text-xs shrink-0"
                    style={{ color: selected ? "#2B3A52" : "#8B7355", fontVariantNumeric: "tabular-nums", minWidth: 12 }}
                  >
                    {i + 1}
                  </span>
                  {opt.text}
                </button>
              );
            })}
          </div>

          <div className="flex justify-between items-center mt-12">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={!canGoPrev}
              className="text-xs uppercase tracking-widest transition-colors"
              style={{
                color: canGoPrev ? "#2B3A52" : "#D8D3CB",
                cursor: canGoPrev ? "pointer" : "default",
                background: "none",
                border: "none",
              }}
            >
              Previous
            </button>
            <span className="hidden md:block text-[10px] uppercase tracking-widest" style={{ color: "#B9B2A4" }}>
              Keys 1–4 answer
            </span>
            {isLast ? (
              <button
                onClick={finish}
                disabled={!canGoNext}
                className="btn-outline-slate"
                style={{ opacity: canGoNext ? 1 : 0.4 }}
              >
                See results
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                disabled={!canGoNext}
                className="text-xs uppercase tracking-widest transition-colors"
                style={{
                  color: canGoNext ? "#2B3A52" : "#D8D3CB",
                  cursor: canGoNext ? "pointer" : "default",
                  background: "none",
                  border: "none",
                }}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
