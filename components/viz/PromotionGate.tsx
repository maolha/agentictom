"use client";

import { useState } from "react";

const SLATE = "#2B3A52";
const BROWN = "#8B7355";
const BRICK = "#A23B2A";
const INK = "#1A1A1A";
const MUTED = "#6B6B6B";
const SUNK = "#F0ECE3";
const PAPER = "#F7F4EF";
const LINE2 = "#D8D3CB";

const STAGES: { stage: string; questions: string[] }[] = [
  { stage: "Build", questions: ["Who builds it?", "Who changes it?", "Who approves the change?"] },
  { stage: "Run", questions: ["Who brings it into operation?", "Who runs it day to day?"] },
  { stage: "Fail", questions: ["Who brings it back after a failure?", "Who checks what happened?"] },
  { stage: "Answer", questions: ["Who answers for the result?"] },
];

type Setup = {
  key: string;
  label: string;
  owner: string[];
  second: string[];
  verdict: string;
  detail: string;
  tone: "neutral" | "warn" | "ok";
};

const SETUPS: Setup[] = [
  {
    key: "blank",
    label: "Fill it in yourself",
    owner: Array(8).fill(""),
    second: Array(8).fill(""),
    verdict: "Two names per line.",
    detail: "The owner, and the person who takes over when the owner leaves. An empty line is a reason not to promote.",
    tone: "neutral",
  },
  {
    key: "one",
    label: "One person built it",
    owner: Array(8).fill("Anna"),
    second: Array(8).fill(""),
    verdict: "A prototype with an owner.",
    detail: "Fine for a prototype, not for production. Bus factor of one, and the Linux Foundation's 2024 figure gives a new hire a 38 percent chance of being gone within six months.",
    tone: "warn",
  },
  {
    key: "team",
    label: "The project team built it",
    owner: Array(8).fill("the team"),
    second: Array(8).fill(""),
    verdict: "A liability holding critical data.",
    detail: "“The team” is not a name. The day that team moves on, every line is empty at once, and the system keeps running on data someone has to answer for.",
    tone: "warn",
  },
  {
    key: "pair",
    label: "An owner and a stand in",
    owner: ["Anna", "Anna", "Head of ops", "IT ops", "Ben", "On call rota", "Risk", "Head of ops"],
    second: ["Ben", "Ben", "Deputy", "On call rota", "Anna", "IT ops", "Internal audit", "Deputy"],
    verdict: "Ready for the gate.",
    detail: "Every line has two names, and the names differ by stage. Now add the line in next year's budget and the patch cadence, and promote it.",
    tone: "ok",
  },
];

function Cell({ value }: { value: string }) {
  return (
    <span
      className="block text-sm"
      style={{
        borderBottom: `1px dotted ${MUTED}`,
        height: "1.35rem",
        lineHeight: "1.3rem",
        color: SLATE,
        fontWeight: 700,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {value}
    </span>
  );
}

export default function PromotionGate() {
  const [key, setKey] = useState("blank");
  const setup = SETUPS.find((s) => s.key === key) ?? SETUPS[0];
  const tone = setup.tone === "warn" ? BRICK : setup.tone === "ok" ? SLATE : MUTED;
  let row = 0;
  const grid = "grid grid-cols-[1fr_5.5rem_6.5rem] md:grid-cols-[1fr_9rem_10rem] gap-x-3";

  return (
    <div className="my-10">
      <div className="p-6 md:p-8" style={{ background: SUNK, border: `1px solid ${LINE2}` }}>
        <div className="flex items-baseline justify-between gap-4 mb-4">
          <p className="text-xs uppercase tracking-widest" style={{ color: BROWN }}>
            The promotion gate · your tool
          </p>
          <p className="text-xs uppercase tracking-widest" style={{ color: MUTED }}>
            agentictom.com
          </p>
        </div>

        <div role="radiogroup" aria-label="Which describes your tool?" className="flex flex-wrap gap-2 mb-5">
          {SETUPS.map((s) => {
            const on = s.key === key;
            return (
              <button
                key={s.key}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setKey(s.key)}
                className="text-xs px-3 py-1.5"
                style={{
                  background: on ? SLATE : PAPER,
                  color: on ? PAPER : INK,
                  border: `1px solid ${on ? SLATE : LINE2}`,
                  cursor: "pointer",
                }}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        <div className={`${grid} pb-2`} style={{ borderBottom: `1px solid ${SLATE}` }}>
          <p className="text-[10px] uppercase tracking-widest" style={{ color: MUTED }}>
            Question
          </p>
          <p className="text-[10px] uppercase tracking-widest" style={{ color: SLATE, fontWeight: 700 }}>
            Owner
          </p>
          <p className="text-[10px] uppercase tracking-widest" style={{ color: SLATE, fontWeight: 700 }}>
            If the owner leaves
          </p>
        </div>
        {STAGES.map((s) => (
          <div key={s.stage} className="pt-3 pb-1" style={{ borderBottom: `1px solid ${LINE2}` }}>
            <p className="font-[family-name:var(--font-cormorant)] mb-1" style={{ fontSize: "1.35rem", lineHeight: 1.1, color: SLATE }}>
              {s.stage}
            </p>
            {s.questions.map((q) => {
              const i = row++;
              return (
                <div key={q} className={`${grid} items-end py-1.5`}>
                  <p className="text-sm" style={{ color: INK, lineHeight: 1.4 }}>
                    {q}
                  </p>
                  <Cell value={setup.owner[i]} />
                  <Cell value={setup.second[i]} />
                </div>
              );
            })}
          </div>
        ))}

        <div className="mt-4 h-[9.5em] md:h-[6.4em]" style={{ overflow: "hidden" }} aria-live="polite">
          <p className="text-sm md:text-base" style={{ color: tone, fontWeight: 700, lineHeight: 1.4 }}>
            {setup.verdict}
          </p>
          <p className="text-xs mt-1" style={{ color: MUTED, lineHeight: 1.6 }}>
            {setup.detail}
          </p>
        </div>
      </div>
    </div>
  );
}
