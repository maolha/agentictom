"use client";

import { useState } from "react";
import Link from "next/link";
import { questions, categories, levels, type CategoryScore, type AssessmentLevel } from "@/lib/assessment";

type Results = {
  categoryScores: CategoryScore[];
  totalScore: number;
  maxScore: number;
  level: AssessmentLevel;
  levelIndex: number;
};

export default function AssessmentResults({
  results,
  answers,
}: {
  results: Results;
  answers: (number | null)[];
}) {
  const [exporting, setExporting] = useState(false);
  const pct = Math.round((results.totalScore / results.maxScore) * 100);

  async function exportPDF() {
    setExporting(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const el = document.getElementById("results-export");
      if (!el) return;

      const canvas = await html2canvas(el, {
        scale: 2,
        backgroundColor: "#F7F4EF",
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let y = 10;
      if (imgHeight <= pageHeight - 20) {
        pdf.addImage(imgData, "JPEG", 10, y, imgWidth, imgHeight);
      } else {
        // Scale to fit
        const scale = (pageHeight - 20) / imgHeight;
        pdf.addImage(imgData, "JPEG", 10, y, imgWidth * scale, imgHeight * scale);
      }

      pdf.save("agentic-readiness-assessment.pdf");
    } catch (e) {
      console.error("PDF export failed:", e);
    } finally {
      setExporting(false);
    }
  }

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
          <button
            onClick={exportPDF}
            disabled={exporting}
            className="text-xs uppercase tracking-widest hover:underline"
            style={{ color: "#2B3A52", background: "none", border: "none", cursor: "pointer" }}
          >
            {exporting ? "Generating..." : "Export PDF"}
          </button>
        </div>
      </nav>

      <div id="results-export" className="px-5 md:px-8 py-12 md:py-20">
        <div className="max-w-[780px] mx-auto">
          {/* Header */}
          <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#8B7355" }}>
            Your Assessment
          </p>
          <h1
            className="font-[family-name:var(--font-cormorant)] font-light mb-2"
            style={{ fontSize: "clamp(32px, 5vw, 48px)", lineHeight: 1.15, color: "#1A1A1A" }}
          >
            {results.level.name}
          </h1>
          <p className="mb-10" style={{ fontSize: "0.95rem", color: "#6B6B6B", maxWidth: 560, lineHeight: 1.7 }}>
            {results.level.description}
          </p>

          {/* Score display */}
          <div className="flex items-baseline gap-3 mb-16">
            <span
              className="font-[family-name:var(--font-cormorant)] font-light"
              style={{ fontSize: "clamp(60px, 12vw, 100px)", color: "#2B3A52", lineHeight: 1 }}
            >
              {results.totalScore}
            </span>
            <span className="font-[family-name:var(--font-cormorant)] font-light" style={{ fontSize: "2rem", color: "#D8D3CB" }}>
              / {results.maxScore}
            </span>
          </div>

          {/* Level progression */}
          <div className="mb-16">
            <div className="flex justify-between mb-3">
              {levels.map((l, i) => (
                <div key={l.name} className="text-center" style={{ flex: 1 }}>
                  <div
                    className="mx-auto mb-2"
                    style={{
                      width: i === results.levelIndex ? 14 : 10,
                      height: i === results.levelIndex ? 14 : 10,
                      borderRadius: "50%",
                      background: i <= results.levelIndex ? "#2B3A52" : "#D8D3CB",
                      transition: "all 0.3s",
                    }}
                  />
                  <p
                    className="text-xs uppercase tracking-widest"
                    style={{
                      color: i === results.levelIndex ? "#2B3A52" : "#6B6B6B",
                      fontWeight: i === results.levelIndex ? 700 : 400,
                    }}
                  >
                    {l.name}
                  </p>
                </div>
              ))}
            </div>
            <div style={{ height: 2, background: "#D8D3CB", position: "relative" }}>
              <div
                style={{
                  height: "100%",
                  width: `${pct}%`,
                  background: "#2B3A52",
                  transition: "width 1s ease-in-out",
                }}
              />
            </div>
          </div>

          {/* Category breakdown */}
          <div className="mb-16">
            <h2
              className="font-[family-name:var(--font-cormorant)] font-light mb-8"
              style={{ fontSize: "1.5rem", color: "#1A1A1A" }}
            >
              By category
            </h2>
            <div className="flex flex-col gap-6">
              {results.categoryScores.map((cat) => {
                const catPct = Math.round((cat.score / cat.max) * 100);
                return (
                  <div key={cat.category}>
                    <div className="flex justify-between items-baseline mb-2">
                      <p className="text-sm" style={{ color: "#1A1A1A" }}>{cat.category}</p>
                      <p className="text-sm" style={{ color: "#6B6B6B" }}>{cat.score} / {cat.max}</p>
                    </div>
                    <div style={{ height: 4, background: "#D8D3CB" }}>
                      <div
                        style={{
                          height: "100%",
                          width: `${catPct}%`,
                          background: catPct >= 66 ? "#2B3A52" : catPct >= 33 ? "#8B7355" : "#1A1A1A",
                          transition: "width 0.8s ease-in-out",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Implication */}
          <div
            className="p-6 md:p-8 mb-16"
            style={{ borderLeft: "3px solid #2B3A52", background: "rgba(43,58,82,0.04)" }}
          >
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#8B7355" }}>Implication</p>
            <p style={{ color: "#1A1A1A", lineHeight: 1.8, fontSize: "0.95rem" }}>
              {results.level.implication}
            </p>
          </div>

          {/* Your answers */}
          <div className="mb-16">
            <h2
              className="font-[family-name:var(--font-cormorant)] font-light mb-8"
              style={{ fontSize: "1.5rem", color: "#1A1A1A" }}
            >
              Your responses
            </h2>
            {categories.map((cat) => (
              <div key={cat} className="mb-8">
                <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "#8B7355" }}>{cat}</p>
                {questions
                  .map((q, i) => ({ q, i }))
                  .filter(({ q }) => q.category === cat)
                  .map(({ q, i }) => (
                    <div key={i} className="mb-4 pb-4" style={{ borderBottom: "1px solid #D8D3CB" }}>
                      <p className="text-sm mb-1" style={{ color: "#1A1A1A", lineHeight: 1.6 }}>{q.question}</p>
                      <p className="text-sm" style={{ color: "#6B6B6B" }}>
                        {answers[i] !== null ? q.options[answers[i]!].text : "—"}{" "}
                        <span style={{ color: "#8B7355" }}>
                          ({answers[i] !== null ? q.options[answers[i]!].score : 0}/3)
                        </span>
                      </p>
                    </div>
                  ))}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center py-12" style={{ borderTop: "1px solid #D8D3CB" }}>
            <p
              className="font-[family-name:var(--font-cormorant)] font-light mb-6"
              style={{ fontSize: "clamp(20px, 3vw, 28px)", color: "#1A1A1A", lineHeight: 1.4 }}
            >
              Ready to design your agentic target operating model?
            </p>
            <Link href="/#speaking" className="btn-outline-slate">
              Enquire about a workshop
            </Link>
          </div>

          {/* Footer */}
          <div className="pt-8 mt-8" style={{ borderTop: "1px solid #D8D3CB" }}>
            <p className="text-xs" style={{ color: "#6B6B6B" }}>
              agentictom.com &copy; {new Date().getFullYear()} Marc Hauser — Agentic Readiness Assessment
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
