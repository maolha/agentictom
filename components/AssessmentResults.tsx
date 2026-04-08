"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { questions, categories, levels, categoryInsights, type CategoryScore, type AssessmentLevel } from "@/lib/assessment";

type Results = {
  categoryScores: CategoryScore[];
  totalScore: number;
  maxScore: number;
  level: AssessmentLevel;
  levelIndex: number;
};

function getInsightText(cat: CategoryScore): string {
  const insight = categoryInsights.find((c) => c.category === cat.category);
  if (!insight) return "";
  const pct = cat.score / cat.max;
  if (pct >= 0.66) return insight.high;
  if (pct >= 0.33) return insight.mid;
  return insight.low;
}

function getInsightQuestion(category: string): string {
  return categoryInsights.find((c) => c.category === category)?.question ?? "";
}

export default function AssessmentResults({
  results,
  answers,
}: {
  results: Results;
  answers: (number | null)[];
}) {
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportName, setExportName] = useState("");
  const [exportCompany, setExportCompany] = useState("");
  const pct = Math.round((results.totalScore / results.maxScore) * 100);

  const strongest = [...results.categoryScores].sort((a, b) => b.score / b.max - a.score / a.max)[0];
  const weakest = [...results.categoryScores].sort((a, b) => a.score / a.max - b.score / b.max)[0];

  async function exportPDF() {
    setExporting(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: [254, 143] });

      const slideIds = ["slide-title", "slide-summary", "slide-categories", "slide-insights", "slide-responses", "slide-next"];

      for (let i = 0; i < slideIds.length; i++) {
        const el = document.getElementById(slideIds[i]);
        if (!el) continue;

        el.style.display = "flex";
        const canvas = await html2canvas(el, { scale: 2, backgroundColor: "#F7F4EF", useCORS: true });
        el.style.display = "none";

        const imgData = canvas.toDataURL("image/jpeg", 0.95);
        if (i > 0) pdf.addPage([254, 143], "landscape");
        pdf.addImage(imgData, "JPEG", 0, 0, 254, 143);
      }

      const name = exportName || "assessment";
      const company = exportCompany ? `-${exportCompany.toLowerCase().replace(/\s+/g, "-")}` : "";
      pdf.save(`agentic-readiness-${name.toLowerCase().replace(/\s+/g, "-")}${company}.pdf`);
      track("assessment_pdf_export", { level: results.level.name });
      setShowExportDialog(false);
    } catch {
      // Silently fail — user can retry from dialog
    } finally {
      setExporting(false);
    }
  }

  const dateStr = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <main style={{ background: "#F7F4EF", color: "#1A1A1A", minHeight: "100vh" }}>
      {/* Export dialog */}
      {showExportDialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-5"
          style={{ background: "rgba(26,26,26,0.6)" }}
          onClick={() => setShowExportDialog(false)}
          onKeyDown={(e) => { if (e.key === "Escape") setShowExportDialog(false); }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="export-dialog-title"
            className="w-full max-w-md p-8"
            style={{ background: "#F7F4EF" }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="export-dialog-title" className="font-[family-name:var(--font-cormorant)] font-light mb-6" style={{ fontSize: "1.5rem", color: "#1A1A1A" }}>
              Export your report
            </h3>
            <p className="text-sm mb-6" style={{ color: "#6B6B6B" }}>
              Optional — personalise your PDF with your name and company.
            </p>
            <div className="flex flex-col gap-4 mb-8">
              <input
                type="text"
                placeholder="Name"
                aria-label="Name"
                value={exportName}
                onChange={(e) => setExportName(e.target.value)}
                className="bg-transparent py-2 text-sm focus:outline-none focus-visible:border-[#2B3A52]"
                style={{ borderBottom: "1px solid #D8D3CB", color: "#1A1A1A" }}
              />
              <input
                type="text"
                placeholder="Company"
                aria-label="Company"
                value={exportCompany}
                onChange={(e) => setExportCompany(e.target.value)}
                className="bg-transparent py-2 text-sm focus:outline-none focus-visible:border-[#2B3A52]"
                style={{ borderBottom: "1px solid #D8D3CB", color: "#1A1A1A" }}
              />
            </div>
            <div className="flex gap-4">
              <button onClick={exportPDF} disabled={exporting} className="btn-outline-slate">
                {exporting ? "Generating..." : "Generate PDF"}
              </button>
              <button
                onClick={() => setShowExportDialog(false)}
                className="text-xs uppercase tracking-widest"
                style={{ color: "#6B6B6B", background: "none", border: "none", cursor: "pointer" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden PDF slides */}
      <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
        {/* Slide 1: Title */}
        <div id="slide-title" style={{ width: 1016, height: 572, background: "#F7F4EF", display: "none", flexDirection: "column", justifyContent: "center", padding: 80 }}>
          <div style={{ fontSize: 14, color: "#8B7355", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 24 }}>
            Agentic Readiness Assessment
          </div>
          <div style={{ fontSize: 56, fontWeight: 300, color: "#1A1A1A", lineHeight: 1.15, marginBottom: 32 }}>
            {results.level.name}
          </div>
          <div style={{ fontSize: 18, color: "#6B6B6B", lineHeight: 1.6, maxWidth: 600 }}>
            {results.level.description}
          </div>
          <div style={{ position: "absolute", bottom: 80, left: 80, display: "flex", gap: 24, fontSize: 14, color: "#6B6B6B" }}>
            {exportName && <span>{exportName}</span>}
            {exportCompany && <span>{exportCompany}</span>}
            <span>{dateStr}</span>
          </div>
          <div style={{ position: "absolute", bottom: 80, right: 80, fontSize: 14, color: "#8B7355" }}>
            agentictom.com
          </div>
          <div style={{ position: "absolute", top: 0, right: 0, width: 6, height: "100%", background: "#2B3A52" }} />
        </div>

        {/* Slide 2: Summary */}
        <div id="slide-summary" style={{ width: 1016, height: 572, background: "#F7F4EF", display: "none", flexDirection: "column", padding: 80 }}>
          <div style={{ fontSize: 14, color: "#8B7355", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 24 }}>
            Your Score
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 48 }}>
            <span style={{ fontSize: 96, fontWeight: 300, color: "#2B3A52", lineHeight: 1 }}>{results.totalScore}</span>
            <span style={{ fontSize: 32, fontWeight: 300, color: "#D8D3CB" }}>/ {results.maxScore}</span>
          </div>
          <div style={{ display: "flex", gap: 40, marginBottom: 48 }}>
            <div>
              <div style={{ fontSize: 12, color: "#8B7355", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 8 }}>Strongest</div>
              <div style={{ fontSize: 18, color: "#2B3A52" }}>{strongest.category}</div>
              <div style={{ fontSize: 14, color: "#6B6B6B" }}>{strongest.score}/{strongest.max}</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#8B7355", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 8 }}>Most exposed</div>
              <div style={{ fontSize: 18, color: "#1A1A1A" }}>{weakest.category}</div>
              <div style={{ fontSize: 14, color: "#6B6B6B" }}>{weakest.score}/{weakest.max}</div>
            </div>
          </div>
          <div style={{ padding: "20px 24px", borderLeft: "3px solid #2B3A52", background: "rgba(43,58,82,0.04)", maxWidth: 600 }}>
            <div style={{ fontSize: 15, color: "#1A1A1A", lineHeight: 1.7 }}>
              {results.level.implication}
            </div>
          </div>
          <div style={{ position: "absolute", bottom: 80, right: 80, fontSize: 14, color: "#8B7355" }}>agentictom.com</div>
          <div style={{ position: "absolute", top: 0, right: 0, width: 6, height: "100%", background: "#2B3A52" }} />
        </div>

        {/* Slide 3: Categories */}
        <div id="slide-categories" style={{ width: 1016, height: 572, background: "#F7F4EF", display: "none", flexDirection: "column", padding: 80 }}>
          <div style={{ fontSize: 14, color: "#8B7355", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 24 }}>
            By Category
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {results.categoryScores.map((cat) => {
              const catPct = Math.round((cat.score / cat.max) * 100);
              return (
                <div key={cat.category}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 15, color: "#1A1A1A" }}>{cat.category}</span>
                    <span style={{ fontSize: 15, color: "#6B6B6B" }}>{cat.score} / {cat.max}</span>
                  </div>
                  <div style={{ height: 6, background: "#D8D3CB", width: "100%" }}>
                    <div style={{ height: "100%", width: `${catPct}%`, background: catPct >= 66 ? "#2B3A52" : catPct >= 33 ? "#8B7355" : "#1A1A1A" }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ position: "absolute", bottom: 80, right: 80, fontSize: 14, color: "#8B7355" }}>agentictom.com</div>
          <div style={{ position: "absolute", top: 0, right: 0, width: 6, height: "100%", background: "#2B3A52" }} />
        </div>

        {/* Slide 4: Insights */}
        <div id="slide-insights" style={{ width: 1016, height: 572, background: "#F7F4EF", display: "none", flexDirection: "column", padding: 80, overflow: "hidden" }}>
          <div style={{ fontSize: 14, color: "#8B7355", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 24 }}>
            Key Insights
          </div>
          <div style={{ display: "flex", gap: 32 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: "#8B7355", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12 }}>Most exposed: {weakest.category}</div>
              <div style={{ fontSize: 14, color: "#1A1A1A", lineHeight: 1.7, marginBottom: 20 }}>
                {getInsightText(weakest)}
              </div>
              <div style={{ fontSize: 13, color: "#2B3A52", fontStyle: "italic", lineHeight: 1.6 }}>
                {getInsightQuestion(weakest.category)}
              </div>
            </div>
            <div style={{ width: 1, background: "#D8D3CB" }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: "#8B7355", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12 }}>Strongest: {strongest.category}</div>
              <div style={{ fontSize: 14, color: "#1A1A1A", lineHeight: 1.7, marginBottom: 20 }}>
                {getInsightText(strongest)}
              </div>
              <div style={{ fontSize: 13, color: "#2B3A52", fontStyle: "italic", lineHeight: 1.6 }}>
                {getInsightQuestion(strongest.category)}
              </div>
            </div>
          </div>
          <div style={{ position: "absolute", bottom: 80, right: 80, fontSize: 14, color: "#8B7355" }}>agentictom.com</div>
          <div style={{ position: "absolute", top: 0, right: 0, width: 6, height: "100%", background: "#2B3A52" }} />
        </div>

        {/* Slide 5: Responses */}
        <div id="slide-responses" style={{ width: 1016, height: 572, background: "#F7F4EF", display: "none", flexDirection: "column", padding: "60px 80px", overflow: "hidden" }}>
          <div style={{ fontSize: 14, color: "#8B7355", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
            Your Responses
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 11, lineHeight: 1.5 }}>
            {questions.map((q, i) => (
              <div key={i} style={{ display: "flex", gap: 8, borderBottom: "1px solid #ece8e0", paddingBottom: 4 }}>
                <span style={{ color: "#8B7355", minWidth: 18 }}>{String(i + 1).padStart(2, "0")}</span>
                <span style={{ color: "#1A1A1A", flex: 1 }}>{q.question}</span>
                <span style={{ color: "#6B6B6B", minWidth: 20, textAlign: "right" }}>
                  {answers[i] !== null ? q.options[answers[i]!].score : 0}/3
                </span>
              </div>
            ))}
          </div>
          <div style={{ position: "absolute", bottom: 60, right: 80, fontSize: 14, color: "#8B7355" }}>agentictom.com</div>
          <div style={{ position: "absolute", top: 0, right: 0, width: 6, height: "100%", background: "#2B3A52" }} />
        </div>

        {/* Slide 6: Next steps */}
        <div id="slide-next" style={{ width: 1016, height: 572, background: "#2B3A52", display: "none", flexDirection: "column", justifyContent: "center", padding: 80 }}>
          <div style={{ fontSize: 14, color: "#8B7355", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 24 }}>
            What Next
          </div>
          <div style={{ fontSize: 36, fontWeight: 300, color: "#F7F4EF", lineHeight: 1.3, marginBottom: 40, maxWidth: 700 }}>
            Now you know where you stand. The next step is yours.
          </div>
          <div style={{ fontSize: 16, color: "rgba(247,244,239,0.6)", lineHeight: 1.7, maxWidth: 560, marginBottom: 48 }}>
            Share this report with your leadership team. Use the scores to structure the conversation about what your operating model needs to become. The gaps this assessment reveals are the decisions your organisation has not yet made.
          </div>
          <div style={{ fontSize: 16, color: "#8B7355" }}>
            agentictom.com — Marc Hauser
          </div>
        </div>
      </div>

      {/* Visible results page */}
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
            onClick={() => setShowExportDialog(true)}
            className="btn-outline-slate"
            style={{ fontSize: "0.7rem", padding: "8px 20px" }}
          >
            Export PDF
          </button>
        </div>
      </nav>

      <div className="px-5 md:px-8 py-12 md:py-20">
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

          {/* Score */}
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
                    }}
                  />
                  <p
                    className="text-xs uppercase tracking-widest hidden sm:block"
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
            <div style={{ height: 2, background: "#D8D3CB" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: "#2B3A52", transition: "width 1s ease-in-out" }} />
            </div>
          </div>

          {/* Strongest / Weakest */}
          <div className="grid grid-cols-2 gap-6 mb-16">
            <div className="p-5" style={{ border: "1px solid #D8D3CB" }}>
              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "#8B7355" }}>Strongest</p>
              <p className="font-[family-name:var(--font-cormorant)] font-light" style={{ fontSize: "1.2rem", color: "#2B3A52" }}>
                {strongest.category}
              </p>
              <p className="text-sm" style={{ color: "#6B6B6B" }}>{strongest.score}/{strongest.max}</p>
            </div>
            <div className="p-5" style={{ border: "1px solid #D8D3CB" }}>
              <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "#8B7355" }}>Most exposed</p>
              <p className="font-[family-name:var(--font-cormorant)] font-light" style={{ fontSize: "1.2rem", color: "#1A1A1A" }}>
                {weakest.category}
              </p>
              <p className="text-sm" style={{ color: "#6B6B6B" }}>{weakest.score}/{weakest.max}</p>
            </div>
          </div>

          {/* Category breakdown */}
          <div className="mb-16">
            <h2 className="font-[family-name:var(--font-cormorant)] font-light mb-8" style={{ fontSize: "1.5rem", color: "#1A1A1A" }}>
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
                      <div style={{ height: "100%", width: `${catPct}%`, background: catPct >= 66 ? "#2B3A52" : catPct >= 33 ? "#8B7355" : "#1A1A1A", transition: "width 0.8s ease-in-out" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Implication */}
          <div className="p-6 md:p-8 mb-16" style={{ borderLeft: "3px solid #2B3A52", background: "rgba(43,58,82,0.04)" }}>
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#8B7355" }}>Implication</p>
            <p style={{ color: "#1A1A1A", lineHeight: 1.8, fontSize: "0.95rem" }}>
              {results.level.implication}
            </p>
          </div>

          {/* Category insights */}
          <div className="mb-16">
            <h2 className="font-[family-name:var(--font-cormorant)] font-light mb-8" style={{ fontSize: "1.5rem", color: "#1A1A1A" }}>
              What this means
            </h2>
            {results.categoryScores.map((cat) => (
              <div key={cat.category} className="mb-8 pb-8" style={{ borderBottom: "1px solid #D8D3CB" }}>
                <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "#8B7355" }}>
                  {cat.category} — {cat.score}/{cat.max}
                </p>
                <p className="text-sm mb-3" style={{ color: "#1A1A1A", lineHeight: 1.7 }}>
                  {getInsightText(cat)}
                </p>
                <p className="text-sm italic" style={{ color: "#2B3A52" }}>
                  {getInsightQuestion(cat.category)}
                </p>
              </div>
            ))}
          </div>

          {/* Responses */}
          <div className="mb-16">
            <h2 className="font-[family-name:var(--font-cormorant)] font-light mb-8" style={{ fontSize: "1.5rem", color: "#1A1A1A" }}>
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
                        <span style={{ color: "#8B7355" }}>({answers[i] !== null ? q.options[answers[i]!].score : 0}/3)</span>
                      </p>
                    </div>
                  ))}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="py-12 md:py-16" style={{ borderTop: "1px solid #D8D3CB" }}>
            <div className="p-8 md:p-12 text-center" style={{ background: "#2B3A52" }}>
              <p
                className="font-[family-name:var(--font-cormorant)] font-light mb-4"
                style={{ fontSize: "clamp(20px, 3vw, 28px)", color: "#F7F4EF", lineHeight: 1.4 }}
              >
                Now you know where you stand.
              </p>
              <p className="mb-8 text-sm" style={{ color: "rgba(247,244,239,0.6)", maxWidth: 480, margin: "0 auto 2rem" }}>
                Share this with your leadership team. If you want to discuss what the gaps mean for your institution, let&apos;s talk.
              </p>
              <Link
                href="/#contact"
                className="inline-block px-8 py-3 border text-xs uppercase tracking-widest transition-colors duration-300"
                style={{ borderColor: "#F7F4EF", color: "#F7F4EF" }}
              >
                Start a conversation
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-8" style={{ borderTop: "1px solid #D8D3CB" }}>
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <p className="text-xs" style={{ color: "#6B6B6B" }}>
                agentictom.com &copy; {new Date().getFullYear()} Marc Hauser
              </p>
              <button
                onClick={() => setShowExportDialog(true)}
                className="text-xs uppercase tracking-widest hover:underline"
                style={{ color: "#2B3A52", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
              >
                Export PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
