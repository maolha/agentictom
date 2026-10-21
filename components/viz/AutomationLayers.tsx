"use client";

const SLATE = "#2B3A52";
const BROWN = "#8B7355";
const SUNK = "#F0ECE3";
const MUTED = "#6B6B6B";
const LINE = "#E3DDD1";

const LAYERS: { name: string; detail: string; build: boolean }[] = [
  { name: "Business rules and decisions", detail: "what the institution decides, in its own words", build: true },
  { name: "Forms and flows per case", detail: "the order of steps, the exceptions, the handoffs", build: true },
  { name: "Case management", detail: "where a case lives, who holds it, what it waits for", build: false },
  { name: "Search and model", detail: "the language model, the index, the retrieval", build: false },
  { name: "Work in applications without an interface", detail: "the screens a human would click through", build: false },
  { name: "Restart, queues and error handling", detail: "what happens when a step fails at 03:00", build: false },
  { name: "Rights, log and audit trail", detail: "who may do what, and the record of what was done", build: false },
  { name: "Operations, monitoring and tests per release", detail: "every model update, every patch, every quarter", build: false },
];

export default function AutomationLayers() {
  return (
    <div className="my-10 py-8" style={{ borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
      <p className="text-xs uppercase tracking-widest mb-4" style={{ color: BROWN }}>
        Figure · Eight layers of an automation
      </p>
      <div>
        <div className="flex flex-col gap-1">
          {LAYERS.map((l, i) => (
            <div
              key={l.name}
              className="flex items-baseline justify-between gap-4 px-4 py-2.5"
              style={{
                background: l.build ? SLATE : SUNK,
                color: l.build ? "#F7F4EF" : "#1A1A1A",
                borderLeft: `3px solid ${l.build ? SLATE : BROWN}`,
              }}
            >
              <div>
                <p className="text-sm" style={{ fontWeight: 700, lineHeight: 1.4 }}>
                  <span className="text-xs mr-2" style={{ opacity: 0.6, fontVariantNumeric: "tabular-nums" }}>{i + 1}</span>
                  {l.name}
                </p>
                <p className="text-xs" style={{ opacity: l.build ? 0.8 : 0.7, lineHeight: 1.5 }}>{l.detail}</p>
              </div>
              <p className="text-[10px] uppercase tracking-widest shrink-0" style={{ opacity: 0.85 }}>
                {l.build ? "Build" : "Buy"}
              </p>
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs mt-4" style={{ color: MUTED, lineHeight: 1.6 }}>
        The two layers at the top are the institution&apos;s own knowledge and change every time a policy does. The six below are the same for every institution and change every time a vendor, a model or a regulator does. Author&apos;s own structure, from automation programmes in Swiss banks and public bodies.
      </p>
    </div>
  );
}
