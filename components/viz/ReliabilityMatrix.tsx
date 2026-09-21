"use client";

import { useState } from "react";

// Per step accuracy (rows) against number of chained steps (columns).
// Cell = probability that the whole chain completes without error, p^n,
// assuming independent steps. Illustrative calculation, as in the text.
const ACCURACIES = [80, 90, 95, 99, 99.5, 99.9, 99.99];
const STEPS = [5, 10, 25, 50, 100, 1000];

const SLATE = { r: 43, g: 58, b: 82 }; // #2B3A52
const SURFACE = { r: 247, g: 244, b: 239 }; // #F7F4EF

function swiss(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}

function chain(accuracy: number, steps: number): number {
  return Math.pow(accuracy / 100, steps) * 100;
}

// Precision follows the value, and a chain never rounds up to 100:
// 0.9999^5 is 99.95, and the difference is the point of the figure.
function formatRate(v: number): string {
  if (v >= 99.9) return v.toFixed(2);
  if (v >= 99) return v.toFixed(1);
  if (v >= 10) return Math.round(v).toString();
  if (v >= 0.1) return (Math.round(v * 10) / 10).toString();
  return "<0.1";
}

function formatFail(v: number): string {
  const f = 100 - v;
  if (v >= 99.9) return f.toFixed(2);
  if (v >= 99) return f.toFixed(1);
  if (v >= 10) return Math.round(f).toString();
  if (v >= 0.1) return (Math.round(f * 10) / 10).toString();
  return ">99.9";
}

function formatAccuracy(a: number): string {
  return a.toString();
}

// Sequential ramp: one hue, light to dark, on the page surface.
function cellColor(v: number): { background: string; color: string } {
  const t = Math.max(0, Math.min(1, v / 100));
  const mix = (a: number, b: number) => Math.round(a + (b - a) * t);
  const r = mix(SURFACE.r, SLATE.r);
  const g = mix(SURFACE.g, SLATE.g);
  const b = mix(SURFACE.b, SLATE.b);
  return { background: `rgb(${r}, ${g}, ${b})`, color: t >= 0.5 ? "#F7F4EF" : "#1A1A1A" };
}

function describe(accuracy: number, steps: number): string {
  const v = chain(accuracy, steps);
  return `${swiss(steps)} steps at ${formatAccuracy(accuracy)} percent per step complete ${formatRate(v)} percent of the time. ${formatFail(v)} percent of runs fail somewhere in the chain.`;
}

export default function ReliabilityMatrix() {
  const [selected, setSelected] = useState<{ a: number; s: number }>({ a: 95, s: 10 });
  const [hovered, setHovered] = useState<{ a: number; s: number } | null>(null);

  const active = hovered ?? selected;
  const activeValue = chain(active.a, active.s);

  return (
    <div className="my-10 py-8" style={{ borderTop: "1px solid #E3DDD1", borderBottom: "1px solid #E3DDD1" }}>
      <p className="text-xs uppercase tracking-widest mb-6" style={{ color: "#8B7355" }}>
        Interactive · Pick a chain
      </p>

      <div className="mb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="shrink-0">
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "#6B6B6B" }}>
            {swiss(active.s)} steps · {formatAccuracy(active.a)} percent per step
          </p>
          <p
            className="font-[family-name:var(--font-cormorant)] font-light"
            style={{ fontSize: "clamp(34px, 5vw, 48px)", color: "#2B3A52", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}
          >
            <span style={{ display: "inline-block", minWidth: "3.2ch" }}>{formatRate(activeValue)}</span>
            <span style={{ fontSize: "1rem", marginLeft: 8 }}>percent of runs complete</span>
          </p>
        </div>
        <p className="text-xs sm:max-w-[260px] sm:text-right" style={{ color: "#6B6B6B", lineHeight: 1.6, minHeight: "4.8em" }} aria-live="polite">
          {describe(active.a, active.s)}
        </p>
      </div>

      <div className="overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0">
        <table
          style={{ width: "100%", minWidth: 440, tableLayout: "fixed", borderCollapse: "separate", borderSpacing: 2, fontSize: "0.8rem", fontVariantNumeric: "tabular-nums" }}
          onMouseLeave={() => setHovered(null)}
        >
          <caption className="sr-only">
            Chain completion rate in percent, by per step accuracy (rows) and number of chained steps (columns).
          </caption>
          <thead>
            <tr>
              <th
                scope="col"
                className="text-left text-[10px] uppercase tracking-widest pb-2 pr-2"
                style={{ width: "22%", color: "#8B7355", fontWeight: 400, whiteSpace: "nowrap", verticalAlign: "bottom" }}
              >
                Accuracy per step
              </th>
              {STEPS.map((s) => {
                const on = active.s === s;
                return (
                  <th
                    key={s}
                    scope="col"
                    className="text-center text-[10px] uppercase tracking-widest pb-2"
                    style={{ color: on ? "#2B3A52" : "#8B7355", fontWeight: on ? 700 : 400, whiteSpace: "nowrap", verticalAlign: "bottom" }}
                  >
                    {swiss(s)} {s === STEPS[0] ? "steps" : ""}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {ACCURACIES.map((a) => {
              const rowOn = active.a === a;
              return (
                <tr key={a}>
                  <th
                    scope="row"
                    className="text-left pr-3"
                    style={{ color: rowOn ? "#2B3A52" : "#6B6B6B", fontWeight: rowOn ? 700 : 400, whiteSpace: "nowrap" }}
                  >
                    {formatAccuracy(a)} %
                  </th>
                  {STEPS.map((s) => {
                    const v = chain(a, s);
                    const { background, color } = cellColor(v);
                    const isActive = active.a === a && active.s === s;
                    const isSelected = selected.a === a && selected.s === s;
                    return (
                      <td key={s} style={{ padding: 0 }}>
                        <button
                          type="button"
                          onMouseEnter={() => setHovered({ a, s })}
                          onFocus={() => setHovered({ a, s })}
                          onBlur={() => setHovered(null)}
                          onClick={() => setSelected({ a, s })}
                          aria-label={`${swiss(s)} steps at ${formatAccuracy(a)} percent per step: ${formatRate(v)} percent of runs complete`}
                          aria-pressed={isSelected}
                          className="w-full block text-center"
                          style={{
                            background,
                            color,
                            padding: "10px 2px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            borderRadius: 3,
                            border: "none",
                            outline: isActive ? "2px solid #8B7355" : "2px solid transparent",
                            outlineOffset: -2,
                            cursor: "pointer",
                            fontWeight: isActive ? 700 : 400,
                            fontFamily: "inherit",
                            fontSize: "inherit",
                            transition: "outline-color 0.15s",
                          }}
                        >
                          {formatRate(v)}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center gap-3 text-[10px] uppercase tracking-widest" style={{ color: "#B9B2A4" }}>
        <span>0 %</span>
        <span
          aria-hidden="true"
          style={{ flex: 1, maxWidth: 160, height: 6, borderRadius: 3, background: "linear-gradient(to right, #F7F4EF, #2B3A52)", border: "1px solid #E3DDD1" }}
        />
        <span>100 % of runs complete</span>
      </div>

      <p className="text-xs mt-4" style={{ color: "#6B6B6B", lineHeight: 1.6 }}>
        Completion rate of the whole chain: accuracy per step raised to the power of the number of steps, assuming independent steps. Illustrative calculation, the same arithmetic as in the text. Ten steps at 90 percent land at 35. One hundred steps at 99 percent land at 37. Add a nine and the chain runs ten times longer at the same rate.
      </p>
    </div>
  );
}
