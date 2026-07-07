"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Layer = {
  key: string;
  name: string;
  tag: string;
  line: string;
  work: string[];
  governedBy: string;
  failsBy: string;
  volume: number;
  posts: { title: string; slug: string }[];
  dark?: boolean;
};

const LAYERS: Layer[] = [
  {
    key: "humans",
    name: "Humans",
    tag: "Concentrated at the edges",
    line: "Own what cannot be delegated: judgement, accountability, relationships.",
    work: [
      "Irreversible and novel decisions",
      "Exception resolution with full context",
      "Policy and envelope design",
      "Client relationships and trust",
    ],
    governedBy:
      "Line management and regulatory accountability. A named person answers for every agent's decisions (FINMA Guidance 08/2024).",
    failsBy: "Slowly: fatigue, backlog, inconsistency. The design goal is to keep routine away from them.",
    volume: 5,
    posts: [
      { title: "Who Manages the Agents?", slug: "who-manages-the-agents" },
      { title: "The Job Description No One Has Written", slug: "the-job-description-no-one-has-written" },
    ],
    dark: true,
  },
  {
    key: "agents",
    name: "Agents",
    tag: "Knowledge workers at scale",
    line: "Decide within policy envelopes. Escalate when the cost of error exceeds their authorisation.",
    work: [
      "Risk assessment and pricing within envelopes",
      "Case triage, investigation, drafting",
      "Coordination across systems and silos",
      "Escalation with reasoning and a recommendation",
    ],
    governedBy:
      "A job description: scope, policy envelope, escalation rules, a named owner, a review cadence. Autonomy expands with evidence.",
    failsBy: "Plausibly: output that looks right and is wrong. Controls must test decisions, beyond syntax.",
    volume: 25,
    posts: [
      { title: "Escalation by Design", slug: "escalation-by-design" },
      { title: "From ABS to Autopilot", slug: "from-abs-to-autopilot" },
    ],
  },
  {
    key: "bots",
    name: "Bots",
    tag: "Industrial backbone",
    line: "Execute the deterministic: same input, same output, full audit trail.",
    work: [
      "Data extraction and enrichment",
      "Screening and eligibility checks",
      "Reconciliations and postings",
      "System-of-record writes",
    ],
    governedBy: "Classic change management and access control. No judgement, by design.",
    failsBy: "Loudly: a rule runs or it does not. Cheap to detect, cheap to fix.",
    volume: 70,
    posts: [{ title: "The Easy Part Is the AI", slug: "the-easy-part-is-the-ai" }],
  },
];

function LayerRow({
  layer,
  open,
  onToggle,
}: {
  layer: Layer;
  open: boolean;
  onToggle: () => void;
}) {
  const dark = layer.dark;
  const ink = dark ? "#F7F4EF" : "#1A1A1A";
  const soft = dark ? "rgba(247,244,239,0.72)" : "#6B6B6B";
  const rule = dark ? "rgba(247,244,239,0.25)" : "#D8D3CB";

  return (
    <div
      style={{
        background: dark ? "#2B3A52" : layer.key === "agents" ? "rgba(43,58,82,0.07)" : "transparent",
        border: layer.key === "bots" ? "1px solid #D8D3CB" : "none",
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="w-full text-left p-6 md:p-8 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B7355]"
        style={{ background: "none", border: "none", color: ink }}
      >
        <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8">
          <div className="md:w-44 md:shrink-0 flex items-baseline justify-between md:block">
            <h3 className="font-[family-name:var(--font-cormorant)] font-light" style={{ fontSize: "1.7rem", color: ink }}>
              {layer.name}
            </h3>
            <p className="text-xs uppercase tracking-widest md:mt-1" style={{ color: "#8B7355" }}>
              {layer.tag}
            </p>
          </div>
          <div className="flex-1">
            <p className="text-sm" style={{ lineHeight: 1.7, color: dark ? "rgba(247,244,239,0.85)" : "#1A1A1A" }}>
              {layer.line}
            </p>
          </div>
          <div className="md:w-40 md:shrink-0 flex items-center gap-3 mt-2 md:mt-0">
            <div style={{ flex: 1, height: 3, background: dark ? "rgba(247,244,239,0.18)" : "#E3DDD1" }}>
              <div style={{ width: `${layer.volume}%`, height: "100%", background: dark ? "#8B7355" : "#2B3A52" }} />
            </div>
            <span className="text-xs" style={{ color: soft, fontVariantNumeric: "tabular-nums", minWidth: 38 }}>
              ≈{layer.volume}%
            </span>
            <span
              aria-hidden="true"
              className="text-xs"
              style={{
                color: soft,
                display: "inline-block",
                transform: open ? "rotate(45deg)" : "none",
                transition: "transform 0.25s",
                fontSize: "1rem",
                lineHeight: 1,
              }}
            >
              +
            </span>
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-6 md:px-8 pb-7 md:pb-9">
              <div style={{ borderTop: `1px solid ${rule}` }} className="pt-6 grid md:grid-cols-2 gap-6 md:gap-10">
                <div>
                  <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#8B7355" }}>
                    The work
                  </p>
                  <ul className="flex flex-col gap-2">
                    {layer.work.map((w) => (
                      <li key={w} className="text-sm flex gap-3" style={{ color: dark ? "rgba(247,244,239,0.85)" : "#1A1A1A", lineHeight: 1.6 }}>
                        <span aria-hidden="true" style={{ color: "#8B7355" }}>·</span>
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-5">
                  <div>
                    <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "#8B7355" }}>
                      Governed by
                    </p>
                    <p className="text-sm" style={{ color: dark ? "rgba(247,244,239,0.85)" : "#1A1A1A", lineHeight: 1.7 }}>
                      {layer.governedBy}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "#8B7355" }}>
                      Fails
                    </p>
                    <p className="text-sm" style={{ color: dark ? "rgba(247,244,239,0.85)" : "#1A1A1A", lineHeight: 1.7 }}>
                      {layer.failsBy}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {layer.posts.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/blog/${p.slug}`}
                        className="text-xs uppercase tracking-widest hover:underline"
                        style={{ color: dark ? "#F7F4EF" : "#2B3A52" }}
                      >
                        {p.title} →
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ThreeLayerDiagram() {
  const [open, setOpen] = useState<string | null>(null);
  const reduced = useReducedMotion();

  return (
    <div className="relative p-5 md:p-10" style={{ border: "2px solid #2B3A52" }}>
      {/* Escalation pulse rail (decorative, desktop only) */}
      {!reduced && (
        <div aria-hidden="true" className="hidden md:block absolute" style={{ left: 18, top: 96, bottom: 40, width: 1, background: "#E3DDD1" }}>
          <motion.span
            style={{
              position: "absolute",
              left: -2.5,
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#8B7355",
            }}
            animate={{ top: ["96%", "2%"], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", times: [0, 0.15, 0.85, 1] }}
          />
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-8">
        <div className="flex items-center gap-3">
          <span style={{ width: 24, height: 2, background: "#2B3A52", display: "block" }} />
          <p className="text-xs uppercase tracking-widest" style={{ color: "#2B3A52", fontWeight: 700 }}>
            Governance layer
          </p>
        </div>
        <p className="text-xs" style={{ color: "#6B6B6B", maxWidth: 380, lineHeight: 1.6 }}>
          FINMA Guidance 08/2024: responsibility for decisions cannot be delegated to AI. Humans set every boundary below.
        </p>
      </div>

      <div className="flex flex-col">
        <LayerRow layer={LAYERS[0]} open={open === "humans"} onToggle={() => setOpen(open === "humans" ? null : "humans")} />

        <div className="flex items-center justify-center py-3" style={{ background: "rgba(43,58,82,0.05)" }}>
          <span className="text-xs uppercase tracking-widest text-center px-4" style={{ color: "#8B7355" }}>
            ↑ escalation, when the cost of error exceeds the authorisation
          </span>
        </div>

        <LayerRow layer={LAYERS[1]} open={open === "agents"} onToggle={() => setOpen(open === "agents" ? null : "agents")} />

        <div className="flex items-center justify-center py-3" style={{ background: "rgba(43,58,82,0.03)" }}>
          <span className="text-xs uppercase tracking-widest text-center px-4" style={{ color: "#8B7355" }}>
            ↓ delegation of everything deterministic
          </span>
        </div>

        <LayerRow layer={LAYERS[2]} open={open === "bots"} onToggle={() => setOpen(open === "bots" ? null : "bots")} />
      </div>

      <p className="text-xs mt-6" style={{ color: "#6B6B6B" }}>
        Task-volume shares are illustrative, for a redesigned end-to-end process. Select a layer to see how it is governed and how it fails.
      </p>
    </div>
  );
}
