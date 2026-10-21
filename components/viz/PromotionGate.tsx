const SLATE = "#2B3A52";
const BROWN = "#8B7355";
const INK = "#1A1A1A";
const MUTED = "#6B6B6B";
const SUNK = "#F0ECE3";
const LINE2 = "#D8D3CB";

const STAGES: { stage: string; questions: string[] }[] = [
  { stage: "Build", questions: ["Who builds it?", "Who changes it?", "Who approves the change?"] },
  { stage: "Run", questions: ["Who brings it into operation?", "Who runs it day to day?"] },
  { stage: "Fail", questions: ["Who brings it back after a failure?", "Who checks what happened?"] },
  { stage: "Answer", questions: ["Who answers for the result?"] },
];

function Blank() {
  return <span className="block" style={{ borderBottom: `1px dotted ${MUTED}`, height: "1.2rem" }} aria-hidden="true" />;
}

export default function PromotionGate() {
  return (
    <div className="my-10">
      <div className="p-6 md:p-8" style={{ background: SUNK, border: `1px solid ${LINE2}` }}>
        <div className="flex items-baseline justify-between gap-4 mb-5">
          <p className="text-xs uppercase tracking-widest" style={{ color: BROWN }}>
            The promotion gate · your tool
          </p>
          <p className="text-xs uppercase tracking-widest" style={{ color: MUTED }}>
            agentictom.com
          </p>
        </div>
        <div className="grid grid-cols-[1fr_5.5rem_5.5rem] md:grid-cols-[1fr_9rem_9rem] gap-x-3 pb-2" style={{ borderBottom: `1px solid ${SLATE}` }}>
          <p className="text-[10px] uppercase tracking-widest" style={{ color: MUTED }}>
            Question
          </p>
          <p className="text-[10px] uppercase tracking-widest" style={{ color: SLATE, fontWeight: 700 }}>
            Owner
          </p>
          <p className="text-[10px] uppercase tracking-widest" style={{ color: SLATE, fontWeight: 700 }}>
            Second name
          </p>
        </div>
        {STAGES.map((s) => (
          <div key={s.stage} className="pt-3 pb-1" style={{ borderBottom: `1px solid ${LINE2}` }}>
            <p className="font-[family-name:var(--font-cormorant)] mb-1" style={{ fontSize: "1.35rem", lineHeight: 1.1, color: SLATE }}>
              {s.stage}
            </p>
            {s.questions.map((q) => (
              <div key={q} className="grid grid-cols-[1fr_5.5rem_5.5rem] md:grid-cols-[1fr_9rem_9rem] gap-x-3 items-end py-1.5">
                <p className="text-sm" style={{ color: INK, lineHeight: 1.4 }}>
                  {q}
                </p>
                <Blank />
                <Blank />
              </div>
            ))}
          </div>
        ))}
        <p className="text-xs mt-4" style={{ color: MUTED, lineHeight: 1.6 }}>
          Two names per line: the owner, and the person who takes over when the owner leaves. An empty line is a reason not to promote. If every line carries the same name, you have a prototype with an owner, which is fine for a prototype.
        </p>
        <p className="text-xs mt-3 pt-3" style={{ color: MUTED, borderTop: `1px solid ${LINE2}` }}>
          From Who Patches It on Tuesday? Marc Hauser, October 2026.
        </p>
      </div>
    </div>
  );
}
