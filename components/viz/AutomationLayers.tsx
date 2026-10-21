const SLATE = "#2B3A52";
const BROWN = "#8B7355";
const INK = "#1A1A1A";
const SUNK = "#F0ECE3";
const MUTED = "#6B6B6B";
const LINE = "#E3DDD1";
const LINE2 = "#D8D3CB";

type Box = { name: string; detail: string };
type Tier = { label: string; side: "Build" | "Buy"; boxes: Box[] };

const TIERS: Tier[] = [
  {
    label: "Your logic",
    side: "Build",
    boxes: [
      { name: "Rules and decisions", detail: "what the institution decides, in its own words" },
      { name: "Flows per case", detail: "the order of steps, the exceptions, the handoffs" },
    ],
  },
  {
    label: "The platform",
    side: "Buy",
    boxes: [
      { name: "Case management", detail: "where a case lives, who holds it, what it waits for" },
      { name: "Models and search", detail: "the language model, the index, the retrieval" },
      { name: "Application access", detail: "the screens a human would click through" },
    ],
  },
  {
    label: "The runtime",
    side: "Buy",
    boxes: [
      { name: "Queues, restart and errors", detail: "what happens when a step fails at 03:00" },
      { name: "Rights, log and audit trail", detail: "who may do what, and the record of it" },
    ],
  },
  {
    label: "The lifecycle",
    side: "Buy",
    boxes: [{ name: "Operations, monitoring and tests per release", detail: "every model update, every patch, every quarter" }],
  },
];

export default function AutomationLayers() {
  return (
    <div className="my-10 py-8" style={{ borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
      <p className="text-xs uppercase tracking-widest mb-4" style={{ color: BROWN }}>
        Figure · The stack of an automation
      </p>
      <div className="flex flex-col">
        {TIERS.map((t, ti) => {
          const build = t.side === "Build";
          return (
            <div key={t.label}>
              {ti === 1 && (
                <div className="flex items-center gap-3 my-2" aria-hidden="true">
                  <div className="flex-1" style={{ borderTop: `2px dashed ${BROWN}` }} />
                  <p className="text-[10px] uppercase tracking-widest shrink-0" style={{ color: BROWN }}>
                    the line between build and buy
                  </p>
                  <div className="flex-1" style={{ borderTop: `2px dashed ${BROWN}` }} />
                </div>
              )}
              <div className="grid grid-cols-[4.6rem_1fr] md:grid-cols-[6.5rem_1fr] gap-x-3 items-stretch" style={{ marginTop: ti === 0 || ti === 1 ? 0 : 6 }}>
                <div className="flex flex-col justify-center">
                  <p className="text-[10px] uppercase tracking-widest" style={{ color: build ? SLATE : BROWN, fontWeight: 700 }}>
                    {t.side}
                  </p>
                  <p className="text-xs" style={{ color: MUTED, lineHeight: 1.4 }}>
                    {t.label}
                  </p>
                </div>
                <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${t.boxes.length > 2 ? "9.5rem" : "11rem"}, 1fr))` }}>
                  {t.boxes.map((b) => (
                    <div
                      key={b.name}
                      className="px-3 py-2.5"
                      style={{
                        background: build ? SLATE : SUNK,
                        color: build ? "#F7F4EF" : INK,
                        border: `1px solid ${build ? SLATE : LINE2}`,
                      }}
                    >
                      <p className="text-sm" style={{ fontWeight: 700, lineHeight: 1.35 }}>
                        {b.name}
                      </p>
                      <p className="text-xs mt-0.5" style={{ opacity: build ? 0.8 : 0.7, lineHeight: 1.45 }}>
                        {b.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-xs mt-4" style={{ color: MUTED, lineHeight: 1.6 }}>
        The top tier is the institution&apos;s own knowledge and changes every time a policy does. The three below are the same for every institution and change every time a vendor, a model or a regulator does. Author&apos;s own structure, from automation programmes in Swiss banks and public bodies.
      </p>
    </div>
  );
}
