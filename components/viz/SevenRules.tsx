const SLATE = "#2B3A52";
const BROWN = "#8B7355";
const INK = "#1A1A1A";
const MUTED = "#6B6B6B";
const SUNK = "#F0ECE3";
const LINE2 = "#D8D3CB";

const RULES: { rule: string; why: string }[] = [
  {
    rule: "Build what differentiates and changes weekly. Buy what everyone needs and changes yearly.",
    why: "Spolsky, 2001: if it is a core business function, do it yourself. Moore: everything else is context, even when it is mission critical.",
  },
  {
    rule: "Prototype freely. Promote only with an owner, a budget and a patch cadence.",
    why: "The agent writes the first version for nothing. The gate is the eight questions, a line in next year's budget, and a second owner.",
  },
  {
    rule: "Count dependencies, not lines.",
    why: "Every library is a patch stream you adopt. Every vendor behind it can be hijacked, sold or shut down.",
  },
  {
    rule: "Critical data or a critical function: the build carries the same controls as the purchase.",
    why: "FINMA 2023/1 margin numbers 7 and 101 define both. Price the controls into the build before comparing it with the licence.",
  },
  {
    rule: "Never build what the market has standardised and the auditor tests against.",
    why: "67 percent of Swiss banks run Finnova, 17 percent Avaloq (IFZ, 2023). Raiffeisen's own core ran 10 to 15 percent over CHF 500 million.",
  },
  {
    rule: "Buy with an exit.",
    why: "Audit right, data export and transition plan in the contract on day one, which is where FINMA 2018/3 and DORA both put them.",
  },
  {
    rule: "Generate the logic, buy the record.",
    why: "Agents are at their best writing the rules, flows and checks around a system of record, and at their worst being one.",
  },
];

export default function SevenRules() {
  return (
    <div className="my-10">
      <div className="p-6 md:p-8" style={{ background: SUNK, border: `1px solid ${LINE2}` }}>
        <div className="flex items-baseline justify-between gap-4 mb-5">
          <p className="text-xs uppercase tracking-widest" style={{ color: BROWN }}>
            Build or buy · seven rules
          </p>
          <p className="text-xs uppercase tracking-widest" style={{ color: MUTED }}>
            agentictom.com
          </p>
        </div>
        <ol className="flex flex-col" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {RULES.map((r, i) => (
            <li key={i} className="grid grid-cols-[2.2rem_1fr] gap-x-3 py-3" style={{ borderTop: i === 0 ? "none" : `1px solid ${LINE2}` }}>
              <span className="font-[family-name:var(--font-cormorant)] font-light" style={{ fontSize: "1.9rem", lineHeight: 1, color: SLATE, fontVariantNumeric: "tabular-nums" }}>
                {i + 1}
              </span>
              <div>
                <p className="text-sm md:text-base" style={{ color: INK, fontWeight: 700, lineHeight: 1.45 }}>
                  {r.rule}
                </p>
                <p className="text-xs mt-1" style={{ color: MUTED, lineHeight: 1.6 }}>
                  {r.why}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
