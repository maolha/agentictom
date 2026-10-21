"use client";

import { useState } from "react";

const SLATE = "#2B3A52";
const BRICK = "#A23B2A";
const INK = "#1A1A1A";
const MUTED = "#6B6B6B";
const FAINT = "#B9B2A4";
const LINE = "#E3DDD1";
const LINE2 = "#D8D3CB";

const W = 640;
const H = 240;
const P = { x0: 60, x1: 520, y0: 24, y1: 200 };

// GitClear: share of changed lines that were moved (refactored) and that were copied and pasted.
const YEARS = [2020, 2022, 2024, 2026];
const MOVED = [24.1, 21, 9.5, 3.8];
const COPIED = [8.3, 9.4, 12.3, 15.7];
const NOTES = [
  "Before coding assistants. One line in four that changed was a refactoring: code moved, tidied, consolidated.",
  "Copilot's first full year. Refactoring already slipping, copy and paste edging up.",
  "The year the lines cross. For the first time more changed code was pasted than refactored.",
  "Year to date, 623 million changed lines. Refactoring down 70 percent since 2022; work on code older than a year down 74 percent.",
];

export default function CodeChurn() {
  const [hover, setHover] = useState<number | null>(null);
  const i = hover ?? YEARS.length - 1;
  const x = (y: number) => P.x0 + ((y - 2020) / 6) * (P.x1 - P.x0);
  const yv = (v: number) => P.y1 - (v / 30) * (P.y1 - P.y0);
  const path = (vals: number[]) => vals.map((v, k) => `${k === 0 ? "M" : "L"}${x(YEARS[k]).toFixed(1)} ${yv(v).toFixed(1)}`).join(" ");

  return (
    <div className="my-10 py-8" style={{ borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
      <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#8B7355" }}>
        Figure · The lines crossed in 2024
      </p>
      <div className="mb-3" style={{ minHeight: "3.2em" }} aria-live="polite">
        <p className="text-sm" style={{ color: INK, lineHeight: 1.5, fontVariantNumeric: "tabular-nums" }}>
          <strong style={{ fontWeight: 700 }}>{YEARS[i]}</strong>
          <span style={{ color: SLATE }}> · {MOVED[i]} % of changed lines refactored</span>
          <span style={{ color: BRICK }}> · {COPIED[i]} % copied and pasted</span>
        </p>
        <p className="text-xs" style={{ color: MUTED, lineHeight: 1.5 }}>{NOTES[i]}</p>
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Share of changed code that was refactored fell from 24 percent in 2020 to 4 percent in 2026. Share that was copied and pasted rose from 8 to 16 percent. The two lines crossed in 2024. Hover a year for the detail."
        style={{ width: "100%", height: "auto", display: "block" }}
        onMouseLeave={() => setHover(null)}
      >
        {[0, 10, 20, 30].map((v) => (
          <g key={v}>
            <line x1={P.x0} y1={yv(v)} x2={P.x1} y2={yv(v)} stroke={LINE} strokeWidth={1} />
            <text x={P.x0 - 8} y={yv(v) + 3.5} textAnchor="end" fontSize={9} fill={FAINT} style={{ fontVariantNumeric: "tabular-nums" }}>
              {v}%
            </text>
          </g>
        ))}
        <line x1={x(YEARS[i])} y1={P.y0} x2={x(YEARS[i])} y2={P.y1} stroke={LINE2} strokeWidth={1} />
        <path d={path(MOVED)} fill="none" stroke={SLATE} strokeWidth={2.4} strokeLinejoin="round" strokeLinecap="round" />
        <path d={path(COPIED)} fill="none" stroke={BRICK} strokeWidth={2.4} strokeLinejoin="round" strokeLinecap="round" />
        {YEARS.map((y, k) => {
          const on = i === k;
          return (
            <g key={y}>
              <circle cx={x(y)} cy={yv(MOVED[k])} r={on ? 5 : 3.5} fill={SLATE} stroke="#F7F4EF" strokeWidth={1.5} />
              <circle cx={x(y)} cy={yv(COPIED[k])} r={on ? 5 : 3.5} fill={BRICK} stroke="#F7F4EF" strokeWidth={1.5} />
              <text x={x(y)} y={P.y1 + 18} textAnchor="middle" fontSize={10} fill={on ? INK : FAINT} fontWeight={on ? 700 : 400}>
                {y}
              </text>
            </g>
          );
        })}
        <text x={P.x1 + 8} y={yv(MOVED[3]) + 4} fontSize={10} fontWeight={700} fill={SLATE} style={{ fontVariantNumeric: "tabular-nums" }}>
          3.8% refactored
        </text>
        <text x={P.x1 + 8} y={yv(COPIED[3]) + 4} fontSize={10} fontWeight={700} fill={BRICK} style={{ fontVariantNumeric: "tabular-nums" }}>
          15.7% copied
        </text>
        {/* hit areas, one per year */}
        {YEARS.map((y, k) => (
          <rect key={`hit-${y}`} x={x(y) - (P.x1 - P.x0) / 6} y={P.y0 - 10} width={(P.x1 - P.x0) / 3} height={P.y1 - P.y0 + 34} fill="transparent" onMouseEnter={() => setHover(k)} />
        ))}
      </svg>
      <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3 text-xs" style={{ color: MUTED }}>
        <span className="flex items-center gap-2"><span style={{ width: 16, height: 0, borderTop: `2.4px solid ${SLATE}`, display: "inline-block" }} /> changed lines that were refactoring</span>
        <span className="flex items-center gap-2"><span style={{ width: 16, height: 0, borderTop: `2.4px solid ${BRICK}`, display: "inline-block" }} /> changed lines that were copy and paste</span>
      </div>
      <p className="text-xs mt-3" style={{ color: MUTED, lineHeight: 1.6 }}>
        GitClear, AI Copilot Code Quality (February 2025, 211 million changed lines, 2020 to 2024) and The Maintainability Gap (June 2026, 623 million changed lines, 2022 to 2026). Two datasets, joined at the overlapping years.
      </p>
    </div>
  );
}
