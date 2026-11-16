"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { track } from "@vercel/analytics";

const loading = () => <div style={{ minHeight: 320 }} aria-hidden="true" />;

const ReliabilityMatrix = dynamic(() => import("@/components/viz/ReliabilityMatrix"), { loading });
const ExponentialSteps = dynamic(() => import("@/components/viz/ExponentialSteps"), { loading });
const JCurve = dynamic(() => import("@/components/viz/JCurve"), { loading });
const MortgageFunnel = dynamic(() => import("@/components/MortgageFunnel"), { loading });
const MrosChart = dynamic(() => import("@/components/viz/MrosChart"), { loading });
const ExploitWindow = dynamic(() => import("@/components/viz/ExploitWindow"), { loading });
const PriceVsMaintenance = dynamic(() => import("@/components/viz/PriceVsMaintenance"), { loading });
const CodeChurn = dynamic(() => import("@/components/viz/CodeChurn"), { loading });
const PatchTuesday = dynamic(() => import("@/components/viz/PatchTuesday"), { loading });
const HandoffGraph = dynamic(() => import("@/components/viz/HandoffGraph"), { loading });
const AutomationLayers = dynamic(() => import("@/components/viz/AutomationLayers"), { loading });
const PromotionGate = dynamic(() => import("@/components/viz/PromotionGate"), { loading });

type Figure = {
  id: string;
  /** The name in the list. */
  name: string;
  /** What the reader can find out with it. */
  asks: string;
  essay: { slug: string; title: string };
  Component: React.ComponentType;
};

type Group = { title: string; figures: Figure[] };

const GROUPS: Group[] = [
  {
    title: "Reliability and scale",
    figures: [
      {
        id: "reliability-matrix",
        name: "The reliability matrix",
        asks: "How long a chain can run at a given accuracy per step.",
        essay: { slug: "ninety-nine-percent-is-a-failing-grade", title: "99 Percent Is a Failing Grade" },
        Component: ReliabilityMatrix,
      },
      {
        id: "exponential-steps",
        name: "Thirty steps",
        asks: "What 30 doublings do, compared with 30 equal steps.",
        essay: { slug: "the-six-percent-club", title: "The Six Percent Club" },
        Component: ExponentialSteps,
      },
      {
        id: "j-curve",
        name: "The dip",
        asks: "Why measured performance falls before it rises.",
        essay: { slug: "the-six-percent-club", title: "The Six Percent Club" },
        Component: JCurve,
      },
    ],
  },
  {
    title: "Demand and workload",
    figures: [
      {
        id: "mortgage-funnel",
        name: "The mortgage funnel",
        asks: "What client agents do to applications per closed mortgage.",
        essay: { slug: "the-tsunami-is-not-coming-from-inside-the-bank", title: "The Tsunami Is Not Coming from Inside the Bank" },
        Component: MortgageFunnel,
      },
      {
        id: "mros",
        name: "Reports to MROS",
        asks: "How fast the suspicious activity workload compounds.",
        essay: { slug: "eighty-four-reports-a-day", title: "Eighty-Four Reports a Day" },
        Component: MrosChart,
      },
      {
        id: "exploit-window",
        name: "The exploit window",
        asks: "How much time remains between disclosure and attack.",
        essay: { slug: "tested-at-machine-speed", title: "Your Software Will Be Tested at Machine Speed" },
        Component: ExploitWindow,
      },
    ],
  },
  {
    title: "Build or buy",
    figures: [
      {
        id: "price-vs-maintenance",
        name: "Price and maintenance",
        asks: "What got cheap in software, and what did not.",
        essay: { slug: "who-patches-it-on-tuesday", title: "Who Patches It on Tuesday?" },
        Component: PriceVsMaintenance,
      },
      {
        id: "code-churn",
        name: "Code churn",
        asks: "How much changed code is refactored, and how much is copied and pasted.",
        essay: { slug: "who-patches-it-on-tuesday", title: "Who Patches It on Tuesday?" },
        Component: CodeChurn,
      },
      {
        id: "patch-tuesday",
        name: "Patch Tuesday",
        asks: "How many flaws a single vendor fixes in a month.",
        essay: { slug: "who-patches-it-on-tuesday", title: "Who Patches It on Tuesday?" },
        Component: PatchTuesday,
      },
      {
        id: "handoff-graph",
        name: "Handoffs",
        asks: "How integration work grows with every system added.",
        essay: { slug: "who-patches-it-on-tuesday", title: "Who Patches It on Tuesday?" },
        Component: HandoffGraph,
      },
      {
        id: "automation-layers",
        name: "The automation stack",
        asks: "Which layer of an automation to build and which to buy.",
        essay: { slug: "who-patches-it-on-tuesday", title: "Who Patches It on Tuesday?" },
        Component: AutomationLayers,
      },
      {
        id: "promotion-gate",
        name: "The promotion gate",
        asks: "Whether a tool built in house has the owners it needs for production.",
        essay: { slug: "who-patches-it-on-tuesday", title: "Who Patches It on Tuesday?" },
        Component: PromotionGate,
      },
    ],
  },
];

const ALL = GROUPS.flatMap((g) => g.figures);
export const FIGURE_COUNT = ALL.length;

const label = "text-xs uppercase tracking-widest";

/**
 * The figures of the essays in one place. A list on the left, the chosen figure
 * on the right, mounted only when it is chosen. On a phone the list becomes a
 * select, because twelve names in a row do not fit.
 */
export default function FigureGallery() {
  const [id, setId] = useState(ALL[0].id);
  const figure = ALL.find((f) => f.id === id) ?? ALL[0];
  const position = ALL.indexOf(figure);

  function choose(next: string) {
    setId(next);
    track("lab_figure", { figure: next });
  }

  function step(delta: number) {
    choose(ALL[(position + delta + ALL.length) % ALL.length].id);
  }

  return (
    <div className="grid lg:grid-cols-[250px_minmax(0,1fr)] gap-6 lg:gap-10 items-start">
      {/* The list */}
      <div>
        <div className="lg:hidden">
          <label htmlFor="figure-select" className={`${label} block mb-2`} style={{ color: "#8B7355" }}>
            Choose a figure
          </label>
          <select
            id="figure-select"
            value={id}
            onChange={(e) => choose(e.target.value)}
            className="w-full"
            style={{ padding: "12px 14px", border: "1px solid #2B3A52", background: "#F7F4EF", color: "#2B3A52", fontFamily: "inherit", fontSize: "1rem", borderRadius: 0 }}
          >
            {GROUPS.map((g) => (
              <optgroup key={g.title} label={g.title}>
                {g.figures.map((f) => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <nav aria-label="Figures" className="hidden lg:block lg:sticky" style={{ top: 96 }}>
          {GROUPS.map((g) => (
            <div key={g.title} className="mb-6">
              <p className={`${label} mb-2`} style={{ color: "#8B7355" }}>{g.title}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {g.figures.map((f) => {
                  const on = f.id === id;
                  return (
                    <li key={f.id}>
                      <button
                        type="button"
                        onClick={() => choose(f.id)}
                        aria-pressed={on}
                        className="figure-pick"
                      >
                        {f.name}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* The stage */}
      <div style={{ minWidth: 0 }}>
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 mb-1">
          <p className={label} style={{ color: "#6B6B6B" }} aria-live="polite">
            Figure {position + 1} of {ALL.length}
          </p>
          <div className="flex items-center gap-5">
            <button type="button" onClick={() => step(-1)} className={`${label} hover:underline`} style={{ color: "#2B3A52", background: "none", border: 0, padding: "6px 0", cursor: "pointer" }}>
              ←&nbsp;Previous
            </button>
            <button type="button" onClick={() => step(1)} className={`${label} hover:underline`} style={{ color: "#2B3A52", background: "none", border: 0, padding: "6px 0", cursor: "pointer" }}>
              Next&nbsp;→
            </button>
          </div>
        </div>
        <p className="font-[family-name:var(--font-cormorant)] font-light" style={{ fontSize: "clamp(22px, 3vw, 28px)", lineHeight: 1.25, color: "#2B3A52" }}>
          {figure.asks}
        </p>
        <div key={figure.id} className="figure-stage">
          <figure.Component />
        </div>
        <p className="text-sm" style={{ color: "#6B6B6B", lineHeight: 1.6 }}>
          The argument behind it:{" "}
          <Link href={`/blog/${figure.essay.slug}`} className="underline underline-offset-4" style={{ color: "#2B3A52" }}>
            {figure.essay.title}
          </Link>
        </p>
      </div>
    </div>
  );
}
