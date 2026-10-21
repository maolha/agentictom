"use client";

const SLATE = "#2B3A52";
const BRICK = "#A23B2A";
const MUTED = "#6B6B6B";
const FAINT = "#B9B2A4";
const LINE = "#E3DDD1";

const W = 640;
const H = 250;
const P = { x0: 60, x1: 520, y0: 24, y1: 200 };

// GitClear: share of changed lines that were moved (refactored) and that were copied and pasted.
const YEARS = [2020, 2022, 2024, 2026];
const MOVED = [24.1, 21, 9.5, 3.8];
const COPIED = [8.3, 9.4, 12.3, 15.7];

export default function CodeChurn() {
  const x = (y: number) => P.x0 + ((y - 2020) / 6) * (P.x1 - P.x0);
  const yv = (v: number) => P.y1 - (v / 30) * (P.y1 - P.y0);
  const path = (vals: number[]) => vals.map((v, i) => `${i === 0 ? "M" : "L"}${x(YEARS[i]).toFixed(1)} ${yv(v).toFixed(1)}`).join(" ");

  return (
    <div className="my-10 py-8" style={{ borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
      <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "#8B7355" }}>
        Figure · The lines crossed in 2024
      </p>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Share of changed code that was refactored fell from 24 percent in 2020 to 4 percent in 2026. Share that was copied and pasted rose from 8 to 16 percent. The two lines crossed in 2024."
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        {[0, 10, 20, 30].map((v) => (
          <g key={v}>
            <line x1={P.x0} y1={yv(v)} x2={P.x1} y2={yv(v)} stroke={LINE} strokeWidth={1} />
            <text x={P.x0 - 8} y={yv(v) + 3.5} textAnchor="end" fontSize={9} fill={FAINT} style={{ fontVariantNumeric: "tabular-nums" }}>
              {v}%
            </text>
          </g>
        ))}
        {YEARS.map((y) => (
          <text key={y} x={x(y)} y={P.y1 + 18} textAnchor="middle" fontSize={10} fill={FAINT}>
            {y}
          </text>
        ))}
        <path d={path(MOVED)} fill="none" stroke={SLATE} strokeWidth={2.4} strokeLinejoin="round" strokeLinecap="round" />
        <path d={path(COPIED)} fill="none" stroke={BRICK} strokeWidth={2.4} strokeLinejoin="round" strokeLinecap="round" />
        {YEARS.map((y, i) => (
          <g key={y}>
            <circle cx={x(y)} cy={yv(MOVED[i])} r={3.5} fill={SLATE} stroke="#F7F4EF" strokeWidth={1.5} />
            <circle cx={x(y)} cy={yv(COPIED[i])} r={3.5} fill={BRICK} stroke="#F7F4EF" strokeWidth={1.5} />
          </g>
        ))}
        <text x={P.x1 + 8} y={yv(MOVED[3]) + 4} fontSize={10} fontWeight={700} fill={SLATE} style={{ fontVariantNumeric: "tabular-nums" }}>
          3.8% refactored
        </text>
        <text x={P.x1 + 8} y={yv(COPIED[3]) + 4} fontSize={10} fontWeight={700} fill={BRICK} style={{ fontVariantNumeric: "tabular-nums" }}>
          15.7% copied
        </text>
        <text x={x(2020) + 8} y={yv(MOVED[0]) - 8} fontSize={10} fill={SLATE} style={{ fontVariantNumeric: "tabular-nums" }}>
          24.1% of changed lines were refactoring
        </text>
        <text x={x(2020) + 8} y={yv(COPIED[0]) + 14} fontSize={10} fill={BRICK} style={{ fontVariantNumeric: "tabular-nums" }}>
          8.3% were copy and paste
        </text>
      </svg>
      <p className="text-xs mt-4" style={{ color: MUTED, lineHeight: 1.6 }}>
        GitClear, AI Copilot Code Quality (February 2025, 211 million changed lines, 2020 to 2024) and The Maintainability Gap (June 2026, 623 million changed lines, 2022 to 2026). Two datasets, joined at the overlapping years. In the 2026 dataset, work on code older than twelve months fell 74 percent.
      </p>
    </div>
  );
}
