"use client";

const SLATE = "#2B3A52";
const INK = "#1A1A1A";
const MUTED = "#6B6B6B";
const FAINT = "#B9B2A4";
const LINE = "#E3DDD1";

const W = 640;
const H = 260;
const P = { x0: 56, x1: 620, y0: 24, y1: 200 };

function swiss(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}

// Microsoft Patch Tuesday, CVEs fixed per month. 2025: Tenable year in review (1'130 in the year).
// 2026: ranges across trackers, because Microsoft widened what it counts during the year.
const BARS = [
  { label: "2025 avg", lo: 94, hi: 94 },
  { label: "Jan to Mar 2026", lo: 45, hi: 112 },
  { label: "Apr to Jun", lo: 160, hi: 220 },
  { label: "Jul", lo: 545, hi: 622 },
  { label: "Aug", lo: 382, hi: 421 },
  { label: "Sep", lo: 943, hi: 999 },
  { label: "Oct", lo: 1371, hi: 1413 },
];
const MAX = 1500;

export default function PatchTuesday() {
  const slot = (P.x1 - P.x0) / BARS.length;
  const y = (v: number) => P.y1 - (v / MAX) * (P.y1 - P.y0);

  return (
    <div className="my-10 py-8" style={{ borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
      <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "#8B7355" }}>
        Figure · Microsoft Patch Tuesday, flaws fixed per month
      </p>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Microsoft fixed an average of 94 security flaws a month in 2025. In 2026 the monthly count rose through the year to a record of about 1'400 in October."
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        {[0, 500, 1000, 1500].map((v) => (
          <g key={v}>
            <line x1={P.x0} y1={y(v)} x2={P.x1} y2={y(v)} stroke={LINE} strokeWidth={1} />
            <text x={P.x0 - 8} y={y(v) + 3.5} textAnchor="end" fontSize={9} fill={FAINT} style={{ fontVariantNumeric: "tabular-nums" }}>
              {swiss(v)}
            </text>
          </g>
        ))}
        {BARS.map((b, i) => {
          const cx = P.x0 + slot * i + slot / 2;
          const w = 34;
          const top = y(b.hi);
          const bottom = y(b.lo);
          const point = b.lo === b.hi;
          return (
            <g key={b.label}>
              {point ? (
                <rect x={cx - w / 2} y={top - 1.5} width={w} height={3} fill={INK} />
              ) : (
                <rect x={cx - w / 2} y={y(b.lo)} width={w} height={P.y1 - y(b.lo)} fill={SLATE} />
              )}
              {!point && <rect x={cx - w / 2} y={top} width={w} height={bottom - top} fill={SLATE} opacity={0.45} />}
              <text x={cx} y={top - 7} textAnchor="middle" fontSize={10} fontWeight={700} fill={point ? INK : SLATE} style={{ fontVariantNumeric: "tabular-nums" }}>
                {point ? swiss(b.lo) : `${swiss(b.lo)} to ${swiss(b.hi)}`}
              </text>
              <text x={cx} y={P.y1 + 16} textAnchor="middle" fontSize={9} fill={FAINT}>
                {b.label}
              </text>
            </g>
          );
        })}
        <line x1={P.x0} y1={y(94)} x2={P.x1} y2={y(94)} stroke={INK} strokeWidth={1} strokeDasharray="1.5 3" />
      </svg>
      <p className="text-xs mt-4" style={{ color: MUTED, lineHeight: 1.6 }}>
        {"2025: Tenable, Patch Tuesday year in review, December 2025 (1'130 CVEs in the year, a record of 167 in October). 2026: ranges across Tenable, the Zero Day Initiative, BleepingComputer and the security-insider.de monthly tracker, shown as the lighter band; counts differ because Microsoft widened what it reports during 2026 to include Azure Linux and Chromium components. October 2026: 1'411 per BleepingComputer, 13 October 2026."}
      </p>
    </div>
  );
}
