"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

/* ------------------------------------------------------------------ */
/* Model                                                                */
/* ------------------------------------------------------------------ */

type Check = "none" | "auto" | "human";
type Step = { name: string; p: number; check: Check; c: number };

const DEFAULT_STEPS: Step[] = [
  { name: "Read the client instruction", p: 3, check: "none", c: 0 },
  { name: "Extract the fields", p: 4, check: "auto", c: 70 },
  { name: "Match the counterparty", p: 2, check: "none", c: 0 },
  { name: "Check the policy (rule engine)", p: 0, check: "none", c: 0 },
  { name: "Calculate the amounts (code)", p: 0, check: "none", c: 0 },
  { name: "Decide and route", p: 5, check: "human", c: 85 },
  { name: "Post the booking (API)", p: 0.1, check: "auto", c: 95 },
];

const INK = "#1A1A1A";
const MUTED = "#6B6B6B";
const FAINT = "#B9B2A4";
const LINE = "#E3DDD1";
const LINE2 = "#D8D3CB";
const SUNK = "#F0ECE3";
const SLATE = "#2B3A52";
const BROWN = "#8B7355";
const BRICK = "#A23B2A";

function swiss(n: number): string {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
}

// Share of runs, in percent, with precision that follows the value.
function pct(v: number): string {
  if (v >= 99.995) return "99.99+";
  if (v >= 10) return v.toFixed(1);
  if (v >= 1) return v.toFixed(1);
  if (v >= 0.01) return v.toFixed(2);
  if (v > 0) return "<0.01";
  return "0";
}

function perThousand(rate: number): string {
  const v = rate * 1000;
  if (v >= 100) return swiss(v);
  if (v >= 10) return v.toFixed(0);
  if (v >= 1) return v.toFixed(1);
  if (v >= 0.1) return v.toFixed(1);
  if (v > 0) return "<0.1";
  return "0";
}

// Error rate slider: logarithmic from 0.01 to about 30 percent.
const SLIDER_MAX = 1000;
function errorFromSlider(v: number): number {
  return Math.pow(10, -4 + (3.5 * v) / SLIDER_MAX); // fraction
}
function sliderFromError(e: number): number {
  const v = ((Math.log10(Math.max(1e-4, Math.min(0.316, e))) + 4) / 3.5) * SLIDER_MAX;
  return Math.round(Math.max(0, Math.min(SLIDER_MAX, v)));
}
function fmtError(e: number): string {
  const v = e * 100;
  if (v >= 1) return v.toFixed(1);
  if (v >= 0.1) return v.toFixed(2);
  return v.toFixed(2);
}
function fmtAccuracy(e: number): string {
  const v = (1 - e) * 100;
  if (e >= 0.01) return v.toFixed(1);
  if (e >= 0.001) return v.toFixed(2);
  return v.toFixed(3);
}

type ChainResult = {
  clean: number;
  caught: number;
  undetected: number;
  noChecks: number;
  touches: number; // expected human touches per case
  contrib: number[]; // each step's share of the undetected rate
  flags: number[]; // expected flags per case at each step's check
};

function computeChain(steps: Step[]): ChainResult {
  const n = steps.length;
  const p = steps.map((s) => Math.max(0, Math.min(1, s.p / 100)));
  const c = steps.map((s) => (s.check === "none" ? 0 : Math.max(0, Math.min(1, s.c / 100))));

  // survive[i]: probability that an error made at step i passes every later check
  const survive = new Array<number>(n);
  let acc = 1;
  for (let i = n - 1; i >= 0; i--) {
    acc *= 1 - c[i];
    survive[i] = acc;
  }

  let clean = 1;
  let noUndetected = 1;
  const contrib: number[] = [];
  for (let i = 0; i < n; i++) {
    clean *= 1 - p[i];
    noUndetected *= 1 - p[i] * survive[i];
    contrib.push(p[i] * survive[i]);
  }
  const undetected = 1 - noUndetected;
  const caught = Math.max(0, noUndetected - clean);

  // flags[j]: probability that the check after step j fires
  const flags: number[] = [];
  let touches = 0;
  for (let j = 0; j < n; j++) {
    if (steps[j].check === "none") {
      flags.push(0);
      continue;
    }
    let noFlag = 1;
    for (let i = 0; i <= j; i++) {
      let pass = 1;
      for (let k = i; k < j; k++) pass *= 1 - c[k];
      noFlag *= 1 - p[i] * pass * c[j];
    }
    const f = 1 - noFlag;
    flags.push(f);
    // An automated check hands its flags to a person. A human review looks at every case.
    touches += steps[j].check === "human" ? 1 : f;
  }

  let noChecks = 1;
  for (let i = 0; i < n; i++) noChecks *= 1 - p[i];

  return { clean, caught, undetected, noChecks: 1 - noChecks, touches, contrib, flags };
}

/* ------------------------------------------------------------------ */
/* URL state                                                            */
/* ------------------------------------------------------------------ */

function encodeSteps(steps: Step[]): string {
  return steps
    .map((s) => [s.name.replace(/[|~]/g, " "), s.p, s.check[0], s.c].join("|"))
    .join("~");
}
function decodeSteps(raw: string): Step[] | null {
  try {
    const rows = raw.split("~").map((r) => {
      const [name, p, ch, c] = r.split("|");
      const check: Check = ch === "a" ? "auto" : ch === "h" ? "human" : "none";
      return {
        name: (name || "Step").slice(0, 60),
        p: Math.max(0, Math.min(60, parseFloat(p) || 0)),
        check,
        c: check === "none" ? 0 : Math.max(0, Math.min(100, parseFloat(c) || 0)),
      };
    });
    return rows.length > 0 && rows.length <= 30 ? rows : null;
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ */
/* Small UI pieces                                                      */
/* ------------------------------------------------------------------ */

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs uppercase tracking-widest" style={{ color: BROWN }}>
      {children}
    </p>
  );
}

function Tile({
  label,
  value,
  unit,
  caption,
  color = SLATE,
}: {
  label: string;
  value: string;
  unit?: string;
  caption: string;
  color?: string;
}) {
  return (
    <div className="py-4 pr-4" style={{ borderTop: `1px solid ${LINE2}` }}>
      <p className="text-xs uppercase tracking-widest mb-2" style={{ color: MUTED }}>
        {label}
      </p>
      <p
        className="font-[family-name:var(--font-cormorant)] font-light"
        style={{ fontSize: "clamp(30px, 4vw, 40px)", color, lineHeight: 1.05, fontVariantNumeric: "tabular-nums" }}
      >
        {value}
        {unit && <span style={{ fontSize: "1rem", marginLeft: 6, color: MUTED }}>{unit}</span>}
      </p>
      <p className="text-xs mt-1" style={{ color: MUTED, lineHeight: 1.5 }}>
        {caption}
      </p>
    </div>
  );
}

function CopyLink({ label, event, text, done = "Link copied" }: { label: string; event: string; text?: () => string; done?: string }) {
  const [state, setState] = useState<"idle" | "done" | "fail">("idle");
  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text ? text() : window.location.href);
      setState("done");
      track(event);
    } catch {
      setState("fail");
    }
    setTimeout(() => setState("idle"), 2200);
  }, [event, text]);
  return (
    <button
      type="button"
      onClick={copy}
      className="btn-outline-slate"
      style={{ fontSize: "0.7rem", padding: "9px 18px" }}
    >
      {state === "done" ? done : state === "fail" ? "Copy the address bar" : label}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Part 1 chart                                                         */
/* ------------------------------------------------------------------ */

const W = 640;
const H = 270;
const PL = 48;
const PR = 16;
const PT = 18;
const PB = 40;

function FailureCurve({ e, n, tol, maxN }: { e: number; n: number; tol: number; maxN: number }) {
  const [hover, setHover] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Show the chain past the chosen length, so the reader sees where the curve is heading.
  const xMax = Math.min(100, Math.max(2 * n, maxN + 3, 12));
  const iw = W - PL - PR;
  const ih = H - PT - PB;

  const series = [
    { e: Math.min(0.9, e * 2), color: MUTED, width: 1.5, dash: "5 4", label: "double the error" },
    { e: e / 2, color: BROWN, width: 1.8, dash: undefined, label: "half the error" },
    { e, color: SLATE, width: 2.6, dash: undefined, label: "your error rate" },
  ];

  // Vertical scale follows the data: the highest curve at the horizon, or the tolerance line.
  const peak = Math.max(1 - Math.pow(1 - series[0].e, xMax), tol * 1.3, 0.02);
  const yMax = [0.05, 0.1, 0.2, 0.25, 0.5, 1].find((v) => v >= peak) ?? 1;
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((f) => f * yMax);

  const xs = (i: number) => PL + (iw * (i - 1)) / (xMax - 1 || 1);
  const ys = (v: number) => PT + ih * (1 - Math.max(0, Math.min(1, v / yMax)));
  const path = (er: number) => {
    let d = "";
    for (let i = 1; i <= xMax; i++) {
      const v = 1 - Math.pow(1 - er, i);
      d += `${i === 1 ? "M" : "L"}${xs(i).toFixed(1)} ${ys(v).toFixed(1)} `;
    }
    return d.trim();
  };

  const onMove = (ev: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const x = ((ev.clientX - rect.left) / rect.width) * W;
    const i = Math.round(((x - PL) / iw) * (xMax - 1)) + 1;
    setHover(Math.max(1, Math.min(xMax, i)));
  };

  const tickStep = xMax <= 12 ? 1 : xMax <= 30 ? 5 : 10;
  const ticks: number[] = [];
  for (let i = 1; i <= xMax; i += tickStep) ticks.push(i);
  if (ticks[ticks.length - 1] !== xMax) ticks.push(xMax);

  const hv = hover ?? n;
  const hoverVals = series.map((s) => 1 - Math.pow(1 - s.e, hv));
  const tipX = xs(hv) > W / 2 ? xs(hv) - 168 : xs(hv) + 12;

  return (
    <div>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`Share of runs that fail, by number of steps, for three error rates. At ${n} steps and ${fmtError(e)} percent error per step, ${pct((1 - Math.pow(1 - e, n)) * 100)} percent of runs fail.`}
        style={{ width: "100%", height: "auto", display: "block", cursor: "crosshair" }}
        onMouseMove={onMove}
        onMouseLeave={() => setHover(null)}
      >
        {yTicks.map((v) => (
          <g key={v}>
            <line x1={PL} y1={ys(v)} x2={W - PR} y2={ys(v)} stroke={LINE} strokeWidth={1} />
            <text x={PL - 8} y={ys(v) + 3.5} textAnchor="end" fontSize={10} fill={FAINT} style={{ fontVariantNumeric: "tabular-nums" }}>
              {yMax <= 0.1 ? (v * 100).toFixed(1) : Math.round(v * 100)}%
            </text>
          </g>
        ))}
        {ticks.map((i) => (
          <text key={i} x={xs(i)} y={H - 16} textAnchor="middle" fontSize={10} fill={FAINT}>
            {i}
          </text>
        ))}
        <text x={PL + iw / 2} y={H - 3} textAnchor="middle" fontSize={10} fill={FAINT} letterSpacing="0.1em" style={{ textTransform: "uppercase" }}>
          Steps in the chain
        </text>
        <text x={PL + 4} y={PT - 6} fontSize={10} fill={FAINT} letterSpacing="0.1em" style={{ textTransform: "uppercase" }}>
          Runs that fail
        </text>

        {/* tolerance */}
        <line x1={PL} y1={ys(tol)} x2={W - PR} y2={ys(tol)} stroke={INK} strokeWidth={1} strokeDasharray="1.5 3" strokeLinecap="round" />
        <text x={W - PR} y={ys(tol) - 5} textAnchor="end" fontSize={10} fill={INK}>
          Tolerance {Math.round(tol * 100)}%
        </text>

        {series.map((s) => (
          <path key={s.label} d={path(s.e)} fill="none" stroke={s.color} strokeWidth={s.width} strokeDasharray={s.dash} strokeLinejoin="round" strokeLinecap="round" />
        ))}

        {/* chosen point */}
        <circle cx={xs(n)} cy={ys(1 - Math.pow(1 - e, n))} r={4.5} fill={SLATE} stroke="#F7F4EF" strokeWidth={2} />

        {/* hover */}
        {hover !== null && (
          <g>
            <line x1={xs(hv)} y1={PT} x2={xs(hv)} y2={PT + ih} stroke={LINE2} strokeWidth={1} />
            {series.map((s, i) => (
              <circle key={s.label} cx={xs(hv)} cy={ys(hoverVals[i])} r={3.5} fill={s.color} stroke="#F7F4EF" strokeWidth={1.5} />
            ))}
            <rect x={tipX} y={PT + 4} width={156} height={62} fill="#F7F4EF" stroke={LINE2} strokeWidth={1} />
            <text x={tipX + 10} y={PT + 20} fontSize={10.5} fill={INK} fontWeight={700}>
              {hv} {hv === 1 ? "step" : "steps"}
            </text>
            {[2, 1, 0].map((idx, row) => (
              <text key={idx} x={tipX + 10} y={PT + 35 + row * 13} fontSize={10.5} fill={series[idx].color} style={{ fontVariantNumeric: "tabular-nums" }}>
                {fmtError(series[idx].e)}% per step: {pct(hoverVals[idx] * 100)}% fail
              </text>
            ))}
          </g>
        )}
      </svg>
      <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3 text-xs" style={{ color: MUTED }}>
        {[...series].reverse().map((s) => (
          <span key={s.label} className="flex items-center gap-2">
            <span style={{ width: 16, height: 0, borderTop: `${s.width}px ${s.dash ? "dashed" : "solid"} ${s.color}`, display: "inline-block" }} />
            {s.label}, {fmtError(s.e)} percent
          </span>
        ))}
        <span className="flex items-center gap-2">
          <span style={{ width: 16, height: 0, borderTop: `2px dotted ${INK}`, display: "inline-block" }} />
          tolerance
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Part 2 chain strip                                                   */
/* ------------------------------------------------------------------ */

function ChainStrip({ steps, result }: { steps: Step[]; result: ChainResult }) {
  const n = steps.length;
  const slot = 72;
  const width = Math.max(320, n * slot + 24);
  const height = 96;
  const cy = 40;
  const maxContrib = Math.max(1e-9, ...result.contrib);

  return (
    <div className="overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`The chain as a row of ${n} steps. Filled circles are probabilistic steps, sized by their error rate. Hollow circles are deterministic. A square marks a check.`}
        style={{ width: "100%", minWidth: Math.min(width, 640), height: "auto", display: "block" }}
      >
        <line x1={12} y1={cy} x2={width - 12} y2={cy} stroke={LINE2} strokeWidth={1.5} />
        {steps.map((s, i) => {
          const cx = 12 + slot / 2 + i * slot;
          const r = s.p <= 0 ? 7 : 7 + Math.min(11, Math.sqrt(s.p) * 3.2);
          const det = s.p <= 0;
          const share = result.contrib[i] / maxContrib;
          return (
            <g key={i}>
              <title>{`${i + 1}. ${s.name}: ${s.p} percent error${s.check !== "none" ? `, ${s.check === "auto" ? "automated check" : "human review"} catching ${s.c} percent` : ""}`}</title>
              {/* contribution to residual, under the node */}
              <rect x={cx - 14} y={cy + 24} width={28} height={6} fill={SUNK} />
              <rect x={cx - 14} y={cy + 24} width={28 * share} height={6} fill={BRICK} opacity={share > 0 ? 1 : 0} />
              <circle cx={cx} cy={cy} r={r} fill={det ? "#F7F4EF" : SLATE} stroke={SLATE} strokeWidth={det ? 1.5 : 0} />
              <text x={cx} y={cy + 4} textAnchor="middle" fontSize={10} fill={det ? SLATE : "#F7F4EF"} fontWeight={700} style={{ fontVariantNumeric: "tabular-nums" }}>
                {i + 1}
              </text>
              {s.check !== "none" && (
                <g>
                  <rect x={cx + slot / 2 - 7} y={cy - 7} width={14} height={14} fill={s.check === "human" ? BROWN : "#F7F4EF"} stroke={BROWN} strokeWidth={1.5} />
                  <text x={cx + slot / 2} y={cy + 3.5} textAnchor="middle" fontSize={9} fill={s.check === "human" ? "#F7F4EF" : BROWN} fontWeight={700}>
                    {s.check === "human" ? "H" : "A"}
                  </text>
                </g>
              )}
              <text x={cx} y={cy + 46} textAnchor="middle" fontSize={9} fill={MUTED} style={{ fontVariantNumeric: "tabular-nums" }}>
                {s.p}%
              </text>
            </g>
          );
        })}
      </svg>
      <div className="flex flex-wrap gap-x-5 gap-y-2 mt-2 text-xs" style={{ color: MUTED }}>
        <span className="flex items-center gap-2"><span style={{ width: 12, height: 12, borderRadius: 6, background: SLATE, display: "inline-block" }} /> probabilistic step, sized by error</span>
        <span className="flex items-center gap-2"><span style={{ width: 12, height: 12, borderRadius: 6, border: `1.5px solid ${SLATE}`, display: "inline-block" }} /> deterministic step</span>
        <span className="flex items-center gap-2"><span style={{ width: 11, height: 11, border: `1.5px solid ${BROWN}`, display: "inline-block" }} /> automated check</span>
        <span className="flex items-center gap-2"><span style={{ width: 11, height: 11, background: BROWN, display: "inline-block" }} /> human review</span>
        <span className="flex items-center gap-2"><span style={{ width: 16, height: 5, background: BRICK, display: "inline-block" }} /> share of the undetected errors</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

export default function ChainCalculator() {
  // Part 1
  const [slider, setSlider] = useState(sliderFromError(0.02));
  const [n, setN] = useState(10);
  const [tol, setTol] = useState(0.05);
  // Part 2
  const [steps, setSteps] = useState<Step[]>(DEFAULT_STEPS);
  const [ready, setReady] = useState(false);

  // Read a shared scenario from the address once, after hydration.
  useEffect(() => {
    const readUrl = () => {
      const q = new URLSearchParams(window.location.search);
      const e = parseFloat(q.get("e") ?? "");
      if (!Number.isNaN(e) && e > 0) setSlider(sliderFromError(e / 100));
      const qn = parseInt(q.get("n") ?? "", 10);
      if (!Number.isNaN(qn)) setN(Math.max(1, Math.min(100, qn)));
      const qt = parseFloat(q.get("t") ?? "");
      if ([0.01, 0.05, 0.1, 0.2].includes(qt)) setTol(qt);
      const s = q.get("s");
      if (s) {
        const decoded = decodeSteps(s);
        if (decoded) setSteps(decoded);
      }
      setReady(true);
    };
    const id = window.setTimeout(readUrl, 0);
    return () => window.clearTimeout(id);
  }, []);

  const e = errorFromSlider(slider);
  const ok = Math.pow(1 - e, n);
  const maxN = Math.max(0, Math.floor(Math.log(1 - tol) / Math.log(1 - e)));
  const result = useMemo(() => computeChain(steps), [steps]);

  // Keep the address in sync so the address bar is always a shareable link.
  useEffect(() => {
    if (!ready) return;
    const q = new URLSearchParams();
    q.set("e", fmtError(e));
    q.set("n", String(n));
    q.set("t", String(tol));
    q.set("s", encodeSteps(steps));
    const url = `${window.location.pathname}?${q.toString()}`;
    window.history.replaceState(null, "", url);
  }, [ready, e, n, tol, steps]);

  const updateStep = (i: number, patch: Partial<Step>) =>
    setSteps((prev) => prev.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));

  // Post texts: three short lines that stand on their own in a feed, then the link.
  const round = (v: number) => (v >= 10 ? Math.round(v).toString() : v >= 1 ? v.toFixed(1) : pct(v));
  const accShort = fmtAccuracy(e).replace(/\.0+$/, "");
  const postSimple = () =>
    [
      `An AI agent that gets each step right ${accShort} percent of the time sounds reliable.`,
      n === 1
        ? `On a single step it still fails ${round((1 - ok) * 100)} percent of the time.`
        : `Run it across a process of ${n} steps and ${round((1 - ok) * 100)} percent of cases fail somewhere along the way.`,
      `Reliability in automation compounds. The arithmetic decides.`,
      `Run your own chain: ${window.location.href}`,
    ].join("\n\n");
  const checks = steps.filter((s) => s.check !== "none").length;
  const postChain = () => {
    const lines = [
      `An automated process is a chain of steps. Each one can go wrong, and the errors add up.`,
      checks === 0
        ? `This chain: ${steps.length} steps, no checks, ${perThousand(result.undetected)} undetected errors in 1'000 cases.`
        : `This chain: ${steps.length} steps, ${checks} ${checks === 1 ? "check" : "checks"}, ${perThousand(result.undetected)} undetected errors in 1'000 cases. Without the checks: ${perThousand(result.noChecks)} in 1'000.`,
    ];
    if (checks > 0) lines.push(`The checks cost ${swiss(result.touches * 1000)} human touches per 1'000 cases. That is the trade.`);
    lines.push(`Run your own chain: ${window.location.href}`);
    return lines.join("\n\n");
  };

  const failPct = pct((1 - ok) * 100);
  const headline =
    n === 1
      ? `One step at ${fmtAccuracy(e)} percent: ${failPct} percent of runs fail.`
      : `${n} steps at ${fmtAccuracy(e)} percent each: ${failPct} percent of runs fail somewhere in the chain.`;

  return (
    <main style={{ background: "#F7F4EF", color: INK, minHeight: "100vh" }}>
      <SiteNav />

      <div className="px-5 md:px-8 pt-28 md:pt-32 pb-16 md:pb-20">
        <div className="max-w-[900px] mx-auto">
          {/* Header */}
          <Label>Calculator</Label>
          <h1
            className="font-[family-name:var(--font-cormorant)] font-light mt-3 mb-5"
            style={{ fontSize: "clamp(34px, 5.5vw, 56px)", lineHeight: 1.15, color: INK, textWrap: "balance" }}
          >
            Where the Chain Breaks
          </h1>
          <p className="text-base md:text-lg max-w-[62ch]" style={{ color: MUTED, lineHeight: 1.7 }}>
            An error rate per step looks small. Across a chain of steps it does not stay small. This page runs the arithmetic
            for the simple case and for the real one, where steps differ and checks sit in between, and gives you a link to the
            result.
          </p>
          <aside className="mt-8 p-5 md:p-6 max-w-[74ch]" style={{ background: SUNK, borderLeft: `3px solid ${BROWN}` }}>
            <p className="text-xs uppercase tracking-widest mb-2" style={{ color: BROWN }}>
              The rule
            </p>
            <p className="text-sm" style={{ lineHeight: 1.75 }}>
              A chain completes only when every step does. Its completion rate is the product of the step accuracies, so a
              step at 98 percent costs the chain two points, and ten of them cost it 18. The argument is in{" "}
              <Link href="/blog/ninety-nine-percent-is-a-failing-grade" style={{ color: SLATE, textDecoration: "underline", textUnderlineOffset: 3 }}>
                99 Percent Is a Failing Grade
              </Link>
              . This is the calculator behind it.
            </p>
          </aside>

          {/* ---------------- Part 1 ---------------- */}
          <section className="mt-16 pt-10" style={{ borderTop: `1px solid ${LINE2}` }}>
            <Label>Part 1 · The simple case</Label>
            <h2 className="font-[family-name:var(--font-cormorant)] font-light mt-3 mb-3" style={{ fontSize: "clamp(24px, 3.5vw, 34px)", color: SLATE }}>
              Every step equally good, nothing checked
            </h2>
            <p className="text-sm max-w-[70ch] mb-8" style={{ color: MUTED, lineHeight: 1.7 }}>
              The calculation you can do in your head, and the reason long autonomous chains become uncomfortable. Set the
              accuracy of a single step, the length of the chain, and how many failed runs the business owner would accept.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 md:gap-12">
              <div>
                <div className="mb-7">
                  <div className="flex items-baseline justify-between mb-1">
                    <label htmlFor="acc" className="text-sm">Accuracy per step</label>
                    <span className="font-[family-name:var(--font-cormorant)] font-light" style={{ fontSize: "1.7rem", color: SLATE, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
                      {fmtAccuracy(e)}<span style={{ fontSize: "0.9rem", marginLeft: 4 }}>%</span>
                    </span>
                  </div>
                  <input id="acc" type="range" min={0} max={SLIDER_MAX} value={SLIDER_MAX - slider} onChange={(ev) => setSlider(SLIDER_MAX - parseInt(ev.target.value, 10))} className="w-full" style={{ accentColor: SLATE }} aria-valuetext={`${fmtAccuracy(e)} percent accurate`} />
                  <p className="text-xs mt-1" style={{ color: MUTED }}>
                    An error rate of {fmtError(e)} percent. The slider is logarithmic: the nines are on the right.
                  </p>
                </div>
                <div className="mb-7">
                  <div className="flex items-baseline justify-between mb-1">
                    <label htmlFor="steps" className="text-sm">Steps in the chain</label>
                    <span className="font-[family-name:var(--font-cormorant)] font-light" style={{ fontSize: "1.7rem", color: SLATE, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
                      {n}
                    </span>
                  </div>
                  <input id="steps" type="range" min={1} max={100} value={n} onChange={(ev) => setN(parseInt(ev.target.value, 10))} className="w-full" style={{ accentColor: SLATE }} aria-valuetext={`${n} steps`} />
                  <p className="text-xs mt-1" style={{ color: MUTED }}>One to 100 steps in sequence.</p>
                </div>
                <div className="mb-2">
                  <label htmlFor="tol" className="text-sm block mb-1">Failed runs the business accepts</label>
                  <select id="tol" value={tol} onChange={(ev) => setTol(parseFloat(ev.target.value))} className="w-full text-sm" style={{ background: SUNK, border: `1px solid ${LINE2}`, padding: "8px 10px", color: INK, fontFamily: "inherit" }}>
                    <option value={0.01}>1 percent of runs</option>
                    <option value={0.05}>5 percent of runs</option>
                    <option value={0.1}>10 percent of runs</option>
                    <option value={0.2}>20 percent of runs</option>
                  </select>
                  <p className="text-xs mt-1" style={{ color: MUTED }}>The standard the process owner would measure the chain against.</p>
                </div>
              </div>

              <div>
                <p className="font-[family-name:var(--font-cormorant)] font-light mb-4" style={{ fontSize: "clamp(20px, 2.6vw, 26px)", color: INK, lineHeight: 1.3, textWrap: "balance" }}>
                  {headline}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4">
                  <Tile label="Chain completes" value={pct(ok * 100)} unit="%" caption="every step correct" />
                  <Tile label="Chain fails" value={failPct} unit="%" caption="at least one step wrong" color={BRICK} />
                  <Tile label="Longest chain within tolerance" value={maxN >= 1 ? swiss(maxN) : "0"} unit={maxN === 1 ? "step" : "steps"} caption={`before more than ${Math.round(tol * 100)} percent of runs fail`} />
                </div>
                <div className="mt-6 pt-5" style={{ borderTop: `1px solid ${LINE}` }}>
                  <FailureCurve e={e} n={n} tol={tol} maxN={maxN} />
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <CopyLink label="Copy link to this scenario" event="calculator_copy_simple" />
                  <CopyLink label="Copy text for a post" event="calculator_copy_text_simple" done="Text copied" text={postSimple} />
                  <span className="text-xs" style={{ color: MUTED }}>The address bar always carries your settings.</span>
                </div>
              </div>
            </div>
          </section>

          {/* ---------------- Part 2 ---------------- */}
          <section className="mt-16 pt-10" style={{ borderTop: `1px solid ${LINE2}` }}>
            <Label>Part 2 · The real case</Label>
            <h2 className="font-[family-name:var(--font-cormorant)] font-light mt-3 mb-3" style={{ fontSize: "clamp(24px, 3.5vw, 34px)", color: SLATE }}>
              Mixed steps and checks in between
            </h2>
            <p className="text-sm max-w-[72ch] mb-8" style={{ color: MUTED, lineHeight: 1.7 }}>
              In practice every step has its own accuracy. Some are deterministic, a rule engine or a line of code, and carry
              an error rate of zero. At a few points a check looks at the case so far. A check does not remove error for
              free: it catches a share of what is there and costs an intervention for each flag. The table runs all of it.
              The example is a client instruction on its way to a booking. Overwrite it with your own chain.
            </p>

            <ChainStrip steps={steps} result={result} />

            <div className="overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0 mt-8">
              <table style={{ width: "100%", minWidth: 680, borderCollapse: "collapse", fontSize: "0.85rem" }}>
                <thead>
                  <tr>
                    {["#", "Step", "Error rate", "Check after this step", "Catch rate", "Share of undetected", ""].map((h, i) => (
                      <th key={i} className="text-left text-[10px] uppercase tracking-widest py-2 pr-3" style={{ borderBottom: `2px solid ${SLATE}`, color: SLATE, fontWeight: 700, whiteSpace: "nowrap", width: i === 0 ? 28 : i === 1 ? "34%" : undefined }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {steps.map((s, i) => {
                    const share = result.contrib[i] / Math.max(1e-9, ...result.contrib);
                    const inputStyle: React.CSSProperties = { background: SUNK, border: `1px solid ${LINE2}`, padding: "6px 8px", color: INK, fontFamily: "inherit", fontSize: "0.85rem", width: "100%" };
                    return (
                      <tr key={i}>
                        <td className="py-2 pr-3 text-xs" style={{ borderBottom: `1px solid ${LINE}`, color: MUTED, fontVariantNumeric: "tabular-nums" }}>{i + 1}</td>
                        <td className="py-2 pr-3" style={{ borderBottom: `1px solid ${LINE}` }}>
                          <input id={`step-name-${i}`} type="text" value={s.name} maxLength={60} onChange={(ev) => updateStep(i, { name: ev.target.value })} style={inputStyle} aria-label={`Name of step ${i + 1}`} />
                        </td>
                        <td className="py-2 pr-3" style={{ borderBottom: `1px solid ${LINE}`, width: 96 }}>
                          <div className="flex items-center gap-1">
                            <input id={`step-p-${i}`} type="number" min={0} max={60} step={0.1} value={s.p} onChange={(ev) => updateStep(i, { p: Math.max(0, Math.min(60, parseFloat(ev.target.value) || 0)) })} style={{ ...inputStyle, fontVariantNumeric: "tabular-nums", width: 68 }} aria-label={`Error rate of step ${i + 1} in percent`} />
                            <span className="text-xs" style={{ color: MUTED }}>%</span>
                          </div>
                        </td>
                        <td className="py-2 pr-3" style={{ borderBottom: `1px solid ${LINE}`, width: 170 }}>
                          <select id={`step-check-${i}`} value={s.check} onChange={(ev) => { const check = ev.target.value as Check; updateStep(i, { check, c: check === "none" ? 0 : s.c === 0 ? (check === "human" ? 85 : 70) : s.c }); }} style={inputStyle} aria-label={`Check after step ${i + 1}`}>
                            <option value="none">None</option>
                            <option value="auto">Automated check</option>
                            <option value="human">Human review</option>
                          </select>
                        </td>
                        <td className="py-2 pr-3" style={{ borderBottom: `1px solid ${LINE}`, width: 96 }}>
                          <div className="flex items-center gap-1">
                            <input id={`step-c-${i}`} type="number" min={0} max={100} step={1} value={s.c} disabled={s.check === "none"} onChange={(ev) => updateStep(i, { c: Math.max(0, Math.min(100, parseFloat(ev.target.value) || 0)) })} style={{ ...inputStyle, fontVariantNumeric: "tabular-nums", width: 68, opacity: s.check === "none" ? 0.4 : 1 }} aria-label={`Catch rate of the check after step ${i + 1} in percent`} />
                            <span className="text-xs" style={{ color: MUTED }}>%</span>
                          </div>
                        </td>
                        <td className="py-2 pr-3" style={{ borderBottom: `1px solid ${LINE}`, width: 110 }}>
                          <div style={{ height: 6, background: SUNK, position: "relative" }} title="Share of the errors that leave the chain undetected">
                            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${(100 * share).toFixed(1)}%`, background: BRICK }} />
                          </div>
                        </td>
                        <td className="py-2" style={{ borderBottom: `1px solid ${LINE}`, width: 32 }}>
                          <button type="button" onClick={() => steps.length > 1 && setSteps((prev) => prev.filter((_, idx) => idx !== i))} aria-label={`Remove step ${i + 1}`} title="Remove step" className="text-lg leading-none" style={{ color: FAINT, background: "transparent", border: 0, cursor: "pointer", padding: "2px 6px" }}>
                            ×
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button type="button" className="btn-outline-slate" style={{ fontSize: "0.7rem", padding: "9px 18px" }} onClick={() => steps.length < 30 && setSteps((prev) => [...prev, { name: "New step", p: 2, check: "none", c: 0 }])}>
                Add a step
              </button>
              <button type="button" className="btn-outline-slate" style={{ fontSize: "0.7rem", padding: "9px 18px" }} onClick={() => setSteps(DEFAULT_STEPS)}>
                Reset the example
              </button>
              <span className="text-xs" style={{ color: MUTED }}>Error rate zero means a deterministic step. Catch rates are the check&apos;s own, per case it sees.</span>
            </div>

            {/* Outcome bar */}
            <div className="mt-10">
              <Label>Where 1&apos;000 cases end up</Label>
              <div className="flex mt-3" style={{ height: 36, border: `1px solid ${LINE2}` }} role="img" aria-label={`${pct(result.clean * 100)} percent of cases run clean, ${pct(result.caught * 100)} percent contain an error that a check catches, ${pct(result.undetected * 100)} percent leave the chain with an undetected error.`}>
                {[
                  { v: result.clean, color: SLATE, text: "#F7F4EF" },
                  { v: result.caught, color: BROWN, text: "#F7F4EF" },
                  { v: result.undetected, color: BRICK, text: "#F7F4EF" },
                ].map((seg, i) => (
                  <div key={i} className="flex items-center justify-center text-xs overflow-hidden" style={{ flex: `0 0 ${(seg.v * 100).toFixed(3)}%`, minWidth: seg.v > 0 ? 2 : 0, background: seg.color, color: seg.text, whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums", borderRight: i < 2 ? "2px solid #F7F4EF" : 0 }}>
                    {seg.v >= 0.09 ? `${pct(seg.v * 100)}%` : ""}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-xs" style={{ color: MUTED, lineHeight: 1.6 }}>
                <p><span style={{ display: "inline-block", width: 10, height: 10, background: SLATE, marginRight: 6 }} /><strong style={{ color: INK }}>{swiss(result.clean * 1000)} run clean.</strong> No step made an error.</p>
                <p><span style={{ display: "inline-block", width: 10, height: 10, background: BROWN, marginRight: 6 }} /><strong style={{ color: INK }}>{swiss(result.caught * 1000)} are caught.</strong> At least one error, every one of them stopped at a check.</p>
                <p><span style={{ display: "inline-block", width: 10, height: 10, background: BRICK, marginRight: 6 }} /><strong style={{ color: INK }}>{perThousand(result.undetected)} leave wrong.</strong> An error that no check saw. The number the business and the auditors mean.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4 mt-8">
              <Tile label="Undetected errors" value={perThousand(result.undetected)} unit="per 1'000 cases" caption={`${pct(result.undetected * 100)} percent of runs leave the chain wrong`} color={BRICK} />
              <Tile label="Human touches" value={swiss(result.touches * 1000)} unit="per 1'000 cases" caption="flags from automated checks, plus every case at a human review" />
              <Tile label="Without any checks" value={perThousand(result.noChecks)} unit="per 1'000 cases" caption="the same steps, nothing in between" color={MUTED} />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <CopyLink label="Copy link to this chain" event="calculator_copy_chain" />
              <CopyLink label="Copy text for a post" event="calculator_copy_text_chain" done="Text copied" text={postChain} />
              <button
                type="button"
                className="btn-outline-slate"
                style={{ fontSize: "0.7rem", padding: "9px 18px" }}
                onClick={() => {
                  track("calculator_share_linkedin");
                  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, "_blank", "noopener,noreferrer");
                }}
              >
                Share on LinkedIn
              </button>
            </div>
            <p className="text-xs mt-3 max-w-[70ch]" style={{ color: MUTED, lineHeight: 1.6 }}>
              LinkedIn takes a link and nothing else, so it shows the page card with your chain behind it. To say something
              with it, copy the post text and paste it above the link.
            </p>
          </section>

          {/* ---------------- Levers ---------------- */}
          <section className="mt-16 pt-10" style={{ borderTop: `1px solid ${LINE2}` }}>
            <Label>What moves the number</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
              <div>
                <h3 className="font-[family-name:var(--font-cormorant)] font-light mb-2" style={{ fontSize: "1.4rem", color: SLATE }}>Keep the chain short</h3>
                <p className="text-sm" style={{ color: MUTED, lineHeight: 1.7 }}>Length works exponentially, accuracy per step only linearly. Merging two probabilistic steps into one does more than improving a model by a point.</p>
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-cormorant)] font-light mb-2" style={{ fontSize: "1.4rem", color: SLATE }}>Stay deterministic where you can</h3>
                <p className="text-sm" style={{ color: MUTED, lineHeight: 1.7 }}>A rule or a line of code brings an error rate of zero into the chain and shortens its effective length. Set a step to zero in the table and watch. This is the <Link href="/blog/ninety-nine-percent-is-a-failing-grade" style={{ color: SLATE, textDecoration: "underline", textUnderlineOffset: 3 }}>1.0 multiplier</Link>.</p>
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-cormorant)] font-light mb-2" style={{ fontSize: "1.4rem", color: SLATE }}>Put checks where errors are expensive</h3>
                <p className="text-sm" style={{ color: MUTED, lineHeight: 1.7 }}>A check lowers the residual of every step before it and costs touches. Early in the chain it protects more steps, late in the chain it sees more of the damage. An automated check with a person on the flags scales. A person on every case does not.</p>
              </div>
            </div>
          </section>

          {/* ---------------- Method ---------------- */}
          <details className="mt-12 pt-6" style={{ borderTop: `1px solid ${LINE2}` }}>
            <summary className="text-xs uppercase tracking-widest cursor-pointer" style={{ color: BROWN }}>
              The arithmetic and its assumptions
            </summary>
            <div className="mt-4 text-sm max-w-[74ch]" style={{ color: MUTED, lineHeight: 1.8 }}>
              <p className="mb-3"><strong style={{ color: INK }}>Part 1.</strong> With an error rate p per step and n steps, the chain completes with probability (1 − p)<sup>n</sup> and fails with probability 1 − (1 − p)<sup>n</sup>. The longest chain within a tolerance t is the whole number part of ln(1 − t) / ln(1 − p).</p>
              <p className="mb-3"><strong style={{ color: INK }}>Part 2.</strong> An error made at step i survives when it passes every later check, with probability equal to the product of (1 − c<sub>j</sub>) over all checks j at or after i. A case runs clean with probability equal to the product of (1 − p<sub>i</sub>). It leaves without an undetected error with probability equal to the product of (1 − p<sub>i</sub> · survive<sub>i</sub>). Caught is the difference between the two. Undetected is one minus the second product.</p>
              <p className="mb-3"><strong style={{ color: INK }}>Touches.</strong> An automated check hands every flag to a person, so its touches are the probability that it fires. A human review looks at every case, so its touches are one per case. A check flags an error from an earlier step only if that error passed the checks in between.</p>
              <p><strong style={{ color: INK }}>Assumptions.</strong> Steps are independent, a check looks at the whole case so far, a caught error is corrected, and checks add no errors of their own. The figures are inputs, not measurements. The calculation becomes evidence only with error rates measured in your own pilot.</p>
            </div>
          </details>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
