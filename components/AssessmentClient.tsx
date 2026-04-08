"use client";

import { useState } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { questions, calculateResults, categories, levels } from "@/lib/assessment";
import AssessmentResults from "@/components/AssessmentResults";

export default function AssessmentClient() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(15).fill(null));
  const [finished, setFinished] = useState(false);

  const q = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const canGoNext = answers[currentQuestion] !== null;
  const canGoPrev = currentQuestion > 0;

  function selectOption(optionIndex: number) {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);

    // Auto-advance after short delay
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      }
    }, 400);
  }

  function finish() {
    const results = calculateResults(answers);
    track("assessment_complete", {
      level: results.level.name,
      score: results.totalScore,
    });
    setFinished(true);
  }

  if (finished) {
    const results = calculateResults(answers);
    return <AssessmentResults results={results} answers={answers} />;
  }

  if (!started) {
    return (
      <main style={{ background: "#F7F4EF", color: "#1A1A1A", minHeight: "100vh" }}>
        <nav className="px-5 md:px-8 py-4 md:py-5" style={{ borderBottom: "1px solid #D8D3CB" }}>
          <div className="max-w-[900px] mx-auto flex justify-between items-center">
            <Link
              href="/"
              className="font-[family-name:var(--font-cormorant)] text-lg md:text-xl font-light tracking-wide"
              style={{ color: "#1A1A1A" }}
            >
              agenticTOM
            </Link>
          </div>
        </nav>
        <div className="min-h-[80vh] flex flex-col justify-center px-5 md:px-8">
          <div className="max-w-[680px] mx-auto w-full">
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#8B7355" }}>
              Assessment
            </p>
            <h1
              className="font-[family-name:var(--font-cormorant)] font-light mb-6"
              style={{ fontSize: "clamp(32px, 5vw, 52px)", lineHeight: 1.15, color: "#1A1A1A" }}
            >
              How ready is your bank for the agentic shift?
            </h1>
            <p className="mb-4" style={{ fontSize: "1.05rem", color: "#1A1A1A", lineHeight: 1.8, maxWidth: 560 }}>
              Fifteen questions across five dimensions. No registration. Takes about five minutes.
            </p>
            <p className="mb-10" style={{ fontSize: "0.9rem", color: "#6B6B6B", lineHeight: 1.7, maxWidth: 520 }}>
              Designed to identify the gaps between your current operating model and the requirements of an agentic workforce. Exportable as PDF.
            </p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-6 mb-12">
              {categories.map((cat) => (
                <div key={cat} className="flex items-center gap-2">
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#2B3A52", display: "block", flexShrink: 0 }} />
                  <span className="text-xs uppercase tracking-widest" style={{ color: "#6B6B6B" }}>{cat}</span>
                </div>
              ))}
            </div>
            <button onClick={() => { track("assessment_start"); setStarted(true); }} className="btn-outline-slate">
              Begin assessment
            </button>
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
          <span className="text-xs uppercase tracking-widest" style={{ color: "#6B6B6B" }}>
            {currentQuestion + 1} / {questions.length}
          </span>
        </div>
        <div className="max-w-[900px] mx-auto">
          <div
            role="progressbar"
            aria-label="Assessment progress"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{ height: 2, background: "#D8D3CB" }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "#2B3A52",
                transition: "width 0.5s ease-in-out",
              }}
            />
          </div>
        </div>
      </nav>

      <div className="min-h-[80vh] flex flex-col justify-center px-5 md:px-8">
        <div className="max-w-[680px] mx-auto w-full">
          <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "#8B7355" }}>
            {q.category}
          </p>
          <h2
            className="font-[family-name:var(--font-cormorant)] font-light mb-10"
            style={{ fontSize: "clamp(22px, 4vw, 34px)", lineHeight: 1.3, color: "#1A1A1A" }}
          >
            {q.question}
          </h2>

          <div
            role="radiogroup"
            aria-label={q.question}
            className="flex flex-col gap-3"
          >
            {q.options.map((opt, i) => {
              const selected = answers[currentQuestion] === i;
              return (
                <button
                  key={i}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => selectOption(i)}
                  className="text-left px-5 py-4 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2B3A52]"
                  style={{
                    background: selected ? "rgba(43,58,82,0.08)" : "transparent",
                    border: `1px solid ${selected ? "#2B3A52" : "#D8D3CB"}`,
                    color: selected ? "#2B3A52" : "#1A1A1A",
                    fontSize: "0.9rem",
                    lineHeight: 1.6,
                    cursor: "pointer",
                  }}
                >
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
            {currentQuestion === questions.length - 1 ? (
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
